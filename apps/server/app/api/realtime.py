import asyncio
import re
from datetime import datetime, timezone
from typing import Annotated

import socketio
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field, StringConstraints, ValidationError
from redis.exceptions import RedisError

from app.core.security import GUEST_TOKEN_PATTERN, guest_id
from app.schemas.room import ProblemIds, RoomMode, RoomStatus, StoredRoom, UpdateRoomSettingsDto
from app.services.room_service import normalize_code

NAMESPACE = "/rooms"


class JoinEvent(BaseModel):
    code: Annotated[str, StringConstraints(strip_whitespace=True, min_length=6, max_length=6)]


class ChatEvent(BaseModel):
    message: Annotated[str, StringConstraints(strip_whitespace=True, min_length=1, max_length=2000)]


class ReorderProblemsEvent(BaseModel):
    problemIds: ProblemIds


DocId = Annotated[str, StringConstraints(pattern=r"^[1-9][0-9]{0,8}:(python|cpp|java)$")]
CollabPayload = Annotated[str, StringConstraints(min_length=1, max_length=200_000)]


class CollabJoinEvent(BaseModel):
    doc: DocId


class CollabUpdateEvent(BaseModel):
    doc: DocId
    update: CollabPayload


class CollabCompactEvent(BaseModel):
    doc: DocId
    upto: Annotated[int, Field(ge=1)]
    snapshot: CollabPayload


class CollabCursorEvent(BaseModel):
    doc: DocId
    anchor: dict | None = None
    head: dict | None = None


def create_socket_server(app: FastAPI, origins: list[str]) -> socketio.ASGIApp:
    sio = socketio.AsyncServer(
        async_mode="asgi", cors_allowed_origins=origins, max_http_buffer_size=256_000,
    )

    async def broadcast(room: StoredRoom):
        payload = app.state.rooms.public_room(room).model_dump(mode="json")
        await sio.emit("roomStateUpdated", payload, to=room.code, namespace=NAMESPACE)

    app.state.broadcast_room = broadcast
    race_deadlines: dict[str, asyncio.Task] = {}

    async def finish_at_deadline(code: str, ends_at: datetime):
        try:
            await asyncio.sleep(max(0.0, (ends_at - datetime.now(timezone.utc)).total_seconds()))
            room = await app.state.rooms.finish_if_expired(code)
            if room:
                await broadcast(room)
        except RedisError:
            sio.logger.warning("Could not finish race %s at its deadline", code)
        finally:
            race_deadlines.pop(code, None)

    def schedule_deadline(room: StoredRoom):
        if room.status == RoomStatus.IN_PROGRESS and room.ends_at and room.code not in race_deadlines:
            race_deadlines[room.code] = asyncio.create_task(finish_at_deadline(room.code, room.ends_at))

    async def event_error(sid: str, message: str):
        payload = {"message": message}
        await sio.emit("error", payload, to=sid, namespace=NAMESPACE)
        return {"error": message}

    async def joined_session(sid: str) -> dict:
        session = await sio.get_session(sid, namespace=NAMESPACE)
        if not session.get("code"):
            raise HTTPException(403, "Join the room first.")
        return session

    def doc_room(code: str, doc: str) -> str:
        return f"{code}/doc/{doc}"

    async def collab_session(sid: str, doc: str) -> dict:
        session = await joined_session(sid)
        if session.get("collab", {}).get("doc") != doc:
            raise HTTPException(409, "Open the shared editor first.")
        return session

    async def leave_doc(sid: str, session: dict):
        current = session.pop("collab", None)
        if not current:
            return
        await sio.leave_room(sid, doc_room(session["code"], current["doc"]), namespace=NAMESPACE)
        await sio.emit(
            "collabCursor", {"doc": current["doc"], "user": current["user"], "left": True},
            to=doc_room(session["code"], current["doc"]), namespace=NAMESPACE,
        )

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
                await leave_doc(sid, session)
                await sio.leave_room(sid, previous_code, namespace=NAMESPACE)
                previous_room = await store.disconnect(previous_code, sid)
                if previous_room:
                    await broadcast(previous_room)
            await sio.enter_room(sid, code, namespace=NAMESPACE)
            session["code"] = code
            await sio.save_session(sid, session, namespace=NAMESPACE)
            await broadcast(room)
            schedule_deadline(room)
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
            await leave_doc(sid, session)
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
                await leave_doc(sid, session)
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
            schedule_deadline(room)
        except HTTPException as exc:
            return await event_error(sid, exc.detail)
        except RedisError:
            return await event_error(sid, "Room storage is unavailable.")

    @sio.on("finishActivity", namespace=NAMESPACE)
    async def finish_activity(sid):
        try:
            code = (await joined_session(sid))["code"]
            room = await app.state.rooms.finish_activity(code, sid)
            await broadcast(room)
            return {"finished": True}
        except HTTPException as exc:
            return await event_error(sid, exc.detail)
        except RedisError:
            return await event_error(sid, "Room storage is unavailable.")

    @sio.on("endRace", namespace=NAMESPACE)
    async def end_race(sid):
        try:
            code = (await joined_session(sid))["code"]
            room = await app.state.rooms.end_race(code, sid)
            await broadcast(room)
            return {"ended": room.status == RoomStatus.FINISHED}
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

    @sio.on("updateSettings", namespace=NAMESPACE)
    async def update_settings(sid, payload):
        try:
            settings = UpdateRoomSettingsDto.model_validate(payload)
            code = (await joined_session(sid))["code"]
            room = await app.state.rooms.update_settings(code, sid, settings)
            await broadcast(room)
            return {"updated": True}
        except ValidationError:
            return await event_error(sid, "Check the room settings and try again.")
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

    @sio.on("collabJoin", namespace=NAMESPACE)
    async def collab_join(sid, payload):
        try:
            doc = CollabJoinEvent.model_validate(payload).doc
            session = await joined_session(sid)
            code = session["code"]
            member = await app.state.rooms.active_member(code, sid)
            room = await app.state.rooms.get(code)
            if room.mode != RoomMode.COOP:
                raise HTTPException(409, "Shared editing is only available in co-op rooms.")
            if int(doc.split(":")[0]) not in room.problem_ids:
                raise HTTPException(404, "That problem is not part of this room.")
            if session.get("collab", {}).get("doc") != doc:
                await leave_doc(sid, session)
                session["collab"] = {"doc": doc, "user": {"id": member.id, "username": member.username}}
                await sio.save_session(sid, session, namespace=NAMESPACE)
                await sio.enter_room(sid, doc_room(code, doc), namespace=NAMESPACE)
            updates, seed = await app.state.collab.load(code, doc)
            return {"updates": updates, "seed": seed, "userId": member.id, "username": member.username}
        except ValidationError:
            return await event_error(sid, "Choose a valid problem and language.")
        except HTTPException as exc:
            return await event_error(sid, exc.detail)
        except RedisError:
            return await event_error(sid, "Room storage is unavailable.")

    @sio.on("collabLeave", namespace=NAMESPACE)
    async def collab_leave(sid):
        session = await sio.get_session(sid, namespace=NAMESPACE)
        if session.get("code"):
            await leave_doc(sid, session)
            await sio.save_session(sid, session, namespace=NAMESPACE)
        return {"left": True}

    @sio.on("collabUpdate", namespace=NAMESPACE)
    async def collab_update(sid, payload):
        try:
            event = CollabUpdateEvent.model_validate(payload)
            code = (await collab_session(sid, event.doc))["code"]
            await app.state.collab.append(code, event.doc, event.update)
            await sio.emit(
                "collabUpdate", {"doc": event.doc, "update": event.update},
                to=doc_room(code, event.doc), skip_sid=sid, namespace=NAMESPACE,
            )
            return {"stored": True}
        except ValidationError:
            return await event_error(sid, "That edit could not be shared.")
        except HTTPException as exc:
            return await event_error(sid, exc.detail)
        except RedisError:
            return await event_error(sid, "Room storage is unavailable.")

    @sio.on("collabCompact", namespace=NAMESPACE)
    async def collab_compact(sid, payload):
        try:
            event = CollabCompactEvent.model_validate(payload)
            code = (await collab_session(sid, event.doc))["code"]
            await app.state.collab.compact(code, event.doc, event.upto, event.snapshot)
            return {"compacted": True}
        except (ValidationError, HTTPException, RedisError):
            return {"compacted": False}

    @sio.on("collabCursor", namespace=NAMESPACE)
    async def collab_cursor(sid, payload):
        try:
            event = CollabCursorEvent.model_validate(payload)
            session = await collab_session(sid, event.doc)
        except (ValidationError, HTTPException):
            return
        await sio.emit(
            "collabCursor",
            {"doc": event.doc, "user": session["collab"]["user"], "anchor": event.anchor, "head": event.head},
            to=doc_room(session["code"], event.doc), skip_sid=sid, namespace=NAMESPACE,
        )

    return socketio.ASGIApp(sio, other_asgi_app=app)
