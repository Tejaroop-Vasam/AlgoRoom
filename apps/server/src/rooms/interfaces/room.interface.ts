export interface RoomParticipant {
  id: string;
  username: string;
  isHost: boolean;
  socketId?: string;
}

export type RoomMode = 'RACE' | 'COOP';
export type RoomStatus = 'LOBBY' | 'IN_PROGRESS' | 'FINISHED';
export type BufferVisibility = 'OBSCURED' | 'HOST_ONLY' | 'OPEN';

export interface RoomSettings {
  maxParticipants: number;
  hiddenTestCases: boolean;
  bufferVisibility: BufferVisibility;
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