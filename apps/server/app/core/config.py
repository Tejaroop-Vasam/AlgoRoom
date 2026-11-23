from functools import lru_cache
from pathlib import Path

from psycopg.conninfo import make_conninfo
from pydantic_settings import BaseSettings, SettingsConfigDict

SERVER_DIR = Path(__file__).resolve().parents[2]


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=(SERVER_DIR.parent.parent / ".env", SERVER_DIR / ".env"),
        extra="ignore",
    )

    port: int = 3000
    client_url: str = "http://localhost:4200"
    database_url: str = ""
    db_host: str = "localhost"
    db_port: int = 5432
    db_dbport: int | None = None
    db_user: str = "postgres"
    db_password: str = "postgres"
    db_database: str = "algoroom"
    r2_account_id: str = ""
    r2_access_key_id: str = ""
    r2_secret_access_key: str = ""
    r2_bucket_name: str = ""
    r2_endpoint: str = ""
    runner_url: str = "http://127.0.0.1:3001"
    redis_url: str = "redis://127.0.0.1:6379/0"

    @property
    def conninfo(self) -> str:
        return self.database_url or make_conninfo(
            host=self.db_host, port=self.db_dbport or self.db_port,
            user=self.db_user, password=self.db_password, dbname=self.db_database,
        )

    @property
    def origins(self) -> list[str]:
        return list(dict.fromkeys([
            self.client_url.rstrip("/"),
            "https://tejaroop-vasam.github.io",
            "http://localhost:4200",
            "http://127.0.0.1:4200",
        ]))


@lru_cache
def get_settings() -> Settings:
    return Settings()
