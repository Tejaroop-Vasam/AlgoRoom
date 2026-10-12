import { LanguageConfig, SupportedLanguage } from './interfaces/runner.interface';

export const SUPPORTED_LANGUAGES: Record<SupportedLanguage, LanguageConfig> = {
  python: {
    id: 'python',
    image: 'eligible-runner-python:latest',
    filename: 'solution.py',
    buildRunCommand: (timeoutSec: number) =>
      `timeout ${timeoutSec}s python3 /workspace/solution.py < /workspace/input.txt`,
  },
  cpp: {
    id: 'cpp',
    image: 'eligible-runner-cpp:latest',
    filename: 'solution.cpp',
    buildRunCommand: (timeoutSec: number) =>
      `g++ -O2 -std=c++20 /workspace/solution.cpp -o /tmp/solution && timeout ${timeoutSec}s /tmp/solution < /workspace/input.txt`,
  },
  java: {
    id: 'java',
    image: 'eligible-runner-java:latest',
    filename: 'Solution.java',
    buildRunCommand: (timeoutSec: number) =>
      `javac -d /tmp /workspace/Solution.java && timeout ${timeoutSec}s java -cp /tmp Solution < /workspace/input.txt`,
  },
};
