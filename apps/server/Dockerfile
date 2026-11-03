FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY apps/server/package*.json ./apps/server/

RUN npm install

COPY apps/server/ ./apps/server/

WORKDIR /app/apps/server
RUN npm run build

FROM node:20-alpine

RUN apk add --no-cache docker-cli bash

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/apps/server/package*.json ./apps/server/
RUN npm install --omit=dev --prefix apps/server

COPY --from=builder /app/apps/server/dist ./apps/server/dist
COPY --from=builder /app/apps/server/drizzle ./apps/server/drizzle

WORKDIR /app/apps/server

EXPOSE 3000
CMD ["node", "dist/main.js"]