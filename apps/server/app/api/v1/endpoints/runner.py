from fastapi import APIRouter, Request

from app.db.database import Database
from app.schemas.runner import (
    ExecutionResultDto,
    FormatCodeDto,
    FormatResultDto,
    RunCodeDto,
    SubmissionEvaluationResultDto,
    SubmitCodeDto,
)
from app.services import runner_service

router = APIRouter(prefix="/api")


@router.post("/run")
async def run(body: RunCodeDto, db: Database, request: Request) -> ExecutionResultDto:
    return await runner_service.run_code(body, db, request.app.state.runner)


@router.post("/submit")
async def submit(body: SubmitCodeDto, db: Database, request: Request) -> SubmissionEvaluationResultDto:
    return await runner_service.submit_code(body, db, request.app.state.runner)


@router.post("/format", response_model_exclude_none=True)
async def format_code(body: FormatCodeDto, request: Request) -> FormatResultDto:
    return await runner_service.format_code(body, request.app.state.runner)
