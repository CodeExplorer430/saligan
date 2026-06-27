import { sql } from "drizzle-orm";
import {
  check,
  date,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

import {
  reviewStateEnum,
  segmentSourceEnum,
  segmentTypeEnum,
  timeEntryStatusEnum,
} from "./enums.js";
import { internshipPlans } from "./internships.js";

export const timeEntries = pgTable(
  "time_entries",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    internshipPlanId: uuid("internship_plan_id")
      .notNull()
      .references(() => internshipPlans.id, { onDelete: "cascade" }),
    workDate: date("work_date").notNull(),
    status: timeEntryStatusEnum("status").notNull().default("draft"),
    reviewState: reviewStateEnum("review_state").notNull().default("draft"),
    computedRegularMinutes: integer("computed_regular_minutes").notNull().default(0),
    computedOvertimeMinutes: integer("computed_overtime_minutes").notNull().default(0),
    computedUndertimeMinutes: integer("computed_undertime_minutes").notNull().default(0),
    correctionReason: text("correction_reason"),
    version: integer("version").notNull().default(1),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("time_entries_plan_work_date_unique").on(table.internshipPlanId, table.workDate),
    index("time_entries_review_state_idx").on(table.reviewState),
    check(
      "time_entries_nonnegative_minutes",
      sql`${table.computedRegularMinutes} >= 0 and ${table.computedOvertimeMinutes} >= 0 and ${table.computedUndertimeMinutes} >= 0`,
    ),
    check("time_entries_positive_version", sql`${table.version} > 0`),
  ],
);

export const timeSegments = pgTable(
  "time_segments",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    timeEntryId: uuid("time_entry_id")
      .notNull()
      .references(() => timeEntries.id, { onDelete: "cascade" }),
    segmentType: segmentTypeEnum("segment_type").notNull(),
    startTime: timestamp("start_time", { withTimezone: true }).notNull(),
    endTime: timestamp("end_time", { withTimezone: true }),
    source: segmentSourceEnum("source").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("time_segments_entry_idx").on(table.timeEntryId),
    check(
      "time_segments_end_after_start",
      sql`${table.endTime} is null or ${table.endTime} > ${table.startTime}`,
    ),
  ],
);
