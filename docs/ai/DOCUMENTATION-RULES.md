# Documentation Rules

## Authority

Document behavior in its authoritative location:

- requirements: SRS/backlog;
- decisions: ADRs;
- API: OpenAPI;
- architecture/data flow: architecture and data docs;
- UI system: `DESIGN.md`;
- commands/setup: README and setup docs;
- engineering process: `docs/ai`, `docs/engineering`, `docs/governance`.

Do not duplicate full policies when a precise link suffices.

## Change Requirements

Update documentation in same change when behavior, API, schema, migration, architecture, dependency, environment variable, deployment, security process, or developer command changes.

Major behavior is incomplete while docs are stale.

## Writing Standard

- Use normative MUST/MUST NOT language for enforceable policy.
- Use exact paths, commands, requirement IDs, and version constraints.
- Distinguish current behavior, planned behavior, and examples.
- Label placeholder modules, seed schemas, and product diagrams as planned when no executable behavior exists.
- Avoid claims not verified in repository.
- Keep examples synthetic and free of secrets or personal data.
- Use accessible headings, concise paragraphs, and descriptive links.

## Diagrams and ADRs

Update diagrams when changed relationships cannot be understood from current diagrams. Create ADRs only for durable decisions meeting documented triggers. Never rewrite accepted ADR history; supersede it.

Architecture diagrams MUST distinguish implemented Sprint architecture from future product flows. Regenerate tracked renderings when source tools are available; otherwise record source-only updates in Sprint notes.

## Review Checklist

- terminology matches SALIGAN identity;
- commands exist and are safe;
- links and paths resolve;
- examples match contracts;
- security/privacy implications are covered;
- no credentials or personal data appear;
- requirement and test traceability remain clear.
