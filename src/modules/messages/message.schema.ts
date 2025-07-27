import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "../users/user.schema";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { anonProfiles } from "../anon/anon.schema";

export const messages = pgTable("messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  receiverId: uuid("receiver_id")
    .notNull()
    .references(() => users.id),
  content: text("content").notNull(),
  anonProfileId: uuid("anon_profile_id").references(() => anonProfiles.id),
  isRead: boolean("is_read").default(false),
  isReplied: boolean("is_replied").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export type Message = InferSelectModel<typeof messages>;
export type NewMessage = InferInsertModel<typeof messages>; // <-- should use InferInsertModel
