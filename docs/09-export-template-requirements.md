# 09 — Export Template Requirements

## Purpose

SALIGAN must produce submission-ready exports while remaining configurable for school and company variations.

## Export types

| Export | MVP format | Later format |
|---|---|---|
| Daily Time Record | PDF, XLSX | DOCX, Google Sheets-compatible CSV |
| Weekly accomplishment report | DOCX, PDF | HTML, Google Docs-compatible DOCX |
| Monthly summary | PDF, XLSX | CSV |
| Calendar reminders | ICS | Google/Microsoft calendar integration |
| Backup/export data | JSON, CSV | Full archive ZIP |

## DTR export fields

- Intern name.
- Company/department.
- Internship role.
- Supervisor name.
- Month and year.
- Daily AM arrival/departure.
- Daily PM arrival/departure.
- Regular hours.
- Overtime hours.
- Undertime hours.
- Remarks/status.
- Total rendered hours.
- Remaining target hours.
- Intern certification block.
- Supervisor verification/signature block.

## Weekly report fields

- Intern identity.
- Company/department.
- Covered period.
- Summary of work performed.
- Daily accomplishment breakdown.
- Tools/systems used.
- Issues encountered.
- Learning outcomes.
- Evidence/attachment list.
- Supervisor comments/signature.

## Template strategy

MVP should ship with one default template:

```text
Default Philippine OJT DTR Template
Default Weekly Accomplishment Report Template
```

Later versions should support organization-specific template versions.

## Export safety rules

- Exports must show review status where applicable.
- Draft/unreviewed exports should be marked as draft.
- Approved exports should include reviewer identity and timestamp.
- Export generation should be logged in audit events.
- Export files should not expose records outside the user's authorization scope.
