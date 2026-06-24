# 07 — Architecture Overview

## Summary

SALIGAN is a TypeScript modular monolith with an offline-capable React/Vite client, NestJS/Fastify API, shared contracts, Drizzle database boundary, PostgreSQL, and Docker Compose infrastructure.

## Current Sprint 0B Architecture State

```text
apps/web
  React/Vite shell
  TanStack Router + Query
  Tailwind CSS
  PWA/Workbox
  IndexedDB/Dexie placeholder stores

apps/api
  NestJS/Fastify
  GET /api/v1/health
  Swagger at /api/docs
  placeholder domain modules

packages
  shared       constants and statuses
  validation   Zod input schemas
  database     Drizzle schema and migration
  ui           placeholder export boundary
  config       tooling guidance

Docker Compose
  PostgreSQL 18
  optional Mailpit
```

Only health is an implemented API route. Users, internships, schedules, time logs, reports, and exports are empty module boundaries. Authentication, authorization, business services, exports, attachments, notifications, and synchronization are not implemented.

## Current Data Flow

1. Web shell renders dashboard placeholders and connectivity status.
2. Dexie defines local placeholder tables for time logs, reports, and sync operations.
3. API exposes health and runtime Swagger.
4. Drizzle owns schema definitions and generated migration.
5. PostgreSQL stores canonical future records after migrations are applied.

No business data currently flows between web, API, and database.

## Planned Offline-First Direction

1. User changes are validated and stored locally first.
2. Sync queue records pending operations.
3. API validates session, object authorization, version, and domain rules.
4. PostgreSQL becomes canonical server state.
5. Conflicts return to client for explicit review.

This is planned architecture, not current behavior.

## Package Boundaries

| Workspace | Responsibility |
|---|---|
| `apps/web` | Browser UI, PWA shell, local persistence, future sync UX |
| `apps/api` | HTTP transport, future authorization, application orchestration |
| `packages/shared` | Stable cross-workspace constants and future domain contracts |
| `packages/validation` | Zod schemas for trust-boundary inputs |
| `packages/database` | Drizzle schema, client factory, and migrations |
| `packages/ui` | Future shared accessible UI components |
| `packages/config` | Shared tooling guidance |

## Security Boundaries

- Browser is never trusted for authorization.
- Current health route is public and contains no sensitive data.
- Authentication/session architecture requires an accepted ADR before implementation.
- Every future user-controlled object ID requires server-side object authorization.
- Offline data, exports, attachments, logs, and errors must follow privacy rules.

## Planned Capabilities

- domain time calculations;
- app-owned authentication and secure sessions;
- internship, schedule, time-log, report, review, and sync services;
- export and attachment adapters;
- audit events and notifications;
- API/web containers and production proxy configuration.

## Deployment State

Compose currently runs PostgreSQL and optional Mailpit only. PostgreSQL maps host port `5433` to container port `5432` and mounts its named volume at `/var/lib/postgresql` for PostgreSQL 18 compatibility. Web and API run through pnpm during development.
