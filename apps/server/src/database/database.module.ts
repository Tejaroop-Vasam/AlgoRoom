import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DrizzleModule } from '@nestjs/drizzle';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';

@Global()
@Module({
  imports: [
    DrizzleModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const connectionString = config.get<string>('DATABASE_URL');
        return {
          drizzle,
          connection: connectionString || {
            user: config.get<string>('DB_USER'),
            host: config.get<string>('DB_HOST'),
            database: config.get<string>('DB_DATABASE'),
            port: Number(
              config.get<string>('DB_DBPORT') ||
                config.get<string>('DB_PORT') ||
                5432,
            ),
            password: config.get<string>('DB_PASSWORD'),
          },
          schema,
        };
      },
    }),
  ],
  exports: [DrizzleModule],
})
export class DatabaseModule {}
