import secrets
from datetime import datetime, timedelta, timezone
from enum import StrEnum
from typing import Annotated
from uuid import UUID, uuid4

import jwt
from fastapi import APIRouter, Depends, HTTPException, Response
from fastapi.security import HTTPAuthorizationCredentials
from psycopg import AsyncConnection
from pydantic import BaseModel, Field, StringConstraints

from .config import get_settings
from .db import Database
from .users import CurrentUser, bearer, find_user, token_user_id

router = APIRouter(tags=["Rooms"])
CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
HOST_TOKEN_AUDIENCE = "algoroom-room-host"
GUEST_NAME = "Guest"


class RoomMode(StrEnum):
    RACE = "RACE"
    COOP = "COOP"


class RoomStatus(StrEnum):
    LOBBY = "LOBBY"
    IN_PROGRESS = "IN_PROGRESS"
    FINISHED = "FINISHED"


class BufferVisibility(StrEnum):
    OBSCURED = "OBSCURED"
    HOST_ONLY = "HOST_ONLY"
    OPEN = "OPEN"


class RoomSettingsDto(BaseModel):
    maxParticipants: int
    hiddenTestCases: bool
    bufferVisibility: BufferVisibility


class CreateRoomDto(RoomSettingsDto):
    name: Annotated[str, StringConstraints(strip_whitespace=True, min_length=1, max_length=255)]
    mode: RoomMode
    problemIds: Annotated[list[Annotated[int, Field(gt=0, le=2_147_483_647)]], Field(min_length=1, max_length=5)]
    maxParticipants: Annotated[int, Field(ge=2, le=8)] = 4
    hiddenTestCases: bool = True
    bufferVisibility: BufferVisibility = BufferVisibility.OBSCURED


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


class GuestHostSessionDto(BaseModel):
    token: str
    expiresAt: int


class CreatedRoomDto(RoomDto):
    hostSession: GuestHostSessionDto | None = None


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


def normalize_code(code: str) -> str:
    return code.strip().upper()


def issue_host_session(user_id: str, code: str) -> GuestHostSessionDto:
    expires_at = int((datetime.now(timezone.utc) + timedelta(days=1)).timestamp())
    token = jwt.encode(
        {"sub": user_id, "room": code, "aud": HOST_TOKEN_AUDIENCE, "exp": expires_at},
        get_settings().jwt_secret,
        algorithm="HS256",
    )
    return GuestHostSessionDto(token=token, expiresAt=expires_at)


def host_token_identity(token: str) -> tuple[str, str]:
    try:
        claims = jwt.decode(
            token,
            get_settings().jwt_secret,
            algorithms=["HS256"],
            audience=HOST_TOKEN_AUDIENCE,
            options={"require": ["sub", "room", "exp"]},
        )
        return str(UUID(claims["sub"])), claims["room"]
    except (jwt.InvalidTokenError, ValueError, TypeError) as exc:
        raise HTTPException(401, "Invalid or expired guest host token.") from exc


def participant_dto(row: dict) -> RoomParticipantDto:
    return RoomParticipantDto(
        id=row["user_id"], username=row["username"], isHost=row["is_host"],
        online=bool(row["socket_id"]),
    )


async def room_record(conn: AsyncConnection, code: str, *, lock: bool = False) -> dict:
    query = "SELECT * FROM rooms WHERE code = %s"
    if lock:
        query += " FOR UPDATE"
    room = await (await conn.execute(query, (normalize_code(code),))).fetchone()
    if not room:
        raise HTTPException(404, f'Room with code "{code}" not found.')
    return room


async def room_dto(conn: AsyncConnection, room: dict) -> RoomDto:
    rows = await (await conn.execute(
        """
        SELECT * FROM (
            SELECT DISTINCT ON (user_id) * FROM room_participants WHERE room_id = %s
            ORDER BY user_id, is_host DESC, id
        ) members ORDER BY id
        """, (room["id"],),
    )).fetchall()
    participants = [participant_dto(row) for row in rows]
    host = next((participant for participant in participants if participant.isHost), None)
    if host is None:
        host = RoomParticipantDto(id=room["host_id"], username="Unknown", isHost=True, online=False)
    return RoomDto(
        id=room["id"], code=room["code"], name=room["name"], mode=room["mode"],
        status=room["status"], host=host, participants=participants, problemIds=room["problem_ids"],
        settings=RoomSettingsDto(
            maxParticipants=room["max_participants"], hiddenTestCases=room["hidden_test_cases"],
            bufferVisibility=room["buffer_visibility"],
        ),
        createdAt=room["created_at"],
    )


@router.post(
    "/rooms",
    operation_id="RoomsController_createRoom",
    status_code=201,
    response_model_exclude_none=True,
    openapi_extra={"security": [{}]},
)
async def create_room(
    body: CreateRoomDto,
    db: Database,
    response: Response,
    credentials: Annotated[HTTPAuthorizationCredentials | None, Depends(bearer)],
) -> CreatedRoomDto:
    if credentials:
        user = await find_user(db, token_user_id(credentials.credentials))
    else:
        user = {"id": uuid4(), "username": GUEST_NAME}
    user_id = str(user["id"])
    async with db.connection() as conn:
        matching = await (await conn.execute(
            "SELECT count(*) AS total FROM problems WHERE id = ANY(%s)", (body.problemIds,),
        )).fetchone()
        if matching["total"] != len(body.problemIds):
            raise HTTPException(400, "Select distinct problems from the catalog.")
        for _ in range(10):
            code = "".join(secrets.choice(CODE_ALPHABET) for _ in range(6))
            room = await (await conn.execute(
                """
                INSERT INTO rooms (code, name, mode, host_id, problem_ids,
                    max_participants, hidden_test_cases, buffer_visibility)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                ON CONFLICT (code) DO NOTHING RETURNING *
                """,
                (code, body.name, body.mode.value, user_id, body.problemIds, body.maxParticipants,
                 body.hiddenTestCases, body.bufferVisibility.value),
            )).fetchone()
            if room:
                await conn.execute(
                    "INSERT INTO room_participants (room_id, user_id, username, is_host) VALUES (%s, %s, %s, true)",
                    (room["id"], user_id, user["username"]),
                )
                details = await room_dto(conn, room)
                response.headers["Cache-Control"] = "no-store"
                return CreatedRoomDto(
                    **details.model_dump(),
                    hostSession=None if credentials else issue_host_session(user_id, code),
                )
    raise HTTPException(503, "Could not create a room code. Please try again.")


@router.get("/rooms/{code}", operation_id="RoomsController_getRoomPreview")
async def room_preview(code: str, user: CurrentUser, db: Database) -> RoomPreviewDto:
    async with db.connection() as conn:
        room = await room_dto(conn, await room_record(conn, code, lock=True))
    return RoomPreviewDto(
        code=room.code, name=room.name, mode=room.mode, status=room.status,
        hostName=room.host.username, participantCount=len(room.participants),
        maxParticipants=room.settings.maxParticipants, problemCount=len(room.problemIds),
        isMember=any(participant.id == str(user["id"]) for participant in room.participants),
    )


async def join_room_member(
    db: Database, code: str, user: dict, sid: str | None = None, *, rejoin_only: bool = False,
) -> RoomDto:
    async with db.connection() as conn:
        room = await room_record(conn, code, lock=True)
        room_id, user_id = room["id"], str(user["id"])
        existing = await (await conn.execute(
            """
            SELECT id FROM room_participants WHERE room_id = %s AND user_id = %s
            ORDER BY is_host DESC, id LIMIT 1
            """,
            (room_id, user_id),
        )).fetchone()
        if existing:
            if sid:
                await conn.execute(
                    "UPDATE room_participants SET socket_id = %s, updated_at = now() WHERE id = %s",
                    (sid, existing["id"]),
                )
        else:
            if rejoin_only:
                raise HTTPException(403, "Guest access to this room has ended.")
            count = await (await conn.execute(
                "SELECT count(DISTINCT user_id) AS total FROM room_participants WHERE room_id = %s", (room_id,),
            )).fetchone()
            if count["total"] >= room["max_participants"]:
                raise HTTPException(400, "This room is full.")
            await conn.execute(
                "INSERT INTO room_participants (room_id, user_id, username, socket_id) VALUES (%s, %s, %s, %s)",
                (room_id, user_id, user["username"], sid),
            )
        return await room_dto(conn, room)


@router.post("/rooms/{code}/join", operation_id="RoomsController_joinRoom")
async def join_room(code: str, user: CurrentUser, db: Database) -> RoomDto:
    return await join_room_member(db, code, user)


async def disconnect_member(db: Database, code: str, sid: str) -> RoomDto | None:
    async with db.connection() as conn:
        try:
            room = await room_record(conn, code, lock=True)
        except HTTPException as exc:
            if exc.status_code == 404:
                return None
            raise
        result = await conn.execute(
            "UPDATE room_participants SET socket_id = NULL, updated_at = now() WHERE room_id = %s AND socket_id = %s",
            (room["id"], sid),
        )
        return await room_dto(conn, room) if result.rowcount else None


async def leave_room_member(db: Database, code: str, user_id: UUID, sid: str) -> RoomDto | None:
    async with db.connection() as conn:
        room = await room_record(conn, code, lock=True)
        participants = await (await conn.execute(
            """
            DELETE FROM room_participants
            WHERE room_id = %s AND user_id = %s AND EXISTS (
                SELECT 1 FROM room_participants WHERE room_id = %s AND user_id = %s AND socket_id = %s
            )
            RETURNING is_host
            """,
            (room["id"], str(user_id), room["id"], str(user_id), sid),
        )).fetchall()
        if not any(participant["is_host"] for participant in participants):
            return await room_dto(conn, room)
        successor = await (await conn.execute(
            "SELECT id, user_id FROM room_participants WHERE room_id = %s ORDER BY socket_id IS NULL, id LIMIT 1",
            (room["id"],),
        )).fetchone()
        if not successor:
            await conn.execute("DELETE FROM rooms WHERE id = %s", (room["id"],))
            return None
        await conn.execute("UPDATE room_participants SET is_host = true, updated_at = now() WHERE id = %s", (successor["id"],))
        room = await (await conn.execute(
            "UPDATE rooms SET host_id = %s, updated_at = now() WHERE id = %s RETURNING *",
            (successor["user_id"], room["id"]),
        )).fetchone()
        return await room_dto(conn, room)


async def launch_room(db: Database, code: str, user_id: UUID) -> RoomDto:
    async with db.connection() as conn:
        room = await room_record(conn, code, lock=True)
        if room["host_id"] != str(user_id):
            raise HTTPException(403, "Only the host can start the room.")
        if room["status"] == RoomStatus.LOBBY:
            room = await (await conn.execute(
                "UPDATE rooms SET status = 'IN_PROGRESS', updated_at = now() WHERE id = %s RETURNING *",
                (room["id"],),
            )).fetchone()
        return await room_dto(conn, room)


async def socket_membership(db: Database, code: str, sid: str) -> dict | None:
    async with db.connection() as conn:
        return await (await conn.execute(
            """
            SELECT r.mode, r.buffer_visibility, p.is_host
            FROM rooms r JOIN room_participants p ON p.room_id = r.id
            WHERE r.code = %s AND p.socket_id = %s
            """,
            (code, sid),
        )).fetchone()
