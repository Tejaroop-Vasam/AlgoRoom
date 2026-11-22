import asyncio
import logging
import os
import tempfile
import time
from dataclasses import dataclass
from pathlib import Path
from uuid import uuid4

from fastapi import FastAPI, HTTPException

from .errors import install_error_handlers
from .runner_contract import (
    ExecutionResultDto,
    ExecutionStatus,
    FormatCodeDto,
    FormatLanguage,
    FormatResultDto,
    Language,
    RunnerJob,
)

logger = logging.getLogger(__name__)
app = FastAPI(docs_url=None, redoc_url=None, openapi_url=None)
install_error_handlers(app)
slots = asyncio.Semaphore(2)
compile_slot = asyncio.Semaphore(1)
workspace_root = Path(os.getenv("RUNNER_WORKSPACE", "/tmp/algoroom-runner"))
output_limit = 512 * 1024


@dataclass(frozen=True)
class Toolchain:
    image: str
    filename: str
    command: tuple[str, ...]
    compile: tuple[str, ...] = ()


toolchains = {
    Language.PYTHON: Toolchain("algoroom-runner-python:latest", "solution.py", ("python3", "-B", "/workspace/solution.py")),
    Language.CPP: Toolchain(
        "algoroom-runner-cpp:latest", "solution.cpp", ("/workspace/solution",),
        ("g++", "-O2", "-std=c++20", "/workspace/solution.cpp", "-o", "/artifacts/solution"),
    ),
    Language.JAVA: Toolchain(
        "algoroom-runner-java:latest", "Solution.java",
        ("java", "-XX:+UseSerialGC", "-XX:ActiveProcessorCount=1", "-XX:MaxMetaspaceSize=64m",
         "-XX:CompressedClassSpaceSize=16m", "-XX:ReservedCodeCacheSize=16m",
         "-XX:MaxRAMPercentage=40", "-cp", "/workspace", "Solution"),
        ("javac", "-J-XX:+UseSerialGC", "-J-Xmx128m", "-d", "/artifacts", "/workspace/Solution.java"),
    ),
}

formatters = {
    FormatLanguage.PYTHON: ("ruff", "format", "--isolated", "--stdin-filename", "solution.py", "-"),
    FormatLanguage.CPP: ("clang-format", "--style=LLVM", "--assume-filename=solution.cpp"),
    FormatLanguage.JAVA: ("clang-format", "--style=LLVM", "--assume-filename=Solution.java"),
    FormatLanguage.JAVASCRIPT: ("prettier", "--no-config", "--no-editorconfig", "--parser", "babel"),
    FormatLanguage.TYPESCRIPT: ("prettier", "--no-config", "--no-editorconfig", "--parser", "typescript"),
}


class OutputLimitExceeded(Exception):
    pass


@dataclass
class ProcessResult:
    status: int
    stdout: str
    stderr: str
    elapsed_ms: int


async def read_output(stream: asyncio.StreamReader) -> bytes:
    output = bytearray()
    while chunk := await stream.read(8192):
        output.extend(chunk)
        if len(output) > output_limit:
            raise OutputLimitExceeded
    return bytes(output)


async def send_input(process: asyncio.subprocess.Process, stdin: str) -> None:
    try:
        process.stdin.write(stdin.encode())
        await process.stdin.drain()
        process.stdin.close()
        await process.stdin.wait_closed()
    except (BrokenPipeError, ConnectionResetError):
        pass


async def run_process(command: tuple[str, ...], stdin: str = "", timeout: float = 10) -> ProcessResult:
    started = time.monotonic()
    process = await asyncio.create_subprocess_exec(
        *command, stdin=asyncio.subprocess.PIPE, stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE,
    )
    tasks = [
        asyncio.create_task(read_output(process.stdout)), asyncio.create_task(read_output(process.stderr)),
        asyncio.create_task(send_input(process, stdin)), asyncio.create_task(process.wait()),
    ]
    try:
        stdout, stderr, _, status = await asyncio.wait_for(asyncio.gather(*tasks), timeout)
        return ProcessResult(status, stdout.decode(errors="replace"), stderr.decode(errors="replace"),
                             round((time.monotonic() - started) * 1000))
    finally:
        if process.returncode is None:
            try:
                process.kill()
            except ProcessLookupError:
                pass
        for task in tasks:
            task.cancel()
        await asyncio.gather(*tasks, return_exceptions=True)
        # Drain the OS pipes after cancellation so a noisy child cannot block cleanup.
        await asyncio.gather(process.stdout.read(), process.stderr.read(), process.wait())


async def sandbox(image: str, mounts: tuple[str, ...], command: tuple[str, ...],
                  memory_mb: int, timeout: float, stdin: str = "") -> ProcessResult:
    name = f"algoroom-job-{uuid4().hex}"
    docker = (
        "docker", "run", "--rm", "--name", name, "--interactive",
        "--pull=never", "--network=none", "--cap-drop=ALL",
        "--security-opt=no-new-privileges", "--user=1001:1001", "--read-only",
        "--memory", f"{memory_mb}m", "--memory-swap", f"{memory_mb}m",
        "--cpus=1", "--pids-limit=64", "--ulimit", "fsize=16777216:16777216",
        "--tmpfs", "/tmp:rw,noexec,nosuid,size=64m", "--log-driver=none",
        *mounts, image, *command,
    )
    try:
        result = await run_process(docker, stdin, timeout)
        if result.status in (125, 126, 127):
            logger.warning("Sandbox process exited with status %s", result.status)
        return result
    except (TimeoutError, OutputLimitExceeded, asyncio.CancelledError):
        try:
            await run_process(("docker", "rm", "-f", name), timeout=5)
        except (OSError, TimeoutError, OutputLimitExceeded):
            logger.warning("Could not remove sandbox %s", name)
        raise


def mount(path: Path, destination: str, *, readonly: bool = True) -> tuple[str, ...]:
    flags = ",readonly" if readonly else ""
    return "--mount", f"type=bind,src={path},dst={destination}{flags}"


def result(status: ExecutionStatus, *, stdout: str = "", stderr: str = "", elapsed: int = 0) -> ExecutionResultDto:
    return ExecutionResultDto(status=status, stdout=stdout, stderr=stderr, executionTimeMs=elapsed)


async def run_case(toolchain: Toolchain, files: Path, job: RunnerJob, stdin: str, remaining: float):
    if remaining <= 0:
        return result(ExecutionStatus.TIME_LIMIT_EXCEEDED, stderr="Execution budget exhausted")
    try:
        timeout = min(remaining, job.time_limit_ms / 1000 + 3)
        seconds = f"{job.time_limit_ms / 1000:.3f}s"
        command = toolchain.command
        if job.language == Language.JAVA and (files / "__Driver.class").is_file():
            command = (*command[:-1], "__Driver")
        run = await sandbox(
            toolchain.image, mount(files, "/workspace"),
            ("timeout", "--kill-after=1s", seconds, *command),
            job.memory_limit_mb, timeout, stdin,
        )
    except TimeoutError:
        return result(ExecutionStatus.TIME_LIMIT_EXCEEDED, stderr="Execution timed out", elapsed=job.time_limit_ms)
    except OutputLimitExceeded:
        return result(ExecutionStatus.RUNTIME_ERROR, stderr="Output limit exceeded")
    if run.status == 125:
        raise HTTPException(503, "Sandbox could not start")
    status = {
        0: ExecutionStatus.SUCCESS,
        124: ExecutionStatus.TIME_LIMIT_EXCEEDED,
        137: ExecutionStatus.MEMORY_LIMIT_EXCEEDED,
    }.get(run.status, ExecutionStatus.RUNTIME_ERROR)
    return result(status, stdout=run.stdout[:65_536], stderr=run.stderr[:65_536], elapsed=run.elapsed_ms)


async def evaluate(job: RunnerJob) -> list[ExecutionResultDto]:
    toolchain = toolchains[job.language]
    deadline = time.monotonic() + 70
    workspace_root.mkdir(parents=True, exist_ok=True, mode=0o700)
    with tempfile.TemporaryDirectory(dir=workspace_root) as directory:
        work = Path(directory)
        source = work / "source"
        source.mkdir(mode=0o755)
        filename = source / toolchain.filename
        filename.write_text(job.source, encoding="utf-8")
        filename.chmod(0o644)
        files = source
        if toolchain.compile:
            files = work / "artifacts"
            files.mkdir(mode=0o777)
            files.chmod(0o777)
            try:
                async with compile_slot:
                    compile_result = await sandbox(
                        toolchain.image,
                        (*mount(source, "/workspace"), *mount(files, "/artifacts", readonly=False)),
                        toolchain.compile, memory_mb=512, timeout=15,
                    )
            except TimeoutError:
                return [result(ExecutionStatus.COMPILE_ERROR, stderr="Compilation timed out")] * len(job.inputs)
            except OutputLimitExceeded:
                return [result(ExecutionStatus.COMPILE_ERROR, stderr="Compiler output limit exceeded")] * len(job.inputs)
            if compile_result.status == 125:
                raise HTTPException(503, "Sandbox could not start")
            if compile_result.status:
                return [result(ExecutionStatus.COMPILE_ERROR, stderr=compile_result.stderr[:65_536])] * len(job.inputs)
        return [
            await run_case(toolchain, files, job, stdin, deadline - time.monotonic())
            for stdin in job.inputs
        ]


@app.post("/execute")
async def execute(job: RunnerJob) -> list[ExecutionResultDto]:
    if slots.locked():
        raise HTTPException(429, "The code runner is busy")
    async with slots:
        return await evaluate(job)


@app.post("/format", response_model_exclude_none=True)
async def format_code(body: FormatCodeDto) -> FormatResultDto:
    if slots.locked():
        raise HTTPException(429, "The code runner is busy")
    async with slots:
        try:
            run = await run_process(formatters[body.language], body.code)
        except (OSError, TimeoutError, OutputLimitExceeded):
            return FormatResultDto(code=body.code, formatted=False, error="Formatting failed")
    if run.status:
        return FormatResultDto(code=body.code, formatted=False, error=run.stderr.strip()[:2000] or "Formatting failed")
    return FormatResultDto(code=run.stdout, formatted=True)


@app.get("/health/ready")
async def ready():
    try:
        images = tuple(toolchain.image for toolchain in toolchains.values())
        result = await run_process(("docker", "image", "inspect", "--format", "{{.Id}}", *images), timeout=2)
    except (OSError, TimeoutError, OutputLimitExceeded) as exc:
        raise HTTPException(503, "Docker is unavailable") from exc
    if result.status:
        raise HTTPException(503, "Sandbox images are unavailable")
    return {"status": "ready"}
