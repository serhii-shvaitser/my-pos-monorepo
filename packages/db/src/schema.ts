import { pgTable, uuid, text, boolean, timestamp } from "drizzle-orm/pg-core";

export const staffTable = pgTable("staff", {
  id: uuid("id").defaultRandom().primaryKey(),
  code: text("code").notNull().unique(), // типу A12
  name: text("name").notNull(),
  pinHash: text("pin_hash").notNull(),
  role: text("role").notNull().default("waiter"), // waiter | admin
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
