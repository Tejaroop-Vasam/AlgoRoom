from fastapi import APIRouter

from .endpoints import health, problems, rooms, runner

router = APIRouter()
router.include_router(problems.router)
router.include_router(rooms.router)
router.include_router(runner.router)
router.include_router(health.router)
