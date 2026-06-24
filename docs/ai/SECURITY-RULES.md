# Security Rules

## Threat Model Assumptions

SALIGAN stores sensitive student, academic, attendance, company, supervisor, attachment, and internship records. Assume:

- clients and networks are untrusted;
- authenticated users may attempt horizontal or vertical privilege escalation;
- object IDs may be enumerated;
- exports and attachments may escape normal UI controls;
- self-hosters may misconfigure secrets, TLS, storage, backups, or proxies;
- offline devices may be lost, shared, or compromised;
- dependencies and container images may be vulnerable.

Controls SHOULD align with OWASP ASVS and OWASP API Security Top 10.

## Authentication and Sessions

Authentication and sessions are not implemented in Sprint 0B. An accepted ADR is required before user endpoints or credentials are added. When implemented:

- hash passwords with Argon2id using reviewed parameters;
- use generic authentication errors;
- rate-limit credential and recovery endpoints;
- rotate sessions after authentication and privilege changes;
- use secure, HTTP-only, SameSite cookies in production;
- implement logout/revocation and bounded session lifetime;
- never store raw passwords, recovery tokens, or session secrets in logs.

## Authorization and BOLA

- Enforce authorization server-side on every request.
- Check object-level access for every user-controlled ID, including nested resources, exports, attachments, and bulk operations.
- Scope queries by user assignment and organization, not by post-query filtering.
- Return safe not-found/forbidden behavior without leaking private object existence.
- Client role checks are presentation only.
- Add negative tests for cross-user, cross-role, cross-organization, revoked, and unauthenticated access.

## Input and Output

- Validate body, query, params, headers, files, and imported data at boundaries.
- Reject unknown or malformed fields where practical.
- Normalize dates, time zones, identifiers, filenames, and content types.
- Prevent mass assignment.
- Escape output by context; sanitize any allowed HTML.
- Avoid dynamic evaluation, unsafe deserialization, command construction, and unbounded parsing.

## Exports and Attachments

- Authorize export generation and every included record.
- Mark draft/unreviewed output clearly.
- Prevent formula injection in CSV/XLSX.
- Sanitize filenames and disposition headers.
- Validate size, type, extension, and content; store outside executable/public paths.
- Use authorized, time-bounded attachment access.
- Audit sensitive exports without logging exported content.

## Privacy and Offline Data

- Collect minimum necessary data.
- Avoid GPS and biometric data unless separately approved.
- Define retention, deletion, backup, and export behavior before public release.
- Minimize offline sensitive data and clear it on logout/account removal where feasible.
- Do not include personal records in fixtures, screenshots, logs, prompts, or issue reports.

## Logging and Errors

Logs MUST be structured, access-controlled, and free of credentials, tokens, passwords, full exports, attachment contents, and unnecessary personal data. Use correlation IDs. Client errors MUST not reveal stacks, SQL, filesystem paths, secrets, or authorization internals.

## Secrets and Dependencies

- Commit only sanitized `.env.example`.
- Load secrets through environment or approved secret stores.
- Never use production credentials in development, tests, docs, or CI.
- Pin and review dependencies; verify maintenance and license.
- Assess audit findings before upgrades.
- Run `pnpm audit --audit-level low`; zero known vulnerabilities are permitted, including development-only low and moderate findings.
- Dependency Review blocks newly introduced high and critical vulnerabilities in runtime, development, and unknown scopes and reports lower-severity findings. Full audit remains stricter and MUST be clean.
- OpenSSF Scorecard results are informational dependency risk signals and do not independently block Sprint 0 pull requests.
- Keep license review enabled. Add an allowlist only after auditing it for AGPL-3.0-or-later compatibility; do not suppress individual advisories or licenses without documented maintainer acceptance.
- Do not use audit ignores, advisory suppression, `continue-on-error`, or weakened severity thresholds to obtain a pass.

## Security Escalation

Stop and escalate suspected vulnerability, data exposure, auth bypass, unsafe migration, leaked secret, or incompatible license. Do not publish exploit details in public issues. Follow `SECURITY.md` when present.
