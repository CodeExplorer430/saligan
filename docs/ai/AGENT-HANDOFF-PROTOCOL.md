# Agent Handoff Protocol

## When Required

Handoff notes are mandatory when:

- work stops before completion;
- ownership transfers;
- an agent reaches a dependency or blocker;
- another agent must review or integrate changes;
- session context cannot be preserved safely.

## Required Handoff

```markdown
## Agent Handoff

- Task/source: <issue, requirement, ADR, or maintainer instruction>
- Role: <agent role>
- Owned paths: <exact paths or subsystem>
- Status: not-started | in-progress | review-needed | blocked
- Changes made: <concise factual list>
- Tests/gates run: <command and result>
- Not run: <command and reason>
- Decisions: <accepted decisions only>
- Assumptions: <unverified assumptions>
- Risks/blockers: <specific risk and impact>
- Next action: <single concrete action>
- Next owner: <role or maintainer>
```

## Rules

- Store handoff in issue/PR/task system when available; otherwise include in final agent response.
- Do not place secrets, tokens, personal records, or private logs in handoff notes.
- Separate facts from assumptions.
- Do not claim uncommitted work exists without naming changed paths.
- Receiving agent MUST inspect status, diff, and referenced source before edits.
- Receiving agent MUST reject stale or conflicting handoff assumptions.
- Ownership transfers only after prior owner stops editing assigned files.

## GitOps Approval Handoff

AI agents MAY prepare Git/GitHub operations, but MUST NOT execute them until the maintainer supplies the matching exact phrase:

- `APPROVE COMMIT`
- `APPROVE PUSH`
- `APPROVE PR CREATE`
- `APPROVE MERGE`
- `APPROVE RELEASE`
- `APPROVE TAG`
- `APPROVE REPO SETTINGS`
- `APPROVE DESTRUCTIVE GIT`

Before requesting approval, include current branch, `git status --short`, `git diff --stat`, proposed commit message, exact commands, validation results, risks, and rollback plan. Each approval covers only the named operation; no approval chains to later operations.

## Blocker Escalation

Report:

1. exact failed condition;
2. evidence or command output summary;
3. safe attempts made;
4. decision or authority needed;
5. work that remains safe to continue.
