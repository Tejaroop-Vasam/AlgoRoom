from typing import Annotated

from fastapi import Depends, Request
from psycopg.conninfo import conninfo_to_dict
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncEngine, AsyncSession, async_sessionmaker, create_async_engine

SessionFactory = async_sessionmaker[AsyncSession]


def create_engine(conninfo: str) -> AsyncEngine:
    connect_args = conninfo_to_dict(conninfo)
    connect_args.setdefault("connect_timeout", 5)
    return create_async_engine(
        "postgresql+psycopg://", connect_args=connect_args,
        pool_size=10, max_overflow=0, pool_pre_ping=True,
    )


async def check_database(sessions: SessionFactory) -> None:
    async with sessions() as session:
        await session.execute(select(1))


def get_sessions(request: Request) -> SessionFactory:
    return request.app.state.db


Database = Annotated[SessionFactory, Depends(get_sessions)]
