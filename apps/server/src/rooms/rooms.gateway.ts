import { UseGuards } from '@nestjs/common';
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { RoomsService } from './rooms.service';
import { WsJwtGuard, AuthenticatedSocket } from './guards/ws-jwt.guard';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway({
  cors: { origin: '*' },
  namespace: 'rooms',
})
export class RoomsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly roomsService: RoomsService,
    private readonly jwtService: JwtService,
  ) {}

  async handleConnection(client: AuthenticatedSocket) {
    try {
      const token =
        client.handshake.auth?.token ||
        client.handshake.headers?.authorization?.split(' ')[1] ||
        (client.handshake.query?.token as string);

      if (!token) {
        client.disconnect();
        return;
      }

      const payload = await this.jwtService.verifyAsync(token);
      client.user = { id: payload.sub, username: payload.username };
    } catch {
      client.disconnect();
    }
  }

  async handleDisconnect(client: AuthenticatedSocket) {
    const result = await this.roomsService.removeParticipantBySocketId(client.id);
    if (result) {
      this.server.to(result.roomCode).emit('roomStateUpdated', result.room);
    }
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('joinLobby')
  async handleJoinLobby(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() payload: { code: string },
  ) {
    try {
      const room = await this.roomsService.join(payload.code, client.user, client.id);
      client.join(room.code);
      this.server.to(room.code).emit('roomStateUpdated', room);
    } catch (error) {
      client.emit('error', { message: error });
    }
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('crdtUpdate')
  handleCrdtUpdate(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() payload: { roomCode: string; changes: any },
  ) {
    client.to(payload.roomCode).emit('crdtSync', {
      user: client.user,
      changes: payload.changes,
    });
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('telemetryUpdate')
  handleTelemetry(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() payload: { roomCode: string; telemetry: any },
  ) {
    client.to(payload.roomCode).emit('telemetryStream', {
      user: client.user,
      telemetry: payload.telemetry,
    });
  }
}