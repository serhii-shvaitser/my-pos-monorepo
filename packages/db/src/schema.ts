import {
  createSelectSchema,
  createInsertSchema,
  createUpdateSchema,
} from "drizzle-zod";

import { relations } from "drizzle-orm";

import {
  pgTable,
  uuid,
  text,
  boolean,
  timestamp,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("user_role", [
  "admin",
  "waiter",
  "manager",
  "cook",
]);

export const tableStatusEnum = pgEnum("table_status", [
  "available",
  "occupied",
  "reserved",
]);

export const orderStatusEnum = pgEnum("order_status", [
  "open",
  "paid",
  "cancelled",
]);

export const staffTable = pgTable("staff", {
  id: uuid("id").defaultRandom().primaryKey(),
  code: text("code").notNull().unique(),
  name: text("name").notNull(),
  pinHash: text("pin_hash").notNull(),
  role: roleEnum("role").notNull().default("waiter"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const tablesTable = pgTable("tables", {
  id: uuid("id").defaultRandom().primaryKey(),
  number: text("number").notNull().unique(),
  capacity: integer("capacity").notNull().default(4),
  status: tableStatusEnum("status").notNull().default("available"),
});

export const categoriesTable = pgTable("categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull().unique(),
});

export const productsTable = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  categoryId: uuid("category_id")
    .references(() => categoriesTable.id)
    .notNull(),
  name: text("name").notNull(),
  price: integer("price").notNull(),
  description: text("description"),
  isAvailable: boolean("is_available").default(true),
});

export const ordersTable = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  tableId: uuid("table_id")
    .references(() => tablesTable.id)
    .notNull(),
  waiterId: uuid("waiter_id").references(() => staffTable.id),
  status: orderStatusEnum("status").notNull().default("open"),
  totalAmount: integer("total_amount").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  closedAt: timestamp("closed_at"),
});

export const orderItemsTable = pgTable("order_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  orderId: uuid("order_id")
    .references(() => ordersTable.id)
    .notNull(),
  productId: uuid("product_id")
    .references(() => productsTable.id)
    .notNull(),
  quantity: integer("quantity").notNull().default(1),
  unitPrice: integer("unit_price").notNull(),
});

export const ordersRelations = relations(ordersTable, ({ many }) => ({
  items: many(orderItemsTable),
}));

export const orderItemsRelations = relations(orderItemsTable, ({ one }) => ({
  order: one(ordersTable, {
    fields: [orderItemsTable.orderId],
    references: [ordersTable.id],
  }),
  product: one(productsTable, {
    fields: [orderItemsTable.productId],
    references: [productsTable.id],
  }),
}));

// export const InsertStaffSchema = createInsertSchema(staffTable);

export const SelectTableSchema = createSelectSchema(tablesTable);
export const InsertTableSchema = createInsertSchema(tablesTable);
export const UpdateTableSchema = createUpdateSchema(tablesTable);

export const SelectProductSchema = createSelectSchema(productsTable);
export const InsertProductSchema = createInsertSchema(productsTable);
export const UpdateProductSchema = createUpdateSchema(productsTable);

export const SelectCategorySchema = createSelectSchema(categoriesTable);
export const InsertCategorySchema = createInsertSchema(categoriesTable);
export const UpdateCategorySchema = createUpdateSchema(categoriesTable);

export const SelectOrderSchema = createSelectSchema(ordersTable);
export const InsertOrderSchema = createInsertSchema(ordersTable);
export const UpdateOrderSchema = createUpdateSchema(ordersTable);

export const SelectOrderItemSchema = createSelectSchema(orderItemsTable);
export const InsertOrderItemSchema = createInsertSchema(orderItemsTable);
export const UpdateOrderItemSchema = createUpdateSchema(orderItemsTable);
