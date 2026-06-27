import "dotenv/config";

import { defineConfig } from "drizzle-kit";

const databaseUrl =
  process.env.DATABASE_URL ?? "postgresql://saligan:saligan_dev_password@localhost:5433/saligan";

export default defineConfig({
  dialect: "postgresql",
  out: "./drizzle",
  schema: "./src/schema/index.ts",
  dbCredentials: {
    url: databaseUrl,
  },
  strict: true,
  verbose: true,
});
