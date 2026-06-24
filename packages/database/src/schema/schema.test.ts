import { describe, expect, it } from "vitest";

import {
  auditEvents,
  internshipPlans,
  organizations,
  reportEntries,
  scheduleRules,
  syncOperations,
  timeEntries,
  users,
} from "./index.js";

describe("database schema", () => {
  it("exports canonical baseline tables", () => {
    expect([
      users,
      organizations,
      internshipPlans,
      scheduleRules,
      timeEntries,
      reportEntries,
      syncOperations,
      auditEvents,
    ]).toHaveLength(8);
  });
});
