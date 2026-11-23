from functools import lru_cache

import boto3
from botocore.config import Config
from botocore.exceptions import BotoCoreError, ClientError
from fastapi import HTTPException
from pydantic import TypeAdapter, ValidationError

from app.core.config import get_settings
from app.schemas.problem import StoredCase


@lru_cache
def r2_client():
    settings = get_settings()
    endpoint = settings.r2_endpoint
    if not endpoint and settings.r2_account_id:
        endpoint = f"https://{settings.r2_account_id}.r2.cloudflarestorage.com"
    if not all((endpoint, settings.r2_access_key_id, settings.r2_secret_access_key, settings.r2_bucket_name)):
        raise HTTPException(503, "Problem test storage is unavailable")
    return boto3.client(
        "s3", endpoint_url=endpoint, region_name="auto",
        aws_access_key_id=settings.r2_access_key_id,
        aws_secret_access_key=settings.r2_secret_access_key,
        config=Config(connect_timeout=3, read_timeout=10, retries={"total_max_attempts": 2}),
    )


def fetch_stored_cases(key: str) -> list[StoredCase]:
    try:
        response = r2_client().get_object(Bucket=get_settings().r2_bucket_name, Key=key)
        with response["Body"] as body:
            raw = body.read(4_000_001)
        if len(raw) > 4_000_000:
            raise HTTPException(502, "Problem test cases exceed the storage limit")
        return TypeAdapter(list[StoredCase]).validate_json(raw)
    except ClientError as exc:
        if exc.response.get("ResponseMetadata", {}).get("HTTPStatusCode") == 404:
            raise HTTPException(404, "Problem test cases were not found") from exc
        raise HTTPException(502, "Could not load problem test cases") from exc
    except (BotoCoreError, ValidationError) as exc:
        raise HTTPException(502, "Could not load problem test cases") from exc
