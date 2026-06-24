# Commit Conventions

Use Conventional Commits:

```text
<type>(<scope>): <imperative summary>
```

Allowed common types: `feat`, `fix`, `docs`, `refactor`, `test`, `build`, `ci`, `chore`, `perf`, `security`, `revert`.

Examples:

```text
docs(ai): define agent handoff protocol
ci(security): add dependency review gate
fix(timekeeping): reject overlapping time segments
```

## Rules

- Keep subject concise, imperative, and without trailing period.
- Commit one reviewable concern.
- Use body for rationale, constraints, migration, and risk.
- Reference issue, requirement, or ADR when applicable.
- Mark breaking changes with `!` and `BREAKING CHANGE:` footer.
- Do not mention tests or checks that were not run.
- Do not commit secrets, generated noise, debug artifacts, or unrelated changes.
- AI-assisted commits remain author responsibility; do not add fabricated co-authors.
