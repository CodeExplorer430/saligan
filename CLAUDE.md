# Claude Code Adapter

`AGENTS.md` is canonical. Read and obey it before work, then follow its required reading order.

- Inspect context, `git status`, and relevant diffs before edits.
- Plan large or risky changes before implementation.
- Keep edits narrow; avoid broad rewrites and unrelated cleanup.
- Trace behavior to a requirement, issue, ADR, or maintainer instruction.
- Add tests and docs; run applicable gates; report exact commands and limitations.
- Keep source files below 500 lines and refactor before 450 lines grows further.
- Treat all controllable warnings, errors, and dependency advisories as blockers.
- Before commit, push, PR, merge, release, tag, repository-setting, or destructive Git operations, follow `AGENTS.md` exact approval-phrase workflow.
- Never store secrets in files, prompts, memory, session notes, or logs.
- Use session notes only when they materially aid handoff. Keep notes task-scoped, factual, disposable, and free of sensitive data.
- Do not claim completion unless `AGENTS.md` completion conditions are met.
