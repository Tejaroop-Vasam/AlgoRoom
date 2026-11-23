from datetime import datetime
from enum import StrEnum
from typing import Annotated

from pydantic import BaseModel, Field, StringConstraints

from app.schemas.runner import ExecutionStatus, SubmissionVerdict

PlayerName = Annotated[str, StringConstraints(strip_whitespace=True, min_length=1, max_length=40)]
ProblemIds = Annotated[list[Annotated[int, Field(gt=0, le=2_147_483_647)]], Field(min_length=1, max_length=5)]
RaceDuration = Annotated[int, Field(ge=5, le=120)]
RoomName = Annotated[str, StringConstraints(strip_whitespace=True, min_length=1, max_length=255)]
MaxParticipants = Annotated[int, Field(ge=2, le=8)]


class RoomMode(StrEnum):
    RACE = "RACE"
    COOP = "COOP"


class RoomStatus(StrEnum):
    LOBBY = "LOBBY"
    IN_PROGRESS = "IN_PROGRESS"
    FINISHED = "FINISHED"


class RoomSettingsDto(BaseModel):
    maxParticipants: int
    durationMinutes: int | None = None


class CreateRoomDto(RoomSettingsDto):
    name: RoomName
    playerName: PlayerName
    mode: RoomMode
    problemIds: ProblemIds
    maxParticipants: MaxParticipants = 4
    durationMinutes: RaceDuration = 45


class UpdateRoomSettingsDto(BaseModel):
    name: RoomName
    mode: RoomMode
    maxParticipants: MaxParticipants
    durationMinutes: RaceDuration


class JoinRoomDto(BaseModel):
    playerName: PlayerName


class ProblemTelemetryDto(BaseModel):
    runs: int = 0
    submissions: int = 0
    compileErrors: int = 0
    runtimeErrors: int = 0
    passedTests: int = 0
    totalTests: int = 0
    executionTimeMs: int | None = None
    status: ExecutionStatus | SubmissionVerdict | None = None
    solvedAt: datetime | None = None


class RoomParticipantDto(BaseModel):
    id: str
    username: str
    isHost: bool
    online: bool
    telemetry: dict[int, ProblemTelemetryDto] = Field(default_factory=dict)
    finishedAt: datetime | None = None


class RoomDto(BaseModel):
    id: int
    code: str
    name: str
    mode: RoomMode
    status: RoomStatus
    host: RoomParticipantDto
    participants: list[RoomParticipantDto]
    problemIds: list[int]
    settings: RoomSettingsDto
    createdAt: datetime
    startedAt: datetime | None = None
    endsAt: datetime | None = None
    finishedAt: datetime | None = None
    serverTime: datetime


class RoomPreviewDto(BaseModel):
    code: str
    name: str
    mode: RoomMode
    status: RoomStatus
    hostName: str
    participantCount: int
    maxParticipants: int
    problemCount: int
    isMember: bool


class RoomMember(BaseModel):
    id: str
    username: str
    socket_id: str | None = None
    telemetry: dict[int, ProblemTelemetryDto] = Field(default_factory=dict)
    finished_at: datetime | None = None


class StoredRoom(BaseModel):
    id: int
    code: str
    name: str
    mode: RoomMode
    status: RoomStatus
    host_id: str
    problem_ids: list[int]
    settings: RoomSettingsDto
    created_at: datetime
    members: list[RoomMember]
    started_at: datetime | None = None
    ends_at: datetime | None = None
    finished_at: datetime | None = None
