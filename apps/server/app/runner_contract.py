from enum import StrEnum
from typing import Annotated

from pydantic import BaseModel, Field, StringConstraints

Source = Annotated[str, StringConstraints(max_length=65_536)]
Code = Annotated[str, StringConstraints(min_length=1, max_length=65_536)]
Stdin = Annotated[str, StringConstraints(max_length=131_072)]


class Language(StrEnum):
    PYTHON = "python"
    CPP = "cpp"
    JAVA = "java"


class FormatLanguage(StrEnum):
    PYTHON = "python"
    CPP = "cpp"
    JAVA = "java"
    JAVASCRIPT = "javascript"
    TYPESCRIPT = "typescript"


class ExecutionStatus(StrEnum):
    SUCCESS = "SUCCESS"
    TIME_LIMIT_EXCEEDED = "TIME_LIMIT_EXCEEDED"
    MEMORY_LIMIT_EXCEEDED = "MEMORY_LIMIT_EXCEEDED"
    COMPILE_ERROR = "COMPILE_ERROR"
    RUNTIME_ERROR = "RUNTIME_ERROR"


class SubmissionVerdict(StrEnum):
    ACCEPTED = "ACCEPTED"
    WRONG_ANSWER = "WRONG_ANSWER"
    TIME_LIMIT_EXCEEDED = "TIME_LIMIT_EXCEEDED"
    MEMORY_LIMIT_EXCEEDED = "MEMORY_LIMIT_EXCEEDED"
    COMPILE_ERROR = "COMPILE_ERROR"
    RUNTIME_ERROR = "RUNTIME_ERROR"


class RunCodeDto(BaseModel):
    language: Language
    code: Code
    problemId: Annotated[int, Field(gt=0, le=2_147_483_647)] | None = None
    input: Stdin | None = None


class SubmitCodeDto(BaseModel):
    language: Language
    code: Code
    problemId: Annotated[int, Field(gt=0, le=2_147_483_647)]


class FormatCodeDto(BaseModel):
    language: FormatLanguage
    code: Source


class FormatResultDto(BaseModel):
    code: str
    formatted: bool
    error: str | None = None


class ExecutionResultDto(BaseModel):
    status: ExecutionStatus
    stdout: str
    stderr: str
    executionTimeMs: int


class TestCaseEvaluationResultDto(BaseModel):
    testCaseIndex: int
    verdict: SubmissionVerdict
    input: str
    expectedOutput: str
    actualOutput: str
    stderr: str
    executionTimeMs: int


class SubmissionEvaluationResultDto(BaseModel):
    passed: bool
    totalCount: int
    passedCount: int
    results: list[TestCaseEvaluationResultDto]


class RunnerJob(BaseModel):
    language: Language
    source: Annotated[str, StringConstraints(max_length=262_144)]
    inputs: Annotated[list[Stdin], Field(max_length=100)]
    time_limit_ms: Annotated[int, Field(ge=1, le=10_000)]
    memory_limit_mb: Annotated[int, Field(ge=16, le=1024)]
