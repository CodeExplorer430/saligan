# Definition of Done

A change is complete only when:

- source requirement, issue, ADR, or maintainer instruction is linked;
- acceptance criteria are satisfied;
- implementation is scoped and reviewed;
- tests are added/updated and map to behavior;
- applicable lint, typecheck, test, build, Docker, smoke, health, and migration gates pass;
- failed or unavailable gates are explicitly reported and accepted before merge;
- security, privacy, dependency, license, and data risks are addressed;
- docs, OpenAPI, schema notes, ADRs, and screenshots are current where applicable;
- source files meet 500-line policy;
- status and diff contain no unrelated or unexplained changes;
- rollback/recovery and remaining risks are documented;
- required reviewers approve and CI passes.

An agent MUST NOT use “done,” “complete,” or “ready” before these conditions are met.
