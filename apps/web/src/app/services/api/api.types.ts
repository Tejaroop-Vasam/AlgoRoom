export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';
export type RoomMode = 'RACE' | 'COOP';
export type RoomStatus = 'LOBBY' | 'IN_PROGRESS' | 'FINISHED';
export type BufferVisibility = 'OBSCURED' | 'HOST_ONLY' | 'OPEN';

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  is_admin: boolean;
  created_at: string;
}

export interface ProfileResponse {
  user: UserProfile;
}

export interface ProblemTagRef {
  slug: string;
  name: string;
}

export interface ProblemSummary {
  id: number;
  title: string;
  difficulty: Difficulty;
  tags: ProblemTagRef[];
  acceptanceRate: number;
  targetMinutes: number;
  points: number;
}

export interface ProblemsQuery {
  search?: string;
  difficulty?: Difficulty;
  tags?: string[];
  list?: string;
  page?: number;
  limit?: number;
}

export interface ProblemsListResponse {
  problems: ProblemSummary[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ProblemTag extends ProblemTagRef {
  problemCount: number;
}

export interface ProblemList {
  slug: string;
  name: string;
  problemCount: number;
}

export interface RoomSettings {
  maxParticipants: number;
  hiddenTestCases: boolean;
  bufferVisibility: BufferVisibility;
}

export interface CreateRoomRequest extends RoomSettings {
  name: string;
  mode: RoomMode;
  problemIds: number[];
}

export interface RoomParticipant {
  id: string;
  username: string;
  isHost: boolean;
}

export interface Room {
  id: string;
  code: string;
  name: string;
  mode: RoomMode;
  status: RoomStatus;
  host: RoomParticipant;
  participants: RoomParticipant[];
  problemIds: number[];
  settings: RoomSettings;
  createdAt: string;
}

export interface RoomPreview {
  code: string;
  name: string;
  mode: RoomMode;
  status: RoomStatus;
  hostName: string;
  participantCount: number;
  maxParticipants: number;
  problemCount: number;
}

export interface ApiError {
  statusCode: number;
  message: string;
  error?: string;
}
