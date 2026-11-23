import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { GuestSessionService } from '../guest-session.service';
import { CreateRoomRequest, Room, RoomPreview } from './api.types';

@Injectable({ providedIn: 'root' })
export class RoomsApiService {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/rooms`;
  private readonly options = { headers: { 'X-Guest-Token': inject(GuestSessionService).token } };

  createRoom(request: CreateRoomRequest): Promise<Room> {
    return firstValueFrom(this.http.post<Room>(this.url, request, this.options));
  }

  getRoomPreview(code: string): Promise<RoomPreview> {
    return firstValueFrom(this.http.get<RoomPreview>(`${this.url}/${encodeURIComponent(code)}`, this.options));
  }

  joinRoom(code: string, playerName: string): Promise<Room> {
    return firstValueFrom(this.http.post<Room>(`${this.url}/${encodeURIComponent(code)}/join`, { playerName }, this.options));
  }
}
