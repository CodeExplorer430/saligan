import { describe, expect, it } from "vitest";

import {
  createInternshipInputSchema,
  createReportInputSchema,
  createScheduleInputSchema,
  createTimeLogInputSchema,
} from "./schemas.js";

const ids = {
  internship: "00000000-0000-4000-8000-000000000001",
  organization: "00000000-0000-4000-8000-000000000002",
  user: "00000000-0000-4000-8000-000000000003",
};

describe("input schemas", () => {
  it("accepts minimum valid internship input", () => {
    const result = createInternshipInputSchema.safeParse({
      internUserId: ids.user,
      organizationId: ids.organization,
      roleTitle: "Software Engineering Intern",
      companyName: "Example Company",
      targetMinutes: 28_800,
      timezone: "Asia/Manila",
      startDate: "2026-06-24",
    });

    expect(result.success).toBe(true);
  });

  it("rejects malformed schedule and time-log fields", () => {
    expect(
      createScheduleInputSchema.safeParse({
        internshipPlanId: "not-a-uuid",
        dayOfWeek: 8,
        shiftStart: "08:00",
        shiftEnd: "17:00",
      }).success,
    ).toBe(false);

    expect(
      createTimeLogInputSchema.safeParse({
        internshipPlanId: ids.internship,
        workDate: "24-06-2026",
        status: "unknown",
      }).success,
    ).toBe(false);
  });

  it("rejects reversed report periods", () => {
    const result = createReportInputSchema.safeParse({
      internshipPlanId: ids.internship,
      periodType: "weekly",
      periodStart: "2026-06-30",
      periodEnd: "2026-06-24",
      body: "Synthetic report content",
    });

    expect(result.success).toBe(false);
  });
});
