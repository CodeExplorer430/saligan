# ADR-0003 — Self-Hosted FOSS Direction

## Status

Accepted

## Context

SALIGAN should feel like a SaaS-quality platform but remain free, open-source, and self-hostable for students, schools, and small organizations.

## Decision

Design the project as a FOSS self-hosted platform first. Avoid paid APIs for core workflows. Use Docker Compose for local/self-hosted deployments.

## Consequences

- Core features must not depend on a hosted SaaS vendor.
- Optional integrations may be added through adapters.
- Documentation must be contributor- and self-hosting-friendly.
