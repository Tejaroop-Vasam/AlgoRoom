import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { RoomHostSessionService } from '../room-host-session.service';
import { RoomsControllerClient } from './api-client';
import { CreateRoomRequest, Room, RoomPreview } from './api.types';

@Injectable({ providedIn: 'root' })
export class RoomsApiService {
  private readonly roomsClient = inject(RoomsControllerClient);
  private readonly hostSessions = inject(RoomHostSessionService);

  async createRoom(request: CreateRoomRequest): Promise<Room> {
    const { hostSession, ...room } = await firstValueFrom(this.roomsClient.createRoom(request));
    if (hostSession) {
      this.hostSessions.start(room.code, room.host.id, hostSession);
    }
    return room;
  }

  getRoomPreview(code: string): Promise<RoomPreview> {
    return firstValueFrom(this.roomsClient.getRoomPreview(code));
  }

  joinRoom(code: string): Promise<Room> {
    return firstValueFrom(this.roomsClient.joinRoom(code));
  }
}
