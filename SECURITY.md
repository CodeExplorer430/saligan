# Security Policy

## Supported Versions

SALIGAN is pre-release. Until versioned releases exist, only current `main` is eligible for security fixes.

## Report a Vulnerability

Do not open a public issue for suspected exploitable vulnerabilities, leaked secrets, authentication/authorization bypass, or exposed personal records.

Preferred reporting method:

1. Use GitHub private vulnerability reporting through the repository Security tab when enabled.
2. If unavailable, contact maintainers privately through their verified GitHub profiles:
   - `@chesternothacker`
   - `@codeexplorer430`

Include:

- affected commit/version and deployment context;
- impact and affected trust boundary;
- minimal reproduction using synthetic data;
- evidence with credentials and personal data removed;
- suggested mitigation, if known.

Do not access, modify, retain, or disclose data beyond minimum needed to demonstrate the issue.

## Response

Maintainers will acknowledge receipt when operationally possible, assess severity, coordinate a fix and release, and credit reporters who request attribution when safe. Timelines depend on severity, reproducibility, and maintainer availability.

Public disclosure MUST wait until maintainers confirm remediation or agree on coordinated disclosure.

## Scope

Security requirements and engineering controls are defined in:

- `docs/ai/SECURITY-RULES.md`;
- `docs/14-security-baseline.md`;
- `docs/ai/QUALITY-GATES.md`.
