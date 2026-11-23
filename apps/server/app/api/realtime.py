import re
from datetime import datetime, timezone
from typing import Annotated

import socketio
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, StringConstraints, ValidationError
from redis.exceptions import RedisError

from app.core.security import GUEST_TOKEN_PATTERN, guest_id
from app.schemas.room import ProblemIds, StoredRoom
from app.services.room_service import normalize_code

NAMESPACE = "/rooms"


class JoinEvent(BaseModel):
    code: Annotated[str, StringConstraints(strip_whitespace=True, min_length=6, max_length=6)]


class ChatEvent(BaseModel):
    message: Annotated[str, StringConstraints(strip_whitespace=True, min_length=1, max_length=2000)]


class ReorderProblemsEvent(BaseModel):
    problemIds: ProblemIds


def create_socket_server(app: FastAPI, origins: list[str]) -> socketio.ASGIApp:
    sio = socketio.AsyncServer(
        async_mode="asgi", cors_allowed_origins=origins, max_http_buffer_size=256_000,
    )

    async def broadcast(room: StoredRoom):
        payload = app.state.rooms.public_room(room).model_dump(mode="json")
        await sio.emit("roomStateUpdated", payload, to=room.code, namespace=NAMESPACE)

    app.state.broadcast_room = broadcast

    async def event_error(sid: str, message: str):
        payload = {"message": message}
        await sio.emit("error", payload, to=sid, namespace=NAMESPACE)
        return {"error": message}

    async def joined_session(sid: str) -> dict:
        session = await sio.get_session(sid, namespace=NAMESPACE)
        if not session.get("code"):
            raise HTTPException(403, "Join the room first.")
        return session

    @sio.on("connect", namespace=NAMESPACE)
    async def connect(sid, environ, auth):
        token = auth.get("guestToken") if isinstance(auth, dict) else None
        if not isinstance(token, str) or not re.fullmatch(GUEST_TOKEN_PATTERN, token):
            raise socketio.exceptions.ConnectionRefusedError("Invalid guest session.")
        await sio.save_session(sid, {"token": token}, namespace=NAMESPACE)

    @sio.on("joinLobby", namespace=NAMESPACE)
    async def join_lobby(sid, payload):
        try:
            code = normalize_code(JoinEvent.model_validate(payload).code)
            session = await sio.get_session(sid, namespace=NAMESPACE)
            previous_code = session.get("code")
            store = app.state.rooms
            room = await store.join(code, session["token"], sid=sid)
            if previous_code and previous_code != code:
                await sio.leave_room(sid, previous_code, namespace=NAMESPACE)
                previous_room = await store.disconnect(previous_code, sid)
                if previous_room:
                    await broadcast(previous_room)
            await sio.enter_room(sid, code, namespace=NAMESPACE)
            session["code"] = code
            await sio.save_session(sid, session, namespace=NAMESPACE)
            await broadcast(room)
            return {"participantId": guest_id(code, session["token"])}
        except ValidationError:
            return await event_error(sid, "Enter a valid room code.")
        except HTTPException as exc:
            if exc.status_code == 403:
                return {"needsName": True}
            return await event_error(sid, exc.detail)
        except RedisError:
            return await event_error(sid, "Room storage is unavailable.")

    @sio.on("leaveRoom", namespace=NAMESPACE)
    async def leave_room(sid):
        try:
            session = await joined_session(sid)
            code = session["code"]
            room = await app.state.rooms.leave(code, sid)
            await sio.leave_room(sid, code, namespace=NAMESPACE)
            session.pop("code", None)
            await sio.save_session(sid, session, namespace=NAMESPACE)
            if room:
                await broadcast(room)
            return {"left": True}
        except HTTPException as exc:
            return await event_error(sid, exc.detail)
        except RedisError:
            return await event_error(sid, "Room storage is unavailable.")

    @sio.on("disconnect", namespace=NAMESPACE)
    async def disconnect(sid, reason):
        session = await sio.get_session(sid, namespace=NAMESPACE)
        if code := session.get("code"):
            try:
                room = await app.state.rooms.disconnect(code, sid)
                if room:
                    await broadcast(room)
            except RedisError:
                sio.logger.warning("Could not update room presence on disconnect")

    @sio.on("launchRoom", namespace=NAMESPACE)
    async def launch(sid):
        try:
            code = (await joined_session(sid))["code"]
            room = await app.state.rooms.launch(code, sid)
            await broadcast(room)
        except HTTPException as exc:
            return await event_error(sid, exc.detail)
        except RedisError:
            return await event_error(sid, "Room storage is unavailable.")

    @sio.on("reorderProblems", namespace=NAMESPACE)
    async def reorder_problems(sid, payload):
        try:
            order = ReorderProblemsEvent.model_validate(payload)
            code = (await joined_session(sid))["code"]
            room = await app.state.rooms.reorder_problems(code, sid, order.problemIds)
            await broadcast(room)
        except ValidationError:
            return await event_error(sid, "Choose a valid problem order.")
        except HTTPException as exc:
            return await event_error(sid, exc.detail)
        except RedisError:
            return await event_error(sid, "Room storage is unavailable.")

    @sio.on("chatMessage", namespace=NAMESPACE)
    async def chat(sid, payload):
        try:
            message = ChatEvent.model_validate(payload).message
            session = await joined_session(sid)
            code = session["code"]
            member = await app.state.rooms.active_member(code, sid)
            await sio.emit(
                "chatBroadcast",
                {
                    "user": {"id": member.id, "username": member.username},
                    "message": message,
                    "timestamp": datetime.now(timezone.utc).isoformat(),
                },
                to=code, namespace=NAMESPACE,
            )
        except ValidationError:
            return await event_error(sid, "Enter a message of up to 2,000 characters.")
        except HTTPException as exc:
            return await event_error(sid, exc.detail)
        except RedisError:
            return await event_error(sid, "Room storage is unavailable.")

    return socketio.ASGIApp(sio, other_asgi_app=app)
