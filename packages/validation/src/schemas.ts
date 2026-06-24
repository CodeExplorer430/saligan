import {
  INTERNSHIP_STATUSES,
  REPORT_PERIOD_TYPES,
  REVIEW_STATES,
  TIME_ENTRY_STATUSES,
} from "@saligan/shared";
import { z } from "zod";

const isoDate = z.iso.date();
const isoDateTime = z.iso.datetime({ offset: true });
const nonEmptyText = z.string().trim().min(1).max(10_000);

export const createInternshipInputSchema = z
  .object({
    internUserId: z.uuid(),
    organizationId: z.uuid(),
    supervisorUserId: z.uuid().nullable().optional(),
    roleTitle: z.string().trim().min(1).max(120),
    companyName: z.string().trim().min(1).max(200),
    departmentName: z.string().trim().min(1).max(200).nullable().optional(),
    targetMinutes: z.int().positive().max(1_000_000),
    timezone: z.string().trim().min(1).max(100),
    startDate: isoDate,
    expectedEndDate: isoDate.nullable().optional(),
    status: z.enum(INTERNSHIP_STATUSES).default("draft"),
  })
  .strict();

export const createScheduleInputSchema = z
  .object({
    internshipPlanId: z.uuid(),
    dayOfWeek: z.int().min(1).max(7),
    shiftStart: z.iso.time({ precision: -1 }),
    shiftEnd: z.iso.time({ precision: -1 }),
    breakStart: z.iso.time({ precision: -1 }).nullable().optional(),
    breakEnd: z.iso.time({ precision: -1 }).nullable().optional(),
    overtimeAllowed: z.boolean().default(false),
    isWorkday: z.boolean().default(true),
  })
  .strict();

export const createTimeLogInputSchema = z
  .object({
    internshipPlanId: z.uuid(),
    workDate: isoDate,
    status: z.enum(TIME_ENTRY_STATUSES).default("draft"),
    reviewState: z.enum(REVIEW_STATES).default("draft"),
    correctionReason: z.string().trim().min(1).max(2_000).nullable().optional(),
    segments: z
      .array(
        z
          .object({
            segmentType: z.enum(["work", "break"]),
            startTime: isoDateTime,
            endTime: isoDateTime.nullable().optional(),
            source: z.enum(["manual", "clock", "sync_import", "correction"]),
          })
          .strict(),
      )
      .max(32)
      .default([]),
  })
  .strict();

export const createReportInputSchema = z
  .object({
    internshipPlanId: z.uuid(),
    periodType: z.enum(REPORT_PERIOD_TYPES),
    periodStart: isoDate,
    periodEnd: isoDate,
    summary: z.string().trim().max(2_000).default(""),
    body: nonEmptyText,
    status: z.enum(["draft", "submitted", "approved", "rejected"]).default("draft"),
  })
  .strict()
  .refine((value) => value.periodEnd >= value.periodStart, {
    message: "periodEnd must be on or after periodStart",
    path: ["periodEnd"],
  });

export type CreateInternshipInput = z.infer<typeof createInternshipInputSchema>;
export type CreateScheduleInput = z.infer<typeof createScheduleInputSchema>;
export type CreateTimeLogInput = z.infer<typeof createTimeLogInputSchema>;
export type CreateReportInput = z.infer<typeof createReportInputSchema>;
