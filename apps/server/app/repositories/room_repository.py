from collections.abc import Callable

from redis.asyncio import Redis

from app.schemas.room import StoredRoom

KEY_PREFIX = "algoroom:rooms:v1"
ROOM_SEQUENCE = f"{KEY_PREFIX}:sequence"
ROOM_TTL_SECONDS = 7200


def room_key(code: str) -> str:
    return f"{KEY_PREFIX}:room:{code}"


class RoomRepository:
    def __init__(self, client: Redis):
        self.client = client

    async def next_id(self) -> int:
        return await self.client.incr(ROOM_SEQUENCE)

    async def insert(self, room: StoredRoom) -> bool:
        return bool(await self.client.set(
            room_key(room.code), room.model_dump_json(), ex=ROOM_TTL_SECONDS, nx=True,
        ))

    async def get(self, code: str) -> StoredRoom | None:
        raw = await self.client.get(room_key(code))
        return StoredRoom.model_validate_json(raw) if raw is not None else None

    async def update(
        self, code: str, change: Callable[[StoredRoom], bool],
    ) -> tuple[StoredRoom, bool] | None:
        key = room_key(code)

        async def write(pipe):
            raw = await pipe.get(key)
            pipe.multi()
            if raw is None:
                return None
            room = StoredRoom.model_validate_json(raw)
            changed = change(room)
            if changed:
                if room.members:
                    pipe.set(key, room.model_dump_json(), ex=ROOM_TTL_SECONDS)
                else:
                    pipe.delete(key)
            return room, changed

        return await self.client.transaction(write, key, value_from_callable=True)
