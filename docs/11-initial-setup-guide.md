# 11 — Initial Setup Guide

## Purpose

Prepare SALIGAN for local development after Sprint 0B.

## Prerequisites

```text
Node.js 24 LTS
pnpm 11
Docker 29+
Docker Compose 2.40+
Git
```

Repository is initialized on `main`. Contributors MUST create short-lived branches and follow `AGENTS.md`.

## Install

```bash
corepack enable
corepack prepare pnpm@11.0.0 --activate
pnpm install --frozen-lockfile
```

## Workspace

```text
apps/web
apps/api
packages/config
packages/database
packages/shared
packages/ui
packages/validation
docs
diagrams
specs
adrs
backlog
```

## Environment

```bash
cp .env.example .env
docker compose up -d postgres mailpit
docker compose ps
pnpm db:migrate
```

PostgreSQL binds to host port `5433` by default. Container-to-container connections use `5432`. Override host binding with `POSTGRES_HOST_PORT`.

Host port `5433` avoids collision with local PostgreSQL installations commonly using `5432`.

Routine shutdown MUST preserve volumes:

```bash
docker compose down
```

Do not add `-v` unless data deletion is explicitly intended and approved.

## Development

```bash
pnpm dev
```

Endpoints:

- web: `http://localhost:5173`;
- health: `http://localhost:3000/api/v1/health`;
- Swagger: `http://localhost:3000/api/docs`;
- Mailpit: `http://localhost:8025`.

## Quality Gates

```bash
pnpm install --frozen-lockfile
pnpm format:check
pnpm docs:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
docker compose config
```

Database changes also require:

```bash
pnpm db:generate
docker compose up -d --wait postgres
docker compose ps postgres
pnpm db:migrate
docker compose down
```

## First Feature Order

Future feature work MUST trace to approved requirements:

1. domain time computation tests;
2. internship and schedule application behavior;
3. API contracts and authorization architecture;
4. offline DTR workflow;
5. report and export workflows;
6. synchronization and conflict handling.
