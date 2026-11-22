from functools import lru_cache
from datetime import datetime
from enum import StrEnum
from typing import Annotated

import boto3
from botocore.config import Config
from botocore.exceptions import BotoCoreError, ClientError
from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel, TypeAdapter, ValidationError
from starlette.concurrency import run_in_threadpool

from .config import get_settings
from .db import Database

router = APIRouter(tags=["Problems"])


class Difficulty(StrEnum):
    EASY = "EASY"
    MEDIUM = "MEDIUM"
    HARD = "HARD"


class SampleTestCaseDto(BaseModel):
    id: int | None = None
    input: str
    expectedOutput: str
    explanation: str | None = None


class StoredCase(SampleTestCaseDto):
    isHidden: bool = False


class ProblemListItemDto(BaseModel):
    id: int
    title: str
    difficulty: Difficulty
    createdAt: datetime
    updatedAt: datetime


class ProblemsListResponseDto(BaseModel):
    problems: list[ProblemListItemDto]
    total: int
    page: int
    limit: int
    totalPages: int


class ProblemDetailResponseDto(ProblemListItemDto):
    description: str
    constraints: list[str]
    hints: list[str]
    sampleTestCases: list[SampleTestCaseDto]
    starterTemplates: dict[str, str]
    starterCodes: dict[str, str]
    timeLimitMs: int
    memoryLimitMb: int


def summary(problem: dict) -> dict:
    return {
        "id": problem["id"],
        "title": problem["title"],
        "difficulty": problem["difficulty"],
        "createdAt": problem["created_at"],
        "updatedAt": problem["updated_at"],
    }


@router.get("/problems", operation_id="ProblemsController_getProblems")
async def problems(
    db: Database,
    difficulty: Annotated[Difficulty | None, Query(description="Filter by difficulty")] = None,
    search: Annotated[str | None, Query(max_length=500, description="Search problem titles and descriptions")] = None,
    page: Annotated[int, Query(ge=1, le=2_147_483_647, description="Page number")] = 1,
    limit: Annotated[int, Query(ge=1, le=100, description="Results per page")] = 20,
) -> ProblemsListResponseDto:
    filters = []
    values = []
    if difficulty:
        filters.append("difficulty = %s")
        values.append(difficulty.value)
    if search:
        filters.append("(title ILIKE %s OR description ILIKE %s)")
        values.extend((f"%{search}%", f"%{search}%"))
    where = f" WHERE {' AND '.join(filters)}" if filters else ""
    async with db.connection() as conn:
        total = (await (await conn.execute(f"SELECT count(*) AS total FROM problems{where}", values)).fetchone())["total"]
        rows = await (await conn.execute(
            f"""
            SELECT id, title, difficulty, created_at, updated_at
            FROM problems{where} ORDER BY created_at DESC, id DESC LIMIT %s OFFSET %s
            """,
            [*values, limit, (page - 1) * limit],
        )).fetchall()
    return {
        "problems": [summary(row) for row in rows], "total": total, "page": page,
        "limit": limit, "totalPages": (total + limit - 1) // limit,
    }


async def get_problem(db: Database, problem_id: int) -> dict:
    async with db.connection() as conn:
        problem = await (await conn.execute("SELECT * FROM problems WHERE id = %s", (problem_id,))).fetchone()
    if not problem:
        raise HTTPException(404, f"Problem #{problem_id} not found")
    return problem


def public_sample_cases(problem: dict) -> list[dict]:
    return [case for case in problem["sample_test_cases"] if not case.get("isHidden")]


@router.get("/problems/{id}", operation_id="ProblemsController_getProblem", response_model_exclude_none=True)
async def problem_detail(id: int, db: Database) -> ProblemDetailResponseDto:
    problem = await get_problem(db, id)
    starters = dict(problem["starter_templates"])
    starters.update({
        language: template["starterCode"] for language, template in problem["code_templates"].items()
        if template and template.get("starterCode")
    })
    return {
        **summary(problem),
        "description": problem["description"],
        "constraints": problem["constraints"],
        "hints": problem["hints"],
        "sampleTestCases": public_sample_cases(problem),
        "starterTemplates": starters,
        "starterCodes": starters,
        "timeLimitMs": problem["time_limit_ms"],
        "memoryLimitMb": problem["memory_limit_mb"],
    }


def assemble_code(problem: dict, language: str, code: str) -> str:
    template = problem["code_templates"].get(language) or {}
    driver = template.get("driverCode")
    if not driver:
        return code
    for placeholder in ("// __USER_CODE__", "# __USER_CODE__", "{{USER_CODE}}"):
        if placeholder in driver:
            return driver.replace(placeholder, code, 1)
    return f"{code}\n\n{driver}"


@lru_cache
def r2_client():
    settings = get_settings()
    endpoint = settings.r2_endpoint
    if not endpoint and settings.r2_account_id:
        endpoint = f"https://{settings.r2_account_id}.r2.cloudflarestorage.com"
    if not all((endpoint, settings.r2_access_key_id, settings.r2_secret_access_key, settings.r2_bucket_name)):
        raise HTTPException(503, "Problem test storage is unavailable")
    return boto3.client(
        "s3", endpoint_url=endpoint, region_name="auto",
        aws_access_key_id=settings.r2_access_key_id,
        aws_secret_access_key=settings.r2_secret_access_key,
        config=Config(connect_timeout=3, read_timeout=10, retries={"total_max_attempts": 2}),
    )


def fetch_stored_cases(key: str) -> list[StoredCase]:
    try:
        response = r2_client().get_object(Bucket=get_settings().r2_bucket_name, Key=key)
        with response["Body"] as body:
            raw = body.read(4_000_001)
        if len(raw) > 4_000_000:
            raise HTTPException(502, "Problem test cases exceed the storage limit")
        return TypeAdapter(list[StoredCase]).validate_json(raw)
    except ClientError as exc:
        if exc.response.get("ResponseMetadata", {}).get("HTTPStatusCode") == 404:
            raise HTTPException(404, "Problem test cases were not found") from exc
        raise HTTPException(502, "Could not load problem test cases") from exc
    except (BotoCoreError, ValidationError) as exc:
        raise HTTPException(502, "Could not load problem test cases") from exc


async def get_test_cases(problem: dict) -> list[StoredCase]:
    if key := problem["test_cases_r2_key"]:
        return await run_in_threadpool(fetch_stored_cases, key)
    return [StoredCase.model_validate(case) for case in problem["sample_test_cases"]]
