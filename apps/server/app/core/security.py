from hashlib import sha256

GUEST_TOKEN_PATTERN = r"^[0-9a-f]{64}$"


def guest_id(code: str, token: str) -> str:
    return sha256(f"{code}:{token}".encode()).hexdigest()
