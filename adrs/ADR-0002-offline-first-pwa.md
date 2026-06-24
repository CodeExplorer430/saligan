# ADR-0002 — Offline-First PWA

## Status

Accepted

## Context

Interns may log attendance and notes from mobile devices while internet connectivity is unstable or unavailable.

## Decision

SALIGAN will be an offline-first PWA. The web client will store drafts and pending sync operations locally using IndexedDB and service-worker-supported offline behavior.

## Consequences

- Core draft workflows must work offline.
- Server remains the source of truth for reviewed and synced records.
- Conflict handling must be designed early.
- Export generation should remain server-side for official outputs.
