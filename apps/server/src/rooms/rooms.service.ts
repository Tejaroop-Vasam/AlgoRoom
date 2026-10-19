import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';

export interface RoomParticipant {
  id: string;
  username: string;
  isHost: boolean;
}

export interface Room {
  id: string;
  code: string;
  name: string;
  mode: 'RACE' | 'COOP';
  status: 'LOBBY' | 'IN_PROGRESS' | 'FINISHED';
  host: RoomParticipant;
  participants: RoomParticipant[];
  problemIds: number[];
  settings: {
    maxParticipants: number;
    hiddenTestCases: boolean;
    bufferVisibility: 'OBSCURED' | 'HOST_ONLY' | 'OPEN';
  };
  createdAt: string;
}

@Injectable()
export class RoomsService {
  private readonly rooms = new Map<string, Room>();

  private generateCode(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    do {
      code = Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    } while (this.rooms.has(code));
    return code;
  }

  create(dto: CreateRoomDto, user?: { id: string; username: string }): Room {
    const code = this.generateCode();
    const hostUser: RoomParticipant = {
      id: user?.id || 'host-user-1',
      username: user?.username || 'Host',
      isHost: true,
    };

    const room: Room = {
      id: `room-${Date.now()}`,
      code,
      name: dto.name,
      mode: dto.mode,
      status: 'LOBBY',
      host: hostUser,
      participants: [hostUser],
      problemIds: dto.problemIds || [],
      settings: {
        maxParticipants: dto.maxParticipants || 4,
        hiddenTestCases: dto.hiddenTestCases ?? true,
        bufferVisibility: dto.bufferVisibility || 'OBSCURED',
      },
      createdAt: new Date().toISOString(),
    };

    this.rooms.set(code, room);
    return room;
  }

  getPreview(code: string) {
    const room = this.rooms.get(code.toUpperCase());
    if (!room) {
      throw new NotFoundException(`Room with code "${code}" not found.`);
    }

    return {
      code: room.code,
      name: room.name,
      mode: room.mode,
      status: room.status,
      hostName: room.host.username,
      participantCount: room.participants.length,
      maxParticipants: room.settings.maxParticipants,
      problemCount: room.problemIds.length,
    };
  }

  join(code: string, user?: { id: string; username: string }): Room {
    const room = this.rooms.get(code.toUpperCase());
    if (!room) {
      throw new NotFoundException(`Room with code "${code}" not found.`);
    }

    if (room.participants.length >= room.settings.maxParticipants) {
      throw new BadRequestException('This room is full.');
    }

    const participant: RoomParticipant = {
      id: user?.id || `guest-${Date.now()}`,
      username: user?.username || `Player ${room.participants.length + 1}`,
      isHost: false,
    };

    if (!room.participants.some((p) => p.id === participant.id)) {
      room.participants.push(participant);
    }

    return room;
  }
}
