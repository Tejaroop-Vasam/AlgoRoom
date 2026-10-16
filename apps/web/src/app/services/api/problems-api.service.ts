import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../configs/api.config';
import { ProblemList, ProblemsListResponse, ProblemsQuery, ProblemTag } from './api.types';

@Injectable({
  providedIn: 'root',
})
export class ProblemsApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);

  getProblems(query: ProblemsQuery = {}): Observable<ProblemsListResponse> {
    let params = new HttpParams();
    if (query.search) params = params.set('search', query.search);
    if (query.difficulty) params = params.set('difficulty', query.difficulty);
    if (query.tags?.length) params = params.set('tags', query.tags.join(','));
    if (query.list) params = params.set('list', query.list);
    if (query.page) params = params.set('page', query.page);
    if (query.limit) params = params.set('limit', query.limit);

    return this.http.get<ProblemsListResponse>(`${this.baseUrl}/problems`, { params });
  }

  getTags(): Observable<ProblemTag[]> {
    return this.http.get<ProblemTag[]>(`${this.baseUrl}/problems/tags`);
  }

  getLists(): Observable<ProblemList[]> {
    return this.http.get<ProblemList[]>(`${this.baseUrl}/problem-lists`);
  }
}
