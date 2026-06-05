---
aliases:
  - Testing
---

# Testing

## Before You Edit This File

Frame of mind: This SOP defines proof that work behaves as expected. Testing should be concrete enough that quality is not a vibe.

Ask yourself before changing it:
- What behavior, risk, or regression must be tested?
  Prompt: Name the risk, severity, and the smallest safe next step.
- What test evidence is enough for the stage?
  Prompt: State the current stage, the next stage, and the evidence needed before movement.
- What failure blocks release or needs human risk acceptance?
  Prompt: Say whether this role may decide, recommend, draft, or only inform; then name the human handoff.

Cross-check [[feature-delivery|Feature Delivery]], [[release-checklist|Release Checklist]], and [[agent-documentation/agent-roster|Agent Roster]].


Version: `v1.0`

## Purpose

Produce credible test evidence for build-stage work before launch review or risk acceptance.

## When To Use It

Use this SOP whenever code, configuration, or workflow changes need validation before release or before a build can be marked ready.

## Inputs Required

- implementation target or changed scope
- acceptance criteria
- known risk areas and regression-sensitive paths
- relevant environment or execution instructions

## Steps

1. Read the linked issue, scope, and decisions, then record `[[testing|Testing]] v1.0` in the issue if this is the active verification SOP.
2. Define the minimum test set: functional, regression, edge-case, and negative-path coverage.
3. Run the available automated checks first, then complete manual checks required by the change.
4. Record failures, flaky behavior, and skipped coverage explicitly instead of smoothing them over.
5. Store durable test evidence in `source-of-truth/artifacts/` only when the result must be referenced later, then backlink it.
6. Update the issue with pass or fail status, gaps, and whether human risk acceptance is needed.

## Agent Actions Allowed

- define and run test coverage within the approved scope
- document failures, gaps, and rerun outcomes
- recommend release readiness or additional fixes

## Human Approvals Required

| Trigger | Required approval |
| --- | --- |
| skipped critical coverage | human risk acceptance |
| known high-severity defect accepted for launch | release or product owner approval |
| test scope reduction that changes launch readiness | accountable human owner approval |

## Output Artifacts

- issue update with test status and coverage summary
- defect list or gap note
- optional durable test evidence in `source-of-truth/artifacts/`

## Links To Source Of Truth

- [[files-and-folders|Files And Folders]]
- [[github|GitHub]]
- [[lifecycle]]
- [[decision-gates]]

## Related Decision Records

- [[dr-0001-sop-library-location-and-governance|Decision 001 - SOP Library Location And Governance]]

## Quality Checks

- tests map back to acceptance criteria and known risks
- failures are reproducible or clearly identified as flaky
- skipped coverage is justified and visible
- artifacts include backlinks when stored durably

## Stop Conditions

- test environment is unavailable and no fallback exists
- acceptance criteria are missing
- a failing critical path has no approved exception

## Dashboard Signals

| Field | Value for this SOP |
| --- | --- |
| Active SOP | `Testing` |
| Current step | `plan-tests`, `run-automated`, `run-manual`, or `report` |
| Blocked step | environment setup or unresolved failure |
| Human approval needed | skipped critical coverage or accepted defect |
| Output artifact | test note, defect log, or artifact path |
| SOP version used | `v1.0` |

## GitHub Issue Labels

- `stage:build`
- `sop:testing`
- `status:blocked` when failing issues block release

## Done Criteria

- required checks are run
- critical results are recorded
- failures and gaps are visible
- the issue shows whether the build is test-ready for launch review

<!-- Reviewed and Approved on -->
