FROM docker:28-cli AS docker-cli

FROM node:22-bookworm-slim AS formatter
RUN npm install --global prettier@3.9.10

FROM python:3.14-slim-bookworm AS base
ENV PYTHONUNBUFFERED=1 PYTHONDONTWRITEBYTECODE=1
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir --requirement requirements.txt

FROM base AS api
COPY app app
COPY alembic.ini .
COPY alembic alembic
RUN useradd --system --uid 10001 api
USER api
EXPOSE 3000
CMD ["python", "-m", "app.main"]

FROM base AS runner
COPY --from=docker-cli /usr/local/bin/docker /usr/local/bin/docker
COPY --from=formatter /usr/local/bin/node /usr/local/bin/node
COPY --from=formatter /usr/local/lib/node_modules/prettier /usr/local/lib/node_modules/prettier
RUN apt-get update && apt-get install -y --no-install-recommends clang-format \
    && rm -rf /var/lib/apt/lists/* \
    && ln -s /usr/local/lib/node_modules/prettier/bin/prettier.cjs /usr/local/bin/prettier \
    && pip install --no-cache-dir ruff==0.15.20
COPY app/__init__.py app/errors.py app/runner_contract.py app/runner_worker.py app/
EXPOSE 3001
CMD ["uvicorn", "app.runner_worker:app", "--host", "0.0.0.0", "--port", "3001", "--workers", "1"]
