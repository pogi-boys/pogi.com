import { createId } from "@paralleldrive/cuid2";
import { sql } from "drizzle-orm";
import { index, mysqlEnum, timestamp, varchar } from "drizzle-orm/mysql-core";

import { mySqlTable } from "./_table";

export const users = mySqlTable("user", {
  id: varchar("id", { length: 128 })
    .$defaultFn(() => createId())
    .primaryKey(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updatedAt").onUpdateNow(),

  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  firstName: varchar("firstName", { length: 50 }).notNull(),
  lastName: varchar("lastName", { length: 50 }).notNull(),
});

export const employees = mySqlTable(
  "employee",
  {
    id: varchar("id", { length: 128 })
      .$defaultFn(() => createId())
      .primaryKey(),
    createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp("updatedAt").onUpdateNow(),

    userId: varchar("user_id", { length: 128 }).unique().notNull(),
    type: mysqlEnum("type", [
      "technician",
      "assistant",
      "associate",
      "senior",
      "manager",
    ]).notNull(),
  },
  (employee) => ({
    userIdIdx: index("userId_idx").on(employee.userId),
  }),
);

export const customers = mySqlTable(
  "customer",
  {
    id: varchar("id", { length: 128 })
      .$defaultFn(() => createId())
      .primaryKey(),
    createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp("updatedAt").onUpdateNow(),

    userId: varchar("user_id", { length: 128 }).unique().notNull(),
  },
  (customer) => ({
    userIdIdx: index("userId_idx").on(customer.userId),
  }),
);
