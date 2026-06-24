# Branching Strategy

## Model

Use short-lived branches from protected `main`. `main` MUST remain releasable. Direct commits to `main` require explicit maintainer instruction.

## Names

```text
feat/<issue>-<slug>
fix/<issue>-<slug>
docs/<issue>-<slug>
refactor/<issue>-<slug>
test/<issue>-<slug>
chore/<issue>-<slug>
security/<issue>-<slug>
release/<version>
```

If no issue exists for permitted maintenance, omit issue number.

Example maintenance branch: `chore/sprint-0b-bootstrap`.

## Rules

- Keep one coherent purpose per branch.
- Rebase or merge current `main` before final review according to maintainer preference.
- Do not mix formatting or unrelated refactors with behavior changes.
- Use draft PRs for incomplete work.
- Delete merged branches when safe.
- Never force-push shared branches without owner coordination.
- Hotfixes still require review, tests, docs, and post-incident follow-up.

## Protection Baseline

`main` SHOULD require:

- pull request;
- CODEOWNERS/maintainer review;
- required CI checks;
- resolved conversations;
- no force pushes or deletion;
- signed commits/tags when release process adopts them.
