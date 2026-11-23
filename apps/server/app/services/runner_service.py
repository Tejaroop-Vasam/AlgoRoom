import httpx
from fastapi import HTTPException
from pydantic import BaseModel, TypeAdapter, ValidationError

from app.db.database import SessionFactory
from app.models.problem import Problem
from app.schemas.runner import (
    ExecutionResultDto,
    ExecutionStatus,
    FormatCodeDto,
    FormatResultDto,
    Language,
    RunCodeDto,
    RunnerJob,
    SubmissionEvaluationResultDto,
    SubmissionVerdict,
    SubmitCodeDto,
    TestCaseEvaluationResultDto,
)
from app.services.problem_service import get_problem, get_test_cases, public_sample_cases


def assemble_code(problem: Problem, language: str, code: str) -> str:
    template = problem.code_templates.get(language) or {}
    driver = template.get("driverCode")
    if not driver:
        return code
    for placeholder in ("// __USER_CODE__", "# __USER_CODE__", "{{USER_CODE}}"):
        if placeholder in driver:
            return driver.replace(placeholder, code, 1)
    return f"{code}\n\n{driver}"


async def runner_request(client: httpx.AsyncClient, path: str, body: BaseModel):
    try:
        response = await client.post(path, json=body.model_dump(mode="json"))
        response.raise_for_status()
        return response.json()
    except httpx.HTTPStatusError as exc:
        if exc.response.status_code == 429:
            raise HTTPException(429, "The code runner is busy. Try again shortly.") from exc
        raise HTTPException(502, "The code runner could not complete the request") from exc
    except httpx.TimeoutException as exc:
        raise HTTPException(504, "The code runner timed out") from exc
    except (httpx.RequestError, ValueError) as exc:
        raise HTTPException(503, "The code runner is unavailable") from exc


async def execute(client: httpx.AsyncClient, language: Language, source: str, inputs: list[str], problem: Problem | None):
    try:
        job = RunnerJob(
            language=language, source=source, inputs=inputs,
            time_limit_ms=problem.time_limit_ms if problem else 2000,
            memory_limit_mb=problem.memory_limit_mb if problem else 256,
        )
    except ValidationError as exc:
        raise HTTPException(422, "The requested execution exceeds the runner limits") from exc
    raw = await runner_request(client, "/execute", job)
    try:
        results = TypeAdapter(list[ExecutionResultDto]).validate_python(raw)
    except ValidationError as exc:
        raise HTTPException(502, "The code runner returned an invalid result") from exc
    if len(results) != len(inputs):
        raise HTTPException(502, "The code runner returned an incomplete result")
    return results


async def run_code(body: RunCodeDto, db: SessionFactory, client: httpx.AsyncClient) -> ExecutionResultDto:
    problem = await get_problem(db, body.problemId) if body.problemId else None
    source = assemble_code(problem, body.language, body.code) if problem else body.code
    stdin = body.input
    if not stdin and problem and (samples := public_sample_cases(problem)):
        stdin = samples[0]["input"]
    result = (await execute(client, body.language, source, [stdin or ""], problem))[0]
    return result.model_copy(update={"stdout": normalize_output(result.stdout), "stderr": result.stderr.rstrip()})


def normalize_output(value: str) -> str:
    return "\n".join(line.rstrip() for line in value.replace("\r\n", "\n").split("\n")).strip()


async def submit_code(body: SubmitCodeDto, db: SessionFactory, client: httpx.AsyncClient) -> SubmissionEvaluationResultDto:
    problem = await get_problem(db, body.problemId)
    cases = await get_test_cases(problem)
    source = assemble_code(problem, body.language, body.code)
    runs = await execute(client, body.language, source, [case.input for case in cases], problem) if cases else []
    results = []
    for index, (case, run_result) in enumerate(zip(cases, runs, strict=True), start=1):
        actual = normalize_output(run_result.stdout)
        expected = normalize_output(case.expectedOutput)
        if run_result.status == ExecutionStatus.SUCCESS:
            verdict = SubmissionVerdict.ACCEPTED if actual == expected else SubmissionVerdict.WRONG_ANSWER
        else:
            verdict = SubmissionVerdict(run_result.status.value)
        results.append(TestCaseEvaluationResultDto(
            testCaseIndex=index, verdict=verdict, input="" if case.isHidden else case.input,
            expectedOutput="" if case.isHidden else expected, actualOutput="" if case.isHidden else actual,
            stderr="" if case.isHidden else run_result.stderr, executionTimeMs=run_result.executionTimeMs,
        ))
    passed_count = sum(result.verdict == SubmissionVerdict.ACCEPTED for result in results)
    return SubmissionEvaluationResultDto(
        passed=bool(results) and passed_count == len(results),
        totalCount=len(results), passedCount=passed_count, results=results,
    )


async def format_code(body: FormatCodeDto, client: httpx.AsyncClient) -> FormatResultDto:
    if not body.code.strip():
        return FormatResultDto(code=body.code, formatted=True)
    raw = await runner_request(client, "/format", body)
    try:
        return FormatResultDto.model_validate(raw)
    except ValidationError as exc:
        raise HTTPException(502, "The code runner returned an invalid formatting result") from exc
