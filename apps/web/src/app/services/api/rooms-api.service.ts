import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../configs/api.config';
import { CreateRoomRequest, Room, RoomPreview } from './api.types';

@Injectable({
  providedIn: 'root',
})
export class RoomsApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);

  createRoom(request: CreateRoomRequest): Observable<Room> {
    return this.http.post<Room>(`${this.baseUrl}/rooms`, request);
  }

  getRoomPreview(code: string): Observable<RoomPreview> {
    return this.http.get<RoomPreview>(`${this.baseUrl}/rooms/${encodeURIComponent(code)}`);
  }

  joinRoom(code: string): Observable<Room> {
    return this.http.post<Room>(`${this.baseUrl}/rooms/${encodeURIComponent(code)}/join`, {});
  }
}
