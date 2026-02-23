import { type User, type InsertUser, type PushSubscription, type InsertPushSubscription, pushSubscriptions } from "@shared/schema";
import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";
import { db } from "./db";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  saveSubscription(sub: InsertPushSubscription): Promise<PushSubscription>;
  removeSubscription(endpoint: string): Promise<void>;
  getAllSubscriptions(): Promise<PushSubscription[]>;
  getSubscriptionCount(): Promise<number>;
}

export class DatabaseStorage implements IStorage {
  private users: Map<string, User>;

  constructor() {
    this.users = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async saveSubscription(sub: InsertPushSubscription): Promise<PushSubscription> {
    const existing = await db
      .select()
      .from(pushSubscriptions)
      .where(eq(pushSubscriptions.endpoint, sub.endpoint))
      .limit(1);

    if (existing.length > 0) {
      const [updated] = await db
        .update(pushSubscriptions)
        .set({ p256dh: sub.p256dh, auth: sub.auth })
        .where(eq(pushSubscriptions.endpoint, sub.endpoint))
        .returning();
      return updated;
    }

    const [inserted] = await db
      .insert(pushSubscriptions)
      .values(sub)
      .returning();
    return inserted;
  }

  async removeSubscription(endpoint: string): Promise<void> {
    await db
      .delete(pushSubscriptions)
      .where(eq(pushSubscriptions.endpoint, endpoint));
  }

  async getAllSubscriptions(): Promise<PushSubscription[]> {
    return db.select().from(pushSubscriptions);
  }

  async getSubscriptionCount(): Promise<number> {
    const results = await db.select().from(pushSubscriptions);
    return results.length;
  }
}

export const storage = new DatabaseStorage();
