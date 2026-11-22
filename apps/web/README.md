# Angular client

The browser app provides account sign-in, room creation and joining, a lobby with live presence and chat, and the Monaco problem workspace. The workspace calls FastAPI to run, submit, and format code. Room activity uses the authenticated Socket.IO connection.

From the repository root, use `npm run dev` to start the API, runner, PostgreSQL, and Angular. If the API is already running, use `npm start` from this directory and open `http://localhost:4200`.

The API location comes from the Angular environment files. Development uses `http://localhost:3000`. The production build uses the public Caddy endpoint and the `/AlgoRoom/` base path for GitHub Pages.

Generate the OpenAPI document and TypeScript client with `npm run api:sync` from the repository root. See the [project setup](../../README.md) for prerequisites.
