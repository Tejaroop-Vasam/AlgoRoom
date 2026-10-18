import { LanguageConfig, SupportedLanguage } from './interfaces/runner.interface';

export const SUPPORTED_LANGUAGES: Record<SupportedLanguage, LanguageConfig> = {
  python: {
    id: 'python',
    image: 'eligible-runner-python:latest',
    filename: 'solution.py',
    buildRunCommand: (timeoutSec: number) =>
      `timeout ${timeoutSec}s python3 /workspace/solution.py`,
  },
  cpp: {
    id: 'cpp',
    image: 'eligible-runner-cpp:latest',
    filename: 'solution.cpp',
    compileCommand: 'g++ -O2 -std=c++20 /workspace/solution.cpp -o /tmp/solution',
    buildRunCommand: (timeoutSec: number) =>
      `timeout ${timeoutSec}s /tmp/solution`,
  },
  java: {
    id: 'java',
    image: 'eligible-runner-java:latest',
    filename: 'Solution.java',
    compileCommand: 'javac -d /tmp /workspace/Solution.java',
    buildRunCommand: (timeoutSec: number) =>
      `timeout ${timeoutSec}s java -cp /tmp Solution`,
  },
};
