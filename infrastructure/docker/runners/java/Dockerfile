FROM alpine:3.19

# Install OpenJDK 17, coreutils (for precise timeout command support), and bash
RUN apk add --no-cache openjdk17-jdk coreutils bash

# Create an unprivileged user for secure execution
RUN adduser -D -u 1001 -s /bin/sh runner

# Working directory where submitted code and test cases will be mounted
WORKDIR /workspace
RUN chown -R runner:runner /workspace

USER runner
