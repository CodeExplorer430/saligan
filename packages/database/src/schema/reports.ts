import {
  bigint,
  check,
  date,
  index,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

import { reportPeriodTypeEnum, reportStatusEnum } from "./enums.js";
import { users } from "./identity.js";
import { internshipPlans } from "./internships.js";

export const reportEntries = pgTable(
  "report_entries",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    internshipPlanId: uuid("internship_plan_id")
      .notNull()
      .references(() => internshipPlans.id, { onDelete: "cascade" }),
    periodType: reportPeriodTypeEnum("period_type").notNull(),
    periodStart: date("period_start").notNull(),
    periodEnd: date("period_end").notNull(),
    summary: text("summary").notNull().default(""),
    body: text("body").notNull().default(""),
    status: reportStatusEnum("status").notNull().default("draft"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("report_entries_plan_period_idx").on(
      table.internshipPlanId,
      table.periodStart,
      table.periodEnd,
    ),
    check("report_entries_period_order", sql`${table.periodEnd} >= ${table.periodStart}`),
  ],
);

export const attachments = pgTable(
  "attachments",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    ownerUserId: uuid("owner_user_id")
      .notNull()
      .references(() => users.id, { onDelete: "restrict" }),
    entityType: varchar("entity_type", { length: 80 }).notNull(),
    entityId: uuid("entity_id").notNull(),
    filename: varchar("filename", { length: 255 }).notNull(),
    contentType: varchar("content_type", { length: 150 }).notNull(),
    storagePath: text("storage_path").notNull(),
    sizeBytes: bigint("size_bytes", { mode: "number" }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("attachments_entity_idx").on(table.entityType, table.entityId),
    check("attachments_size_nonnegative", sql`${table.sizeBytes} >= 0`),
  ],
);
