import re
from datetime import datetime, timedelta, timezone
from typing import Annotated
from uuid import UUID

import bcrypt
import jwt
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from google.auth import exceptions as google_errors
from google.auth.transport.requests import Request as GoogleRequest
from google.oauth2 import id_token
from psycopg import errors as pg_errors
from pydantic import BaseModel, EmailStr, Field
from starlette.concurrency import run_in_threadpool

from .config import get_settings
from .db import Database

router = APIRouter(tags=["Users"])
bearer = HTTPBearer(auto_error=False)
USERNAME = r"^[a-zA-Z0-9_]+$"


class LoginUserDto(BaseModel):
    email: Annotated[EmailStr, Field(max_length=300)]
    password: Annotated[str, Field(min_length=1, max_length=1024)]


class RegisterUserDto(LoginUserDto):
    username: Annotated[str, Field(pattern=USERNAME, max_length=50)]
    password: Annotated[str, Field(min_length=8, max_length=1024)]


class UpdateUserDto(BaseModel):
    username: Annotated[str, Field(pattern=USERNAME, max_length=50)] | None = None
    email: Annotated[EmailStr, Field(max_length=300)] | None = None


class ChangePasswordDto(BaseModel):
    oldPassword: Annotated[str, Field(min_length=1, max_length=1024)]
    newPassword: Annotated[str, Field(min_length=8, max_length=1024)]


class GoogleOAuthDto(BaseModel):
    token: Annotated[str, Field(min_length=1, max_length=8192)]


class UserProfileDto(BaseModel):
    id: UUID
    username: str
    email: str
    is_admin: bool
    google_id: str | None
    created_at: datetime
    updated_at: datetime


class ProfileResponseDto(BaseModel):
    user: UserProfileDto


class MessageDto(BaseModel):
    message: str


class UserResultDto(ProfileResponseDto, MessageDto):
    pass


class AuthResultDto(UserResultDto):
    token: str


def issue_token(user: dict) -> str:
    now = datetime.now(timezone.utc)
    return jwt.encode(
        {
            "id": str(user["id"]),
            "email": user["email"],
            "is_admin": user["is_admin"],
            "iat": now,
            "exp": now + timedelta(days=1),
        },
        get_settings().jwt_secret,
        algorithm="HS256",
    )


def token_user_id(token: str) -> UUID:
    secret = get_settings().jwt_secret
    if not secret:
        raise HTTPException(503, "Authentication is unavailable")
    try:
        claims = jwt.decode(token, secret, algorithms=["HS256"], options={"require": ["exp"]})
        return UUID(claims["id"])
    except (jwt.InvalidTokenError, KeyError, ValueError, TypeError, AttributeError) as exc:
        raise HTTPException(401, "Invalid or expired token", {"WWW-Authenticate": "Bearer"}) from exc


async def find_user(db: Database, user_id: UUID) -> dict:
    async with db.connection() as conn:
        user = await (await conn.execute("SELECT * FROM users WHERE id = %s", (user_id,))).fetchone()
    if not user:
        raise HTTPException(404, "User not found")
    return user


def current_user_id(
    credentials: Annotated[HTTPAuthorizationCredentials | None, Depends(bearer)],
) -> UUID:
    if not credentials:
        raise HTTPException(401, "Authorization header missing or malformed", {"WWW-Authenticate": "Bearer"})
    return token_user_id(credentials.credentials)


UserId = Annotated[UUID, Depends(current_user_id)]


async def current_user(user_id: UserId, db: Database) -> dict:
    return await find_user(db, user_id)


CurrentUser = Annotated[dict, Depends(current_user)]


def bcrypt_input(password: str) -> bytes:
    # Match Node bcrypt's treatment of passwords longer than 72 bytes.
    return password.encode("utf-8")[:72]


async def password_hash(password: str) -> str:
    return (await run_in_threadpool(bcrypt.hashpw, bcrypt_input(password), bcrypt.gensalt(rounds=10))).decode()


async def password_matches(password: str, encoded_hash: str | None) -> bool:
    return bool(encoded_hash and await run_in_threadpool(
        bcrypt.checkpw, bcrypt_input(password), encoded_hash.encode()
    ))


@router.post("/register", operation_id="UsersController_register", status_code=201)
async def register(body: RegisterUserDto, db: Database) -> UserResultDto:
    encoded_hash = await password_hash(body.password)
    try:
        async with db.connection() as conn:
            user = await (await conn.execute(
                "INSERT INTO users (username, email, hpassword) VALUES (%s, %s, %s) RETURNING *",
                (body.username, body.email.lower(), encoded_hash),
            )).fetchone()
    except pg_errors.UniqueViolation as exc:
        raise HTTPException(400, "User already exists!") from exc
    return {"message": "User registered successfully!", "user": user}


@router.post("/login", operation_id="UsersController_login", status_code=201)
async def login(body: LoginUserDto, db: Database) -> AuthResultDto:
    async with db.connection() as conn:
        user = await (await conn.execute("SELECT * FROM users WHERE email = %s", (body.email.lower(),))).fetchone()
    if not user or not await password_matches(body.password, user["hpassword"]):
        raise HTTPException(400, "Invalid email or password!")
    return {"message": "User logged in successfully!", "token": issue_token(user), "user": user}


@router.get("/profile", operation_id="UsersController_profile")
async def profile(user: CurrentUser) -> ProfileResponseDto:
    return {"user": user}


@router.put("/update", operation_id="UsersController_update")
async def update(body: UpdateUserDto, user_id: UserId, db: Database) -> UserResultDto:
    if body.username is None and body.email is None:
        raise HTTPException(400, "No valid fields to update")
    try:
        async with db.connection() as conn:
            user = await (await conn.execute(
                """
                UPDATE users SET username = COALESCE(%s, username), email = COALESCE(%s, email),
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = %s RETURNING *
                """,
                (body.username, body.email.lower() if body.email else None, user_id),
            )).fetchone()
    except pg_errors.UniqueViolation as exc:
        raise HTTPException(400, "Email is already in use by another user") from exc
    if not user:
        raise HTTPException(404, "User not found")
    return {"message": "User updated successfully!", "user": user}


@router.put("/change-password", operation_id="UsersController_changePassword")
async def change_password(body: ChangePasswordDto, user: CurrentUser, db: Database) -> MessageDto:
    if bcrypt_input(body.oldPassword) == bcrypt_input(body.newPassword):
        raise HTTPException(400, "New password must be different from old password")
    if not user["hpassword"]:
        raise HTTPException(404, "User not found")
    if not await password_matches(body.oldPassword, user["hpassword"]):
        raise HTTPException(400, "Old password is incorrect!")
    encoded_hash = await password_hash(body.newPassword)
    async with db.connection() as conn:
        result = await conn.execute(
            "UPDATE users SET hpassword = %s, updated_at = CURRENT_TIMESTAMP WHERE id = %s AND hpassword = %s",
            (encoded_hash, user["id"], user["hpassword"]),
        )
        if not result.rowcount:
            raise HTTPException(409, "Password changed. Please try again.")
    return {"message": "Password changed successfully!"}


@router.post("/google-oauth", operation_id="UsersController_googleOAuth", status_code=201)
async def google_oauth(body: GoogleOAuthDto, db: Database) -> AuthResultDto:
    audience = get_settings().google_client_id
    if not audience:
        raise HTTPException(503, "Google sign-in is unavailable")
    try:
        claims = await run_in_threadpool(
            id_token.verify_oauth2_token, body.token, GoogleRequest(), audience=audience
        )
    except (ValueError, google_errors.GoogleAuthError) as exc:
        raise HTTPException(400, "Invalid Google token") from exc
    google_id = claims.get("sub")
    email = claims.get("email", "").strip().lower()
    if not google_id or not email or not claims.get("email_verified"):
        raise HTTPException(400, "Invalid Google token")
    username = re.sub(r"\W+", "_", claims.get("name", "").lower(), flags=re.ASCII).strip("_")
    username = (username or f"user_{google_id[:6]}")[:50]
    try:
        async with db.connection() as conn:
            user = await (await conn.execute("SELECT * FROM users WHERE google_id = %s", (google_id,))).fetchone()
            if not user:
                user = await (await conn.execute(
                    """
                    INSERT INTO users (username, email, google_id) VALUES (%s, %s, %s)
                    ON CONFLICT (email) DO UPDATE
                    SET google_id = EXCLUDED.google_id, updated_at = CURRENT_TIMESTAMP
                    WHERE users.google_id IS NULL OR users.google_id = EXCLUDED.google_id
                    RETURNING *
                    """,
                    (username, email, google_id),
                )).fetchone()
    except pg_errors.UniqueViolation as exc:
        raise HTTPException(409, "Google account is already linked") from exc
    if not user:
        raise HTTPException(409, "Email is already linked to another Google account")
    return {"message": "User logged in successfully via Google OAuth!", "token": issue_token(user), "user": user}
