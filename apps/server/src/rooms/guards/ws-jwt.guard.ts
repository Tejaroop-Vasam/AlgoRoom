import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

export interface AuthenticatedSocket extends Socket {
  user: {
    id: string;
    username: string;
  };
}

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client: AuthenticatedSocket = context.switchToWs().getClient();
    if (client.user?.id) {
      return true;
    }
    const token =
      client.handshake.auth?.token ||
      client.handshake.headers?.authorization?.split(' ')[1] ||
      (client.handshake.query?.token as string);

    if (!token) {
      throw new WsException('Missing authentication token.');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);
      client.user = {
        id: payload.id || payload.sub,
        username: payload.username || payload.email,
      };
      return true;
    } catch (err) {
      throw new WsException(`Invalid token: ${err}`);
    }
  }
}