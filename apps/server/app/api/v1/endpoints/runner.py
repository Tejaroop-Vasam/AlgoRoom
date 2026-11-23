import logging
from typing import Annotated

from fastapi import APIRouter, Header, Query, Request
from redis.exceptions import RedisError

from app.core.security import GUEST_TOKEN_PATTERN
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
logger = logging.getLogger(__name__)
RoomCode = Annotated[str | None, Query(min_length=6, max_length=6)]
RoomToken = Annotated[str | None, Header(pattern=GUEST_TOKEN_PATTERN)]


async def publish_attempt(
    request: Request, room: str | None, token: str | None, problem_id: int | None,
    result: ExecutionResultDto | SubmissionEvaluationResultDto,
) -> None:
    if room is None or token is None or problem_id is None:
        return
    try:
        updated = await request.app.state.rooms.record_attempt(room, token, problem_id, result)
        if updated is not None:
            await request.app.state.broadcast_room(updated)
    except RedisError:
        logger.warning("Could not update room telemetry", exc_info=True)


@router.post("/run")
async def run(
    body: RunCodeDto, db: Database, request: Request, room: RoomCode = None, x_guest_token: RoomToken = None,
) -> ExecutionResultDto:
    result = await runner_service.run_code(body, db, request.app.state.runner)
    await publish_attempt(request, room, x_guest_token, body.problemId, result)
    return result


@router.post("/submit")
async def submit(
    body: SubmitCodeDto, db: Database, request: Request, room: RoomCode = None, x_guest_token: RoomToken = None,
) -> SubmissionEvaluationResultDto:
    result = await runner_service.submit_code(body, db, request.app.state.runner)
    await publish_attempt(request, room, x_guest_token, body.problemId, result)
    return result


@router.post("/format", response_model_exclude_none=True)
async def format_code(body: FormatCodeDto, request: Request) -> FormatResultDto:
    return await runner_service.format_code(body, request.app.state.runner)
