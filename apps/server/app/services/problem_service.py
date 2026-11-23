from fastapi import HTTPException
from starlette.concurrency import run_in_threadpool

from app.db.database import SessionFactory
from app.models.problem import Problem
from app.repositories import problem_repository
from app.repositories.test_case_repository import fetch_stored_cases
from app.schemas.problem import Difficulty, ProblemDetailResponseDto, ProblemsListResponseDto, StoredCase


def summary(problem: Problem) -> dict:
    return {
        "id": problem.id,
        "title": problem.title,
        "difficulty": problem.difficulty,
        "createdAt": problem.created_at,
        "updatedAt": problem.updated_at,
    }


async def list_problems(
    db: SessionFactory, difficulty: Difficulty | None, search: str | None, page: int, limit: int,
) -> ProblemsListResponseDto:
    rows, total = await problem_repository.list_problems(db, difficulty, search, page, limit)
    return ProblemsListResponseDto(
        problems=[summary(row) for row in rows], total=total, page=page,
        limit=limit, totalPages=(total + limit - 1) // limit,
    )


async def get_problem(db: SessionFactory, problem_id: int) -> Problem:
    problem = await problem_repository.find_problem(db, problem_id)
    if problem is None:
        raise HTTPException(404, f"Problem #{problem_id} not found")
    return problem


def public_sample_cases(problem: Problem) -> list[dict]:
    return [case for case in problem.sample_test_cases if not case.get("isHidden")]


async def problem_detail(db: SessionFactory, problem_id: int) -> ProblemDetailResponseDto:
    problem = await get_problem(db, problem_id)
    starters = dict(problem.starter_templates)
    starters.update({
        language: template["starterCode"] for language, template in problem.code_templates.items()
        if template and template.get("starterCode")
    })
    return ProblemDetailResponseDto(
        **summary(problem), description=problem.description, constraints=problem.constraints,
        hints=problem.hints, sampleTestCases=public_sample_cases(problem),
        starterTemplates=starters, starterCodes=starters,
        timeLimitMs=problem.time_limit_ms, memoryLimitMb=problem.memory_limit_mb,
    )


async def get_test_cases(problem: Problem) -> list[StoredCase]:
    if key := problem.test_cases_r2_key:
        return await run_in_threadpool(fetch_stored_cases, key)
    return [StoredCase.model_validate(case) for case in problem.sample_test_cases]
