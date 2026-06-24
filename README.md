# SALIGAN — Planning Package v1.0

**Project name:** SALIGAN  
**Full name:** Student Attendance, Logbook, Internship Goals, Accomplishments, and Notes  
**Subtitle:** An Offline-First, Self-Hosted Internship Records and OJT Management Platform  
**Former working codenames:** OJT Progress Tracker, OJTala  
**Project type:** Greenfield, free and open-source, self-hostable, SaaS-like offline-first PWA  
**Primary users:** Student interns, supervisors, academic coordinators, company department heads, organization administrators  
**Prepared for:** Miguel and Chester as current IT interns, with future support for interns from other departments and organizations  
**Date:** 2026-06-24

## Purpose

SALIGAN is an offline-first web platform for tracking internship Daily Time Records (DTR), rendered hours, remaining hours, schedules, overtime, accomplishment notes, weekly reports, documentation images, exports, reminders, supervisor review, and academic/company submission readiness.

The project should be developed through **Spec-Driven Development**, supported by **AI-Assisted Development**, **AI-Driven Software Engineering**, and **AI-Driven Software Development** workflows.

## Name rationale

**SALIGAN** is an English acronym for **Student Attendance, Logbook, Internship Goals, Accomplishments, and Notes**. The visible brand is also a Filipino word associated with a basis, foundation, or something used as a basis. This fits the project because the platform becomes the foundation for reliable internship records, timekeeping, reporting, and verification.

Preferred repository/package identity:

```text
Repository slug: saligan
Package scope: @saligan
Product name: SALIGAN
Formal title: SALIGAN: Student Attendance, Logbook, Internship Goals, Accomplishments, and Notes
Subtitle: An Offline-First, Self-Hosted Internship Records and OJT Management Platform
```

Suggested short description:

```text
Offline-first, self-hostable internship records and OJT management platform for DTR, rendered hours, reports, and supervisor review.
```

## Package contents

```text
docs/
  00-project-identity-and-naming.md
  01-project-charter.md
  02-requirements-gathering-plan.md
  03-stakeholder-and-user-analysis.md
  04-software-requirements-specification.md
  05-feature-backlog.md
  06-tech-stack-baseline.md
  07-architecture-overview.md
  08-data-model.md
  09-export-template-requirements.md
  10-ai-assisted-development-plan.md
  11-initial-setup-guide.md
  12-implementation-roadmap.md
  13-contributor-guide.md
  14-security-baseline.md
  docx/
    SALIGAN-planning-package.docx
specs/
  openapi-seed.yaml
backlog/
  initial-user-stories.csv
adrs/
  ADR-0001-project-identity.md
  ADR-0002-offline-first-pwa.md
  ADR-0003-self-hosted-foss.md
  ADR-0004-tech-stack-baseline.md
diagrams/
  *.puml, *.mmd, *.d2, *.dbml, *.structurizr.dsl, *.bpmn
  dot/*.dot
  rendered/*.png
  rendered/*.svg
```

## Recommended immediate next steps

1. Validate the DTR format against your school/company-required template.
2. Confirm the approval cadence: daily, weekly, monthly, or final-only.
3. Create the actual Git repository using the `saligan` slug.
4. Scaffold the monorepo from the tech stack baseline.
5. Convert the feature backlog into GitHub issues and milestones.
6. Implement the MVP around intern self-tracking before supervisor workflows.

## Recommended repository structure

```text
/apps
  /web-pwa
  /api
/packages
  /domain
  /ui
  /config
  /exporters
  /sync
/docs
/diagrams
/specs
/adrs
/backlog
/docker
```

## Baseline technology direction

- **Language/runtime:** TypeScript strict mode on Node.js 24 LTS.
- **Frontend:** React + Vite + TanStack Router + TanStack Query + Tailwind CSS + shadcn/ui.
- **Offline-first:** Service worker through Vite PWA/Workbox; local structured data through IndexedDB using Dexie.
- **Backend:** NestJS on Fastify adapter, REST-first API, OpenAPI 3.1 contract.
- **Database:** PostgreSQL 18 target, PostgreSQL 16 minimum support.
- **ORM/migrations:** Drizzle ORM + drizzle-kit.
- **Exports:** server-side PDF/DOCX/XLSX/CSV/HTML/ICS generation.
- **Deployment:** Docker Compose for local/self-hosted deployments.

See [docs/06-tech-stack-baseline.md](docs/06-tech-stack-baseline.md) for the full stack decision.

## Engineering governance

All AI coding agents and contributors MUST start with [AGENTS.md](AGENTS.md). Detailed procedures are indexed in [docs/README.md](docs/README.md), including AI orchestration, quality gates, security rules, coding standards, testing, review, releases, and open-source governance.
