import { LanguageConfig, SupportedLanguage } from './interfaces/runner.interface';

export const SUPPORTED_LANGUAGES: Record<SupportedLanguage, LanguageConfig> = {
  cpp: {
    id: 'cpp',
    image: 'algoroom-runner-cpp:latest',
    filename: 'solution.cpp',
    compileCommand: 'g++ -O2 -std=c++20 /workspace/solution.cpp -o /tmp/solution',
    buildRunCommand: (timeoutSec: number) =>
      `timeout ${timeoutSec}s /tmp/solution`,
  },
  java: {
    id: 'java',
    image: 'algoroom-runner-java:latest',
    filename: 'Solution.java',
    compileCommand: 'javac -d /tmp /workspace/Solution.java',
    buildRunCommand: (timeoutSec: number) =>
      `timeout ${timeoutSec}s java -cp /tmp $([ -f /tmp/__Driver.class ] && echo __Driver || echo Solution)`,
  },
  javascript: {
    id: 'javascript',
    image: 'algoroom-runner-javascript:latest',
    filename: 'solution.js',
    buildRunCommand: (timeoutSec: number) =>
      `timeout ${timeoutSec}s node /workspace/solution.js`,
  },
};
