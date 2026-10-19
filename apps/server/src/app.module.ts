import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { StorageModule } from './storage/storage.module';
import { UsersModule } from './users/users.module';
import { ProblemsModule } from './problems/problems.module';
import { RunnerModule } from './runner/runner.module';
import { RoomsModule } from './rooms/rooms.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '../../.env'],
    }),
    DatabaseModule,
    StorageModule,
    UsersModule,
    ProblemsModule,
    RunnerModule,
    RoomsModule,
  ],
})
export class AppModule {}
