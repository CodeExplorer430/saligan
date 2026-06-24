# Sprint 0 Notes

## Sprint 0A — Governance

Sprint 0A created canonical AI instructions, tool adapters, AI/engineering/open-source governance documents, GitHub issue and pull-request templates, CODEOWNERS, Dependabot, security reporting, and initial workflows.

## Sprint 0B Goal

Prepare implementation-ready repository baseline without implementing product features.

## Repository State

- Git repository exists on `main`.
- Sprint work uses `chore/sprint-0b-bootstrap`.
- No remote is configured at Sprint start.
- No commit or push has been performed for Sprint 0B.
- Existing AI Agent Governance Pack remains canonical.

## Workspace Baseline

- `apps/web`: React 19, Vite, TanStack Router/Query, Tailwind CSS, Dexie, PWA shell.
- `apps/api`: NestJS/Fastify, `/api/v1`, Swagger, health endpoint, placeholder modules.
- `packages/database`: Drizzle/PostgreSQL schema and migrations.
- `packages/shared`: application, role, and status constants.
- `packages/validation`: Zod input schemas.
- `packages/ui`: shared UI export boundary.
- `packages/config`: shared tooling guidance.

No authentication, time computation, CRUD workflow, synchronization engine, export engine, or approval workflow is implemented.

## Canonical Database Naming

Sprint 0 uses names already accepted in `diagrams/erd.dbml`, `docs/08-data-model.md`, and `specs/openapi-seed.yaml`.

| Requested concept  | Canonical table                      |
| ------------------ | ------------------------------------ |
| internship members | `memberships`                        |
| internships        | `internship_plans`                   |
| schedules          | `schedule_rules`                     |
| time logs          | `time_entries` and `time_segments`   |
| reports            | `report_entries`                     |
| report attachments | `attachments`                        |
| sync/audit records | `sync_operations` and `audit_events` |

## Docker Ports

PostgreSQL uses `${POSTGRES_HOST_PORT:-5433}:5432`. Host tools use port `5433`; services inside Compose use port `5432`. Existing named volume `saligan_postgres_data` MUST NOT be deleted during routine validation.

PostgreSQL 18 mounts that volume at `/var/lib/postgresql`, matching official image's versioned data-directory layout.

## Authentication Boundary

Authentication is intentionally absent. Before user endpoints are implemented, create or accept an ADR covering session storage, secure cookies, CSRF, password recovery, rate limits, and object-level authorization.

## Validation Record

Validated locally on 2026-06-24:

- `pnpm install --frozen-lockfile --offline`: passed.
- `pnpm format:check`: passed.
- `pnpm docs:check`: passed.
- `pnpm lint`: passed.
- `pnpm typecheck`: passed.
- `pnpm test`: passed with 9 tests.
- `pnpm build`: passed, including generated PWA service worker.
- `pnpm db:generate`: generated initial migration.
- `docker compose config`: passed with PostgreSQL host port `5433`.
- `docker compose up -d --wait postgres`: passed after correcting PostgreSQL 18 volume mount.
- `pnpm db:migrate`: passed.
- `pnpm audit --prod`: passed with no known vulnerabilities after applying compatible dependency patches.
- Database inspection confirmed 12 canonical tables.
- API health smoke returned HTTP 200 and expected JSON.
- Web preview returned SALIGAN HTML and PWA manifest.
- `docker compose down`: passed without deleting volumes.
- Graphviz SVG/PNG architecture renderings were regenerated during documentation reconciliation.
- D2, PlantUML, and Mermaid sources passed available syntax/render checks.

Vitest initially could not resolve `localhost` inside restricted sandbox. Same tests passed with normal local process/network permissions. This was an execution-environment restriction, not a repository failure.

Remote GitHub Actions were not run and are not claimed as passing.

## Known Limitations

- Product behavior remains unimplemented.
- Only API health route is operational.
- Authentication, authorization, exports, file storage, email, sync, and review workflows remain planned.
- Web and API Docker images do not exist.
- `DESIGN.md` defines baseline direction, not completed screens.
- Structurizr and DBML-specific renderers are not installed; their sources were reconciled, while tracked Graphviz renderings were regenerated.

## Next Recommended Task

Implement requirement-traced pure timekeeping calculations for rendered, overtime, undertime, and remaining minutes, beginning with acceptance criteria and unit tests.
