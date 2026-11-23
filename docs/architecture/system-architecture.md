# AlgoRoom architecture

## Application

Angular serves the lobby, room chat, and Monaco problem workspace. Angular's HTTP services call FastAPI directly, and its interceptors show loading and API errors centrally.

FastAPI runs on Uvicorn and groups routes by problems, rooms, and execution. The API reads the PostgreSQL problem catalog using SQLAlchemy's async ORM with the Psycopg driver. At startup, `Base.metadata.create_all` creates missing tables. Updating columns in existing tables requires a separate schema change. Redis stores rooms, membership, and presence. Cloudflare R2 stores full test cases for catalog problems configured to use it.

`app/main.py` starts the public API. `app/api/v1/router.py` registers HTTP endpoints, `schemas/` defines request and response data, and `services/` holds the room and judging rules. `repositories/` reads and writes storage, `models/` maps PostgreSQL tables, and `db/` creates the SQLAlchemy engine and sessions. The private runner starts from `app/api/runner_worker.py`.

| Interface | Routes |
| --- | --- |
| Problems | `GET /problems`, `GET /problems/{id}` |
| Rooms | `POST /rooms`, `GET /rooms/{code}`, `POST /rooms/{code}/join` |
| Runner | `POST /api/run`, `POST /api/submit`, `POST /api/format` |

## Rooms and chat

Anyone with a room code can join as a guest. The browser keeps a random guest token in session storage and sends it on room requests. The API hashes that token with the room code to identify the participant across HTTP requests and socket reconnects.

The browser connects through `/socket.io` to the `/rooms` namespace with the guest token. It emits `joinLobby` with the room code and receives `roomStateUpdated`. Chat uses `chatMessage` and `chatBroadcast`. The host can issue `launchRoom`. Members can issue `leaveRoom`.

Redis keeps each room in a cache entry that expires two hours after its last update. A Redis transaction keeps concurrent joins within the room capacity. Leaving frees a seat, and a host leave transfers ownership or closes an empty room.

## Execution

FastAPI assembles a submission with its problem driver and sends source and test inputs to a private runner. The service compiles C++ and Java once per request and starts an isolated sandbox for each test case. The API compares outputs and returns results synchronously. Hidden cases return verdicts and timing with their input, output, expected output, and diagnostic text omitted.

Compose gives Docker access to the private runner, which uses a dedicated host workspace. The public API has no Docker socket mount. Sandbox containers run as an unprivileged user with a read-only root filesystem and without network access. The runner limits memory, CPU, process count, output, and job duration.

## EC2 and GitHub Pages

Caddy terminates HTTPS on the API hostname and proxies to `server:3000`. EC2 uses the existing PostgreSQL volume. Redis runs on the private Compose network. Configure the EC2 SSH secrets and `PROD_ENV_FILE` in GitHub. The production environment needs PostgreSQL connection credentials and R2 settings for problems with full test cases stored there.

The workflow checks out the release commit, builds the sandbox and API images, and backs up PostgreSQL on EC2 before replacing the API container. GitHub Pages publishes the Angular bundle after the API readiness check passes for PostgreSQL, Redis, and the runner. AWS and GitHub credentials stay in the deploy workflow.
