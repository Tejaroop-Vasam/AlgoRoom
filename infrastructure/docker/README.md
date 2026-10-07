# DSA Sandbox Runner Images

These Docker images provide secure, isolated execution sandboxes for running untrusted user-submitted code in Java, C++, and Python.

## Security Highlights
- **Unprivileged User (`runner` / UID 1001)**: Code does not run as root.
- **`coreutils` Included**: Provides fractional timeout support (e.g. `timeout 2.0s`).
- **Alpine Base**: Minimal image size (~50-100MB) for near-instant container startup.

---

## 1. Building the Images

You can build all 3 images with a single command using Docker Compose:

```bash
docker compose -f infrastructure/docker/docker-compose.runners.yml build
```

Or build each image individually:

```bash
# Java (OpenJDK 17)
docker build -t algo-room-runner-java:latest infrastructure/docker/runners/java

# C++ (GCC / g++ 13)
docker build -t algo-room-runner-cpp:latest infrastructure/docker/runners/cpp

# Python (Python 3.11)
docker build -t algo-room-runner-python:latest infrastructure/docker/runners/python
```

---

## 2. Sandbox Execution Commands

When the worker evaluates a submission, mount the folder containing user code and test input into `/workspace:ro` and run the container with resource limits.

### Common Security Flags
- `--network none`: Disables internet access.
- `--memory 256m`: Caps RAM to 256MB.
- `--cpus 1.0`: Caps CPU core allocation.
- `--pids-limit 64`: Blocks fork bombs.
- `--read-only`: Read-only root filesystem.
- `--tmpfs /tmp:rw,noexec,nosuid,size=64m`: In-memory temporary scratch space.

---

### Java Execution
```bash
docker run --rm \
  --network none \
  --memory 256m \
  --cpus 1.0 \
  --pids-limit 64 \
  --read-only \
  --tmpfs /tmp:rw,noexec,nosuid,size=64m \
  -v /path/to/host/submission:/workspace:rw \
  algo-room-runner-java:latest \
  sh -c "javac /workspace/Solution.java && timeout 2.0s java -cp /workspace Solution < /workspace/input.txt"
```

### C++ Execution
```bash
docker run --rm \
  --network none \
  --memory 256m \
  --cpus 1.0 \
  --pids-limit 64 \
  --read-only \
  --tmpfs /tmp:rw,noexec,nosuid,size=64m \
  -v /path/to/host/submission:/workspace:rw \
  algo-room-runner-cpp:latest \
  sh -c "g++ -O2 -std=c++20 /workspace/solution.cpp -o /tmp/solution && timeout 2.0s /tmp/solution < /workspace/input.txt"
```

### Python Execution
```bash
docker run --rm \
  --network none \
  --memory 256m \
  --cpus 1.0 \
  --pids-limit 64 \
  --read-only \
  --tmpfs /tmp:rw,noexec,nosuid,size=64m \
  -v /path/to/host/submission:/workspace:ro \
  algo-room-runner-python:latest \
  sh -c "timeout 2.0s python3 /workspace/solution.py < /workspace/input.txt"
```
