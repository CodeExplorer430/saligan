import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema/index.js";

export function createDatabase(databaseUrl: string) {
  const client = postgres(databaseUrl, { prepare: false });

  return {
    client,
    db: drizzle(client, { schema }),
  };
}

export * from "./schema/index.js";
