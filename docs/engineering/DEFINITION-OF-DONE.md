# Definition of Done

A change is complete only when:

- source requirement, issue, ADR, or maintainer instruction is linked;
- acceptance criteria are satisfied;
- implementation is scoped and reviewed;
- tests are added/updated and map to behavior;
- applicable lint, typecheck, test, build, Docker, smoke, health, and migration gates pass;
- frozen install, formatting, documentation checks, full low-threshold audit, and source-size checks pass when applicable;
- failed or unavailable gates are explicitly reported and accepted before merge;
- security, privacy, dependency, license, and data risks are addressed;
- docs, OpenAPI, schema notes, ADRs, and screenshots are current where applicable;
- source files meet 500-line policy;
- no controllable warnings, errors, or known dependency advisories remain;
- external/upstream warnings have source, owner, follow-up, and explicit maintainer waiver;
- status and diff contain no unrelated or unexplained changes;
- rollback/recovery and remaining risks are documented;
- required reviewers approve and CI passes.

An agent MUST NOT use “done,” “complete,” or “ready” before these conditions are met.

Local gates may establish branch readiness, but they do not establish remote CI success.
