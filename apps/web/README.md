# Angular client

The browser app provides guest room creation and joining, a lobby with live presence and chat, and the Monaco problem workspace. Angular's HTTP services call FastAPI directly. Socket.IO sends lobby and chat updates.

From the repository root, use `npm run dev` to start the API, runner, PostgreSQL, and Angular. If the API is already running, use `npm start` from this directory and open `http://localhost:4200`.

The API location comes from the Angular environment files. Development uses `http://localhost:3000`. The production build uses the public Caddy endpoint and the `/AlgoRoom/` base path for GitHub Pages.

See the [project setup](../../README.md) for prerequisites.
