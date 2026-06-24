# 04 — Software Requirements Specification

**Project name:** SALIGAN  
**Full name:** Student Attendance, Logbook, Internship Goals, Accomplishments, and Notes  
**Version:** 1.0 planning baseline  
**Date:** 2026-06-24

## 1. Introduction

This SRS defines the initial functional and non-functional requirements for SALIGAN, an offline-first, self-hosted internship records and OJT management platform.

## 2. Product scope

SALIGAN supports student interns who need to configure internship requirements, record DTR entries, compute rendered and remaining hours, document daily/weekly work, attach proof images, export reports, and submit records for review.

## 3. Assumptions

- The MVP starts with interns self-tracking their records.
- Supervisor review is added after the core self-tracking workflow is reliable.
- The system supports one organization in MVP but is designed for future organization-level self-hosting.
- The PWA must continue to support draft records when the device is offline.
- Exports should be usable for school/company submission but must still be validated against the exact required template.

## 4. Functional requirements

### FR-001 User account and profile

The system shall allow a user to create and manage an intern profile containing name, school/program, company, department, internship role, supervisor, and contact information.

**Priority:** MVP  
**Acceptance criteria:**

- Intern can create/update profile fields.
- Required fields are validated.
- Profile can be used in exports.

### FR-002 Internship plan setup

The system shall allow interns to configure an internship plan with target required hours, start date, expected end date, assigned supervisor, company, department, and role title.

**Priority:** MVP

### FR-003 Schedule presets

The system shall provide common schedule presets such as Monday-Friday, Monday-Saturday, and custom workday rules with configurable start time, end time, and break periods.

**Priority:** MVP

### FR-004 DTR time entry logging

The system shall allow interns to log clock-in, break-out, break-in, and clock-out records per workday.

**Priority:** MVP

### FR-005 Manual corrections

The system shall allow interns to correct draft or rejected time entries with a required reason.

**Priority:** MVP

### FR-006 Rendered hours computation

The system shall compute regular rendered minutes, overtime minutes, undertime minutes, and remaining minutes toward the internship target.

**Priority:** MVP

### FR-007 Daily notes

The system shall allow interns to write daily notes describing tasks performed, issues resolved, tools used, and learning outcomes.

**Priority:** MVP

### FR-008 Weekly accomplishment reports

The system shall allow interns to generate weekly report drafts from daily notes and time entries.

**Priority:** MVP

### FR-009 Image/documentation attachments

The system shall allow interns to attach images or files as documentation evidence for daily notes or reports.

**Priority:** Should

### FR-010 DTR export

The system shall export DTR records to PDF and spreadsheet formats, with printable layouts that resemble common physical DTR forms.

**Priority:** MVP

### FR-011 Report export

The system shall export accomplishment reports to DOCX and PDF.

**Priority:** MVP

### FR-012 Calendar and reminder export

The system shall generate calendar reminder files for scheduled workdays and reporting deadlines using `.ics` files.

**Priority:** Should

### FR-013 Supervisor review

The system shall allow assigned supervisors to approve, reject, or request correction for submitted records.

**Priority:** Phase 2

### FR-014 Audit log

The system shall record key actions such as creation, edits, submissions, approvals, rejections, exports, and corrections.

**Priority:** Should

### FR-015 Offline draft mode

The system shall allow interns to create and edit local draft entries while offline and sync them when connectivity returns.

**Priority:** MVP

### FR-016 Conflict handling

The system shall detect sync conflicts and require user review when server and local records diverge.

**Priority:** Should

## 5. Non-functional requirements

| Requirement | Target |
|---|---|
| Offline reliability | Core draft workflows must work without network connectivity. |
| Security | Passwords must be hashed with a slow password hashing algorithm and object-level authorization must be enforced. |
| Privacy | Users must not access other interns' records without assignment or authorization. |
| Performance | Dashboard and current-period views should load quickly on low-end student devices. |
| Maintainability | Domain logic must be testable outside UI/API layers. |
| Accessibility | Interface should target WCAG 2.2 AA where practical. |
| Portability | Local/self-hosted deployment must work through Docker Compose. |
| Documentation | Every implemented feature must trace back to requirements, issues, and tests. |

## 6. MVP scope

MVP includes:

- user profile;
- internship plan;
- schedule presets;
- DTR logging;
- rendered/remaining hour computation;
- daily notes;
- weekly report drafting;
- PDF/XLSX DTR export;
- DOCX/PDF report export;
- offline drafts and sync queue.

MVP excludes:

- paid SaaS billing;
- native apps;
- biometrics;
- GPS enforcement;
- payroll;
- complex analytics;
- enterprise SSO.

## 7. Traceability

Each requirement should become one or more backlog items in `docs/05-feature-backlog.md` and implementation issues after repository setup.
