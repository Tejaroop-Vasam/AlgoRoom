# AlgoRoom architecture

## Application

Angular serves the lobby, room chat, and Monaco problem workspace. NSwag generates the TypeScript HTTP client from FastAPI's OpenAPI document. Angular's HTTP interceptors attach Bearer tokens and handle loading and error messages centrally. The browser stores the app token in session storage.

FastAPI runs on Uvicorn and groups routes by users, problems, rooms, and execution. PostgreSQL stores users, problem metadata, starter code, rooms, and room membership. The API uses psycopg's async connection pool and versioned Alembic migrations. Cloudflare R2 stores full test cases. The seeder writes catalog rows directly to PostgreSQL and can upload test cases to R2.

| Interface | Routes |
| --- | --- |
| Accounts | `POST /register`, `POST /login`, `POST /google-oauth`, `GET /profile`, `PUT /update`, `PUT /change-password` |
| Problems | `GET /problems`, `GET /problems/{id}` |
| Rooms | `POST /rooms`, `GET /rooms/{code}`, `POST /rooms/{code}/join` |
| Runner | `POST /api/run`, `POST /api/submit`, `POST /api/format` |

The auth endpoints preserve JWT claims and existing bcrypt password hashes. Keep the existing `JWT_SECRET` if issued tokens should survive a deployment. The Google token endpoint verifies the audience and verified email when `GOOGLE_CLIENT_ID` is set.

## Rooms and chat

Guests can create a room and host it from the same browser tab. The creation response provides a room-scoped host token valid for 24 hours. The browser keeps it in session storage and uses it to reconnect to that room. Joining another player's room requires an account.

The browser connects through the `/socket.io` path to the `/rooms` namespace with a guest host token or an account JWT. It emits `joinLobby` with the room code and receives `roomStateUpdated`. Chat uses `chatMessage` and `chatBroadcast`. The host can issue `launchRoom`. Members can issue `leaveRoom`. The gateway also handles the branch's CRDT and telemetry relay events. The [product requirements](../requirements/user-stories-and-mvp.md) describe the shared editor and scoring features planned for the product.

PostgreSQL retains membership across transient disconnects. Socket presence is cleared on disconnect and restored on reconnect. An explicit leave frees a seat, and an explicit host leave passes ownership to another member or closes an empty room. Chat lives in the current socket session. One Uvicorn process handles HTTP polling and WebSocket sessions. Horizontal scaling will require a shared Socket.IO message manager and polling session affinity.

## Execution

FastAPI assembles a submission with its problem driver and sends source and test inputs to a private runner. The service compiles C++ and Java once per request and starts an isolated sandbox for each test case. The API compares outputs and returns results synchronously. Hidden cases return verdicts and timing with their input, output, expected output, and diagnostic text omitted.

Compose gives Docker access to the private runner, which uses a dedicated host workspace. The public API has no Docker socket mount. Sandbox containers run as an unprivileged user with a read-only root filesystem and without network access. The runner limits memory, CPU, process count, output, and job duration.

## EC2 and GitHub Pages

Caddy terminates HTTPS on the existing API hostname and proxies to `server:3000`. EC2 uses the existing Compose project and PostgreSQL volume. Configure the EC2 SSH secrets and `PROD_ENV_FILE` in GitHub. The production environment needs PostgreSQL connection credentials and a JWT secret. Add the Google client ID and R2 settings when those integrations are used.

The workflow checks out the release commit, builds the sandbox and API images, and backs up PostgreSQL on EC2. An Alembic command runs once before replacing the API container. GitHub Pages publishes the Angular bundle after the API readiness check passes. AWS and GitHub credentials stay in the deploy workflow.

The initial Alembic revisions adopt the existing user, problem, and Akhil room tables when present. PostgreSQL rooms carry forward. Legacy rooms stored only in Redis on an earlier deployment should finish before the switch. For rollback, retain the previous release image and database backup. The initial migrations are additive, so rolling back the application does not require downgrading the database. Use a backup restore only when data recovery is required.
