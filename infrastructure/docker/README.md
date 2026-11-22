# Sandbox images

The private runner uses three Docker images for submitted code.

| Language | Image |
| --- | --- |
| Python | `algoroom-runner-python:latest` |
| C++ | `algoroom-runner-cpp:latest` |
| Java | `algoroom-runner-java:latest` |

Build all three from the repository root.

```sh
npm run runners:build
```

The runner starts a fresh, network-disabled sandbox for each input. PostgreSQL and R2 credentials stay on the API side. See the [deployment and execution architecture](../../docs/architecture/system-architecture.md).
