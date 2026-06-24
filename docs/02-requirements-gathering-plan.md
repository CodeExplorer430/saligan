# 02 — Requirements Gathering Plan

## Purpose

This document defines how requirements will be gathered, validated, and converted into implementation-ready issues for SALIGAN.

## Primary stakeholder groups

| Stakeholder | Information needed |
|---|---|
| Student interns | Actual DTR habits, schedule patterns, report needs, offline pain points |
| Company supervisors | Review cadence, verification rules, correction workflow, export preferences |
| Academic coordinators | Required hours, report format, DTR template, submission deadline rules |
| Company administrators | Department setup, supervisor assignments, retention policies |
| Open-source contributors | Setup clarity, issue quality, coding standards, architectural boundaries |

## Discovery questions

### For interns

- What is your required number of internship hours?
- What is your official work schedule?
- Are lunch breaks counted or excluded?
- Are overtime hours allowed?
- How do you currently record time-in/time-out?
- What report formats does your school require?
- Do you need to attach images or screenshots as proof?
- How often do you submit reports?
- What happens if you forget to log a day?

### For supervisors

- Do you approve records daily, weekly, monthly, or final-only?
- Do you require signatures on printed exports?
- What fields must appear on DTR exports?
- Can interns submit corrections?
- Who can approve corrections?
- Do you need audit logs?

### For academic coordinators

- What internship document templates are required?
- What minimum rendered hours are required?
- Is overtime accepted toward completion?
- Are holidays/rest days treated differently?
- Are absences recorded or simply omitted?
- What should the final report contain?

## Requirement sources

- Actual notes and workflow from Miguel and Chester.
- Existing physical DTR form expectations.
- School internship guidelines.
- Supervisor review expectations.
- Common Philippine OJT recordkeeping practice.
- Open-source self-hosting and PWA constraints.

## Requirement lifecycle

```text
Raw note -> Clarified requirement -> Acceptance criteria -> Backlog item -> Implementation issue -> Test case -> Documentation update
```

## Requirement quality rules

A requirement is ready for implementation only when it has:

- clear actor;
- trigger or workflow context;
- expected result;
- failure or edge-case behavior;
- acceptance criteria;
- priority;
- traceability to a document, issue, or decision.

## Initial MVP validation activity

Before coding, create a sample internship plan for Miguel and Chester with:

- company name;
- department/role;
- supervisor name;
- target required hours;
- start date;
- workdays;
- working hours;
- lunch break rules;
- weekly report format;
- DTR export format.

Use those examples as seed data for implementation and testing.
