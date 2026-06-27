# Release Process

## Preconditions

Release requires maintainer authorization, green required CI, reviewed security status, current docs, tested migrations, and rollback readiness.

## Procedure

1. Confirm release scope and linked issues.
2. Select version using Semantic Versioning.
3. Update release notes/changelog when introduced.
4. Verify dependency lockfile and reproducible build.
5. Run frozen install, format/docs, lint, typecheck, tests, build, audit, Docker smoke tests, API/web health checks, and migration checks.
6. Review security findings, licenses, secrets, images, and artifacts.
7. Verify backup, upgrade, downgrade/recovery, and configuration notes.
8. Create reviewed release PR/branch.
9. Merge, tag, and publish only with maintainer approval.
10. Verify published artifacts and deployment instructions.
11. Record known issues and monitor reports.

## Release Evidence

Record commit/tag, versions, checks, artifact digests when available, migration path, rollback steps, security exceptions, and approver.

## Emergency Release

Emergency fixes may reduce normal lead time but MUST NOT bypass authorization, tests relevant to fix, secret scanning, rollback planning, or maintainer approval. Complete missing documentation and retrospective immediately afterward.

## Prohibited

- Publishing from unreviewed local state.
- Reusing mutable release tags.
- Claiming reproducibility without verification.
- Shipping known critical security defects without explicit documented maintainer decision.
- Treating configured but unrun GitHub Actions as release evidence.
