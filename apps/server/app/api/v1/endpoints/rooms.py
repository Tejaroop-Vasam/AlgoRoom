from typing import Annotated

from fastapi import APIRouter, Depends, Header, Request, Response

from app.core.security import GUEST_TOKEN_PATTERN
from app.db.database import Database
from app.schemas.room import CreateRoomDto, JoinRoomDto, RoomDto, RoomPreviewDto
from app.services.room_service import RoomService

router = APIRouter()
GuestToken = Annotated[str, Header(pattern=GUEST_TOKEN_PATTERN)]


def get_rooms(request: Request) -> RoomService:
    return request.app.state.rooms


Rooms = Annotated[RoomService, Depends(get_rooms)]


@router.post("/rooms", status_code=201)
async def create_room(body: CreateRoomDto, x_guest_token: GuestToken, db: Database, rooms: Rooms) -> RoomDto:
    return rooms.public_room(await rooms.create(body, x_guest_token, db))


@router.get("/rooms/{code}")
async def room_preview(code: str, x_guest_token: GuestToken, rooms: Rooms, response: Response) -> RoomPreviewDto:
    response.headers["Cache-Control"] = "no-store"
    return await rooms.preview(code, x_guest_token)


@router.post("/rooms/{code}/join")
async def join_room(code: str, body: JoinRoomDto, x_guest_token: GuestToken, rooms: Rooms) -> RoomDto:
    return rooms.public_room(await rooms.join(code, x_guest_token, username=body.playerName))
