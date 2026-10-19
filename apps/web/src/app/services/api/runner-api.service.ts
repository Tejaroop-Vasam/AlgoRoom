import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import {
  ExecutionResultDto,
  FormatCodeDto,
  FormatLanguage,
  FormatResultDto,
  RunCodeDto,
  RunnerControllerClient,
  SubmissionEvaluationResultDto,
  SubmitCodeDto,
} from './api-client';

export type { FormatLanguage, FormatCodeDto, FormatResultDto };

@Injectable({
  providedIn: 'root',
})
export class RunnerApiService {
  private readonly runnerClient = inject(RunnerControllerClient);

  run(body: RunCodeDto): Promise<ExecutionResultDto> {
    return firstValueFrom(this.runnerClient.run(body));
  }

  submit(body: SubmitCodeDto): Promise<SubmissionEvaluationResultDto> {
    return firstValueFrom(this.runnerClient.submit(body));
  }

  format(body: FormatCodeDto): Promise<FormatResultDto> {
    return firstValueFrom(this.runnerClient.format(body));
  }
}
