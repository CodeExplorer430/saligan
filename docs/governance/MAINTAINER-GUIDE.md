# Maintainer Guide

## Maintainer Duties

- Protect project scope, users, data, and FOSS/self-hosted goals.
- Triage issues and security reports.
- Enforce specs, ADRs, tests, docs, and quality gates.
- Review dependency, license, architecture, and release risk.
- Manage repository access, branch protection, CODEOWNERS, secrets, and releases.
- Resolve agent ownership and instruction conflicts.

## Review Expectations

Maintainers MUST verify source traceability, acceptance criteria, security/privacy, tests, migration/rollback, docs, and CI. Approval MUST NOT be based only on generated summaries.

## Escalation Decisions

Record decisions for:

- architecture or framework exceptions;
- source files over 500 lines;
- failed/waived gates;
- irreversible migrations;
- security risk acceptance;
- incompatible or uncertain licenses;
- paid/external service introduction;
- public API breaking changes.

## Access Control

Use least privilege. Remove stale access. Protect branch, environment, package, container, and signing credentials. Never share maintainer tokens through issues, prompts, or logs.

## Bus Factor

Keep operational knowledge in repository docs. At least two maintainers SHOULD be able to perform releases and security response. Changes to maintainer roster require agreement of current maintainers.

## Inactive Maintainers

Maintainers may step down or be marked inactive. Transfer open security, release, and ownership responsibilities explicitly. Do not retain unnecessary privileged access.
