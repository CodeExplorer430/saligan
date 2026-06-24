# 07 — Architecture Overview

## Summary

SALIGAN uses a TypeScript-first modular monolith: React/Vite PWA, IndexedDB/Dexie offline storage, NestJS/Fastify API, PostgreSQL canonical database, Drizzle ORM, OpenAPI 3.1, and Docker Compose for self-hosting.

## Context

The platform must support interns who may record DTR entries on mobile devices while internet connectivity is unstable. The PWA stores local drafts and syncs them when the backend is reachable.

## High-level architecture

```text
Intern / Supervisor / Coordinator
        |
        v
React + Vite PWA
        |
        | offline drafts
        v
IndexedDB + Sync Queue
        |
        | HTTPS REST/OpenAPI
        v
NestJS/Fastify API
        |
        v
PostgreSQL
        |
        v
Filesystem storage / future S3-compatible storage
```

## Main modules

| Module | Responsibility |
|---|---|
| Identity | Users, sessions, password hashing, roles |
| Organization | Organizations, departments, memberships |
| Internship | Internship plans, supervisors, target hours |
| Schedule | Workday presets, shifts, breaks, holidays |
| Timekeeping | Time entries, time segments, correction reasons |
| Computation | Rendered, remaining, overtime, undertime calculations |
| Reports | Daily notes, weekly/monthly report entries |
| Attachments | Documentation images and evidence metadata |
| Reviews | Submission, approval, rejection, correction requests |
| Exports | PDF, DOCX, XLSX, CSV, ICS generation |
| Sync | Offline mutation queue, conflict detection, merge review |
| Audit | Security and workflow events |

## Offline-first strategy

1. User actions create local mutations first.
2. Local data is saved in IndexedDB.
3. UI shows pending sync state.
4. Sync queue submits operations when online.
5. Server validates ownership, version, and domain rules.
6. Conflicts are returned to the client for user review.
7. Confirmed server state updates the local cache.

## Security boundaries

- The browser cannot be trusted for authorization decisions.
- Every server request must verify session and object-level access.
- Interns can only access their own records by default.
- Supervisors can only access assigned interns.
- Coordinators/admins operate within organization scope.
- Audit logs should capture critical changes.

## Export architecture

Exports should be generated server-side to ensure consistent formatting, verified data, and traceable export events.

| Export | Format |
|---|---|
| DTR | PDF, XLSX, CSV |
| Weekly report | DOCX, PDF |
| Monthly summary | PDF, XLSX |
| Calendar reminders | ICS |
| Raw data backup | JSON/CSV |

## Deployment model

MVP deployment uses Docker Compose:

- web PWA;
- API;
- PostgreSQL;
- optional local email testing;
- mounted storage volume for exports/attachments.

Production deployment can place a reverse proxy such as Caddy, Nginx, or Traefik in front of the web and API services.
