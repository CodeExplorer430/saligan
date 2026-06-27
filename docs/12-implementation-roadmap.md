# 12 — Implementation Roadmap

## Phase 0 — Repository baseline

**Goal:** Make SALIGAN safe for AI-assisted development before writing production features.

**Status:** Local Sprint 0A/0B baseline implemented on `chore/sprint-0b-bootstrap`. Commit, push, remote repository setup, and GitHub Actions execution remain pending.

Deliverables:

- monorepo scaffold;
- license, code of conduct, contributing guide, security policy;
- `docs/`, `specs/`, `diagrams/`, `adrs/`, `backlog/` folders;
- CI pipeline for typecheck, lint, test, build, markdownlint;
- ADR index and documentation index;
- initial OpenAPI contract and database schema seed.

Current executable OpenAPI contract contains health only. Product endpoint contracts are added with implementation.

## Phase 1 — Intern self-tracking MVP

**Goal:** Chester and Miguel can track their own OJT records offline and export usable DTR/report documents.

Deliverables:

- intern account and profile setup;
- internship plan setup;
- schedule presets and custom schedule rules;
- clock-in, break-out, break-in, clock-out;
- manual correction with reason;
- rendered/remaining hour computation;
- daily notes;
- weekly report draft generation;
- DTR export to PDF/XLSX;
- report export to DOCX/PDF;
- offline IndexedDB drafts;
- sync queue.

## Phase 2 — Supervisor review workflow

**Goal:** Records are no longer only self-reported; supervisors can verify submissions.

Deliverables:

- supervisor assignment;
- weekly/monthly period submission;
- approve/reject/correction requested decisions;
- audit events;
- email notifications;
- correction history;
- reviewed export status.

## Phase 3 — Organization-ready self-hosting

**Goal:** Other departments, companies, or school groups can self-host the platform.

Deliverables:

- organization onboarding;
- roles and memberships;
- department templates;
- configurable DTR/report templates;
- Docker Compose production profile;
- filesystem/S3 storage adapter interface;
- admin dashboard;
- backup/restore guide.

## Phase 4 — Community template maturity

**Goal:** Make SALIGAN useful as an open-source template for other IT students.

Deliverables:

- public docs site;
- demo seed data;
- issue templates;
- contributor-friendly architecture guide;
- test data factory;
- deployment examples;
- GitHub Discussions/Q&A.
