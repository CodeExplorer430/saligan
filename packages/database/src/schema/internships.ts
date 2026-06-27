import {
  boolean,
  check,
  date,
  index,
  integer,
  pgTable,
  time,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

import { internshipStatusEnum } from "./enums.js";
import { organizations, users } from "./identity.js";

export const internshipPlans = pgTable(
  "internship_plans",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    internUserId: uuid("intern_user_id")
      .notNull()
      .references(() => users.id, { onDelete: "restrict" }),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "restrict" }),
    supervisorUserId: uuid("supervisor_user_id").references(() => users.id, {
      onDelete: "set null",
    }),
    roleTitle: varchar("role_title", { length: 120 }).notNull(),
    companyName: varchar("company_name", { length: 200 }).notNull(),
    departmentName: varchar("department_name", { length: 200 }),
    targetMinutes: integer("target_minutes").notNull(),
    timezone: varchar("timezone", { length: 100 }).notNull(),
    startDate: date("start_date").notNull(),
    expectedEndDate: date("expected_end_date"),
    status: internshipStatusEnum("status").notNull().default("draft"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("internship_plans_intern_idx").on(table.internUserId),
    index("internship_plans_organization_idx").on(table.organizationId),
    check("internship_plans_target_minutes_positive", sql`${table.targetMinutes} > 0`),
    check(
      "internship_plans_expected_end_after_start",
      sql`${table.expectedEndDate} is null or ${table.expectedEndDate} >= ${table.startDate}`,
    ),
  ],
);

export const scheduleRules = pgTable(
  "schedule_rules",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    internshipPlanId: uuid("internship_plan_id")
      .notNull()
      .references(() => internshipPlans.id, { onDelete: "cascade" }),
    dayOfWeek: integer("day_of_week").notNull(),
    shiftStart: time("shift_start").notNull(),
    shiftEnd: time("shift_end").notNull(),
    breakStart: time("break_start"),
    breakEnd: time("break_end"),
    overtimeAllowed: boolean("overtime_allowed").notNull().default(false),
    isWorkday: boolean("is_workday").notNull().default(true),
  },
  (table) => [
    uniqueIndex("schedule_rules_plan_day_unique").on(table.internshipPlanId, table.dayOfWeek),
    check("schedule_rules_day_range", sql`${table.dayOfWeek} between 1 and 7`),
    check("schedule_rules_shift_order", sql`${table.shiftEnd} > ${table.shiftStart}`),
    check(
      "schedule_rules_break_pair",
      sql`(${table.breakStart} is null and ${table.breakEnd} is null) or (${table.breakStart} is not null and ${table.breakEnd} is not null and ${table.breakEnd} > ${table.breakStart})`,
    ),
  ],
);
