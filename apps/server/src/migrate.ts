import * as path from 'path';
import { Client } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import * as dotenv from 'dotenv';

dotenv.config();

export async function runAutoMigrate(): Promise<void> {
  const dbUrl =
    process.env.DATABASE_URL ||
    `postgresql://${process.env.DB_USER || 'postgres'}:${process.env.DB_PASSWORD || 'strongpassword'}@${process.env.DB_HOST || 'postgres'}:${process.env.DB_DBPORT || process.env.DB_PORT || 5432}/${process.env.DB_DATABASE || 'algoroom'}`;

  console.log('Running automated Drizzle migrations...');
  const client = new Client({ connectionString: dbUrl });

  try {
    await client.connect();
    const db = drizzle(client);
    const migrationsFolder = path.resolve(__dirname, '../drizzle');

    await migrate(db, { migrationsFolder });
    console.log('Database migrations successfully applied!');
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  } finally {
    await client.end().catch(() => {});
  }
}

if (require.main === module) {
  runAutoMigrate()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}
