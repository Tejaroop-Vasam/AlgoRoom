# Backend API & Real-Time Service (NestJS)

The backend service for the Real-Time DSA Practice Platform, architected as a **Modular Monolith** using **NestJS + TypeScript**.

---

## 🎯 Architecture & Modules

The backend combines REST endpoints with a Socket.IO real-time gateway, backed by PostgreSQL, Redis, BullMQ, and Docker execution sandboxes:

```
src/
├── auth/                      # Authentication & JWT strategy
├── users/                     # User management & records
├── rooms/                     # Room lifecycle, codes, & Socket.IO rooms
├── problems/                  # DSA problem statements & test cases
├── sessions/                  # Race & Co-op session coordinators
├── submissions/               # Submission ingestion & evaluation status
├── execution/                 # BullMQ queue producer, worker & Docker sandbox
├── collaboration/             # Yjs WebSocket server for Co-op editing
├── chat/                      # Real-time room chat
├── realtime/                  # Central Socket.IO server & Redis adapter
├── prisma/                    # Prisma service & database bindings
├── common/                    # Guards, filters, interceptors, decorators
├── app.module.ts
└── main.ts
```

---

## ⚡ Core Concepts

### 1. PostgreSQL vs. Redis
- **PostgreSQL (Prisma ORM)**: Authoritative store for permanent records (*"What happened"*):
  - Users, Rooms, RoomParticipants, Problems, TestCases, Sessions, Submissions, ChatMessages.
- **Redis**: Low-latency cache for live, temporary state (*"What is happening right now"*):
  - Active participants in `room:<code`, active countdowns in `session:<id>`, and socket presence.

### 2. BullMQ & Docker Execution Sandbox
Code execution is decoupled from HTTP requests:
1. Client calls `POST /api/sessions/:id/submissions`.
2. NestJS saves the submission as `QUEUED` in PostgreSQL and pushes a job to BullMQ (`executionQueue`).
3. An execution worker pops the job and provisions an isolated Docker container (`openjdk:17-alpine`).
4. Resource limits: `--cpus=1.0`, `--memory=256m`, `--network none`, 2.5s execution timeout.
5. Worker updates the submission status in PostgreSQL and broadcasts `race:user_solved` or `race:user_submitted` to the room via Socket.IO.

### 3. Yjs Collaboration Server (Co-op Mode)
In Co-op mode, concurrent code editing is powered by **Yjs** with the **y-monaco** binding on the client, synchronizing CRDT document updates through the collaboration gateway and Redis Pub/Sub.

---

## 🔄 State Machines

### Race Session State Machine
```
WAITING ──(Host Starts)──> COUNTDOWN (3..2..1) ──(Finished)──> ACTIVE ──(Done/Timeout)──> COMPLETED
```

### Submission Status State Machine
```
SUBMITTED ──> QUEUED (BullMQ) ──> RUNNING (Docker) ──> [ ACCEPTED | WRONG_ANSWER | TIME_LIMIT_EXCEEDED | RUNTIME_ERROR | COMPILE_ERROR ]
```

---

## 🔌 Socket.IO Gateway Events

- **Room**: `room:join`, `room:leave`, `room:user_joined`, `room:user_left`
- **Race**: `race:start`, `race:countdown`, `race:user_started`, `race:user_submitted`, `race:user_solved`, `race:completed`
- **Co-op**: `coop:document_update`, `coop:run_result`
- **Chat**: `chat:send`, `chat:message`

---

## 🛠️ Local Development

### 1. Start Infrastructure via Docker Compose

```bash
docker compose up -d postgres redis
```

### 2. Setup Database & Prisma

```bash
npx prisma generate
npx prisma migrate dev
```

### 3. Start Development Server

```bash
npm install
npm run start:dev
```

The REST API will be available at `http://localhost:3000/api` and the Socket.IO gateway on port `3000`.
