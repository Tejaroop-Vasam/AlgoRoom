FROM python:3.11-alpine

RUN apk add --no-cache coreutils bash

RUN adduser -D -u 1001 -s /bin/sh runner

WORKDIR /workspace
RUN chown -R runner:runner /workspace

USER runner
