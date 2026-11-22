from alembic import context
from sqlalchemy import create_engine, pool

from app.config import get_settings


def run_migrations():
    conninfo = get_settings().conninfo
    if context.is_offline_mode():
        context.configure(url="postgresql+psycopg://", literal_binds=True)
        with context.begin_transaction():
            context.run_migrations()
        return

    from psycopg import connect

    engine = create_engine(
        "postgresql+psycopg://", creator=lambda: connect(conninfo), poolclass=pool.NullPool,
    )
    with engine.connect() as connection:
        context.configure(connection=connection)
        with context.begin_transaction():
            context.run_migrations()


run_migrations()
