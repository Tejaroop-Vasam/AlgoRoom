from redis.asyncio import Redis

from app.repositories.room_repository import KEY_PREFIX, ROOM_TTL_SECONDS

SEED_LOCK_SECONDS = 10


def doc_key(code: str, doc: str) -> str:
    return f"{KEY_PREFIX}:doc:{code}:{doc}"


class CollabService:
    def __init__(self, client: Redis):
        self.client = client

    async def load(self, code: str, doc: str) -> tuple[list[str], bool]:
        key = doc_key(code, doc)
        updates = await self.client.lrange(key, 0, -1)
        seed = False
        if not updates:
            seed = bool(await self.client.set(f"{key}:seed", "1", ex=SEED_LOCK_SECONDS, nx=True))
        return updates, seed

    async def append(self, code: str, doc: str, update: str) -> None:
        key = doc_key(code, doc)
        async with self.client.pipeline(transaction=True) as pipe:
            pipe.rpush(key, update)
            pipe.expire(key, ROOM_TTL_SECONDS)
            await pipe.execute()

    async def compact(self, code: str, doc: str, upto: int, snapshot: str) -> None:
        key = doc_key(code, doc)

        async def replace(pipe):
            length = await pipe.llen(key)
            pipe.multi()
            if upto <= length:
                pipe.ltrim(key, upto, -1)
                pipe.lpush(key, snapshot)
                pipe.expire(key, ROOM_TTL_SECONDS)

        await self.client.transaction(replace, key)
