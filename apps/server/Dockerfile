FROM node:22-alpine AS builder

WORKDIR /app

COPY apps/server/package*.json ./apps/server/

RUN npm install --prefix apps/server

COPY apps/server/ ./apps/server/

WORKDIR /app/apps/server
RUN npm run build

FROM node:22-alpine

RUN apk add --no-cache docker-cli bash

WORKDIR /app

COPY apps/server/package*.json ./apps/server/
RUN npm install --omit=dev --prefix apps/server

COPY --from=builder /app/apps/server/dist ./apps/server/dist
COPY --from=builder /app/apps/server/drizzle ./apps/server/drizzle

WORKDIR /app/apps/server

EXPOSE 3000
CMD ["node", "dist/main.js"]