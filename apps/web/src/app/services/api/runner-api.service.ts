import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
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
  private readonly url = `${environment.apiUrl}/api`;

  run(body: RunCodeDto): Promise<ExecutionResultDto> {
    return firstValueFrom(this.http.post<ExecutionResultDto>(`${this.url}/run`, body));
  }

  submit(body: SubmitCodeDto): Promise<SubmissionEvaluationResultDto> {
    return firstValueFrom(this.http.post<SubmissionEvaluationResultDto>(`${this.url}/submit`, body));
  }

  format(body: FormatCodeDto): Promise<FormatResultDto> {
    return firstValueFrom(this.http.post<FormatResultDto>(`${this.url}/format`, body));
  }
}
