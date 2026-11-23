from typing import Annotated

from fastapi import APIRouter, Query

from app.db.database import Database
from app.schemas.problem import Difficulty, ProblemDetailResponseDto, ProblemsListResponseDto
from app.services import problem_service

router = APIRouter()


@router.get("/problems")
async def list_problems(
    db: Database,
    difficulty: Difficulty | None = None,
    search: Annotated[str | None, Query(max_length=500)] = None,
    page: Annotated[int, Query(ge=1, le=2_147_483_647)] = 1,
    limit: Annotated[int, Query(ge=1, le=100)] = 20,
) -> ProblemsListResponseDto:
    return await problem_service.list_problems(db, difficulty, search, page, limit)


@router.get("/problems/{id}", response_model_exclude_none=True)
async def problem_detail(id: int, db: Database) -> ProblemDetailResponseDto:
    return await problem_service.problem_detail(db, id)
