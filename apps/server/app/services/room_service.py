import secrets
from collections.abc import Callable
from datetime import datetime, timezone

from fastapi import HTTPException

from app.core.security import guest_id
from app.db.database import SessionFactory
from app.repositories.problem_repository import count_problems
from app.repositories.room_repository import RoomRepository
from app.schemas.room import (
    CreateRoomDto,
    ProblemTelemetryDto,
    RoomDto,
    RoomMember,
    RoomParticipantDto,
    RoomPreviewDto,
    RoomSettingsDto,
    RoomStatus,
    StoredRoom,
)
from app.schemas.runner import ExecutionResultDto, ExecutionStatus, SubmissionEvaluationResultDto, SubmissionVerdict

CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"


def normalize_code(code: str) -> str:
    return code.strip().upper()


class RoomService:
    def __init__(self, repository: RoomRepository):
        self.repository = repository

    @staticmethod
    def public_room(room: StoredRoom) -> RoomDto:
        participants = [
            RoomParticipantDto(
                id=member.id,
                username=member.username,
                isHost=member.id == room.host_id,
                online=bool(member.socket_id),
                telemetry=member.telemetry,
            )
            for member in room.members
        ]
        host = next((member for member in participants if member.isHost), None)
        return RoomDto(
            id=room.id,
            code=room.code,
            name=room.name,
            mode=room.mode,
            status=room.status,
            host=host or RoomParticipantDto(id=room.host_id, username="Unknown", isHost=True, online=False),
            participants=participants,
            problemIds=room.problem_ids,
            settings=room.settings,
            createdAt=room.created_at,
        )

    async def create(self, body: CreateRoomDto, token: str, db: SessionFactory) -> StoredRoom:
        if await count_problems(db, body.problemIds) != len(body.problemIds):
            raise HTTPException(400, "Select distinct problems from the catalog.")
        room_id = await self.repository.next_id()
        for _ in range(10):
            code = "".join(secrets.choice(CODE_ALPHABET) for _ in range(6))
            host_id = guest_id(code, token)
            room = StoredRoom(
                id=room_id,
                code=code,
                name=body.name,
                mode=body.mode,
                status=RoomStatus.LOBBY,
                host_id=host_id,
                problem_ids=body.problemIds,
                settings=RoomSettingsDto(maxParticipants=body.maxParticipants),
                created_at=datetime.now(timezone.utc),
                members=[RoomMember(id=host_id, username=body.playerName)],
            )
            if await self.repository.insert(room):
                return room
        raise HTTPException(503, "Could not create a room code. Please try again.")

    async def get(self, code: str) -> StoredRoom:
        room = await self.repository.get(normalize_code(code))
        if room is None:
            raise HTTPException(404, f'Room with code "{code}" not found.')
        return room

    async def preview(self, code: str, token: str) -> RoomPreviewDto:
        room = self.public_room(await self.get(code))
        participant_id = guest_id(room.code, token)
        return RoomPreviewDto(
            code=room.code, name=room.name, mode=room.mode, status=room.status,
            hostName=room.host.username, participantCount=len(room.participants),
            maxParticipants=room.settings.maxParticipants, problemCount=len(room.problemIds),
            isMember=any(participant.id == participant_id for participant in room.participants),
        )

    async def join(
        self, code: str, token: str, *, username: str | None = None, sid: str | None = None,
    ) -> StoredRoom:
        participant_id = guest_id(normalize_code(code), token)

        def change(room: StoredRoom) -> bool:
            member = next((candidate for candidate in room.members if candidate.id == participant_id), None)
            if member is None:
                if username is None:
                    raise HTTPException(403, "Enter your name to join the room.")
                if len(room.members) >= room.settings.maxParticipants:
                    raise HTTPException(400, "This room is full.")
                member = RoomMember(id=participant_id, username=username)
                room.members.append(member)
            elif username is not None:
                member.username = username
            if sid:
                member.socket_id = sid
            return True

        room, _ = await self._update(code, change)
        return room

    async def disconnect(self, code: str, sid: str) -> StoredRoom | None:
        def change(room: StoredRoom) -> bool:
            member = self._socket_member(room, sid)
            if member is None:
                return False
            member.socket_id = None
            return True

        result = await self.repository.update(normalize_code(code), change)
        if result is None:
            return None
        room, changed = result
        return room if changed else None

    async def leave(self, code: str, sid: str) -> StoredRoom | None:
        def change(room: StoredRoom) -> bool:
            member = self._require_socket_member(room, sid)
            room.members.remove(member)
            if room.members and room.host_id == member.id:
                successor = next((candidate for candidate in room.members if candidate.socket_id), room.members[0])
                room.host_id = successor.id
            return True

        room, _ = await self._update(code, change)
        return room if room.members else None

    async def launch(self, code: str, sid: str) -> StoredRoom:
        def change(room: StoredRoom) -> bool:
            member = self._require_socket_member(room, sid)
            if room.host_id != member.id:
                raise HTTPException(403, "Only the host can start the room.")
            if room.status != RoomStatus.LOBBY:
                return False
            room.status = RoomStatus.IN_PROGRESS
            return True

        room, _ = await self._update(code, change)
        return room

    async def reorder_problems(self, code: str, sid: str, problem_ids: list[int]) -> StoredRoom:
        def change(room: StoredRoom) -> bool:
            member = self._require_socket_member(room, sid)
            if room.host_id != member.id:
                raise HTTPException(403, "Only the host can change the problem order.")
            if room.status != RoomStatus.LOBBY:
                raise HTTPException(409, "The problem order is locked once the room starts.")
            if sorted(problem_ids) != sorted(room.problem_ids):
                raise HTTPException(400, "Use the same problems when changing their order.")
            room.problem_ids = problem_ids
            return True

        room, _ = await self._update(code, change)
        return room

    async def active_member(self, code: str, sid: str) -> RoomMember:
        return self._require_socket_member(await self.get(code), sid)

    async def record_attempt(
        self, code: str, token: str, problem_id: int, result: ExecutionResultDto | SubmissionEvaluationResultDto,
    ) -> StoredRoom | None:
        code = normalize_code(code)
        participant_id = guest_id(code, token)

        def change(room: StoredRoom) -> bool:
            if room.status != RoomStatus.IN_PROGRESS or problem_id not in room.problem_ids:
                return False
            member = next((member for member in room.members if member.id == participant_id), None)
            if member is None:
                return False

            stats = member.telemetry.setdefault(problem_id, ProblemTelemetryDto())
            if isinstance(result, ExecutionResultDto):
                stats.runs += 1
                stats.status = result.status
                stats.executionTimeMs = result.executionTimeMs
                verdicts = {result.status}
            else:
                stats.submissions += 1
                if result.totalCount and result.passedCount * stats.totalTests >= stats.passedTests * result.totalCount:
                    stats.passedTests = result.passedCount
                    stats.totalTests = result.totalCount
                stats.status = SubmissionVerdict.ACCEPTED if result.passed else next(
                    (case.verdict for case in result.results if case.verdict != SubmissionVerdict.ACCEPTED),
                    SubmissionVerdict.WRONG_ANSWER,
                )
                stats.executionTimeMs = sum(case.executionTimeMs for case in result.results)
                verdicts = {case.verdict for case in result.results}

            stats.compileErrors += int(ExecutionStatus.COMPILE_ERROR in verdicts)
            stats.runtimeErrors += int(ExecutionStatus.RUNTIME_ERROR in verdicts)
            return True

        updated = await self.repository.update(code, change)
        return updated[0] if updated is not None and updated[1] else None

    async def _update(self, code: str, change: Callable[[StoredRoom], bool]) -> tuple[StoredRoom, bool]:
        result = await self.repository.update(normalize_code(code), change)
        if result is None:
            raise HTTPException(404, f'Room with code "{code}" not found.')
        return result

    @staticmethod
    def _socket_member(room: StoredRoom, sid: str) -> RoomMember | None:
        return next((member for member in room.members if member.socket_id == sid), None)

    def _require_socket_member(self, room: StoredRoom, sid: str) -> RoomMember:
        member = self._socket_member(room, sid)
        if member is None:
            raise HTTPException(403, "Join the room first.")
        return member
