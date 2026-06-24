# Quality Gates

## Gate Policy

Agents MUST run every applicable gate or state exact reason it could not run. A skipped gate is not a pass. Failures MUST be reported without weakening checks.

## Local Gates

Baseline:

```bash
pnpm install --frozen-lockfile
pnpm format:check
pnpm docs:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm audit --prod
docker compose config
```

Also run targeted tests, API health, web smoke, and migration checks when available. Database changes MUST run `pnpm db:generate` and validate `pnpm db:migrate` against clean PostgreSQL. Use repository scripts as authoritative.

## CI Gates

Required CI SHOULD include:

- frozen dependency install;
- lint and formatting/docs validation;
- TypeScript typecheck;
- unit, integration, component, and applicable E2E tests;
- production build;
- dependency and code security checks;
- Docker Compose and image validation;
- required branch protections.

Current CI runs frozen install, formatting, documentation, lint, typecheck, tests, and build. Security workflow runs dependency review, production audit, and Gitleaks. Docker workflow validates and health-checks PostgreSQL.

## Docker Gates

Run `docker compose config` for every Compose change. Infrastructure, API, database, migration, or cross-service changes MUST also:

1. build or pull required images;
2. start services without local-only hidden state;
3. verify health/status;
4. run migration checks;
5. run API/web smoke checks;
6. shut down cleanly without deleting data unless requested.

Current Compose contains PostgreSQL and Mailpit only. API/web smoke checks run through local pnpm processes until their containers exist.

## Security Gates

Applicable gates:

- dependency review for PRs;
- package audit with severity policy;
- secret scanning;
- static/code scanning when configured;
- container/image scanning before release;
- authorization and object-access negative tests;
- review of exports, attachments, logs, and sensitive responses.

Audit findings MUST be assessed, not blindly auto-fixed.

## Documentation Gates

- Commands match repository scripts.
- Links and referenced paths exist.
- Requirement, ADR, API, schema, environment, and workflow docs are current.
- UI changes include screenshots or reason unavailable.
- Breaking changes and migrations include operator notes.

## Merge Acceptance

Before merge:

- linked source and acceptance criteria exist;
- required reviews are complete;
- all mandatory CI is green;
- tests and traceability are present;
- docs/contracts are current;
- source files satisfy size policy;
- security and privacy concerns are resolved or explicitly accepted by maintainer;
- rollback/recovery is credible;
- no unrelated or unexplained diff remains.

Local success does not satisfy required remote GitHub Actions. Merge claims require observed remote results after a remote and pull request exist.
