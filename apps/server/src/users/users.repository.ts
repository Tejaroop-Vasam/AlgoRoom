import { Injectable } from '@nestjs/common';
import { InjectDrizzle } from '@nestjs/drizzle';
import { eq } from 'drizzle-orm';
import { DrizzleDB, users, User, NewUser } from '../database/schema';

@Injectable()
export class UsersRepository {
  constructor(@InjectDrizzle() private readonly db: DrizzleDB) {}

  async findById(id: string): Promise<User | null> {
    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    return user || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.email, email.toLowerCase()))
      .limit(1);

    return user || null;
  }

  async findByGoogleId(googleId: string): Promise<User | null> {
    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.google_id, googleId))
      .limit(1);

    return user || null;
  }

  async create(data: NewUser): Promise<User> {
    const [created] = await this.db.insert(users).values(data).returning();
    return created;
  }

  async update(id: string, data: Partial<NewUser>): Promise<User | null> {
    const [updated] = await this.db
      .update(users)
      .set(data)
      .where(eq(users.id, id))
      .returning();

    return updated || null;
  }
}
