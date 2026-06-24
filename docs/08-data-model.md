# 08 — Data Model

## Purpose

This document explains the Sprint 0B database baseline for SALIGAN. Drizzle schema is authoritative in `packages/database/src/schema/`; generated migration lives under `packages/database/drizzle/`. DBML and rendered Graphviz ERD files provide documentation views.

The 12 tables are migrated and locally verified. Application services, authentication, authorization, and business behavior using these tables remain unimplemented.

## Core entities

| Entity | Purpose |
|---|---|
| users | Login identity and personal profile |
| organizations | School, company, department, or self-hosted tenant boundary |
| memberships | User role within an organization |
| internship_plans | Main internship configuration per intern |
| schedule_rules | Workdays, shifts, breaks, and time rules |
| time_entries | Per-day DTR record |
| time_segments | Clock/break segments within a DTR day |
| report_entries | Daily/weekly/monthly reports and notes |
| attachments | Uploaded proof images and documents |
| review_decisions | Supervisor/coordinator approval history |
| sync_operations | Offline client operation queue tracking |
| audit_events | Security and workflow traceability |

## Important design rules

- Store time in UTC instants where appropriate, but preserve local work date and timezone for DTR reporting.
- Treat computed minutes as reproducible domain outputs; store snapshots only when needed for export/audit stability.
- Never rely on client-side ownership checks alone.
- Keep attachments linked to domain objects through explicit entity type and entity ID.
- Use optimistic versions for sync conflict detection.

## Time computation inputs

| Input | Source |
|---|---|
| Work date | Intern-selected date under internship timezone |
| Shift start/end | Schedule rule |
| Break start/end | Schedule rule or manual time segment |
| Time-in/out | Time segment records |
| Overtime allowed | Internship plan or organization policy |
| Holidays/rest days | Schedule/calendar configuration |

## Review state lifecycle

```text
draft -> submitted -> approved
                  -> rejected
                  -> correction_requested -> draft
```

## Export data sources

| Export field group | Source tables |
|---|---|
| Intern identity | users, internship_plans |
| Company/supervisor | organizations, memberships, internship_plans |
| DTR rows | time_entries, time_segments, schedule_rules |
| Totals | computed domain logic + time_entries snapshot |
| Report content | report_entries, attachments |
| Approvals | review_decisions, audit_events |
