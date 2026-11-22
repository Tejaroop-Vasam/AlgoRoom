from http import HTTPStatus

from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from starlette.exceptions import HTTPException


class ValidationErrorDto(BaseModel):
    statusCode: int
    message: list[str]
    error: str


def install_error_handlers(app: FastAPI) -> None:
    @app.exception_handler(HTTPException)
    async def http_error(request: Request, exc: HTTPException):
        return JSONResponse(
            status_code=exc.status_code,
            content={
                "statusCode": exc.status_code,
                "message": [exc.detail] if exc.status_code == 422 else exc.detail,
                "error": HTTPStatus(exc.status_code).phrase,
            },
            headers=exc.headers,
        )

    @app.exception_handler(RequestValidationError)
    async def validation_error(request: Request, exc: RequestValidationError):
        messages = [
            f"{'.'.join(map(str, error['loc'][1:])) or error['loc'][0]}: {error['msg']}"
            for error in exc.errors()
        ]
        return JSONResponse(
            status_code=422,
            content={"statusCode": 422, "message": messages, "error": "Validation Error"},
        )
