# 06 — Tech Stack Baseline

## Decision

SALIGAN uses a TypeScript-first pnpm workspace and Turborepo modular monolith. Sprint 0B provides an offline-capable web shell, API shell, shared contracts, database schema, and quality automation. Product workflows remain planned.

## Current Implemented Baseline

| Layer | Implemented choice | Current state |
|---|---|---|
| Runtime | Node.js 24 LTS | Required by root `engines` and `.nvmrc` |
| Language | TypeScript 5 strict mode | Shared root config; all workspaces typecheck |
| Package/build | pnpm 11 workspaces + Turborepo | `apps/*` and `packages/*` |
| Web | React 19 + Vite | Dashboard shell only |
| Routing/state | TanStack Router + TanStack Query | Providers and root route configured |
| PWA | vite-plugin-pwa + Workbox | Manifest and generated service worker |
| Offline storage | IndexedDB through Dexie | Placeholder time-log, report, and sync-queue stores |
| Styling | Tailwind CSS 4 | Neutral SALIGAN shell |
| API | NestJS 11 + Fastify | Health endpoint and placeholder modules |
| API docs | Nest Swagger + OpenAPI 3.1 seed | Runtime Swagger currently documents health only |
| Validation | Zod 4 | Initial internship, schedule, time-log, and report input schemas |
| Database | PostgreSQL 18 target; PostgreSQL 16 minimum policy | Docker validation currently covers PostgreSQL 18 only |
| ORM/migrations | Drizzle ORM + drizzle-kit | 12-table schema and initial migration |
| Tests | Vitest + Testing Library | Unit, component, IndexedDB, and API health tests |
| Quality | ESLint, Prettier, TypeScript, markdownlint | Root scripts and GitHub Actions |
| Security automation | Dependabot, dependency review, pnpm audit, Gitleaks | Workflows configured; remote runs pending |
| Local infrastructure | Docker Compose | PostgreSQL and optional Mailpit |

## Current Workspace

```text
apps/web               React/Vite PWA shell
apps/api               NestJS/Fastify API shell
packages/shared        application and status constants
packages/validation    Zod input schemas
packages/database      Drizzle schema and migrations
packages/ui            placeholder shared UI boundary
packages/config        shared tooling guidance
```

## Planned, Not Implemented

- shadcn/ui and Radix component adoption;
- Playwright E2E and PDF generation;
- app-owned authentication, sessions, Argon2id, RBAC, and BOLA guards;
- business endpoints beyond health;
- time computation and sync engine;
- export generation with DOCX/XLSX/CSV/ICS;
- filesystem/S3 attachment adapters;
- SMTP notifications;
- API/web Docker images and production reverse proxy;
- CodeQL and Trivy;
- commitlint and lint-staged.

Planned tools MUST NOT be described as operational until installed, configured, and validated.

## Architecture Policy

Use modular monolith first. Shared business rules belong in testable packages, not duplicated across web/API/database layers. Microservices, paid SaaS dependencies, or baseline framework replacements require accepted ADRs.

## Local Services

| Service | Current state |
|---|---|
| PostgreSQL | Implemented through Compose; host `5433`, container `5432` |
| Mailpit | Available through Compose; no email feature uses it yet |
| API | Runs locally through pnpm; no API container yet |
| Web | Runs locally through pnpm; no web container yet |

## Version Policy

- Keep Node.js on active LTS and pnpm on declared major.
- Pin compatible dependency ranges and commit `pnpm-lock.yaml`.
- Target PostgreSQL 18 while preserving PostgreSQL 16+ compatibility.
- Review dependencies for maintenance, license, security, and runtime impact.
