import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DrizzleService, rooms, roomParticipants } from '../database/schema/rooms.schema';
import { CreateRoomDto } from './dto/create-room.dto';

@Injectable()
export class RoomsService {
  constructor(private readonly drizzle: DrizzleService) {}

  private generateCode(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  }

  private async generateUniqueCode(): Promise<string> {
    let code: string;
    let exists = true;
    do {
      code = this.generateCode();
      const existing = await this.drizzle.db.query.rooms.findFirst({
        where: eq(rooms.code, code),
      });
      exists = !!existing;
    } while (exists);
    return code;
  }

  async create(dto: CreateRoomDto, user: { id: string; username: string }) {
    const code = await this.generateUniqueCode();

    return await this.drizzle.db.transaction(async (tx) => {
      const [newRoom] = await tx
        .insert(rooms)
        .values({
          code,
          name: dto.name,
          mode: dto.mode,
          hostId: user.id,
          problemIds: dto.problemIds,
          maxParticipants: dto.maxParticipants,
          hiddenTestCases: dto.hiddenTestCases,
          bufferVisibility: dto.bufferVisibility,
        })
        .returning();

      await tx.insert(roomParticipants).values({
        roomId: newRoom.id,
        userId: user.id,
        username: user.username,
        isHost: true,
      });

      return this.getByCode(code);
    });
  }

  async getPreview(code: string) {
    const room = await this.drizzle.db.query.rooms.findFirst({
      where: eq(rooms.code, code.toUpperCase()),
      with: { participants: true },
    });

    if (!room) {
      throw new NotFoundException(`Room with code "${code}" not found.`);
    }

    const host = room.participants.find((p) => p.isHost);

    return {
      code: room.code,
      name: room.name,
      mode: room.mode,
      status: room.status,
      hostName: host ? host.username : 'Unknown',
      participantCount: room.participants.length,
      maxParticipants: room.maxParticipants,
      problemCount: room.problemIds.length,
    };
  }

  async getByCode(code: string) {
    const room = await this.drizzle.db.query.rooms.findFirst({
      where: eq(rooms.code, code.toUpperCase()),
      with: { participants: true },
    });

    if (!room) {
      throw new NotFoundException(`Room with code "${code}" not found.`);
    }
    return room;
  }

  async join(code: string, user: { id: string; username: string }, socketId?: string) {
    const room = await this.getByCode(code);

    if (room.participants.length >= room.maxParticipants) {
      throw new BadRequestException('This room is full.');
    }

    const existingParticipant = room.participants.find((p) => p.userId === user.id);

    if (existingParticipant) {
      await this.drizzle.db
        .update(roomParticipants)
        .set({ socketId, updated_at: new Date() })
        .where(eq(roomParticipants.id, existingParticipant.id));
    } else {
      await this.drizzle.db.insert(roomParticipants).values({
        roomId: room.id,
        userId: user.id,
        username: user.username,
        isHost: false,
        socketId,
      });
    }

    return this.getByCode(code);
  }

  async removeParticipantBySocketId(socketId: string) {
    const participant = await this.drizzle.db.query.roomParticipants.findFirst({
      where: eq(roomParticipants.socketId, socketId),
      with: { room: true },
    });

    if (!participant) return null;

    await this.drizzle.db
      .delete(roomParticipants)
      .where(eq(roomParticipants.id, participant.id));

    const remainingParticipants = await this.drizzle.db.query.roomParticipants.findMany({
      where: eq(roomParticipants.roomId, participant.roomId),
    });

    if (remainingParticipants.length === 0) {
      await this.drizzle.db.delete(rooms).where(eq(rooms.id, participant.roomId));
      return null;
    }

    const updatedRoom = await this.getByCode(participant.room.code);
    return { roomCode: participant.room.code, room: updatedRoom };
  }
}