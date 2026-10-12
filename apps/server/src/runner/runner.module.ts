import { Module } from '@nestjs/common';
import { RunnerController } from './runner.controller';
import { RunnerService } from './runner.service';
import { ProblemsModule } from '../problems/problems.module';

@Module({
  imports: [ProblemsModule],
  controllers: [RunnerController],
  providers: [RunnerService],
  exports: [RunnerService],
})
export class RunnerModule {}
