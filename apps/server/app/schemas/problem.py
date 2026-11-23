from datetime import datetime
from enum import StrEnum

from pydantic import BaseModel


class Difficulty(StrEnum):
    EASY = "EASY"
    MEDIUM = "MEDIUM"
    HARD = "HARD"


class SampleTestCaseDto(BaseModel):
    id: int | None = None
    input: str
    expectedOutput: str
    explanation: str | None = None


class StoredCase(SampleTestCaseDto):
    isHidden: bool = False


class ProblemListItemDto(BaseModel):
    id: int
    title: str
    difficulty: Difficulty
    createdAt: datetime
    updatedAt: datetime


class ProblemsListResponseDto(BaseModel):
    problems: list[ProblemListItemDto]
    total: int
    page: int
    limit: int
    totalPages: int


class ProblemDetailResponseDto(ProblemListItemDto):
    description: str
    constraints: list[str]
    hints: list[str]
    sampleTestCases: list[SampleTestCaseDto]
    starterTemplates: dict[str, str]
    starterCodes: dict[str, str]
    timeLimitMs: int
    memoryLimitMb: int
