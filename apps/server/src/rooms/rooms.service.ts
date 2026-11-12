import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateRoomDto } from './dto/create-room.dto';
import { Room, RoomParticipant } from './interfaces/room.interface';
import { RedisCacheService } from '../cache/redis-cache.service';

const ROOM_TTL_SECONDS = 7200; // 2 hours

@Injectable()
export class RoomsService {
  constructor(private readonly cache: RedisCacheService) {}

  private generateCode(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  }

  private async generateUniqueCode(): Promise<string> {
    let code: string;
    let exists = true;
    let attempts = 0;
    do {
      code = this.generateCode();
      exists = await this.cache.exists(`room:${code}`);
      attempts++;
    } while (exists && attempts < 10);
    return code;
  }

  async create(dto: CreateRoomDto): Promise<Room> {
    const code = await this.generateUniqueCode();
    const hostId = randomUUID();
    const hostUsername = (dto.hostName || (dto as any).username || 'Host').trim();

    const hostParticipant: RoomParticipant = {
      id: hostId,
      username: hostUsername,
      isHost: true,
    };

    const room: Room = {
      id: randomUUID(),
      code,
      name: dto.name,
      mode: dto.mode,
      status: 'LOBBY',
      host: hostParticipant,
      participants: [hostParticipant],
      problemIds: dto.problemIds || [],
      settings: {
        maxParticipants: dto.maxParticipants || 4,
        hiddenTestCases: dto.hiddenTestCases ?? true,
        bufferVisibility: dto.bufferVisibility || (dto.mode === 'COOP' ? 'OPEN' : 'OBSCURED'),
      },
      createdAt: new Date().toISOString(),
    };

    await this.cache.set(`room:${code}`, room, ROOM_TTL_SECONDS);
    return room;
  }

  async getByCode(code: string): Promise<Room> {
    const room = await this.cache.get<Room>(`room:${code.toUpperCase()}`);
    if (!room) {
      throw new NotFoundException(`Room with code "${code}" not found.`);
    }
    return room;
  }

  async getPreview(code: string) {
    const room = await this.getByCode(code);
    return {
      code: room.code,
      name: room.name,
      mode: room.mode,
      status: room.status,
      hostName: room.host?.username,
      participantCount: room.participants?.length || 1,
      maxParticipants: room.settings?.maxParticipants || 4,
      problemCount: room.problemIds?.length || 0,
    };
  }

  async join(
    code: string,
    userOrName?: string | { id?: string; username?: string },
    socketId?: string,
  ): Promise<Room> {
    const room = await this.getByCode(code);
    const maxParticipants = room.settings?.maxParticipants || 4;
    if (room.participants.length >= maxParticipants) {
      throw new BadRequestException('This room is full.');
    }

    const resolvedUsername = (
      typeof userOrName === 'string'
        ? userOrName
        : userOrName?.username || 'Player'
    ).trim() || 'Player';

    const userId = (typeof userOrName === 'object' && userOrName?.id) ? userOrName.id : randomUUID();

    const existing = room.participants.find(
      (p) =>
        (p.id && p.id === userId) ||
        (p.username && p.username.toLowerCase() === resolvedUsername.toLowerCase()),
    );

    if (existing) {
      if (socketId) existing.socketId = socketId;
    } else {
      room.participants.push({
        id: userId,
        username: resolvedUsername,
        isHost: false,
        socketId,
      });
    }

    await this.cache.set(`room:${room.code}`, room, ROOM_TTL_SECONDS);
    if (socketId) {
      await this.cache.set(`socket:${socketId}`, room.code, ROOM_TTL_SECONDS);
    }

    return room;
  }

  async associateSocket(
    roomCode: string,
    socketId: string,
    username?: string,
    userId?: string,
  ): Promise<Room | null> {
    let room: Room;
    try {
      room = await this.getByCode(roomCode);
    } catch {
      return null;
    }

    const cleanUsername = username?.trim().toLowerCase();
    let participant = room.participants.find(
      (p) => (userId && p.id === userId) || (cleanUsername && p.username.toLowerCase() === cleanUsername),
    );

    if (participant) {
      participant.socketId = socketId;
    } else if (username) {
      participant = {
        id: userId || randomUUID(),
        username: username.trim(),
        isHost: room.participants.length === 0,
        socketId,
      };
      room.participants.push(participant);
      if (participant.isHost) {
        room.host = participant;
      }
    }

    await this.cache.set(`room:${room.code}`, room, ROOM_TTL_SECONDS);
    await this.cache.set(`socket:${socketId}`, room.code, ROOM_TTL_SECONDS);

    return room;
  }

  async removeParticipantBySocketId(socketId: string): Promise<{ roomCode: string; room: Room } | null> {
    const roomCode = await this.cache.get<string>(`socket:${socketId}`);
    if (!roomCode) return null;

    let room: Room;
    try {
      room = await this.getByCode(roomCode);
    } catch {
      await this.cache.del(`socket:${socketId}`);
      return null;
    }

    await this.cache.del(`socket:${socketId}`);

    const participant = room.participants.find((p) => p.socketId === socketId);
    if (participant) {
      participant.socketId = undefined;
    }

    await this.cache.set(`room:${room.code}`, room, ROOM_TTL_SECONDS);
    return { roomCode: room.code, room };
  }

  async leaveRoom(code: string, userIdOrSocketId: string): Promise<Room | null> {
    let room: Room;
    try {
      room = await this.getByCode(code);
    } catch {
      return null;
    }

    room.participants = room.participants.filter(
      (p) => p.socketId !== userIdOrSocketId && p.id !== userIdOrSocketId,
    );

    if (room.participants.length === 0) {
      await this.cache.del(`room:${room.code}`);
      return null;
    }

    if (!room.participants.some((p) => p.isHost)) {
      room.participants[0].isHost = true;
      room.host = room.participants[0];
    }

    await this.cache.set(`room:${room.code}`, room, ROOM_TTL_SECONDS);
    return room;
  }

  async launchRoom(code: string, requesterSocketId: string): Promise<Room | null> {
    let room: Room;
    try {
      room = await this.getByCode(code);
    } catch {
      return null;
    }

    const requester = room.participants.find((p) => p.socketId === requesterSocketId);
    if (!requester?.isHost) {
      return null;
    }

    room.status = 'IN_PROGRESS';
    await this.cache.set(`room:${room.code}`, room, ROOM_TTL_SECONDS);
    return room;
  }
}
