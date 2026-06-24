# Coding Standards

## TypeScript

- Enable and preserve strict mode.
- Prefer explicit domain types and discriminated unions.
- Avoid `any`; use `unknown` plus validation/narrowing.
- Avoid unsafe casts and non-null assertions. Justify unavoidable cases locally.
- Keep functions focused and side effects explicit.
- Use named constants for domain rules; do not scatter magic values.
- Export minimum public surface.
- Do not duplicate business rules between packages.

## React

- Use function components and hooks.
- Keep rendering pure; isolate side effects.
- Treat server state, local UI state, and offline persisted state separately.
- Provide loading, empty, error, offline, pending-sync, and conflict states.
- Preserve keyboard access, semantic HTML, labels, focus behavior, and WCAG 2.2 AA target.
- Do not use client checks as authorization.
- Add component tests for behavior, not implementation details.

## NestJS

- Keep controllers thin: transport, validation, response mapping.
- Put application behavior in services/use cases and domain rules in testable modules.
- Apply authentication, authorization, and object-scope checks consistently.
- Validate DTOs at boundaries and synchronize OpenAPI.
- Use dependency injection through clear interfaces.
- Avoid hidden global state and provider cycles.

## Database

- Use PostgreSQL constraints for durable invariants.
- Parameterize all queries.
- Scope sensitive queries by organization/owner/assignment.
- Use transactions for atomic multi-write behavior.
- Avoid N+1 queries and unbounded reads.
- Migrations MUST be deterministic, reviewed, tested, and reversible or have recovery/data-loss notes.
- Store timestamps consistently and document timezone behavior.

## Error Handling

- Use stable error categories/codes where clients need branching.
- Preserve causes internally without exposing sensitive details.
- Map expected domain errors to safe API responses.
- Do not swallow errors or use empty catch blocks.
- Retries require bounded attempts, backoff where appropriate, and idempotency analysis.

## Logging

- Use structured logs and correlation/request IDs.
- Log events and identifiers only when necessary.
- Never log secrets, tokens, passwords, personal record bodies, attachment contents, or full exports.
- Use appropriate levels; avoid noisy success logs in hot paths.

## Performance

- Measure before complex optimization.
- Paginate list APIs and bound export/import work.
- Avoid unnecessary React renders and oversized bundles.
- Keep offline queues bounded and retry behavior controlled.
- Add indexes from demonstrated query needs and review write cost.
- Avoid blocking CPU-heavy export work on latency-sensitive paths without design review.

## File Size

Source files MUST stay below 500 physical lines:

- 350 lines: evaluate split.
- 450 lines: refactor before adding logic unless documented exception.
- Over 500 lines: maintainer-approved PR exception required.

Generated files, lockfiles, migrations, snapshots, schema dumps, compiled artifacts, and documentation are exempt.

## Style and Tooling

Use repository ESLint, Prettier, TypeScript, and test configuration. Do not add local style exceptions to bypass valid findings. Formatting-only changes MUST not obscure behavioral diffs.
