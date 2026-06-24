import { afterEach, describe, expect, it } from "vitest";

import { SaliganDatabase } from "./database";

const databases: SaliganDatabase[] = [];

afterEach(async () => {
  await Promise.all(databases.map(async (database) => database.delete()));
  databases.length = 0;
});

describe("offline database", () => {
  it("opens with required placeholder stores", async () => {
    const database = new SaliganDatabase(`saligan-test-${crypto.randomUUID()}`);
    databases.push(database);

    await database.open();

    expect(database.tables.map((table) => table.name).sort()).toEqual([
      "localReports",
      "localTimeLogs",
      "syncQueue",
    ]);
  });
});
