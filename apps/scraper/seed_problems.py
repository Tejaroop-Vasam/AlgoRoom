#!/usr/bin/env python3
import argparse
import json
import os
import re
import sys
from pathlib import Path
import boto3
import psycopg
from psycopg.types.json import Jsonb
import requests
from dotenv import load_dotenv
SCRAPER_DIR = Path(__file__).resolve().parent
APPS_DIR = SCRAPER_DIR.parent
PROJECT_ROOT = APPS_DIR.parent

for env_candidate in [SCRAPER_DIR / '.env', APPS_DIR / 'server' / '.env', PROJECT_ROOT / '.env']:
    if env_candidate.exists():
        load_dotenv(env_candidate)
        break

DATA_DIR = SCRAPER_DIR / 'data'
SERVER_DATA_DIR = APPS_DIR / 'server' / 'data'

CACHE_FILE = DATA_DIR / 'neenza-problems.json'
if not CACHE_FILE.exists() and (SERVER_DATA_DIR / 'neenza-problems.json').exists():
    CACHE_FILE = SERVER_DATA_DIR / 'neenza-problems.json'

NEENZA_URL = 'https://raw.githubusercontent.com/neenza/leetcode-problems/master/merged_problems.json'


def download_dataset(url: str, dest_path: Path):
    print(f"Downloading dataset from {url}...")
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    
    with requests.get(url, stream=True, timeout=60) as r:
        r.raise_for_status()
        with open(dest_path, 'wb') as f:
            for chunk in r.iter_content(chunk_size=1024 * 1024):
                if chunk:
                    f.write(chunk)
    print(f"Download complete: {dest_path}")


def init_r2_client():
    account_id = os.getenv("R2_ACCOUNT_ID")
    access_key = os.getenv("R2_ACCESS_KEY_ID")
    secret_key = os.getenv("R2_SECRET_ACCESS_KEY")
    endpoint_url = os.getenv("R2_ENDPOINT") or (f"https://{account_id}.r2.cloudflarestorage.com" if account_id else None)
    bucket_name = os.getenv("R2_BUCKET_NAME", "test-cases")

    if not (access_key and secret_key and endpoint_url):
        print("Cloudflare R2 credentials not fully specified in environment. Skipping R2 uploads.")
        return None, None

    try:
        s3 = boto3.client(
            "s3",
            endpoint_url=endpoint_url,
            aws_access_key_id=access_key,
            aws_secret_access_key=secret_key,
            region_name="auto",
        )
        s3.head_bucket(Bucket=bucket_name)
        print(f"Connected to Cloudflare R2 bucket: '{bucket_name}'")
        return s3, bucket_name
    except Exception as e:
        print(f"Warning: Could not connect to Cloudflare R2 bucket '{bucket_name}': {e}")
        return None, None


def upload_test_cases_to_r2(s3, bucket_name: str, key: str, test_cases: list) -> bool:
    if not s3 or not bucket_name:
        return False
    try:
        body = json.dumps(test_cases, indent=2).encode('utf-8')
        s3.put_object(
            Bucket=bucket_name,
            Key=key,
            Body=body,
            ContentType='application/json',
        )
        return True
    except Exception as e:
        print(f"Failed to upload test cases to R2 for key '{key}': {e}")
        return False


def parse_example_text(raw_text: str, idx: int):
    if not raw_text:
        return None

    input_match = re.search(r"Input:\s*([\s\S]*?)(?=\nOutput:|$)", raw_text, re.IGNORECASE)
    output_match = re.search(r"Output:\s*([\s\S]*?)(?=\nExplanation:|$)", raw_text, re.IGNORECASE)
    expl_match = re.search(r"Explanation:\s*([\s\S]*)", raw_text, re.IGNORECASE)

    if not input_match or not output_match:
        return None

    return {
        "id": idx + 1,
        "input": input_match.group(1).strip(),
        "expectedOutput": output_match.group(1).strip(),
        "explanation": expl_match.group(1).strip() if expl_match else None,
    }


def extract_python_method_name(python_code: str) -> str | None:
    if not python_code:
        return None
    match = re.search(r"def\s+([a-zA-Z0-9_]+)\s*\(\s*self", python_code)
    return match.group(1) if match else None


def generate_python_driver(method_name: str) -> str:
    return f"""# __USER_CODE__

import sys
import json
import re

def _deserialize_val(val_str):
    val_str = val_str.strip()
    if val_str == "true": return True
    if val_str == "false": return False
    if val_str == "null": return None
    try:
        return json.loads(val_str)
    except Exception:
        return val_str

def _parse_input_to_kwargs(raw_input):
    kwargs = {{}}
    tokens = re.findall(r"([a-zA-Z0-9_]+)\\s*=\\s*(\\[[^\\]]*\\]|\\"[^\\"]*\\"|[^,]+)", raw_input)
    if tokens:
        for k, v in tokens:
            kwargs[k.strip()] = _deserialize_val(v.strip())
        return kwargs
    return None

def _run():
    raw_input = sys.stdin.read().strip()
    if not raw_input:
        return
    solution = Solution()
    kwargs = _parse_input_to_kwargs(raw_input)
    if kwargs:
        result = solution.{method_name}(**kwargs)
    else:
        lines = [line.strip() for line in raw_input.split('\\n') if line.strip()]
        args = [_deserialize_val(line) for line in lines]
        result = solution.{method_name}(*args)

    if isinstance(result, bool):
        print("true" if result else "false")
    elif result is None:
        print("null")
    elif isinstance(result, (list, dict)):
        print(json.dumps(result, separators=(',', ':')))
    else:
        print(result)

if __name__ == "__main__":
    _run()
"""


def get_db_connection_string():
    db_url = os.getenv("DATABASE_URL")
    if db_url:
        return db_url
    user = os.getenv("DB_USER", "postgres")
    password = os.getenv("DB_PASSWORD", "postgres")
    host = os.getenv("DB_HOST", "localhost")
    port = os.getenv("DB_DBPORT") or os.getenv("DB_PORT", "5432")
    database = os.getenv("DB_DATABASE", "eligible")
    return f"postgresql://{user}:{password}@{host}:{port}/{database}"


def main():
    parser = argparse.ArgumentParser(description="Seed coding problems and upload test cases to Cloudflare R2 & PostgreSQL.")
    parser.add_argument("--limit", type=int, default=50, help="Number of problems to seed (default: 50)")
    parser.add_argument("--all", action="store_true", help="Seed all available problems in the dataset")
    args = parser.parse_args()

    if not CACHE_FILE.exists():
        download_dataset(NEENZA_URL, CACHE_FILE)
    else:
        print(f"Using cached dataset: {CACHE_FILE}")

    print("Loading dataset JSON...")
    with open(CACHE_FILE, "r", encoding="utf-8") as f:
        data = json.load(f)

    questions = data.get("questions", [])
    print(f"Total problems available: {len(questions)}")

    to_process = questions if args.all else questions[: args.limit]
    print(f"Seeding {len(to_process)} problems...")

    s3_client, r2_bucket = init_r2_client()

    conn_str = get_db_connection_string()
    inserted_count = 0
    r2_upload_count = 0

    with psycopg.connect(conn_str) as conn:
        with conn.cursor() as cur:
            for q in to_process:
                title = q.get("title", "").strip()
                description = q.get("description", "").strip()
                problem_slug = q.get("problem_slug", "").strip() or re.sub(r'[^a-z0-9]+', '-', title.lower()).strip('-')

                if not title or not description:
                    continue

                examples = q.get("examples") or []
                sample_test_cases = []
                for idx, ex in enumerate(examples):
                    parsed = parse_example_text(ex.get("example_text", ""), idx)
                    if parsed and parsed.get("input"):
                        sample_test_cases.append(parsed)

                full_test_cases = [
                    {
                        "id": stc["id"],
                        "input": stc["input"],
                        "expectedOutput": stc["expectedOutput"],
                        "isHidden": False,
                        "explanation": stc.get("explanation"),
                    }
                    for stc in sample_test_cases
                ]

                test_cases_r2_key = None
                if s3_client and r2_bucket and full_test_cases:
                    r2_key = f"problems/{problem_slug}/testcases.json"
                    uploaded = upload_test_cases_to_r2(s3_client, r2_bucket, r2_key, full_test_cases)
                    if uploaded:
                        test_cases_r2_key = r2_key
                        r2_upload_count += 1

                code_snippets = q.get("code_snippets") or {}
                python_snippet = code_snippets.get("python3") or code_snippets.get("python") or ""
                cpp_snippet = code_snippets.get("cpp") or ""
                java_snippet = code_snippets.get("java") or ""

                starter_templates = {}
                if python_snippet: starter_templates["python"] = python_snippet
                if cpp_snippet: starter_templates["cpp"] = cpp_snippet
                if java_snippet: starter_templates["java"] = java_snippet

                py_method = extract_python_method_name(python_snippet)
                code_templates = {}
                if python_snippet:
                    code_templates["python"] = {
                        "starterCode": python_snippet,
                        "driverCode": generate_python_driver(py_method) if py_method else None,
                    }
                if cpp_snippet:
                    code_templates["cpp"] = {"starterCode": cpp_snippet}
                if java_snippet:
                    code_templates["java"] = {"starterCode": java_snippet}

                raw_diff = (q.get("difficulty") or "Easy").upper()
                difficulty = "HARD" if raw_diff == "HARD" else ("MEDIUM" if raw_diff == "MEDIUM" else "EASY")
                constraints = q.get("constraints") or []
                hints = q.get("hints") or []

                query = """
                INSERT INTO problems (
                    title, description, difficulty, constraints, hints,
                    sample_test_cases, starter_templates, code_templates,
                    test_cases_r2_key, time_limit_ms, memory_limit_mb, updated_at
                ) VALUES (
                    %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, CURRENT_TIMESTAMP
                )
                ON CONFLICT (title) DO UPDATE SET
                    description = EXCLUDED.description,
                    difficulty = EXCLUDED.difficulty,
                    constraints = EXCLUDED.constraints,
                    hints = EXCLUDED.hints,
                    sample_test_cases = EXCLUDED.sample_test_cases,
                    starter_templates = EXCLUDED.starter_templates,
                    code_templates = EXCLUDED.code_templates,
                    test_cases_r2_key = EXCLUDED.test_cases_r2_key,
                    updated_at = CURRENT_TIMESTAMP
                """

                cur.execute(
                    query,
                    (
                        title,
                        description,
                        difficulty,
                        Jsonb(constraints),
                        Jsonb(hints),
                        Jsonb(sample_test_cases),
                        Jsonb(starter_templates),
                        Jsonb(code_templates),
                        test_cases_r2_key,
                        2000,
                        256,
                    ),
                )
                inserted_count += 1
                if inserted_count % 25 == 0 or inserted_count == len(to_process):
                    print(f"Progress: {inserted_count} / {len(to_process)} problems processed (R2 uploaded: {r2_upload_count})...")

        conn.commit()

    print(f"Done! Successfully seeded {inserted_count} problems into PostgreSQL ({r2_upload_count} uploaded to R2).")


if __name__ == "__main__":
    main()
