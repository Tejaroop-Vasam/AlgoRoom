# AlgoRoom

AlgoRoom is a desktop web app for practicing data structures and algorithms. Players can host Race or Co-op rooms as guests, sign in to join another player's room, and solve problems in a Monaco editor. Rooms support live presence and chat. The workspace runs and evaluates Python, C++, and Java solutions.

## Project layout

| Path | Purpose |
| --- | --- |
| `apps/web` | Angular frontend and NSwag-generated API client |
| `apps/server/app` | FastAPI application, Socket.IO gateway, and private sandbox runner |
| `apps/server/alembic` | PostgreSQL migrations for users, problems, rooms, and participants |
| `apps/scraper` | Python tool that seeds problems and uploads test cases to Cloudflare R2 |
| `infrastructure/docker` | Docker images for the three execution languages |

## Run locally

Install Docker with Compose and Node.js using the version in the CI workflow. Copy the example environment file and set a JWT secret. Keep an existing `apps/server/.env` if you already have one.

```sh
cp -n apps/server/.env.example apps/server/.env
openssl rand -hex 32
```

Put the generated value in `JWT_SECRET` in `apps/server/.env`, then start the app.

```sh
npm ci --prefix apps/web
npm run dev
```

Docker Compose builds the API and the private runner, starts PostgreSQL, and applies Alembic migrations. Angular runs at `http://localhost:4200`. The API listens at `http://localhost:3000`, with Swagger UI at `/api/docs`.

If another local PostgreSQL service uses port 5432, set `DB_PORT=55432` in `apps/server/.env` before starting the app.

For a fresh database, create the scraper environment and load the problem catalog after Compose is ready.

```sh
python3 -m venv apps/scraper/.venv
apps/scraper/.venv/bin/pip install -r apps/scraper/requirements.txt
npm run scraper:seed
```

The seeder reads its database and R2 settings from the configured environment. Problems seeded without R2 use their sample cases stored in PostgreSQL.

## Regenerate the Angular client

Set up a Python 3.14 virtual environment for the backend and install .NET 8 for NSwag.

```sh
python3.14 -m venv apps/server/.venv
apps/server/.venv/bin/pip install -r apps/server/requirements.txt
npm run api:sync
```

Commit the generated OpenAPI document and client with changes to the HTTP contract.

## Deployment

GitHub Actions verifies `main` and `akhil1`. Releases from `main` deploy FastAPI to EC2, check API readiness through Caddy, and then publish Angular to GitHub Pages. The API uses the existing `algoroom-api.duckdns.org` domain.

See the [architecture and deployment guide](docs/architecture/system-architecture.md) and [product requirements](docs/requirements/user-stories-and-mvp.md).
