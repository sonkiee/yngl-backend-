import { InferInsertModel, InferSelectModel, sql } from "drizzle-orm";
import {
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const anonProfiles = pgTable("anon_profiles", {
  id: uuid("id").defaultRandom().primaryKey(),
  alias: text("alias").unique().notNull(),
  avatar: text("avatar_url"),
  createdAt: timestamp("created_at").default(sql`now()`),
  updatedAt: timestamp("updated_at").default(sql`now()`),
});

export const anonProfileInfos = pgTable("anon_profile_infos", {
  id: uuid("id").defaultRandom().primaryKey(),
  anonProfileId: uuid("anon_profile_id")
    .notNull()
    .references(() => anonProfiles.id),

  ipAddress: varchar("ip_address", { length: 64 }),
  fingerprint: varchar("fingerprint", { length: 255 }).notNull(),
  userAgent: text("user_agent"),
  browser: varchar("browser", { length: 100 }),
  os: varchar("os", { length: 100 }),
  device: varchar("device", { length: 100 }),
  carrier: varchar("carrier", { length: 100 }),
  location: jsonb("location"),

  createdAt: timestamp("created_at").default(sql`now()`),
});

export type AnonProfile = InferSelectModel<typeof anonProfiles>;
export type NewAnonProfile = InferInsertModel<typeof anonProfiles>;

export type AnonProfileInfo = InferSelectModel<typeof anonProfileInfos>;
export type NewAnonProfileInfo = InferInsertModel<typeof anonProfileInfos>;
