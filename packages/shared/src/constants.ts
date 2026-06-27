export const APP_NAME = "SALIGAN";
export const APP_FULL_NAME =
  "Student Attendance, Logbook, Internship Goals, Accomplishments, and Notes";
export const APP_DESCRIPTION = "Offline-first internship records and OJT management platform";
export const API_PREFIX = "/api/v1";

export const ROLES = ["intern", "supervisor", "coordinator", "admin"] as const;
export type Role = (typeof ROLES)[number];

export const USER_STATUSES = ["active", "disabled"] as const;
export type UserStatus = (typeof USER_STATUSES)[number];

export const INTERNSHIP_STATUSES = ["draft", "active", "paused", "completed", "archived"] as const;
export type InternshipStatus = (typeof INTERNSHIP_STATUSES)[number];

export const TIME_ENTRY_STATUSES = [
  "draft",
  "present",
  "late",
  "undertime",
  "overtime",
  "absent",
  "rest_day",
  "holiday",
  "fieldwork",
] as const;
export type TimeEntryStatus = (typeof TIME_ENTRY_STATUSES)[number];

export const REVIEW_STATES = [
  "draft",
  "submitted",
  "approved",
  "rejected",
  "correction_requested",
] as const;
export type ReviewState = (typeof REVIEW_STATES)[number];

export const REPORT_PERIOD_TYPES = ["daily", "weekly", "monthly", "custom"] as const;
export type ReportPeriodType = (typeof REPORT_PERIOD_TYPES)[number];

export const SYNC_OPERATION_STATUSES = ["pending", "processing", "completed", "failed"] as const;
export type SyncOperationStatus = (typeof SYNC_OPERATION_STATUSES)[number];
