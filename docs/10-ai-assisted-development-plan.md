# 10 — AI-Assisted Development Plan

> `AGENTS.md` is canonical. Detailed enforceable procedures live under `docs/ai/`. This planning document provides project background and MUST NOT weaken those rules.

## Canonical project identity

Use **SALIGAN** as the canonical product name in prompts, generated code, generated docs, ADRs, OpenAPI specs, diagrams, and commit messages. Use `saligan` as the package/repository slug.

## Development philosophy

SALIGAN should be built through Spec-Driven Development with AI tools acting as implementation accelerators, not as unreviewed authorities.

## Supported AI tools

- Anthropic Claude Code.
- OpenAI Codex CLI.
- Google Gemini CLI.
- DeepSeek or equivalent local/remote coding assistant.
- GitHub Copilot for editor-level assistance.

## AI usage rules

1. Never implement without a referenced requirement, issue, or ADR.
2. Require tests with implementation changes.
3. Require migration and data-loss notes for schema changes.
4. Run lint, tests, typecheck, and relevant build commands.
5. Avoid secrets and generated credentials in commits.
6. Keep domain logic testable outside UI/API.
7. Review AI output manually before merging.
8. Preserve offline-first behavior when changing timekeeping/reporting flows.
9. Enforce object-level authorization in every API touching user-owned records.
10. Update docs/specs/diagrams when behavior changes.

## Suggested AI implementation workflow

```text
1. Write or approve requirement
2. Create GitHub issue with acceptance criteria
3. Link related spec, ADR, or diagram
4. Ask AI agent for implementation plan only
5. Review plan
6. Ask AI agent to implement on branch
7. Run tests/typecheck/build/security scan
8. Review diff manually
9. Update docs/specs if behavior changed
10. Merge when checks pass
```

## Prompt template

```text
You are working on the SALIGAN repository.

Task:
<clear implementation task>

Source of truth:
- docs/04-software-requirements-specification.md#<section>
- specs/openapi-seed.yaml#<section>
- diagrams/<diagram-file>
- adrs/<adr-file>

Constraints:
- TypeScript strict mode.
- Do not change unrelated modules.
- Keep domain logic covered by tests.
- Preserve offline-first behavior.
- Enforce object-level authorization.
- Do not commit secrets.

Required output:
1. Implementation plan.
2. Files to change.
3. Risk notes.
4. Tests to add/update.
5. Commands to run.
```

## Definition of done

- Requirement has acceptance criteria.
- Code compiles and passes typecheck.
- Unit tests cover domain logic.
- API changes match OpenAPI spec.
- Database changes include migration and rollback notes.
- Security implications reviewed.
- User-facing behavior documented.
- No secrets or unrelated diffs.

Use `docs/engineering/DEFINITION-OF-DONE.md` and `docs/ai/QUALITY-GATES.md` as the current completion standard.
