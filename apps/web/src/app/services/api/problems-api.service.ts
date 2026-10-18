import { inject, Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { ProblemsControllerClient } from './api-client';
import { Difficulty, ProblemsListResponse, ProblemsQuery } from './api.types';

@Injectable({
  providedIn: 'root',
})
export class ProblemsApiService {
  private readonly problemsClient = inject(ProblemsControllerClient);

  async getProblems(query: ProblemsQuery = {}): Promise<ProblemsListResponse> {
    const res = await firstValueFrom(
      this.problemsClient.getProblems(
        query.difficulty,
        query.search,
        query.page,
        query.limit,
      ),
    );

    return {
      problems: (res?.problems ?? []).map(p => ({
        id: p.id,
        title: p.title,
        difficulty: p.difficulty as Difficulty,
        createdAt: p.createdAt ? (p.createdAt instanceof Date ? p.createdAt.toISOString() : String(p.createdAt)) : undefined,
        updatedAt: p.updatedAt ? (p.updatedAt instanceof Date ? p.updatedAt.toISOString() : String(p.updatedAt)) : undefined,
      })),
      total: res?.total ?? 0,
      page: res?.page ?? 1,
      limit: res?.limit ?? 20,
      totalPages: res?.totalPages ?? 0,
    };
  }

  getProblem(id: number): Promise<unknown> {
    return firstValueFrom(this.problemsClient.getProblem(id));
  }
}
