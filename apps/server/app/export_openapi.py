import json
from pathlib import Path

from .main import api


def main():
    output = Path(__file__).resolve().parents[2] / "web" / "swagger.json"
    document = api.openapi()
    output.write_text(json.dumps(document, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
