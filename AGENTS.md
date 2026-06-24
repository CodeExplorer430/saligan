# SALIGAN AI Agent Instructions

## Canonical Authority

This file is the canonical instruction source for every human-directed AI agent working in this repository. `CLAUDE.md`, `GEMINI.md`, `.cursorrules`, and `.windsurfrules` are adapters only. If instructions conflict, follow this file unless a directory-specific instruction is stricter.

Use RFC 2119 meanings for MUST, MUST NOT, SHOULD, and MAY.

## Project Summary

SALIGAN means Student Attendance, Logbook, Internship Goals, Accomplishments, and Notes. It is an offline-first, self-hosted, free and open-source internship records and OJT management platform. It handles sensitive student, academic, attendance, company, and workplace data.

Baseline architecture:

- TypeScript strict-mode pnpm monorepo with Turborepo.
- React 19, Vite, TanStack Router/Query, Tailwind CSS, IndexedDB/Dexie, and PWA/Workbox.
- NestJS with Fastify, REST, OpenAPI 3.1, Zod.
- PostgreSQL, Drizzle ORM, reversible or documented migrations.
- Docker Compose for local and self-hosted deployment.
- Modular monolith. Microservices require an accepted ADR.

## Required Reading Order

Before editing, agents MUST read, in order:

1. `AGENTS.md`.
2. `README.md`.
3. `docs/00-project-identity-and-naming.md`, when present.
4. `docs/04-software-requirements-specification.md`, when present.
5. `docs/06-tech-stack-baseline.md`, when present.
6. `docs/07-architecture-overview.md`, when present.
7. `DESIGN.md` for frontend or UI work.
8. `docs/ai/SPEC-DRIVEN-DEVELOPMENT.md`.
9. `docs/ai/QUALITY-GATES.md`.
10. Relevant ADRs, issue, specification, and directory-specific instructions.

Agents MUST inspect `git status` and relevant diffs before edits. If Git metadata is unavailable, report that limitation.

## Required Change Plan

Before a large, cross-cutting, risky, migration, dependency, architecture, security, or multi-file feature change, produce a short plan containing:

- source requirement and scope;
- files to inspect and likely files to change;
- tests to add or update;
- quality gates to run;
- rollback plan;
- required documentation updates.

Small, isolated documentation or typo fixes MAY use an implicit plan.

## Spec-Driven Development

Agents MUST NOT invent product behavior. Every feature or behavior change MUST trace to at least one:

- SRS requirement ID;
- accepted issue or backlog item;
- accepted ADR;
- explicit maintainer instruction.

If required behavior is unspecified, update or propose the specification before implementation. API changes MUST update OpenAPI. Architecture or stack changes MUST use an ADR when triggers in `docs/ai/SPEC-DRIVEN-DEVELOPMENT.md` apply.

## Non-Negotiable Engineering Rules

- Prefer modular-monolith boundaries and shared domain rules.
- Do not introduce paid SaaS dependencies.
- Prefer mature, maintained, license-compatible FOSS dependencies.
- Dependency additions require need, maintenance, security, license, and bundle/runtime impact review.
- UI, state, ORM, authentication, infrastructure, or framework changes outside baseline require ADR approval.
- Frontend changes MUST preserve offline-first behavior and visible sync state.
- Backend changes MUST remain API contract-driven.
- Database migrations MUST be reversible or include explicit recovery and data-loss notes.
- Do not duplicate business rules across UI, API, and persistence layers.
- Avoid premature abstraction and unrelated refactors.

## Coding Standards

Follow `docs/ai/CODING-STANDARDS.md`.

- TypeScript MUST use strict types. `any`, unsafe casts, and non-null assertions require local justification.
- External input MUST be validated at trust boundaries.
- Domain logic MUST remain testable outside controllers, UI components, and database adapters.
- React components MUST remain focused, accessible, and free of hidden server-authority assumptions.
- NestJS controllers MUST be thin; services/use cases own application behavior.
- Errors MUST be typed or consistently mapped, safe for clients, and useful for operators.
- Logs MUST be structured and MUST NOT contain secrets or sensitive records.

## Source File Size

Source files MUST remain below 500 physical lines.

- At 350 lines: agent MUST evaluate splitting and record why continued growth is acceptable.
- At 450 lines: agent MUST refactor before adding logic unless a documented exception applies.
- At 500 lines or above: prohibited. Agents MUST NOT weaken or bypass this limit.

Exemptions: generated files, lockfiles, migrations, snapshots, schema dumps, compiled artifacts, and documentation. Exemption does not permit hand-maintained source disguised as generated output.

## Testing Rules

Every behavior change MUST add or update tests:

- pure logic: unit tests;
- API controller/service behavior: unit or integration tests;
- database queries and migrations: integration tests or migration checks;
- UI behavior: component tests;
- critical user flows: E2E or smoke tests;
- authorization/security changes: negative tests for unauthenticated, unauthorized, cross-tenant, and object-level access.

Agents MUST NOT delete, weaken, skip, or rewrite tests merely to make checks pass. Obsolete tests may be replaced only when changed requirements are cited.

## Security and Privacy

Follow `docs/ai/SECURITY-RULES.md` and `docs/14-security-baseline.md`.

- Never hardcode or commit secrets. Only sanitized `.env.example` files are allowed.
- Validate and normalize all external input.
- Enforce authentication and authorization server-side.
- Check object-level authorization for every user-controlled object identifier.
- Use least privilege and organization/assignment scoping.
- Do not leak private data through logs, errors, exports, attachments, caches, or API responses.
- Avoid `eval`, dynamic code execution, unsafe deserialization, and unsanitized HTML.
- Authentication MUST use approved password hashing and secure session handling when implemented.
- Security design SHOULD align with OWASP ASVS and OWASP API Security Top 10.
- Update `SECURITY.md` when vulnerability handling or security processes change.

## Documentation Rules

Behavior, commands, architecture, environment, schema, API, workflow, or policy changes MUST update relevant documentation. Update at least one applicable source:

- `README.md`;
- SRS or backlog;
- tech-stack or architecture docs;
- `DESIGN.md`;
- OpenAPI specification;
- ADRs;
- `docs/ai/*`;
- `docs/engineering/*`.

Major changes are incomplete while docs are stale. Follow `docs/ai/DOCUMENTATION-RULES.md`.

## Git and GitHub Rules

- Do not commit directly to `main` unless a maintainer explicitly instructs it.
- Use small, reviewable commits and Conventional Commits.
- Keep changes scoped. Do not modify another agent's files without reviewing status and diff.
- Every PR MUST link its issue/spec, summarize behavior, list tests and docs, include UI screenshots when applicable, state security effects, and provide risk/rollback notes.
- Required CI MUST pass before merge.
- Never claim a remote workflow passed without observing its result.

### Agent GitOps Approval

AI agents MAY prepare Git and GitHub operations, but MUST receive the matching exact maintainer approval phrase before execution:

| Operation                                                  | Required phrase           |
| ---------------------------------------------------------- | ------------------------- |
| `git commit`                                               | `APPROVE COMMIT`          |
| `git push`                                                 | `APPROVE PUSH`            |
| `gh pr create`                                             | `APPROVE PR CREATE`       |
| `gh pr merge` or `gh pr close`                             | `APPROVE MERGE`           |
| `gh release create`                                        | `APPROVE RELEASE`         |
| `git tag`                                                  | `APPROVE TAG`             |
| branch protection, ruleset, or repository settings changes | `APPROVE REPO SETTINGS`   |
| destructive Git operations                                 | `APPROVE DESTRUCTIVE GIT` |

Before requesting approval, agents MUST show:

- current branch;
- `git status --short`;
- `git diff --stat`;
- proposed commit message when applicable;
- exact commands to execute;
- validation results;
- risks and rollback plan.

Approval authorizes only the named operation. Commit approval does not authorize push, and push approval does not authorize PR creation or any later operation.

## Multi-Agent Coordination

Follow `docs/ai/AGENT-ORCHESTRATION.md` and `docs/ai/AGENT-HANDOFF-PROTOCOL.md`.

- Supported roles: Orchestrator, Requirements, Architecture, Backend, Frontend, Database, QA/Test, Security, Documentation, Release.
- One agent owns a file at a time.
- Agents MUST check status before and after work.
- Agents MUST inspect existing changes before editing.
- Agents MUST leave handoff notes when pausing incomplete work.
- Review agents MUST avoid unrelated refactors.
- QA and Security agents MAY block completion when required gates fail.
- Only Orchestrator or maintainer resolves ownership conflicts and cross-agent scope changes.

## Required Quality Gates

Before completion, run or report why each applicable command could not run:

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

When Docker and services exist, also run a containerized smoke test using `docker compose up` or equivalent. Run API health, web smoke, and migration checks when those surfaces exist. Infrastructure, API, database, migration, or cross-service changes MUST use Docker validation when possible.

Local and CI commands MUST remain aligned. See `docs/ai/QUALITY-GATES.md`.

All controllable code, test, build, lint, typecheck, audit, documentation, Docker, and CI warnings and errors MUST be fixed before completion. Known dependency advisories are prohibited, including development-only low-severity findings. Uncontrollable external platform or upstream warnings MUST identify source, owner, reason, follow-up, and explicit maintainer waiver.

## Definition of Done

Agents MUST NOT say “done,” “complete,” or “ready” unless:

- requested scope is implemented and traces to its source;
- tests were added or updated where needed;
- applicable gates ran, with exact failures or omissions reported;
- relevant docs and contracts are current;
- security/privacy effects were reviewed;
- source files satisfy size limits;
- final status and diff were reviewed;
- remaining risks, follow-ups, and rollback notes are stated.
- no controllable warnings, errors, or known dependency advisories remain;
- any external warning has a documented owner, follow-up, and explicit maintainer waiver.

## Prohibited Actions

Agents MUST NOT:

- implement imagined requirements;
- expose, fabricate, or commit credentials;
- bypass authorization or validation;
- disable security controls, tests, lint, typechecking, or CI to obtain a pass;
- perform broad rewrites without explicit scope;
- add paid/closed dependencies or incompatible licenses;
- introduce microservices or replace baseline frameworks without accepted ADR;
- rewrite history, force-push, delete data, or run destructive commands without explicit approval;
- modify generated artifacts manually when a generator is authoritative;
- overwrite concurrent work without inspection and coordination;
- claim commands, tests, reviews, or CI results that did not occur.

## Maintainer Escalation

Stop and request maintainer decision when:

- requirements conflict or acceptance criteria are missing;
- change creates data-loss, privacy, security, license, or compatibility risk;
- architecture/dependency choice requires ADR approval;
- migration rollback is unsafe or unclear;
- another agent owns required files or changes conflict;
- required gate cannot pass without weakening policy;
- requested action is destructive, irreversible, or outside assigned scope.

Maintainers: `@chesternothacker` and `@codeexplorer430`.
