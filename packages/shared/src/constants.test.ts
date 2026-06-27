import { describe, expect, it } from "vitest";

import { API_PREFIX, APP_NAME, ROLES } from "./constants.js";

describe("shared constants", () => {
  it("exposes stable application identity and API prefix", () => {
    expect(APP_NAME).toBe("SALIGAN");
    expect(API_PREFIX).toBe("/api/v1");
  });

  it("includes baseline authorization roles", () => {
    expect(ROLES).toEqual(["intern", "supervisor", "coordinator", "admin"]);
  });
});
