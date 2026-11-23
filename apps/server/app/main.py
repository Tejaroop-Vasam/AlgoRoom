from contextlib import asynccontextmanager

import httpx
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from redis.asyncio import Redis
from sqlalchemy.ext.asyncio import async_sessionmaker

from app.api.realtime import create_socket_server
from app.api.v1.router import router
from app.core.config import get_settings
from app.db.database import create_engine
from app.models import Base
from app.repositories.room_repository import RoomRepository
from app.services.room_service import RoomService

settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    engine = create_engine(settings.conninfo)
    try:
        async with engine.begin() as connection:
            await connection.run_sync(Base.metadata.create_all)
        async with (
            httpx.AsyncClient(base_url=settings.runner_url, timeout=httpx.Timeout(95, connect=3)) as runner,
            Redis.from_url(settings.redis_url, decode_responses=True, socket_connect_timeout=3, socket_timeout=3) as redis,
        ):
            app.state.db = async_sessionmaker(engine)
            app.state.redis = redis
            app.state.rooms = RoomService(RoomRepository(redis))
            app.state.runner = runner
            yield
    finally:
        await engine.dispose()


api = FastAPI(
    lifespan=lifespan, docs_url=None, redoc_url=None, openapi_url=None,
)
api.add_middleware(
    CORSMiddleware,
    allow_origins=settings.origins,
    allow_methods=["GET", "POST"],
    allow_headers=["X-Guest-Token", "Content-Type"],
)
api.include_router(router)
app = create_socket_server(api, settings.origins)


def main():
    uvicorn.run("app.main:app", host="0.0.0.0", port=settings.port, workers=1)


if __name__ == "__main__":
    main()
