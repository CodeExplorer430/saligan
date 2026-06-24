# 14 — Security Baseline

> Detailed enforceable agent rules live in `docs/ai/SECURITY-RULES.md`. If requirements conflict, follow the stricter security or privacy control and escalate to maintainers.

## Purpose

This document defines the minimum security baseline for the SALIGAN MVP.

## Security goals

- Protect internship records from unauthorized access.
- Prevent users from accessing other interns' records.
- Avoid unsafe password storage.
- Preserve traceability for critical changes.
- Keep self-hosted deployments reasonably secure by default.

## Authentication

- MVP uses app-owned email/password authentication.
- Passwords must never be stored in plaintext.
- Use Argon2id or another approved slow password hashing algorithm.
- Sessions should use secure, HTTP-only cookies in production.

## Authorization

- Enforce RBAC and object-level authorization on the server.
- Interns can only access their own internship plans and entries.
- Supervisors can only access assigned interns.
- Coordinators/admins must be scoped to their organization.
- Never trust client-side role checks as the source of truth.

## Sensitive operations requiring audit events

- Login/logout failures beyond threshold.
- Profile changes.
- Internship plan changes.
- Time entry corrections.
- Submission, approval, rejection, correction request.
- Export generation.
- Role or membership changes.
- Template changes.

## Data protection

- Store only data needed for internship tracking.
- Avoid collecting GPS/biometric data in MVP.
- Do not expose attachments without authorization checks.
- Add export status labels for draft/unreviewed documents.
- Provide backup and deletion guidance before public release.

## API security checklist

- Validate request bodies and params.
- Check object ownership for every ID-based endpoint.
- Use pagination for list endpoints.
- Rate-limit authentication endpoints.
- Avoid leaking whether a private object exists.
- Return safe error messages.
- Log suspicious authorization failures.

## Self-hosting checklist

- Use HTTPS behind a reverse proxy in production.
- Change default secrets.
- Keep database volume backed up.
- Use non-root containers where possible.
- Run dependency and container scans before releases.

Security-sensitive changes MUST also satisfy `docs/ai/QUALITY-GATES.md` and the security section of `.github/pull_request_template.md`.
