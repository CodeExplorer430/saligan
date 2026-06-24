# Review Checklist

## Scope and Traceability

- Linked requirement, issue, ADR, or maintainer instruction exists.
- Diff matches acceptance criteria and excludes unrelated work.
- Architecture and dependency changes have required approval.

## Correctness and Design

- Domain rules are centralized and edge cases handled.
- Public API, schema, offline, and compatibility effects are intentional.
- Source files remain below 500 lines or approved exception exists.
- Errors, retries, transactions, and concurrency are safe.

## Security and Privacy

- External input is validated.
- Authentication and server-side object authorization are enforced.
- Cross-user/role/organization negative tests exist when relevant.
- Logs, exports, attachments, and errors do not leak sensitive data.
- No secrets, unsafe HTML, dynamic evaluation, or risky dependencies.

## Tests and Operations

- Frozen install, formatting, and documentation checks pass.
- Tests map to changed behavior and regressions.
- Required local/CI/Docker/migration/smoke gates ran.
- Production dependency audit findings are resolved or documented.
- Failed or skipped gates are explicit.
- Deployment, backup, recovery, and rollback are credible.

## Documentation

- SRS, OpenAPI, ADR, architecture, setup, UI, and process docs are current as applicable.
- UI changes include screenshots.
- Commands, links, environment variables, and examples are accurate.

## Decision

Approve only when material findings are resolved. Use blocking review for security, data loss, failed mandatory gates, missing traceability, or stale contracts.

Do not equate local checks with remote GitHub Actions. Required remote checks must be observed before merge.
