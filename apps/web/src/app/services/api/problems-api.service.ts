import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ProblemDetailResponseDto, ProblemsListResponse, ProblemsQuery } from './api.types';

@Injectable({ providedIn: 'root' })
export class ProblemsApiService {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/problems`;

  getProblems({ difficulty, search, page = 1, limit = 20 }: ProblemsQuery = {}): Promise<ProblemsListResponse> {
    const params: Record<string, string | number> = { page, limit };
    if (difficulty) params['difficulty'] = difficulty;
    if (search) params['search'] = search;
    return firstValueFrom(this.http.get<ProblemsListResponse>(this.url, { params }));
  }

  getProblem(id: number): Promise<ProblemDetailResponseDto> {
    return firstValueFrom(this.http.get<ProblemDetailResponseDto>(`${this.url}/${id}`));
  }
}
