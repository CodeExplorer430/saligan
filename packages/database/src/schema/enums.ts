import { pgEnum } from "drizzle-orm/pg-core";

export const userStatusEnum = pgEnum("user_status", ["active", "disabled"]);
export const organizationTypeEnum = pgEnum("organization_type", [
  "school",
  "company",
  "department",
  "personal",
]);
export const roleEnum = pgEnum("role", ["intern", "supervisor", "coordinator", "admin"]);
export const internshipStatusEnum = pgEnum("internship_status", [
  "draft",
  "active",
  "paused",
  "completed",
  "archived",
]);
export const timeEntryStatusEnum = pgEnum("time_entry_status", [
  "draft",
  "present",
  "late",
  "undertime",
  "overtime",
  "absent",
  "rest_day",
  "holiday",
  "fieldwork",
]);
export const reviewStateEnum = pgEnum("review_state", [
  "draft",
  "submitted",
  "approved",
  "rejected",
  "correction_requested",
]);
export const segmentTypeEnum = pgEnum("segment_type", ["work", "break"]);
export const segmentSourceEnum = pgEnum("segment_source", [
  "manual",
  "clock",
  "sync_import",
  "correction",
]);
export const reportPeriodTypeEnum = pgEnum("report_period_type", [
  "daily",
  "weekly",
  "monthly",
  "custom",
]);
export const reportStatusEnum = pgEnum("report_status", [
  "draft",
  "submitted",
  "approved",
  "rejected",
]);
export const reviewDecisionEnum = pgEnum("review_decision", [
  "approved",
  "rejected",
  "correction_requested",
]);
export const syncActionEnum = pgEnum("sync_action", ["create", "update", "delete"]);
export const syncStatusEnum = pgEnum("sync_status", [
  "pending",
  "processing",
  "completed",
  "failed",
]);
