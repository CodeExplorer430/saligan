# ADR-0004 — Tech Stack Baseline

## Status

Accepted

## Context

SALIGAN must be free and open-source, self-hostable, offline-first, friendly to student contributors, and suitable for AI-assisted/spec-driven development. The stack should reduce unnecessary operational cost while preserving professional engineering practices.

## Decision

Use a TypeScript-first modular monorepo:

- Node.js 24 LTS.
- TypeScript strict mode.
- pnpm 11.
- React + Vite PWA.
- IndexedDB through Dexie for local offline data.
- NestJS with Fastify adapter for API.
- REST + OpenAPI 3.1.
- PostgreSQL 18 target, PostgreSQL 16 minimum.
- Drizzle ORM.
- Docker Compose for self-hosting.

## Consequences

- One language across frontend, backend, shared domain logic, and tests.
- Easier AI-assisted development because boundaries and contracts are explicit.
- Offline-first complexity is handled in a dedicated sync package.
- Server-side authorization and export generation remain centralized.
