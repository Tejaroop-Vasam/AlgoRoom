import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger';
import { runAutoMigrate } from './migrate';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const clientUrl = configService.get<string>('CLIENT_URL');
  const allowedOrigins = Array.from(
    new Set(
      [
        clientUrl,
        'https://tejaroop-vasam.github.io',
        'http://localhost:4200',
        'http://127.0.0.1:4200',
      ].filter(Boolean) as string[],
    ),
  );
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.includes(origin) ||
        origin.endsWith('.github.io') ||
        origin === 'https://tejaroop-vasam.github.io'
      ) {
        return callback(null, true);
      }
      return callback(null, true); // Allow all during dev/launch
    },
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
    }),
  );

  setupSwagger(app);

  try {
    await runAutoMigrate();
  } catch (err) {
    logger.error('Failed to run automated database migrations', err);
  }

  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);

  logger.log(`Server is running on http://localhost:${port}`);
  logger.log(`Swagger docs available at http://localhost:${port}/api/docs`);
}

bootstrap();
