from asyncio import timeout

import httpx
from fastapi import APIRouter, HTTPException, Request
from redis.exceptions import RedisError
from sqlalchemy.exc import SQLAlchemyError

from app.db.database import check_database

router = APIRouter()


@router.get("/health/ready")
async def ready(request: Request):
    try:
        async with timeout(2):
            await check_database(request.app.state.db)
        await request.app.state.redis.ping()
        response = await request.app.state.runner.get("/health/ready", timeout=3)
        response.raise_for_status()
    except (SQLAlchemyError, TimeoutError, RedisError, httpx.HTTPError) as exc:
        raise HTTPException(503, "A backend dependency is unavailable") from exc
    return {"status": "ready"}
