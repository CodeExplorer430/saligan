# 01 — Project Charter

## Project overview

**SALIGAN** is a greenfield open-source platform for interns, supervisors, and academic coordinators who need a reliable way to manage internship records without depending on manual notes, spreadsheets, or memory.

The first real users are Miguel and Chester, currently assigned as IT interns at Goldtech International Distributors, Inc. under the AYSN Group of Companies. The system is intentionally designed from a real internship problem: tracking working schedules, DTR entries, rendered hours, reports, proof images, and remaining requirements over time.

## Problem statement

Interns often track OJT progress manually using physical DTRs, notes, screenshots, spreadsheets, or memory. This creates recurring issues:

- time-in/time-out records are easy to forget;
- rendered hours require manual computation;
- daily accomplishments are scattered across notes and chats;
- proof images are not connected to reports;
- weekly/monthly reports are repetitive to prepare;
- supervisor validation is difficult to trace;
- unstable internet can interrupt web-based tools;
- students may not afford paid SaaS tools.

## Project goals

1. Provide an offline-first PWA for internship DTR and progress tracking.
2. Make common OJT schedule setups configurable.
3. Compute regular, overtime, undertime, rendered, and remaining hours.
4. Support daily notes, weekly reports, and documentation images.
5. Export DTR and accomplishment reports to submission-ready formats.
6. Support supervisor review and audit trails after the MVP.
7. Keep the project self-hostable and free/open-source.
8. Use spec-driven and AI-assisted development without sacrificing engineering quality.

## Non-goals for MVP

- Payroll processing.
- Employee HRIS replacement.
- Biometric attendance hardware integration.
- GPS/geofencing enforcement.
- Paid hosted SaaS monetization.
- Native Android/iOS app before the PWA is stable.

## Success metrics

| Metric | MVP target |
|---|---:|
| Intern can configure an internship plan | Yes |
| Intern can log offline DTR entries | Yes |
| Rendered and remaining hours are computed | Yes |
| DTR export can be generated | Yes |
| Weekly report export can be generated | Yes |
| Core workflows usable on mobile browser/PWA | Yes |
| Supervisor review workflow | Phase 2 |
| Multi-organization self-hosting | Phase 3 |

## Constraints

- Must be FOSS and self-hostable.
- Must prioritize offline-first behavior.
- Must be friendly to student contributors.
- Must be secure enough for personal internship records.
- Must be built with clear documentation, diagrams, ADRs, and tests.
- Must not assume paid APIs for core workflows.
