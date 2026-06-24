# Spec-Driven Development

## Traceability Sources

Every behavior change MUST cite one or more:

- SRS requirement such as `FR-004`;
- accepted issue or backlog item;
- accepted ADR;
- explicit maintainer instruction.

No source means no feature implementation. Clarify or update spec first.

## Workflow

1. Identify requirement and current behavior.
2. Define acceptance criteria and non-goals.
3. Determine contract, data, offline, security, and migration effects.
4. Create ADR when triggered.
5. Map each criterion to tests.
6. Update spec/contract before or with implementation.
7. Implement smallest coherent change.
8. Run gates and review traceability.

## Acceptance Criteria Format

Use observable conditions:

```markdown
### AC-<requirement>-<number>: <outcome>

Given <state and permissions>
When <action>
Then <observable result>
And <security, offline, error, or audit condition when relevant>
```

Avoid criteria such as “works correctly,” “user friendly,” or implementation-only details.

## ADR Triggers

Create or update an ADR before:

- changing baseline framework, ORM, authentication, state, UI, storage, sync, or deployment approach;
- introducing microservices, queues, new external services, or paid dependencies;
- changing public API compatibility or trust boundaries;
- selecting irreversible schema/data strategy;
- accepting major security, privacy, availability, or license trade-offs;
- creating a pattern that multiple modules must follow.

Routine implementation inside accepted architecture does not require an ADR.

## Requirement and Test Mapping

PR description MUST map:

| Requirement/AC | Implementation | Test |
|---|---|---|
| `FR-xxx / AC-x` | path or module | test name/path |

Security-sensitive criteria MUST include negative cases. Offline criteria MUST include disconnected, queued, retry, and conflict behavior where applicable.

## Documentation Mapping

- User behavior -> README/user docs/SRS.
- API shape -> OpenAPI and API docs.
- Data model -> schema/data docs and migration notes.
- Architecture/dependency -> ADR and tech-stack/architecture docs.
- UI system -> `DESIGN.md`.
- Engineering process -> `docs/ai` or `docs/engineering`.

## Change Control

If implementation exposes ambiguity or contradiction, stop feature work and escalate. Do not silently reinterpret approved criteria.
