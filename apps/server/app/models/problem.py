from datetime import datetime
from typing import Any

from sqlalchemy import DateTime, Identity, String, Text, UniqueConstraint, func, text
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column

from ..db.base import Base


class Problem(Base):
    __tablename__ = "problems"
    __table_args__ = (UniqueConstraint("title", name="problems_title_unique"),)

    id: Mapped[int] = mapped_column(
        Identity(start=1, increment=1, minvalue=1, maxvalue=2_147_483_647, cache=1), primary_key=True,
    )
    title: Mapped[str] = mapped_column(String(255))
    description: Mapped[str] = mapped_column(Text)
    difficulty: Mapped[str] = mapped_column(String(50), server_default="EASY")
    constraints: Mapped[list[str]] = mapped_column(JSONB, server_default=text("'[]'::jsonb"))
    hints: Mapped[list[str]] = mapped_column(JSONB, server_default=text("'[]'::jsonb"))
    sample_test_cases: Mapped[list[dict[str, Any]]] = mapped_column(JSONB, server_default=text("'[]'::jsonb"))
    starter_templates: Mapped[dict[str, str]] = mapped_column(JSONB, server_default=text("'{}'::jsonb"))
    code_templates: Mapped[dict[str, dict[str, str] | None]] = mapped_column(
        JSONB, server_default=text("'{}'::jsonb"),
    )
    test_cases_r2_key: Mapped[str | None] = mapped_column(String(500))
    time_limit_ms: Mapped[int] = mapped_column(server_default=text("2000"))
    memory_limit_mb: Mapped[int] = mapped_column(server_default=text("256"))
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
