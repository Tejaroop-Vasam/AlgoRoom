FROM python:3.11-alpine

# Install coreutils for precise timeout command support (e.g., timeout 2.0s)
RUN apk add --no-cache coreutils bash

# Create an unprivileged user for secure execution
RUN adduser -D -u 1001 -s /bin/sh runner

# Working directory where submitted code and test cases will be mounted
WORKDIR /workspace
RUN chown -R runner:runner /workspace

USER runner
