# SALIGAN

**Student Attendance, Logbook, Internship Goals, Accomplishments, and Notes**

_An Offline-First, Self-Hosted Internship Records and OJT Management Platform_

SALIGAN is a free and open-source platform for internship Daily Time Records, rendered and remaining hours, schedules, accomplishment notes, weekly reports, evidence, exports, and review workflows.

Development follows Spec-Driven Development with strict AI Agent Governance. Read [AGENTS.md](AGENTS.md) before contributing.

## Repository Status

SALIGAN is pre-MVP. Sprint 0A governance and Sprint 0B implementation scaffold are under review in pull request #6 from `chore/sprint-0b-bootstrap`.

- pnpm 11 and Turborepo monorepo;
- React/Vite offline-first web shell;
- NestJS/Fastify API shell with health endpoint and Swagger;
- Drizzle/PostgreSQL schema and migration baseline;
- lint, typecheck, test, build, docs, Docker, and security workflows.

Product workflows remain placeholders until approved requirements are implemented.

Local Sprint 0B checks passed. Remote GitHub Actions have run; merge remains blocked until the Dependency Review remediation is pushed and the workflow reruns green.

## Quick Start

Requirements:

- Node.js 24 LTS;
- pnpm 11;
- Docker 29+;
- Docker Compose 2.40+.

```bash
pnpm install --frozen-lockfile
cp .env.example .env
docker compose up -d postgres
docker compose ps postgres
pnpm db:migrate
pnpm dev
```

Local endpoints:

| Service    | URL                                   |
| ---------- | ------------------------------------- |
| Web        | `http://localhost:5173`               |
| API health | `http://localhost:3000/api/v1/health` |
| Swagger    | `http://localhost:3000/api/docs`      |
| PostgreSQL | `localhost:5433`                      |
| Mailpit    | `http://localhost:8025`               |

PostgreSQL keeps container port `5432`. Override host port with `POSTGRES_HOST_PORT`.

## Workspace

```text
apps/
  api/                  NestJS/Fastify API
  web/                  React/Vite PWA
packages/
  config/               shared tooling guidance
  database/             Drizzle schema and migrations
  shared/               cross-workspace constants
  ui/                   shared UI boundary
  validation/           Zod input contracts
```

Planning and governance assets remain under `docs/`, `specs/`, `adrs/`, `diagrams/`, and `backlog/`.

## Commands

```bash
pnpm dev
pnpm build
pnpm lint
pnpm typecheck
pnpm test
pnpm format
pnpm format:check
pnpm docs:check
pnpm audit:zero
pnpm source:size
pnpm checks:zero
pnpm ci:local
pnpm validate:pr
pnpm clean
pnpm db:generate
pnpm db:migrate
pnpm db:studio
```

## Project Identity

| Item          | Value                                 |
| ------------- | ------------------------------------- |
| Product       | `SALIGAN`                             |
| Repository    | `saligan`                             |
| Package scope | `@saligan`                            |
| Architecture  | TypeScript modular monolith           |
| Delivery      | Offline-first PWA and self-hosted API |
| License       | AGPL-3.0-or-later                     |

Detailed product requirements and decisions:

- [Software Requirements Specification](docs/04-software-requirements-specification.md)
- [Tech Stack Baseline](docs/06-tech-stack-baseline.md)
- [Architecture Overview](docs/07-architecture-overview.md)
- [Data Model](docs/08-data-model.md)
- [Implementation Roadmap](docs/12-implementation-roadmap.md)
- [Sprint 0 Notes](docs/SPRINT-0-NOTES.md)

## Quality Gates

```bash
pnpm install --frozen-lockfile
pnpm format:check
pnpm docs:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm audit --audit-level low
pnpm source:size
docker compose config
```

Infrastructure/database changes also require PostgreSQL startup and migration validation.
All controllable warnings and errors are blockers. Known dependency vulnerabilities are prohibited at every severity and scope.

## Next Milestone

Implement first requirement-traced vertical slice: pure timekeeping domain calculations for rendered, overtime, undertime, and remaining minutes. No API or UI behavior should precede approved acceptance criteria and domain tests.

## Governance and Security

- [AI agent instructions](AGENTS.md)
- [Contribution guide](CONTRIBUTING.md)
- [Security policy](SECURITY.md)
- [Documentation index](docs/README.md)

Dependency Review blocks newly introduced high and critical vulnerabilities and reports lower risks. Full audit policy is stricter: `pnpm audit --audit-level low` must report zero findings. OpenSSF Scorecard output remains informational.

AI agents may prepare Git/GitHub operations, but exact maintainer approval phrases from [AGENTS.md](AGENTS.md) are required before commit, push, PR creation, merge/close, release, tag, repository-setting, or destructive Git operations.

Never place secrets or real student records in source, tests, issues, logs, or prompts.

## License

SALIGAN is licensed under AGPL-3.0-or-later. See [LICENSE](LICENSE).
