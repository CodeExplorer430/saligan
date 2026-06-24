import {
  index,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { reviewDecisionEnum, syncActionEnum, syncStatusEnum } from "./enums.js";
import { organizations, users } from "./identity.js";

export const reviewDecisions = pgTable(
  "review_decisions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    reviewerUserId: uuid("reviewer_user_id")
      .notNull()
      .references(() => users.id, { onDelete: "restrict" }),
    entityType: varchar("entity_type", { length: 80 }).notNull(),
    entityId: uuid("entity_id").notNull(),
    decision: reviewDecisionEnum("decision").notNull(),
    comment: text("comment"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("review_decisions_entity_idx").on(table.entityType, table.entityId)],
);

export const syncOperations = pgTable(
  "sync_operations",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    deviceId: varchar("device_id", { length: 200 }).notNull(),
    operationId: varchar("operation_id", { length: 200 }).notNull(),
    entityType: varchar("entity_type", { length: 80 }).notNull(),
    action: syncActionEnum("action").notNull(),
    status: syncStatusEnum("status").notNull().default("pending"),
    payload: jsonb("payload").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    processedAt: timestamp("processed_at", { withTimezone: true }),
  },
  (table) => [
    uniqueIndex("sync_operations_user_operation_unique").on(table.userId, table.operationId),
    index("sync_operations_status_idx").on(table.status),
  ],
);

export const auditEvents = pgTable(
  "audit_events",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    actorUserId: uuid("actor_user_id").references(() => users.id, { onDelete: "set null" }),
    organizationId: uuid("organization_id").references(() => organizations.id, {
      onDelete: "set null",
    }),
    action: varchar("action", { length: 120 }).notNull(),
    entityType: varchar("entity_type", { length: 80 }).notNull(),
    entityId: uuid("entity_id"),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("audit_events_organization_created_idx").on(table.organizationId, table.createdAt),
    index("audit_events_entity_idx").on(table.entityType, table.entityId),
  ],
);
