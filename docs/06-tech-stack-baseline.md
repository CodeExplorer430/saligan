# 06 — Tech Stack Baseline

## 1. Decision summary

SALIGAN will use a **TypeScript-first monorepo** with an offline-first PWA, a modular backend API, PostgreSQL as the canonical server database, IndexedDB for local offline persistence, and Docker Compose for self-hosted deployment.

The stack prioritizes:

- free and open-source tooling;
- low-cost self-hosting;
- SaaS-like product quality without SaaS lock-in;
- good developer experience for AI-assisted development;
- strict contracts through OpenAPI and tests;
- offline-first reliability;
- maintainability for student contributors and future forks.

## 2. Recommended stack table

| Layer | Baseline choice | Why this fits SALIGAN | MVP status |
|---|---|---|---|
| Runtime | **Node.js 24 LTS** | Stable LTS runtime for the TypeScript backend/tooling stack. | Required |
| Language | **TypeScript strict mode** | Shared language across frontend, backend, domain logic, tests, and generated clients. | Required |
| Package manager | **pnpm 11** | Fast workspace management and good monorepo ergonomics. | Required |
| Monorepo/build | **Turborepo** | Simple task pipeline for `web`, `api`, packages, lint, test, build, and docs. | Required |
| Frontend | **React 19 + Vite** | Fast SPA/PWA setup without server-rendering complexity. | Required |
| Routing | **TanStack Router** | Type-safe routes and URL state for filters, period views, dashboards, and exports. | Required |
| Server state | **TanStack Query** | Data fetching, caching, retries, mutations, and sync-friendly workflows. | Required |
| Styling | **Tailwind CSS 4** | Utility-first styling that is fast to implement and easy to customize. | Required |
| UI components | **shadcn/ui + Radix primitives** | Copy-owned, accessible, customizable components for a FOSS design system. | Required |
| PWA/offline shell | **vite-plugin-pwa + Workbox** | Generates service worker, manifest, and offline asset caching. | Required |
| Local database | **IndexedDB via Dexie** | Browser database for offline DTR drafts, notes, report drafts, and sync queue. | Required |
| Backend framework | **NestJS with Fastify adapter** | Modular architecture for controllers, services, guards, validation, OpenAPI, and tests. | Required |
| API style | **REST + OpenAPI 3.1** | Easy for FOSS contributors, generated clients, API docs, and contract tests. | Required |
| Validation | **Zod** | Shared validation for forms, DTOs, sync payloads, and config. | Required |
| Database | **PostgreSQL 18 target; PostgreSQL 16 minimum** | Reliable relational database for auditability, reporting, approvals, and time computations. | Required |
| ORM/migrations | **Drizzle ORM + drizzle-kit** | Lightweight TypeScript ORM with SQL-like control and generated migrations. | Required |
| Auth | **App-owned email/password auth for MVP; optional OIDC/Keycloak adapter later** | Keeps MVP self-hosting simple; larger deployments can integrate OIDC later. | Required / Later |
| Password hashing | **Argon2id** | Modern password hashing baseline; no plaintext or fast hashes. | Required |
| Authorization | **RBAC + object-level authorization guards** | Interns, supervisors, coordinators, and admins need strict record ownership boundaries. | Required |
| File storage | **Filesystem adapter first; S3-compatible adapter later** | Local deployment stays simple; MinIO/S3 can be added without changing domain logic. | Required / Later |
| Exports | **Playwright/PDF, docx, ExcelJS, CSV, ics** | Supports DTR, reports, spreadsheet exports, Word-compatible reports, and calendar reminders. | Required |
| Email | **SMTP via Nodemailer-compatible adapter** | FOSS-friendly and provider-agnostic. | Should |
| Calendar reminders | **ICS/iCalendar export with VALARM** | Works with mobile calendar apps without paid APIs. | Should |
| Testing | **Vitest + Testing Library + Playwright** | Unit, component, integration, and end-to-end coverage for core workflows. | Required |
| Quality gates | **ESLint, Prettier, TypeScript, commitlint, lint-staged, markdownlint** | Keeps AI-generated code consistent and reviewable. | Required |
| Security scanning | **CodeQL, Renovate/Dependabot, npm audit, Trivy** | Low-cost baseline for open-source supply-chain and container scanning. | Should |
| Deployment | **Docker Compose** | Practical for local development, school labs, small VPS, or on-prem self-hosting. | Required |

## 3. Architecture style

Use a **modular monolith** first:

```text
/apps/web-pwa       React/Vite PWA
/apps/api           NestJS/Fastify API
/packages/domain    shared domain rules and computations
/packages/ui        shared UI components
/packages/exporters export generation helpers
/packages/sync      offline sync contracts and utilities
```

This avoids premature microservices while still keeping boundaries clear.

## 4. Why not start with Next.js?

SALIGAN is primarily an authenticated productivity app, not an SEO-heavy public website. The most important frontend requirement is a reliable offline-first PWA experience. React + Vite is simpler for an app-shell PWA and avoids server rendering complexity during the MVP.

## 5. Why not start with Supabase/Firebase?

Managed backend platforms are useful, but SALIGAN is intended to be FOSS, self-hostable, and useful for students who want to learn and fork the whole stack. PostgreSQL + NestJS + Docker Compose gives more control over domain logic, audit rules, export generation, and offline sync design.

## 6. Initial local services

| Service | Purpose | MVP |
|---|---|---|
| PostgreSQL | Canonical relational database | Yes |
| API container | Backend service | Yes |
| Web PWA container | Frontend app | Yes |
| Mailpit | Local email testing | Optional |
| MinIO | Future object storage adapter testing | Later |

## 7. Version policy

- Keep Node.js on active LTS.
- Target PostgreSQL 18 where available, but support PostgreSQL 16+.
- Pin major framework versions before the first public release.
- Use Renovate/Dependabot for updates after CI is stable.
