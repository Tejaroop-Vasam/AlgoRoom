import { Difficulty, ProblemList, ProblemSummary, ProblemTag, ProblemTagRef, Room, UserProfile } from '../services/api/api.types';

export const MOCK_CURRENT_USER: UserProfile = {
  id: 'b3f1c2d4-0000-4000-8000-000000000001',
  username: 'Teja',
  email: 'teja@algoroom.dev',
  is_admin: false,
  created_at: '2026-09-01T10:00:00.000Z',
};

const POINTS_BY_DIFFICULTY: Record<Difficulty, number> = {
  EASY: 50,
  MEDIUM: 100,
  HARD: 150,
};

interface MockProblem extends Omit<ProblemSummary, 'points' | 'tags'> {
  tags: string[];
  lists: string[];
}

const RAW_PROBLEMS: MockProblem[] = [
  { id: 743, title: "Dijkstra's Shortest Path", difficulty: 'MEDIUM', tags: ['graph', 'priority-queue'], acceptanceRate: 64, targetMinutes: 25, lists: ['blind-75', 'neetcode-150'] },
  { id: 210, title: 'Course Schedule II', difficulty: 'MEDIUM', tags: ['graph', 'topological-sort'], acceptanceRate: 58, targetMinutes: 20, lists: ['blind-75', 'neetcode-150', 'grind-169'] },
  { id: 744, title: 'Network Delay Time', difficulty: 'MEDIUM', tags: ['graph', 'dijkstra'], acceptanceRate: 52, targetMinutes: 15, lists: ['blind-75', 'neetcode-150'] },
  { id: 127, title: 'Word Ladder', difficulty: 'HARD', tags: ['graph', 'breadth-first-search'], acceptanceRate: 37, targetMinutes: 30, lists: ['blind-75', 'neetcode-150', 'grind-169'] },
  { id: 200, title: 'Number of Islands', difficulty: 'MEDIUM', tags: ['graph', 'breadth-first-search'], acceptanceRate: 61, targetMinutes: 15, lists: ['blind-75', 'neetcode-150', 'grind-169'] },
  { id: 133, title: 'Clone Graph', difficulty: 'MEDIUM', tags: ['graph', 'hash-table'], acceptanceRate: 56, targetMinutes: 15, lists: ['blind-75', 'neetcode-150'] },
  { id: 269, title: 'Alien Dictionary', difficulty: 'HARD', tags: ['graph', 'topological-sort'], acceptanceRate: 35, targetMinutes: 35, lists: ['blind-75', 'neetcode-150'] },
  { id: 70, title: 'Climbing Stairs', difficulty: 'EASY', tags: ['dynamic-programming'], acceptanceRate: 72, targetMinutes: 10, lists: ['blind-75', 'neetcode-150', 'grind-169'] },
  { id: 322, title: 'Coin Change', difficulty: 'MEDIUM', tags: ['dynamic-programming'], acceptanceRate: 43, targetMinutes: 20, lists: ['blind-75', 'neetcode-150', 'grind-169'] },
  { id: 300, title: 'Longest Increasing Subsequence', difficulty: 'MEDIUM', tags: ['dynamic-programming', 'binary-search'], acceptanceRate: 54, targetMinutes: 25, lists: ['blind-75', 'neetcode-150'] },
  { id: 72, title: 'Edit Distance', difficulty: 'MEDIUM', tags: ['dynamic-programming'], acceptanceRate: 56, targetMinutes: 25, lists: ['neetcode-150', 'grind-169'] },
  { id: 312, title: 'Burst Balloons', difficulty: 'HARD', tags: ['dynamic-programming'], acceptanceRate: 59, targetMinutes: 40, lists: ['neetcode-150'] },
  { id: 104, title: 'Maximum Depth of Binary Tree', difficulty: 'EASY', tags: ['trees', 'depth-first-search'], acceptanceRate: 75, targetMinutes: 8, lists: ['blind-75', 'neetcode-150', 'grind-169'] },
  { id: 124, title: 'Binary Tree Maximum Path Sum', difficulty: 'HARD', tags: ['trees', 'depth-first-search'], acceptanceRate: 40, targetMinutes: 30, lists: ['blind-75', 'neetcode-150', 'grind-169'] },
  { id: 1, title: 'Two Sum', difficulty: 'EASY', tags: ['arrays-hashing'], acceptanceRate: 52, targetMinutes: 8, lists: ['blind-75', 'neetcode-150', 'grind-169'] },
  { id: 49, title: 'Group Anagrams', difficulty: 'MEDIUM', tags: ['arrays-hashing'], acceptanceRate: 68, targetMinutes: 15, lists: ['blind-75', 'neetcode-150', 'grind-169'] },
  { id: 15, title: '3Sum', difficulty: 'MEDIUM', tags: ['two-pointers', 'arrays-hashing'], acceptanceRate: 35, targetMinutes: 20, lists: ['blind-75', 'neetcode-150', 'grind-169'] },
  { id: 42, title: 'Trapping Rain Water', difficulty: 'HARD', tags: ['two-pointers'], acceptanceRate: 62, targetMinutes: 30, lists: ['blind-75', 'neetcode-150', 'grind-169'] },
  { id: 33, title: 'Search in Rotated Sorted Array', difficulty: 'MEDIUM', tags: ['binary-search'], acceptanceRate: 41, targetMinutes: 20, lists: ['blind-75', 'neetcode-150', 'grind-169'] },
  { id: 4, title: 'Median of Two Sorted Arrays', difficulty: 'HARD', tags: ['binary-search'], acceptanceRate: 39, targetMinutes: 40, lists: ['neetcode-150', 'grind-169'] },
];

const TAG_NAMES: Record<string, string> = {
  'graph': 'Graph',
  'dynamic-programming': 'Dynamic Programming',
  'trees': 'Trees',
  'arrays-hashing': 'Arrays & Hashing',
  'two-pointers': 'Two Pointers',
  'binary-search': 'Binary Search',
};

const TAG_LABELS: Record<string, string> = {
  ...TAG_NAMES,
  'priority-queue': 'Priority Queue',
  'topological-sort': 'Topological Sort',
  'dijkstra': 'Dijkstra',
  'breadth-first-search': 'Breadth-First Search',
  'depth-first-search': 'Depth-First Search',
  'hash-table': 'Hash Table',
};

export interface MockProblemRecord extends ProblemSummary {
  lists: string[];
}

export const MOCK_PROBLEMS: MockProblemRecord[] = RAW_PROBLEMS.map(p => ({
  ...p,
  tags: p.tags.map((slug): ProblemTagRef => ({ slug, name: TAG_LABELS[slug] ?? slug })),
  points: POINTS_BY_DIFFICULTY[p.difficulty],
}));

export const MOCK_TAGS: ProblemTag[] = Object.entries(TAG_NAMES).map(([slug, name]) => ({
  slug,
  name,
  problemCount: MOCK_PROBLEMS.filter(p => p.tags.some(t => t.slug === slug)).length,
}));

export const MOCK_LISTS: ProblemList[] = [
  { slug: 'blind-75', name: 'Blind 75' },
  { slug: 'neetcode-150', name: 'NeetCode 150' },
  { slug: 'grind-169', name: 'Grind 169' },
].map(list => ({
  ...list,
  problemCount: MOCK_PROBLEMS.filter(p => p.lists.includes(list.slug)).length,
}));

export const MOCK_ROOMS = new Map<string, Room>([
  ['GW7Q4K', {
    id: 'room-seed-0001',
    code: 'GW7Q4K',
    name: 'Graph Warriors #743',
    mode: 'RACE',
    status: 'LOBBY',
    host: { id: 'user-rahul', username: 'Rahul Sharma', isHost: true },
    participants: [
      { id: 'user-rahul', username: 'Rahul Sharma', isHost: true },
      { id: 'user-ananya', username: 'Ananya Iyer', isHost: false },
    ],
    problemIds: [743, 210, 744],
    settings: { maxParticipants: 4, hiddenTestCases: true, bufferVisibility: 'OBSCURED' },
    createdAt: '2026-10-14T09:00:00.000Z',
  }],
  ['FULL01', {
    id: 'room-seed-0002',
    code: 'FULL01',
    name: 'DP Duel #312',
    mode: 'COOP',
    status: 'LOBBY',
    host: { id: 'user-marcus', username: 'Marcus Chen', isHost: true },
    participants: [
      { id: 'user-marcus', username: 'Marcus Chen', isHost: true },
      { id: 'user-priya', username: 'Priya Patel', isHost: false },
    ],
    problemIds: [312],
    settings: { maxParticipants: 2, hiddenTestCases: false, bufferVisibility: 'OPEN' },
    createdAt: '2026-10-14T09:30:00.000Z',
  }],
]);
