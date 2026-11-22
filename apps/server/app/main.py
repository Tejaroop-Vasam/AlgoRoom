from contextlib import asynccontextmanager

import httpx
import uvicorn
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from psycopg import Error as DatabaseError
from psycopg_pool import PoolTimeout

from . import problems, rooms, runner_api, users
from .config import get_settings
from .db import create_pool
from .errors import ValidationErrorDto, install_error_handlers
from .openapi import install_openapi
from .realtime import create_socket_server

settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    if not settings.jwt_secret:
        raise RuntimeError("JWT_SECRET must be configured")
    async with create_pool(settings.conninfo) as pool, httpx.AsyncClient(
        base_url=settings.runner_url, timeout=httpx.Timeout(95, connect=3),
    ) as runner:
        await pool.wait(timeout=15)
        async with pool.connection() as conn:
            await conn.execute("UPDATE room_participants SET socket_id = NULL WHERE socket_id IS NOT NULL")
        app.state.db = pool
        app.state.runner = runner
        yield


api = FastAPI(
    title="AlgoRoom API", version="1.0.0", docs_url="/api/docs",
    openapi_url="/api/docs-json", lifespan=lifespan,
    responses={422: {"model": ValidationErrorDto, "description": "Validation error"}},
)
api.add_middleware(
    CORSMiddleware,
    allow_origins=settings.origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT"],
    allow_headers=["Authorization", "Content-Type"],
)
install_error_handlers(api)
for router in (users.router, problems.router, rooms.router, runner_api.router):
    api.include_router(router)


@api.get("/health/ready", include_in_schema=False)
async def ready(request: Request):
    try:
        async with request.app.state.db.connection(timeout=2) as conn:
            await conn.execute("SELECT 1")
        response = await request.app.state.runner.get("/health/ready", timeout=3)
        response.raise_for_status()
    except (DatabaseError, PoolTimeout, httpx.HTTPError) as exc:
        raise HTTPException(503, "A backend dependency is unavailable") from exc
    return {"status": "ready"}


install_openapi(api)
app = create_socket_server(api, settings.origins)


def main():
    uvicorn.run("app.main:app", host="0.0.0.0", port=settings.port, workers=1)


if __name__ == "__main__":
    main()
