from sqlalchemy import BigInteger, bindparam, func, or_, select
from sqlalchemy.orm import load_only

from app.db.database import SessionFactory
from app.models.problem import Problem


async def list_problems(
    db: SessionFactory, difficulty: str | None, search: str | None, page: int, limit: int,
) -> tuple[list[Problem], int]:
    filters = []
    if difficulty:
        filters.append(Problem.difficulty == difficulty)
    if search:
        pattern = f"%{search}%"
        filters.append(or_(Problem.title.ilike(pattern), Problem.description.ilike(pattern)))
    async with db() as session:
        total = (await session.execute(select(func.count(Problem.id)).where(*filters))).scalar_one()
        rows = await session.scalars(
            select(Problem)
            .options(load_only(Problem.id, Problem.title, Problem.difficulty, Problem.created_at, Problem.updated_at))
            .where(*filters)
            .order_by(Problem.created_at.desc(), Problem.id.desc())
            .limit(limit)
            .offset(bindparam("offset", (page - 1) * limit, type_=BigInteger))
        )
        return list(rows), total


async def find_problem(db: SessionFactory, problem_id: int) -> Problem | None:
    if not -2_147_483_648 <= problem_id <= 2_147_483_647:
        return None
    async with db() as session:
        return await session.get(Problem, problem_id)


async def count_problems(db: SessionFactory, problem_ids: list[int]) -> int:
    async with db() as session:
        result = await session.execute(select(func.count(Problem.id)).where(Problem.id.in_(problem_ids)))
        return result.scalar_one()
