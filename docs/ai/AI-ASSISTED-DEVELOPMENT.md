# AI-Assisted Development

## Purpose

AI agents accelerate reviewed engineering work. They do not define product requirements, approve architecture, waive gates, or replace maintainer accountability.

## Operating Procedure

1. Read `AGENTS.md` and required sources.
2. Inspect status, diffs, relevant specs, code, tests, and docs.
3. Identify requirement IDs, issue, ADR, or maintainer instruction.
4. Produce a plan for large or risky work.
5. Make smallest coherent change.
6. Add or update tests and documentation.
7. Run applicable quality gates.
8. Review final status and diff.
9. Report changed behavior, commands, failures, limitations, risks, and handoff state.

## Human Accountability

Human contributors remain responsible for:

- correctness and acceptance criteria;
- security and privacy;
- license and provenance;
- architecture approval;
- merge and release decisions.

AI-generated content MUST receive same review as human-authored content. Generated code MUST NOT be merged because it appears plausible.

## Required Evidence

Completion report MUST include:

- source requirement or instruction;
- files changed;
- tests added or updated;
- exact commands and outcomes;
- skipped gates and reasons;
- docs/contracts changed;
- unresolved risks and follow-ups.

## Forbidden Use

Agents MUST NOT:

- infer unspecified product behavior;
- paste confidential data into external models;
- use production records as examples or test fixtures;
- conceal AI-generated risk or unverified assumptions;
- approve their own architecture/security exceptions;
- claim a review or command occurred when it did not.

## Tool Neutrality

Codex CLI, Claude Code, Gemini CLI, editor agents, and future tools follow `AGENTS.md`. Tool-specific adapters may add stricter constraints but MUST NOT weaken canonical rules.
