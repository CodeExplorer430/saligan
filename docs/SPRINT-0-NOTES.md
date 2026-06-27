# Sprint 0 Notes

## Sprint 0A — Governance

Sprint 0A created canonical AI instructions, tool adapters, AI/engineering/open-source governance documents, GitHub issue and pull-request templates, CODEOWNERS, Dependabot, security reporting, and initial workflows.

## Sprint 0B Goal

Prepare implementation-ready repository baseline without implementing product features.

## Repository State

- Git repository exists on `main`.
- Sprint work uses `chore/sprint-0b-bootstrap`.
- No remote was configured at Sprint start; a remote and pull request now exist.
- Sprint 0B baseline was committed and pushed before the current remediation pass.
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

At initial local validation, remote GitHub Actions had not run and were not claimed as passing. Pull request workflow results are recorded below.

## Pull Request Security Remediation

Pull request #6 ran the Sprint 0 baseline workflows on 2026-06-24. Quality gates, PostgreSQL smoke, production audit, and secret scan passed. Dependency Review failed on moderate advisory `GHSA-67mh-4wv8-2f99` because `drizzle-kit` transitively installed `esbuild@0.18.20` through deprecated `@esbuild-kit` loader packages.

Latest stable `drizzle-kit@0.31.10` still includes that transitive chain, so a narrowly scoped pnpm override moves only `@esbuild-kit/core-utils` to the first published patched `esbuild` release, `0.25.0`. Additional scoped overrides move Markdown tooling to `markdown-it@14.2.0`, Vite tooling to `esbuild@0.28.1`, and Workbox transitive packages away from deprecated `glob@11.1.0` and `source-map@0.8.0-beta.0`.

The security workflow now uses a zero-advisory audit at low severity. Dependency Review still blocks high and critical additions and reports lower risk, while OpenSSF Scorecard output remains informational and is not emitted as warning annotations. License review remains enabled without an unaudited allowlist.

GitHub Actions were upgraded to Node 24 runtime releases: `actions/checkout@v7`, `actions/setup-node@v6`, and `actions/dependency-review-action@v5`. Workflows use Corepack to activate the exact `packageManager` pnpm version instead of `pnpm/action-setup` so PNPM_HOME layout warnings remain outside the repo. pnpm update notifications are disabled in repository and workflow configuration so validation logs stay warning-free without changing dependency policy. Secret scanning remains blocking through the pinned Gitleaks CLI container `ghcr.io/gitleaks/gitleaks:v8.30.1@sha256:c00b6bd0aeb3071cbcb79009cb16a60dd9e0a7c60e2be9ab65d25e6bc8abbb7f`, scanning full git history after checkout with `fetch-depth: 0`.

Workflow jobs set Git `init.defaultBranch` to `main` through environment-level Git config before checkout to suppress the runner's default-branch hint where checkout honors inherited Git config. If `actions/checkout` or runner internals still emit the hint, treat it as external action/platform noise and track it separately with source, owner, reason, follow-up, and maintainer waiver.

Controllable workflow warnings are blockers. External platform or upstream warnings are not considered fixed by suppression; they must be recorded separately and revisited when the owning action, runner, package, or platform changes.

### Maintainer-Waived Upstream Warnings

Latest stable `drizzle-kit@0.31.10` emits installation deprecation warnings for `@esbuild-kit/core-utils@3.3.2` and `@esbuild-kit/esm-loader@2.6.5`. Source and owner: Drizzle ORM upstream dependency chain. A coordinated Drizzle 1.0 release-candidate migration was rejected for Sprint 0 because it changes ORM APIs and failed compatibility checks against the stable schema/client baseline. Maintainer selected stable Drizzle with upstream tracking. Recheck when stable Drizzle 1.0 removes the deprecated loader chain.

These are upstream package-maintenance warnings, not known vulnerabilities or codebase warnings. No other warning is waived.

Remote GitHub Actions must be rerun after the remediation is pushed. No remote pass is claimed until that run is green.

## Known Limitations

- Product behavior remains unimplemented.
- Only API health route is operational.
- Authentication, authorization, exports, file storage, email, sync, and review workflows remain planned.
- Web and API Docker images do not exist.
- `DESIGN.md` defines baseline direction, not completed screens.
- Structurizr and DBML-specific renderers are not installed; their sources were reconciled, while tracked Graphviz renderings were regenerated.

## Next Recommended Task

Implement requirement-traced pure timekeeping calculations for rendered, overtime, undertime, and remaining minutes, beginning with acceptance criteria and unit tests.
