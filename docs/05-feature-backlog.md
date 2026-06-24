# 05 — Feature Backlog

## Priority legend

- **MVP:** Needed for Miguel and Chester to use the system for real internship tracking.
- **Should:** Important after MVP stabilization.
- **Later:** Useful for organization/community maturity.

## MVP epics

| Epic | Description | Priority |
|---|---|---|
| Identity and profile | User profile and intern metadata used in exports | MVP |
| Internship plan | Company, role, supervisor, required hours, date range | MVP |
| Schedule rules | Workdays, shifts, breaks, overtime rules | MVP |
| DTR logging | Clock-in, breaks, clock-out, correction reasons | MVP |
| Hour computation | Rendered, remaining, regular, overtime, undertime | MVP |
| Daily notes | Work accomplished, tools used, issues resolved | MVP |
| Weekly reports | Draft report from notes and DTR entries | MVP |
| Exports | PDF/XLSX DTR, DOCX/PDF reports | MVP |
| Offline drafts | IndexedDB local drafts and sync queue | MVP |

## Should-have epics

| Epic | Description | Priority |
|---|---|---|
| Supervisor review | Submit, approve, reject, request correction | Should |
| Audit trail | Record important changes and review decisions | Should |
| Calendar reminders | ICS export and deadline reminders | Should |
| Attachment storage | Documentation photos and report evidence | Should |
| Template configuration | DTR/report template variations | Should |

## Later epics

| Epic | Description | Priority |
|---|---|---|
| Multi-organization | Schools, companies, departments, memberships | Later |
| OIDC/Keycloak | Optional external identity provider | Later |
| S3-compatible storage | MinIO/S3 adapter for attachments | Later |
| Analytics | Completion trends, attendance consistency, delay risk | Later |
| Public docs site | Open-source contributor and deployment docs | Later |

## Example user stories

| ID | User story | Acceptance criteria | Priority |
|---|---|---|---|
| US-001 | As an intern, I can create an internship plan so that the system knows my target hours. | Plan saves required hours, start date, company, role, and supervisor. | MVP |
| US-002 | As an intern, I can configure my work schedule so that DTR computations match my real setup. | Presets and custom schedule rules are supported. | MVP |
| US-003 | As an intern, I can log time-in and time-out so that my rendered hours are computed. | Entry shows regular/overtime/undertime minutes. | MVP |
| US-004 | As an intern, I can write daily accomplishments so that weekly reports are easier to prepare. | Notes are saved offline and linked to date. | MVP |
| US-005 | As an intern, I can export a DTR so that I can submit or print my records. | Export includes period, AM/PM entries, totals, and signature blocks. | MVP |
| US-006 | As a supervisor, I can review submitted records so that the intern has verified documentation. | Supervisor can approve, reject, or request correction. | Should |
| US-007 | As an admin, I can configure templates so that the system matches our organization rules. | Template version is tracked and used in exports. | Later |
