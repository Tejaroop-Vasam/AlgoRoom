import { Room, RoomParticipant } from '../../services/api/api.types';

export interface RaceProblemResult {
  problemId: number;
  solved: boolean;
  solveMs: number | null;
  submissions: number;
  passedTests: number;
  totalTests: number;
}

export interface RaceStanding {
  rank: number;
  player: RoomParticipant;
  solvedCount: number;
  finishMs: number;
  endedMs: number | null;
  submissions: number;
  problems: RaceProblemResult[];
}

export interface RaceSolve {
  player: RoomParticipant;
  problemId: number;
  solveMs: number;
}

export function solveMs(room: Room, solvedAt: string | null | undefined): number | null {
  if (!solvedAt || !room.startedAt) return null;
  return Math.max(0, Date.parse(solvedAt) - Date.parse(room.startedAt));
}

export function raceStandings(room: Room): RaceStanding[] {
  const rows = room.participants.map(player => {
    const problems = room.problemIds.map(problemId => {
      const stats = player.telemetry?.[problemId];
      const ms = solveMs(room, stats?.solvedAt);
      return {
        problemId,
        solved: ms !== null,
        solveMs: ms,
        submissions: stats?.submissions ?? 0,
        passedTests: stats?.passedTests ?? 0,
        totalTests: stats?.totalTests ?? 0,
      };
    });
    const solved = problems.filter(problem => problem.solved);
    return {
      rank: 0,
      player,
      solvedCount: solved.length,
      finishMs: Math.max(0, ...solved.map(problem => problem.solveMs ?? 0)),
      endedMs: solveMs(room, player.finishedAt),
      submissions: problems.reduce((sum, problem) => sum + problem.submissions, 0),
      problems,
    };
  });

  rows.sort((a, b) =>
    b.solvedCount - a.solvedCount ||
    a.finishMs - b.finishMs ||
    a.submissions - b.submissions ||
    a.player.username.localeCompare(b.player.username));

  let rank = 0;
  return rows.map((row, index) => {
    const previous = rows[index - 1];
    const tied = !!previous && previous.solvedCount === row.solvedCount
      && previous.finishMs === row.finishMs && previous.submissions === row.submissions;
    if (!tied) rank = index + 1;
    return { ...row, rank };
  });
}

export function newSolves(previous: Room | null, next: Room): RaceSolve[] {
  if (!previous || previous.code !== next.code) return [];
  const solves: RaceSolve[] = [];
  for (const player of next.participants) {
    const before = previous.participants.find(p => p.id === player.id);
    for (const problemId of next.problemIds) {
      const solvedAt = player.telemetry?.[problemId]?.solvedAt;
      if (solvedAt && !before?.telemetry?.[problemId]?.solvedAt) {
        solves.push({ player, problemId, solveMs: solveMs(next, solvedAt) ?? 0 });
      }
    }
  }
  return solves;
}

export function formatDuration(ms: number): string {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (value: number) => String(value).padStart(2, '0');
  return hours ? `${hours}:${pad(minutes)}:${pad(seconds)}` : `${pad(minutes)}:${pad(seconds)}`;
}
