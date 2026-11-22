import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { RoomsGateway } from './rooms.gateway';
import { WsJwtGuard } from './guards/ws-jwt.guard';
import { DrizzleService } from '../database/schema/rooms.schema';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET') || process.env.JWT_SECRET || 'super-secret-key',
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  controllers: [RoomsController],
  providers: [RoomsService, RoomsGateway, WsJwtGuard, DrizzleService],
  exports: [RoomsService],
})
export class RoomsModule {}