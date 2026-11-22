FROM alpine:3.19

# Install GCC C++ compiler, standard libraries, and coreutils (for timeout)
RUN apk add --no-cache g++ libstdc++ coreutils bash

# Create an unprivileged user for secure execution
RUN adduser -D -u 1001 -s /bin/sh runner

# Working directory where submitted code and test cases will be mounted
WORKDIR /workspace
RUN chown -R runner:runner /workspace

USER runner
