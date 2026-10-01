# Real-Time DSA Practice Platform (Race & Co-op)

A modern, full-stack real-time platform for practicing Data Structures & Algorithms (DSA) through competition and collaboration.

---

## Core Product Concept

The platform is designed around two foundational real-time experiences:

1. **Race Mode**: Compete while solving independently.
2. **Co-op Mode**: Collaborate while solving together.

### The Central MVP Loop

```
                    CREATE / JOIN ROOM
                            │
                 ┌──────────┴──────────┐
                 │                     │
              RACE                   CO-OP
                 │                     │
          Individual editor      Shared editor
                 │                     │
             Solve alone          Discuss + solve
                 │                     │
             Submit                 Run
                 │                     │
                 └──────────┬──────────┘
                            │
                      Session Results
```

### Key Product Distinction

| Feature | 🏁 Race Mode | Co-op Mode |
| :--- | :--- | :--- |
| **Philosophy** | **Compete** while solving independently | **Collaborate** while solving together |
| **Code Editor** | Isolated private Monaco editor per participant | Shared, real-time synchronized editor (Yjs + Monaco) |
| **Execution** | Private test runs & background evaluation via BullMQ | Shared test executions multicast to all participants |
| **Progress** | Real-time opponent status, live solve alerts & timer | Team progress towards a single working solution |
| **Interaction**| High-adrenaline countdown, leaderboard & standings | Synchronized room discussion and chat |

---

## High-Level Architecture

The backend is built as a **NestJS Modular Monolith** in TypeScript, providing real-time collaboration and clean modular boundaries without premature microservice complexity.

```
                         ┌─────────────────────┐
                         │   Angular Frontend  │
                         │                     │
                         │ Race Editor         │
                         │ Co-op Editor        │
                         │ Lobby / Results     │
                         └──────────┬──────────┘
                                    │
                  ┌─────────────────┴─────────────────┐
                  │                                   │
              REST API                         WebSocket
                  │                              /Socket.IO
                  ▼                                   ▼
        ┌─────────────────────────────────────────────────┐
        │              Node.js + NestJS Backend           │
        │                                                  │
        │  Auth │ Rooms │ Problems │ Sessions │ Realtime │
        │        Submissions │ Users │ Chat              │
        └──────────────┬───────────────┬──────────────────┘
                       │               │
             ┌─────────┴──────┐   ┌────┴──────────┐
             │                │   │               │
             ▼                ▼   ▼               ▼
       PostgreSQL           Redis             Job Queue
       persistent data      live state         BullMQ
                                               │
                                               ▼
                                      ┌─────────────────┐
                                      │ Execution Worker│
                                      │                 │
                                      │ Docker Sandbox  │
                                      └─────────────────┘
```

### Core Architecture Axioms
- **REST**: Synchronous actions and queries (`/rooms`, `/problems`, `/submissions`).
- **Socket.IO**: Real-time room events and presence (`room:join`, `race:user_started`, `race:user_solved`).
- **PostgreSQL**: Permanent historical data (*"PostgreSQL tells you what happened"*).
- **Redis**: Temporary/live state store (*"Redis tells you what's happening right now"*).
- **BullMQ + Docker Worker**: Safe, asynchronous code compilation & execution in a resource-capped sandbox (Java for MVP).
- **Yjs**: Conflict-free replicated data types (CRDT) for seamless real-time co-op code editing.

---

## Recommended Tech Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | Angular | Standalone components, reactive signals, utility-first CSS |
| **Backend Runtime** | Node.js + TypeScript | High performance and end-to-end type safety |
| **Backend Framework**| NestJS | Modular monolith architecture |
| **API** | REST | Standard HTTP endpoints |
| **Real-time** | Socket.IO | Room-based WebSockets and live event distribution |
| **Database** | PostgreSQL | Relational storage for permanent entities |
| **ORM** | Prisma | Type-safe schema definition and queries |
| **Live State / Cache**| Redis | In-memory room state, presence, and countdowns |
| **Job Queue** | BullMQ | Asynchronous execution queue |
| **Code Execution** | Docker Sandboxes | Capped CPU, memory, and timeout isolation (Java MVP) |
| **Shared Editor** | Monaco Editor | Industry-standard developer editor experience |
| **Collaborative Editing** | Yjs (`y-monaco`) | CRDT-powered real-time synchronization |
| **Authentication** | JWT | Stateless token-based auth |
| **Deployment** | Docker Compose | Local multi-container development environment |

---

## MVP Scope

The MVP focuses strictly on the 20 core user stories required to prove the product concept:

### Must-Have Scope (20 Core Stories)

- **Room & Session**:
  - `US-01`: Enter username
  - `US-02`: Create room
  - `US-03`: Join room via code/link
  - `US-04`: View active room participants
- **Problems**:
  - `US-05`: Select DSA problem for the room
  - `US-06`: View problem description, constraints, and sample test cases
- **🏁 Race Mode**:
  - `US-08`: Room mode selection (Race)
  - `US-09`: Room creator starts race synchronized
  - `US-10`: 3-2-1 countdown overlay
  - `US-11`: Individual Monaco editor instance
  - `US-12`: Run code against sample test cases
  - `US-13`: Submit solution for validation against full test suite
  - `US-14`: Live opponent status tracking (coding, running, solved)
  - `US-15`: Real-time solved count leaderboard
  - `US-16`: Instant alerts when an opponent solves
  - `US-17`: Authoritative synchronized countdown timer
  - `US-18`: Final race results and leaderboard screen
- **🤝 Co-op Mode**:
  - `US-21`: Room mode selection (Co-op)
  - `US-23`: Shared collaborative code editor
  - `US-24`: Real-time code synchronization across peers (Yjs)
  - `US-26`: Execute shared code with results broadcast to all
  - `US-28`: Real-time synchronized room chat for discussion

### Later (Post-MVP Roadmap)

- User authentication profiles & friend lists
- Persistent global rankings and daily streaks
- Post-race solution comparison and diff viewers
- Custom test-case sharing
- Multi-cursor presence visualization
- Long-term session history and performance analytics
- Gamification achievements and badges

Detailed story specifications and acceptance criteria are documented in [docs/requirements/user-stories-and-mvp.md](file:///Users/tejaroopvasam/Desktop/Eligible.ai/docs/requirements/user-stories-and-mvp.md).

---

## Repository Structure

```
├── apps/
│   ├── web/                     # Angular frontend application
│   │   ├── src/app/             # Features: room, race, coop, problem, shared
│   │   └── src/styles/          # Utility-first CSS classes (AGENTS.md)
│   └── api/                     # NestJS backend modular monolith
│       ├── src/
│       │   ├── auth/            # Auth & JWT strategy
│       │   ├── users/           # User management
│       │   ├── rooms/           # Room lifecycle & Socket.IO gateway
│       │   ├── problems/        # DSA problems & test cases
│       │   ├── sessions/        # Race & Co-op session management
│       │   ├── submissions/     # Ingestion & evaluation results
│       │   ├── execution/       # BullMQ worker & Docker sandbox
│       │   ├── collaboration/   # Yjs WebSocket collaboration server
│       │   ├── chat/            # Real-time room chat
│       │   ├── realtime/        # Central Socket.IO setup
│       │   ├── prisma/          # Prisma database client
│       │   └── common/          # Guards, filters, interceptors
│       ├── prisma/
│       │   └── schema.prisma    # Database schema
│       └── docker-compose.yml   # PostgreSQL, Redis, Worker, API
├── docs/
│   ├── architecture/            # Detailed system & database architecture
│   └── requirements/            # Product requirements & MVP user stories
└── packages/                    # Shared types and constants
```

---

## 🛠️ Implementation Phases

1. **Phase 1: Foundation** — NestJS monolith setup, PostgreSQL + Prisma, Users, Rooms, Problems CRUD.
2. **Phase 2: Live Room Presence** — Socket.IO Gateway, room join/leave channels, Redis live presence.
3. **Phase 3: Race Mode & Execution** — Private Monaco editor, submission API, BullMQ queue, Docker sandbox runner (Java).
4. **Phase 4: Race Competition** — Live participant progress, real-time solved broadcasts, timer, leaderboard.
5. **Phase 5: Co-op Mode** — Monaco + Yjs document synchronization, real-time shared editing, synchronized room chat.

Complete architectural specifications and schema definitions are detailed in [docs/architecture/system-architecture.md](file:///Users/tejaroopvasam/Desktop/Eligible.ai/docs/architecture/system-architecture.md).
