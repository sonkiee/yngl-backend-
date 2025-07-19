import { InferInsertModel, InferSelectModel, sql } from "drizzle-orm";
import {
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const anonProfile = pgTable("anon_profile", {
  id: uuid("id").defaultRandom().primaryKey(),
  alias: text("alias").unique().notNull(), // e.g. 'curious_cat23'
  avatar: text("avatar_url"),

  createdAt: timestamp("created_at").default(sql`now()`),
  updatedAt: timestamp("updated_at").default(sql`now()`),
});

export const anonProfileInfo = pgTable("anon_profile_info", {
  id: uuid("id").defaultRandom().primaryKey(),
  anonProfileId: uuid("anon_profile_id")
    .notNull()
    .references(() => anonProfile.id),

  ipAddress: varchar("ip_address", { length: 64 }),
  userAgent: text("user_agent"),
  browser: varchar("browser", { length: 100 }),
  os: varchar("os", { length: 100 }),
  device: varchar("device", { length: 100 }),
  carrier: varchar("carrier", { length: 100 }),
  fingerprint: varchar("fingerprint", { length: 255 }),
  location: jsonb("location"), // { city, country, lat, lon }

  createdAt: timestamp("created_at").default(sql`now()`),
});

export type AnonProfile = InferSelectModel<typeof anonProfile>;
export type NewAnonProfile = InferInsertModel<typeof anonProfile>;

export type AnonProfileInfo = InferSelectModel<typeof anonProfileInfo>;
export type NewAnonProfileInfo = InferInsertModel<typeof anonProfileInfo>;
