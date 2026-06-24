import "reflect-metadata";

import { afterEach, describe, expect, it } from "vitest";

import { createApplication } from "../../bootstrap.js";
import { HealthController } from "./health.controller.js";

describe("health", () => {
  const applications: Awaited<ReturnType<typeof createApplication>>[] = [];

  afterEach(async () => {
    await Promise.all(applications.map(async (app) => app.close()));
    applications.length = 0;
  });

  it("returns stable health data", () => {
    expect(new HealthController().getHealth()).toEqual({
      status: "ok",
      service: "saligan-api",
      version: "0.1.0",
    });
  });

  it("boots Fastify and serves the prefixed health endpoint", async () => {
    const app = await createApplication();
    applications.push(app);
    await app.init();
    await app.getHttpAdapter().getInstance().ready();

    const response = await app.getHttpAdapter().getInstance().inject({
      method: "GET",
      url: "/api/v1/health",
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({
      status: "ok",
      service: "saligan-api",
      version: "0.1.0",
    });
  });
});
