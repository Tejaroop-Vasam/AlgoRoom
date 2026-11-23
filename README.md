# AlgoRoom

AlgoRoom is a desktop web app for practicing data structures and algorithms. Guests can create a Race or Co-op room, join by code, and chat in the lobby. Once the host starts the room, players can run and submit Python, C++, and Java solutions in the Monaco editor.

## Project layout

| Path | Purpose |
| --- | --- |
| `apps/web` | Angular frontend |
| `apps/server/app` | FastAPI application, Socket.IO gateway, and private sandbox runner |
| `apps/scraper` | Python tool that seeds problems and uploads test cases to Cloudflare R2 |
| `infrastructure/docker` | Docker images for the three execution languages |

## Run locally

Install Docker with Compose and Node.js using the version in the CI workflow. Copy the example environment file if you do not already have one.

```sh
cp -n apps/server/.env.example apps/server/.env
npm ci --prefix apps/web
npm run dev
```

Docker Compose starts PostgreSQL and Redis and builds the API and the private runner. When FastAPI starts, SQLAlchemy creates any missing model tables. Angular runs at `http://localhost:4200`, and the API listens at `http://localhost:3000`.

If another local PostgreSQL service uses port 5432, set `DB_PORT=55432` in `apps/server/.env` before starting the app.

For a fresh database, create the scraper environment and load the problem catalog after Compose is ready.

```sh
python3 -m venv apps/scraper/.venv
apps/scraper/.venv/bin/pip install -r apps/scraper/requirements.txt
npm run scraper:seed
```

The seeder reads its database and R2 settings from the configured environment. Problems seeded without R2 use their sample cases stored in PostgreSQL.

## Walk through the demo

1. Create a room, add a problem, and open the lobby.
2. Open the invite link in a private browser window to join as a second guest. Send a chat message and start the room from the host window.
3. Open the problem, run a sample, and submit a solution.

Start at [`main.py`](apps/server/app/main.py), then open the [route registry](apps/server/app/api/v1/router.py). To see what happens when someone creates a room, follow the [endpoint](apps/server/app/api/v1/endpoints/rooms.py) to the [room service](apps/server/app/services/room_service.py) and [Redis repository](apps/server/app/repositories/room_repository.py). The [Socket.IO gateway](apps/server/app/api/realtime.py) sends lobby updates.

## Deployment

GitHub Actions verifies `main` and `akhil1`. Releases from `main` deploy FastAPI to EC2, check API readiness through Caddy, and then publish Angular to GitHub Pages. The API uses the existing `algoroom-api.duckdns.org` domain.

See the [architecture and deployment guide](docs/architecture/system-architecture.md) and [product requirements](docs/requirements/user-stories-and-mvp.md).
