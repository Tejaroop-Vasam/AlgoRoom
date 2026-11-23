from datetime import datetime
from enum import StrEnum
from typing import Annotated

from pydantic import BaseModel, Field, StringConstraints


class RoomMode(StrEnum):
    RACE = "RACE"
    COOP = "COOP"


class RoomStatus(StrEnum):
    LOBBY = "LOBBY"
    IN_PROGRESS = "IN_PROGRESS"
    FINISHED = "FINISHED"


class RoomSettingsDto(BaseModel):
    maxParticipants: int


class CreateRoomDto(RoomSettingsDto):
    name: Annotated[str, StringConstraints(strip_whitespace=True, min_length=1, max_length=255)]
    mode: RoomMode
    problemIds: Annotated[list[Annotated[int, Field(gt=0, le=2_147_483_647)]], Field(min_length=1, max_length=5)]
    maxParticipants: Annotated[int, Field(ge=2, le=8)] = 4


class RoomParticipantDto(BaseModel):
    id: str
    username: str
    isHost: bool
    online: bool


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
