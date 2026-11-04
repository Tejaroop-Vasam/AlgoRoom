import { Logger } from '@nestjs/common';
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomsService } from './rooms.service';

export interface RoomSocket extends Socket {
  user: {
    id: string;
    username: string;
  };
}

@WebSocketGateway({
  cors: { origin: '*' },
  namespace: 'rooms',
})
export class RoomsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(RoomsGateway.name);

  @WebSocketServer()
  server: Server;

  constructor(private readonly roomsService: RoomsService) {}

  async handleConnection(client: RoomSocket) {
    try {
      const username =
        client.handshake.auth?.username ||
        (client.handshake.query?.username as string) ;

      const userId =
        client.handshake.auth?.userId ||
        (client.handshake.query?.userId as string) ||
        client.id;

      client.user = { id: userId, username };

      const roomCode =
        client.handshake.auth?.roomCode ||
        (client.handshake.query?.roomCode as string);

      this.logger.log(`Client connected: ${client.id} (user: ${username}, room: ${roomCode || 'none'})`);

      if (roomCode) {
        await client.join(roomCode);
        const updatedRoom = await this.roomsService.associateSocket(roomCode, client.id, username, userId);
        if (updatedRoom) {
          client.emit('roomJoined', updatedRoom);
          this.server.to(roomCode).emit('roomStateUpdated', updatedRoom);
        }
      }
    } catch (err: any) {
      this.logger.error(`Error in handleConnection for socket ${client.id}: ${err?.message}`);
    }
  }

  async handleDisconnect(client: RoomSocket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    const result = await this.roomsService.removeParticipantBySocketId(client.id);
    if (result) {
      this.server.to(result.roomCode).emit('roomStateUpdated', result.room);
    }
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @ConnectedSocket() client: RoomSocket,
    @MessageBody() payload: { roomCode: string; username?: string; userId?: string },
  ) {
    const roomCode = payload?.roomCode;
    if (!roomCode) return;

    const username = payload.username || client.user?.username;
    const userId = payload.userId || client.user?.id || client.id;
    client.user = { id: userId, username };

    await client.join(roomCode);
    const updatedRoom = await this.roomsService.associateSocket(roomCode, client.id, username, userId);
    if (updatedRoom) {
      client.emit('roomJoined', updatedRoom);
      this.server.to(roomCode).emit('roomStateUpdated', updatedRoom);
    }
  }

  @SubscribeMessage('leaveRoom')
  async handleLeaveRoom(
    @ConnectedSocket() client: RoomSocket,
    @MessageBody() payload: { roomCode: string },
  ) {
    const roomCode = payload?.roomCode;
    if (!roomCode) return;

    await client.leave(roomCode);
    const updatedRoom = await this.roomsService.leaveRoom(roomCode, client.id);
    if (updatedRoom) {
      this.server.to(roomCode).emit('roomStateUpdated', updatedRoom);
    }
  }

  @SubscribeMessage('crdtUpdate')
  handleCrdtUpdate(
    @ConnectedSocket() client: RoomSocket,
    @MessageBody() payload: { roomCode: string; changes: any },
  ) {
    client.to(payload.roomCode).emit('crdtSync', {
      user: client.user,
      changes: payload.changes,
    });
  }

  @SubscribeMessage('telemetryUpdate')
  handleTelemetry(
    @ConnectedSocket() client: RoomSocket,
    @MessageBody() payload: { roomCode: string; telemetry: any },
  ) {
    client.to(payload.roomCode).emit('telemetryStream', {
      user: client.user,
      telemetry: payload.telemetry,
    });
  }
}
