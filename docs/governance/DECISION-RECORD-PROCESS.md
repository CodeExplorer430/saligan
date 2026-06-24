# Decision Record Process

## When Required

Create an ADR for durable decisions listed in `docs/ai/SPEC-DRIVEN-DEVELOPMENT.md`, especially architecture, framework, trust-boundary, storage, sync, deployment, compatibility, and irreversible data choices.

## Location and Naming

Store under `adrs/`:

```text
ADR-NNNN-short-kebab-title.md
```

Numbers are sequential and never reused.

## Required Sections

```markdown
# ADR-NNNN: Title

- Status: Proposed | Accepted | Superseded | Rejected
- Date: YYYY-MM-DD
- Deciders: GitHub handles
- Related: issues, requirements, ADRs

## Context
## Decision
## Alternatives Considered
## Consequences
## Security and Privacy
## Migration and Rollback
```

## Lifecycle

1. Author proposes ADR before implementation.
2. Relevant agents/reviewers assess alternatives and consequences.
3. Maintainer accepts or rejects.
4. Implementation and docs link accepted ADR.
5. Later changes supersede; accepted ADR history is not rewritten.

## Rules

- ADRs record decisions, not meeting transcripts.
- Alternatives MUST be credible.
- Consequences MUST include costs and risks.
- Proposed ADR does not authorize implementation.
- Editorial corrections may update accepted ADRs; substantive reversal requires superseding ADR.
