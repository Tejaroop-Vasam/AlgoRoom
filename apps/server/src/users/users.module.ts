import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { GoogleAuthService } from '../auth/google-auth.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, GoogleAuthService, JwtAuthGuard],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
