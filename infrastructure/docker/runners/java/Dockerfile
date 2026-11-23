FROM alpine:3.19

RUN apk add --no-cache openjdk17-jdk coreutils bash

RUN adduser -D -u 1001 -s /bin/sh runner

WORKDIR /workspace
RUN chown -R runner:runner /workspace

USER runner
