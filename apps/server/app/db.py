from typing import Annotated

from fastapi import Depends, Request
from psycopg.rows import dict_row
from psycopg_pool import AsyncConnectionPool


def create_pool(conninfo: str) -> AsyncConnectionPool:
    return AsyncConnectionPool(
        conninfo, kwargs={"row_factory": dict_row}, min_size=1, max_size=10, open=False
    )


def get_pool(request: Request) -> AsyncConnectionPool:
    return request.app.state.db


Database = Annotated[AsyncConnectionPool, Depends(get_pool)]
