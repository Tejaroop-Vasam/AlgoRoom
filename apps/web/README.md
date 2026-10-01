# Web Client (Angular)

The frontend client for the Real-Time DSA Practice Platform, built with Angular (v19+).

---

## 🎯 Architecture & Features

The web client provides the interactive interface for real-time room sessions, problem solving, competitive racing, and collaborative pair coding.

### Key Modules & Views

- **Room Lobby (`/features/room`)**:
  - Username entry and session initialization.
  - Room creation and shareable join codes/links.
  - Mode toggle: **🏁 Race Mode** vs. **🤝 Co-op Mode**.
  - Problem selection and live participant roster via Socket.IO.
- **Problem Viewer (`/features/problem`)**:
  - Problem statement, constraints, input/output specifications, and examples.
- **🏁 Race Mode (`/features/race`)**:
  - Synchronized 3-2-1 countdown overlay.
  - Dedicated individual Monaco editor instance.
  - Run code against sample test cases with assertion logs.
  - Solution submission dispatched to backend BullMQ queue.
  - Real-time opponent status cards (coding, testing, solved) and live solve alerts.
  - Synchronized timer and final race results modal.
- **🤝 Co-op Mode (`/features/coop`)**:
  - Shared, real-time synchronized code editor buffer powered by **Yjs** (`y-monaco`).
  - Shared test execution with broadcast results to all peers.
  - Integrated real-time team discussion chat.

---

## 📐 Project Rules & Styling Standards

All frontend code strictly conforms to the project guidelines in [AGENTS.md](file:///Users/tejaroopvasam/Desktop/Eligible.ai/AGENTS.md):

1. **No Spec / Test Files**: Never generate `*.spec.ts` files or test suites.
2. **Component File Separation**: Every component must have distinct dedicated files:
   - `*.component.ts` (Logic)
   - `*.component.html` (Template)
   - `*.component.css` (Styles - kept empty or minimal)
3. **Utility-First Styling**:
   - Styling is applied using modular utility classes defined in `src/styles/utilities/` and exported via `src/styles/utilities.css` (`flex.css`, `spacing.css`, `sizing.css`, `typography.css`, `borders.css`, `effects.css`, `colors.css`).
   - All spacing, typography, and sizing strictly uses `rem` units (no `px`).
   - Component CSS files remain empty by default.

---

## 🛠️ Development

### Development Server

Run the development server locally:

```bash
npm start
# or
ng serve
```

Navigate to `http://localhost:4200/`.

### Build

Compile the project for production:

```bash
npm run build
```

The production bundle will be stored in the `dist/` directory.
