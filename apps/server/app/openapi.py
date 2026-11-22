from fastapi import FastAPI
from fastapi.openapi.utils import get_openapi


def compatible_schema(value):
    if isinstance(value, list):
        return [compatible_schema(item) for item in value]
    if not isinstance(value, dict):
        return value
    schema = {key: compatible_schema(item) for key, item in value.items()}
    variants = schema.get("anyOf")
    if variants and len(variants) == 2 and {"type": "null"} in variants:
        non_null = next(item for item in variants if item != {"type": "null"})
        if "$ref" in non_null:
            non_null = {"allOf": [non_null]}
        schema.pop("anyOf")
        schema.update(non_null, nullable=True)
    return schema


def install_openapi(app: FastAPI) -> None:
    def openapi():
        if app.openapi_schema is None:
            document = get_openapi(
                title=app.title, version=app.version, routes=app.routes, openapi_version="3.0.3",
            )
            app.openapi_schema = compatible_schema(document)
        return app.openapi_schema

    app.openapi = openapi
