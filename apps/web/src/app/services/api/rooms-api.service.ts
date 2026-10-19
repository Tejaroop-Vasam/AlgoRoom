import { inject, Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { CreateRoomDto, RoomsControllerClient } from './api-client';
import { CreateRoomRequest, Room, RoomPreview } from './api.types';

@Injectable({
  providedIn: 'root',
})
export class RoomsApiService {
  private readonly roomsClient = inject(RoomsControllerClient);

  createRoom(request: CreateRoomRequest): Promise<Room> {
    return firstValueFrom(
      this.roomsClient.createRoom(request as unknown as CreateRoomDto) as unknown as Observable<Room>,
    );
  }

  getRoomPreview(code: string): Promise<RoomPreview> {
    return firstValueFrom(
      this.roomsClient.getRoomPreview(code) as unknown as Observable<RoomPreview>,
    );
  }

  joinRoom(code: string): Promise<Room> {
    return firstValueFrom(
      this.roomsClient.joinRoom(code) as unknown as Observable<Room>,
    );
  }
}
