# Testing Strategy

## Principles

Tests provide evidence for requirements, regressions, security boundaries, offline behavior, and deployment readiness. Prefer deterministic tests with synthetic data.

## Test Levels

- Unit: pure domain rules, calculations, validation, mapping.
- Integration: API services/controllers, database queries, transactions, migrations, adapters.
- Component: React behavior, accessibility, error/offline/sync states.
- Contract: OpenAPI request/response compatibility and generated clients.
- E2E: critical user flows through real application surfaces.
- Smoke: built app, containers, health endpoints, and basic navigation.
- Security: unauthenticated, unauthorized, cross-object, cross-role, cross-organization, malicious input, export/attachment access.

Current Sprint 0B coverage uses Vitest for shared constants, Zod validation, Drizzle schema exports, Dexie stores, React shell behavior, connectivity state, and Fastify health routing. Playwright/E2E is planned, not installed.

## Required Mapping

Each acceptance criterion MUST map to one or more tests or a documented manual check. Behavior fixes MUST include regression tests when feasible.

## Data and Isolation

- Use synthetic fixtures; never production or personal records.
- Isolate tests and clean created state.
- Freeze time and randomness where needed.
- Avoid order dependence and external paid services.
- Integration tests SHOULD use supported PostgreSQL, preferably containerized.

Current database verification applies generated Drizzle migration to Compose PostgreSQL and inspects expected tables.

## Offline-First Scenarios

Test disconnected creation/editing, durable local state, queue ordering, retries, idempotency, reconnect, stale versions, conflict presentation, and safe logout cleanup when relevant.

## Migration Testing

Validate clean install, upgrade from supported state, constraints, data transformation, rollback/recovery notes, and application compatibility.

## Failure Policy

Flaky tests are defects. Do not repeatedly retry, skip, weaken, or delete them without root-cause tracking and maintainer approval.
