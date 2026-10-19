import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { RunCodeDto, RunnerControllerClient, SubmitCodeDto } from './api-client';

@Injectable({
  providedIn: 'root',
})
export class RunnerApiService {
  private readonly runnerClient = inject(RunnerControllerClient);

  run(body: RunCodeDto): Promise<void> {
    return firstValueFrom(this.runnerClient.run(body));
  }

  submit(body: SubmitCodeDto): Promise<void> {
    return firstValueFrom(this.runnerClient.submit(body));
  }
}
