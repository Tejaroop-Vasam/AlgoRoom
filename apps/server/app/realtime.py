from datetime import datetime, timezone
from typing import Annotated, Any
from uuid import UUID

import socketio
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, StringConstraints, ValidationError

from .rooms import (
    BufferVisibility,
    GUEST_NAME,
    RoomMode,
    disconnect_member,
    host_token_identity,
    join_room_member,
    launch_room,
    leave_room_member,
    normalize_code,
    socket_membership,
)
from .users import find_user, token_user_id

NAMESPACE = "/rooms"


class JoinEvent(BaseModel):
    code: Annotated[str, StringConstraints(strip_whitespace=True, min_length=6, max_length=6)]


class ChatEvent(BaseModel):
    message: Annotated[str, StringConstraints(strip_whitespace=True, min_length=1, max_length=2000)]


class CrdtEvent(BaseModel):
    changes: Any


class TelemetryEvent(BaseModel):
    telemetry: Any


def create_socket_server(app: FastAPI, origins: list[str]) -> socketio.ASGIApp:
    sio = socketio.AsyncServer(
        async_mode="asgi", cors_allowed_origins=origins, max_http_buffer_size=256_000,
    )

    async def broadcast(room, *, event: str = "roomStateUpdated"):
        if room:
            await sio.emit(event, room.model_dump(mode="json"), to=room.code, namespace=NAMESPACE)

    async def event_error(sid: str, message: str):
        payload = {"message": message}
        await sio.emit("error", payload, to=sid, namespace=NAMESPACE)
        return {"error": message}

    async def active_membership(sid: str):
        session = await sio.get_session(sid, namespace=NAMESPACE)
        code = session.get("code")
        membership = await socket_membership(app.state.db, code, sid) if code else None
        if not membership:
            raise HTTPException(403, "Join the room first.")
        return session, code, membership

    @sio.on("connect", namespace=NAMESPACE)
    async def connect(sid, environ, auth):
        if not isinstance(auth, dict):
            raise socketio.exceptions.ConnectionRefusedError("Missing authentication token.")
        try:
            if isinstance(auth.get("hostToken"), str):
                user_id, guest_room = host_token_identity(auth["hostToken"])
                session = {"user": {"id": user_id, "username": GUEST_NAME}, "guestRoom": guest_room}
            elif isinstance(auth.get("token"), str):
                user = await find_user(app.state.db, token_user_id(auth["token"]))
                session = {"user": {"id": str(user["id"]), "username": user["username"]}}
            else:
                raise socketio.exceptions.ConnectionRefusedError("Missing authentication token.")
        except HTTPException as exc:
            raise socketio.exceptions.ConnectionRefusedError("Invalid or expired token.") from exc
        await sio.save_session(sid, session, namespace=NAMESPACE)

    @sio.on("joinLobby", namespace=NAMESPACE)
    async def join_lobby(sid, payload):
        try:
            code = normalize_code(JoinEvent.model_validate(payload).code)
            session = await sio.get_session(sid, namespace=NAMESPACE)
            previous_code = session.get("code")
            guest_room = session.get("guestRoom")
            if guest_room:
                if guest_room != code:
                    raise HTTPException(403, "This guest session belongs to a different room.")
                user = session["user"]
            else:
                user = await find_user(app.state.db, UUID(session["user"]["id"]))
            room = await join_room_member(app.state.db, code, user, sid, rejoin_only=bool(guest_room))
            if previous_code and previous_code != code:
                await sio.leave_room(sid, previous_code, namespace=NAMESPACE)
                await broadcast(await disconnect_member(app.state.db, previous_code, sid))
            await sio.enter_room(sid, code, namespace=NAMESPACE)
            session["code"] = code
            await sio.save_session(sid, session, namespace=NAMESPACE)
            await broadcast(room)
            return {"room": room.model_dump(mode="json")}
        except ValidationError:
            return await event_error(sid, "Enter a valid room code.")
        except HTTPException as exc:
            return await event_error(sid, exc.detail)

    @sio.on("leaveRoom", namespace=NAMESPACE)
    async def leave_room(sid):
        try:
            session, code, _ = await active_membership(sid)
            room = await leave_room_member(app.state.db, code, UUID(session["user"]["id"]), sid)
            await sio.leave_room(sid, code, namespace=NAMESPACE)
            session.pop("code", None)
            await sio.save_session(sid, session, namespace=NAMESPACE)
            await broadcast(room)
            return {"left": True}
        except HTTPException as exc:
            return await event_error(sid, exc.detail)

    @sio.on("disconnect", namespace=NAMESPACE)
    async def disconnect(sid, reason):
        session = await sio.get_session(sid, namespace=NAMESPACE)
        if code := session.get("code"):
            await broadcast(await disconnect_member(app.state.db, code, sid))

    @sio.on("launchRoom", namespace=NAMESPACE)
    async def launch(sid):
        try:
            session, code, _ = await active_membership(sid)
            room = await launch_room(app.state.db, code, UUID(session["user"]["id"]))
            await broadcast(room)
            await broadcast(room, event="roomLaunched")
        except HTTPException as exc:
            return await event_error(sid, exc.detail)

    @sio.on("chatMessage", namespace=NAMESPACE)
    async def chat(sid, payload):
        try:
            message = ChatEvent.model_validate(payload).message
            session, code, _ = await active_membership(sid)
            await sio.emit(
                "chatBroadcast",
                {"user": session["user"], "message": message, "timestamp": datetime.now(timezone.utc).isoformat()},
                to=code, namespace=NAMESPACE,
            )
        except ValidationError:
            return await event_error(sid, "Enter a message of up to 2,000 characters.")
        except HTTPException as exc:
            return await event_error(sid, exc.detail)

    @sio.on("crdtUpdate", namespace=NAMESPACE)
    async def crdt(sid, payload):
        try:
            changes = CrdtEvent.model_validate(payload).changes
            session, code, membership = await active_membership(sid)
            if membership["mode"] != RoomMode.COOP:
                raise HTTPException(403, "Editor updates are available in co-op rooms.")
            if membership["buffer_visibility"] != BufferVisibility.OPEN:
                raise HTTPException(403, "Editor sharing is disabled for this room.")
            await sio.emit(
                "crdtSync", {"user": session["user"], "changes": changes},
                to=code, skip_sid=sid, namespace=NAMESPACE,
            )
        except (HTTPException, ValidationError) as exc:
            return await event_error(sid, exc.detail if isinstance(exc, HTTPException) else "Invalid editor update.")

    @sio.on("telemetryUpdate", namespace=NAMESPACE)
    async def telemetry(sid, payload):
        try:
            update = TelemetryEvent.model_validate(payload).telemetry
            session, code, _ = await active_membership(sid)
            await sio.emit(
                "telemetryStream", {"user": session["user"], "telemetry": update},
                to=code, skip_sid=sid, namespace=NAMESPACE,
            )
        except (HTTPException, ValidationError) as exc:
            return await event_error(sid, exc.detail if isinstance(exc, HTTPException) else "Invalid telemetry update.")

    return socketio.ASGIApp(sio, other_asgi_app=app)
