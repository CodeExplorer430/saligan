# Prompt Library

Prompts are starting contracts, not authority. Replace placeholders and attach exact repository sources. Never include secrets or personal records.

## Implementation Plan

```text
Read AGENTS.md and required sources.
Task source: <requirement/issue/ADR/instruction>
Goal: <observable outcome>
In scope: <boundaries>
Out of scope: <boundaries>

Inspect current implementation and produce plan only:
- files to inspect and likely change
- interfaces/data flow
- tests
- quality gates
- docs
- security/privacy risks
- rollback
Do not implement unspecified behavior.
```

## Scoped Implementation

```text
Implement <accepted source>.
Acceptance criteria: <IDs/text>
Owned paths: <paths>
Constraints: strict TypeScript, modular monolith, offline-first, server-side object authorization, no secrets, source files <500 lines.
Add/update tests and docs. Run applicable AGENTS.md gates.
Report exact changes, commands, failures, skipped gates, and risks.
Do not modify unrelated files.
```

## Review

```text
Review diff against <source>.
Focus on correctness, regressions, authorization/BOLA, privacy, offline behavior, API/schema compatibility, tests, migration safety, file size, and stale docs.
Report findings by severity with path and evidence.
Do not perform unrelated refactors.
```

## Security Review

```text
Threat-review <change>.
Check trust boundaries, authentication, object-level authorization, tenant scope, validation, mass assignment, exports, attachments, logs, secrets, rate limits, and negative tests.
Map findings to concrete exploit path and fix. Do not publish sensitive exploit details.
```

## Handoff

```text
Create handoff using docs/ai/AGENT-HANDOFF-PROTOCOL.md.
Separate completed facts, commands/results, assumptions, blockers, risks, next action, and next owner.
Do not include secrets or private records.
```
