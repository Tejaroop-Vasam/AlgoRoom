import { NestFactory } from '@nestjs/core';
import * as fs from 'fs';
import * as path from 'path';
import { AppModule } from './app.module';
import { createSwaggerDocument } from './swagger';

async function exportSwagger() {
  const app = await NestFactory.create(AppModule, { logger: false });
  const document = createSwaggerDocument(app);

  const serverSwaggerPath = path.resolve(__dirname, '../swagger.json');
  fs.writeFileSync(serverSwaggerPath, JSON.stringify(document, null, 2), 'utf8');

  const webSwaggerPath = path.resolve(__dirname, '../../web/swagger.json');
  fs.writeFileSync(webSwaggerPath, JSON.stringify(document, null, 2), 'utf8');

  console.log(`OpenAPI spec successfully exported to:\n- ${serverSwaggerPath}\n- ${webSwaggerPath}`);
  await app.close();
  process.exit(0);
}

exportSwagger().catch((err) => {
  console.error('Failed to export Swagger spec:', err);
  process.exit(1);
});
