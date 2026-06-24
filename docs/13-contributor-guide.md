# 13 — Contributor Guide

> Contributors using AI agents MUST follow `AGENTS.md`. Current branching, commit, review, testing, and completion rules live under `docs/engineering/`.

## Project principles

SALIGAN is a FOSS, self-hostable, offline-first internship records platform. Contributors should prioritize correctness, security, maintainability, and documentation over fast but fragile changes.

## Contribution workflow

1. Pick or create an issue.
2. Confirm the related requirement or ADR.
3. Create a feature branch.
4. Implement with tests.
5. Run local quality gates.
6. Update docs/specs/diagrams if behavior changes.
7. Open a pull request.

## Branch naming

```text
feat/<short-feature>
fix/<short-fix>
docs/<short-doc-change>
chore/<short-maintenance>
```

## Commit style

Use conventional commits:

```text
feat(timekeeping): add rendered hours calculation
fix(sync): handle duplicate offline operation id
docs(srs): clarify supervisor review workflow
```

## Code quality rules

- Keep domain logic independent from UI and database adapters.
- Avoid large files; split by responsibility.
- Prefer explicit types over `any`.
- Validate all external input.
- Add tests for computations and authorization-sensitive behavior.
- Never commit secrets.
- Document trade-offs in ADRs.

## AI-generated contributions

AI-generated code is allowed but must be reviewed like human code. The contributor is responsible for correctness, licensing, security, tests, and maintainability.

See `docs/ai/AI-ASSISTED-DEVELOPMENT.md` and `docs/governance/OPEN-SOURCE-GOVERNANCE.md` for enforceable governance.
