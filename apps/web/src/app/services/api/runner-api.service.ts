import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { GuestSessionService } from '../guest-session.service';
import {
  ExecutionResultDto,
  FormatCodeDto,
  FormatResultDto,
  RunCodeDto,
  SubmissionEvaluationResultDto,
  SubmitCodeDto,
} from './api.types';

@Injectable({ providedIn: 'root' })
export class RunnerApiService {
  private readonly http = inject(HttpClient);
  private readonly guest = inject(GuestSessionService);
  private readonly url = `${environment.apiUrl}/api`;

  run(body: RunCodeDto, room?: string): Promise<ExecutionResultDto> {
    return firstValueFrom(this.http.post<ExecutionResultDto>(`${this.url}/run`, body, this.roomOptions(room)));
  }

  submit(body: SubmitCodeDto, room?: string): Promise<SubmissionEvaluationResultDto> {
    return firstValueFrom(this.http.post<SubmissionEvaluationResultDto>(`${this.url}/submit`, body, this.roomOptions(room)));
  }

  format(body: FormatCodeDto): Promise<FormatResultDto> {
    return firstValueFrom(this.http.post<FormatResultDto>(`${this.url}/format`, body));
  }

  private roomOptions(room?: string) {
    return room ? { params: { room }, headers: { 'X-Guest-Token': this.guest.token } } : undefined;
  }
}
