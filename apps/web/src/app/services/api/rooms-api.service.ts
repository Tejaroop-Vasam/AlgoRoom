import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { API_BASE_URL, CreateRoomDto, RoomsControllerClient } from './api-client';
import { CreateRoomRequest, Room, RoomPreview } from './api.types';

@Injectable({
  providedIn: 'root',
})
export class RoomsApiService {
  private readonly roomsClient = inject(RoomsControllerClient);
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL, { optional: true }) || '';

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

  joinRoom(code: string, username?: string): Promise<Room> {
    if (username?.trim()) {
      return firstValueFrom(
        this.http.post<Room>(
          `${this.baseUrl}/rooms/${encodeURIComponent(code)}/join`,
          { username: username.trim() },
          { withCredentials: true },
        ),
      );
    }
    return firstValueFrom(
      this.roomsClient.joinRoom(code) as unknown as Observable<Room>,
    );
  }
}
