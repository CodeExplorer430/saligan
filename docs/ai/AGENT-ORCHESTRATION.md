# Agent Orchestration

## Modes

### Single-Agent Mode

Use for isolated, low-conflict tasks. One agent plans, edits, tests, reviews its diff, and reports. Security-sensitive or release work still requires independent human or designated-agent review.

### Multi-Agent Mode

Use when work separates cleanly by domain or review function. Orchestrator assigns scope, ownership, dependencies, expected output, and review order before implementation.

## Roles

Detailed responsibilities live in `AGENT-ROLES.md`.

- Orchestrator coordinates scope, ownership, dependencies, and integration.
- Requirements defines traceable behavior and acceptance criteria.
- Architecture governs boundaries, contracts, ADRs, and cross-cutting design.
- Backend owns API and server application behavior.
- Frontend owns accessible offline-first UI behavior.
- Database owns schema, queries, migrations, and recovery notes.
- QA/Test owns test strategy, regression coverage, and gate evidence.
- Security owns threat review, authorization, privacy, and negative tests.
- Documentation owns synchronized user and engineering documentation.
- Release owns versioning, release evidence, artifacts, and rollback readiness.

## Ownership Rules

- One agent owns a file at a time.
- Ownership assignment MUST name paths or bounded subsystems.
- Shared contract files require Orchestrator coordination.
- Agent MUST inspect status/diff before edits and after work.
- Agent MUST NOT overwrite or reformat another agent's changes.
- Scope expansion requires Orchestrator or maintainer approval.

Recommended Sprint workspace ownership:

- Frontend: `apps/web`;
- Backend: `apps/api`;
- Database: `packages/database`;
- Contracts/validation: `packages/shared`, `packages/validation`;
- UI system: `packages/ui`, `DESIGN.md`;
- Repository tooling: root configs and `.github/workflows`;
- Documentation: assigned `docs/`, `specs/`, and `diagrams/` paths.

## Handoff Format

Use `AGENT-HANDOFF-PROTOCOL.md`. Minimum handoff:

```text
Task/source:
Role and owned paths:
Status:
Changes made:
Tests/gates run:
Open failures:
Decisions/assumptions:
Risks:
Next action and owner:
```

## Conflict Prevention

1. Split work by domain and file ownership.
2. Assign shared contracts first.
3. Sequence dependent migrations, APIs, clients, and tests.
4. Avoid overlapping formatters and bulk rewrites.
5. Rebase or integrate only after reviewing incoming changes.
6. Escalate conflicting requirements; do not silently choose.

## Review Chain

Default chain:

```text
Requirements -> Architecture (when triggered) -> Implementer
-> QA/Test -> Security (when sensitive) -> Documentation
-> Orchestrator integration -> Maintainer approval
```

QA/Test and Security MAY block progression for unmet mandatory gates. Release work requires maintainer approval.

## Integration Exit Criteria

Orchestrator MUST verify:

- ownership conflicts resolved;
- requirement and test traceability present;
- contracts and docs synchronized;
- all applicable gates recorded;
- no unreviewed unrelated diff;
- handoffs closed or explicitly tracked.
