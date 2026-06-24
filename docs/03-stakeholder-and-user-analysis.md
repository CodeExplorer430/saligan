# 03 — Stakeholder and User Analysis

## User roles

| Role | Description | Main capabilities |
|---|---|---|
| Intern | Student rendering internship hours | Configure profile, log DTR, write notes, upload evidence, export reports |
| Supervisor | Company-side reviewer | Review submissions, request corrections, approve reports, verify exports |
| Academic Coordinator | School-side monitor | Track students, review progress, require templates, monitor completion |
| Organization Admin | Company/school/platform admin | Manage organizations, departments, roles, templates, retention settings |
| Maintainer | Open-source technical maintainer | Review issues, maintain architecture, manage releases and security reports |

## Persona: IT Intern

The intern needs a fast mobile-friendly way to record actual work hours during real support tasks. They may have unstable internet or be away from a desk, so the app must not fail when offline.

## Persona: Technical Support Supervisor

The supervisor needs a reliable way to verify that interns actually rendered hours and documented useful work. They need correction and approval history, but should not be overloaded by unnecessary review steps.

## Persona: Academic Coordinator

The coordinator needs consistent records and exports that can be submitted, reviewed, printed, and archived. They care about required hours, completeness, evidence, and document format compliance.

## Role capability matrix

| Capability | Intern | Supervisor | Academic Coordinator | Org Admin |
|---|---:|---:|---:|---:|
| Manage own profile | Yes | Yes | Yes | Yes |
| Create own internship plan | Yes | No | Can assist | Can assist |
| Log time entries | Yes | No | No | No |
| Edit own draft entries | Yes | No | No | No |
| Submit entries/reports | Yes | No | No | No |
| Review submitted records | No | Yes | Optional | Optional |
| Request correction | No | Yes | Optional | Optional |
| Export own DTR/report | Yes | Yes if assigned | Yes if assigned | Yes |
| Manage organization templates | No | No | Optional | Yes |
| View audit log | Limited | Assigned records | Assigned records | Full organization |

## Trust boundaries

- Interns may only access their own internship records unless explicitly granted otherwise.
- Supervisors may only access assigned interns.
- Coordinators may only access students under their school/program/organization scope.
- Organization admins may manage organization-level settings but should not bypass audit logs.
- Every object-level access must be checked on the server.
