import type { CreateRoomDto, RoomDto, RoomParticipantDto, RoomPreviewDto } from './api-client';

export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';
export type RoomMode = 'RACE' | 'COOP';
export type RoomStatus = 'LOBBY' | 'IN_PROGRESS' | 'FINISHED';
export type BufferVisibility = 'OBSCURED' | 'HOST_ONLY' | 'OPEN';

export interface ProblemSummary {
  id: number;
  title: string;
  difficulty: Difficulty;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProblemsQuery {
  search?: string;
  difficulty?: Difficulty;
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

export type CreateRoomRequest = CreateRoomDto;
export type Room = RoomDto;
export type RoomParticipant = RoomParticipantDto;
export type RoomPreview = RoomPreviewDto;

export interface ApiError {
  statusCode: number;
  message: string;
  error?: string;
}
