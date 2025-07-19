import { eq } from "drizzle-orm";
import db from "../../config/db";
import { NewUser, User, users } from "./user.schema";

class UserService {
  async findAll(): Promise<User[]> {
    return db.select().from(users);
  }

  async findById(id: string): Promise<User | null> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result.length ? result[0] : null;
  }

  async findByUsername(username: string): Promise<User | null> {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.username, username));
    return result.length ? result[0] : null;
  }

  async create(userData: NewUser): Promise<User> {
    const [user] = await db.insert(users).values(userData).returning();
    return user;
  }

  async update(id: string, data: Partial<User>): Promise<User | null> {
    const [updated] = await db
      .update(users)
      .set(data)
      .where(eq(users.id, id))
      .returning();

    return updated ?? null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await db.delete(users).where(eq(users.id, id)).returning();
    return result.length > 0;
  }
}

export const userService = new UserService();
