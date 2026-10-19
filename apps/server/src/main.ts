import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const clientUrl = configService.get<string>('CLIENT_URL');
  const allowedOrigins = Array.from(
    new Set([clientUrl, 'http://localhost:4200', 'http://127.0.0.1:4200'].filter(Boolean) as string[]),
  );
  app.enableCors({
    origin: allowedOrigins,
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

  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);

  logger.log(`Server is running on http://localhost:${port}`);
  logger.log(`Swagger docs available at http://localhost:${port}/api/docs`);
}

bootstrap();
