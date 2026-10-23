import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { RoomsGateway } from './rooms.gateway';
import { WsJwtGuard } from './guards/ws-jwt.guard';
import { DrizzleService } from '../database/schema/rooms.schema';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'super-secret-key',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [RoomsController],
  providers: [RoomsService, RoomsGateway, WsJwtGuard, DrizzleService],
  exports: [RoomsService],
})
export class RoomsModule {}