import { Difficulty } from '../../services/api';

export interface PlaceholderProblemMeta {
  complexity: string;
  tags: string[];
  hiddenTestCount: number;
}

export interface PlaceholderPlayerMeta {
  elo: number;
  language: string;
}

export const PLACEHOLDER_POINTS_BY_DIFFICULTY: Record<Difficulty, number> = {
  EASY: 50,
  MEDIUM: 100,
  HARD: 150,
};

const PLACEHOLDER_PROBLEM_METAS: PlaceholderProblemMeta[] = [
  { complexity: 'O((V+E) log V)', tags: ['graph', 'priority-queue', 'shortest-path'], hiddenTestCount: 42 },
  { complexity: 'O(V + E)', tags: ['graph', 'topological-sort'], hiddenTestCount: 38 },
  { complexity: 'O(E log V)', tags: ['graph', 'shortest-path'], hiddenTestCount: 35 },
  { complexity: 'O(n log n)', tags: ['sorting', 'greedy'], hiddenTestCount: 30 },
  { complexity: 'O(n)', tags: ['arrays', 'two-pointers'], hiddenTestCount: 24 },
];

const PLACEHOLDER_PLAYER_METAS: PlaceholderPlayerMeta[] = [
  { elo: 1842, language: 'Python 3.12' },
  { elo: 1790, language: 'C++20 (GCC 13.2)' },
  { elo: 1915, language: 'Java 21' },
  { elo: 1748, language: 'C++20 (GCC 13.2)' },
  { elo: 1655, language: 'Java 21' },
  { elo: 1880, language: 'Python 3.12' },
];

export function placeholderProblemMeta(index: number): PlaceholderProblemMeta {
  return PLACEHOLDER_PROBLEM_METAS[index % PLACEHOLDER_PROBLEM_METAS.length];
}

export function placeholderPlayerMeta(index: number): PlaceholderPlayerMeta {
  return PLACEHOLDER_PLAYER_METAS[index % PLACEHOLDER_PLAYER_METAS.length];
}
