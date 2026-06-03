---
aliases:
  - Feature Delivery
---

# Feature Delivery

## Before You Edit This File

Frame of mind: This SOP turns approved plans into shipped work. Keep it tied to scope, evidence, tests, and release readiness.

Ask yourself before changing it:
- What approved plan or decision authorizes the feature?
  Prompt: Say whether this role may decide, recommend, draft, or only inform; then name the human handoff.
- What is in scope, out of scope, and risky?
  Prompt: Draw the boundary in one sentence: included, excluded, and what needs approval to change.
- What evidence proves the feature is ready for review?
  Prompt: Write the plain-English answer first; add structure only after the meaning is clear.

Cross-check [[testing|Testing]], [[release-checklist|Release Checklist]], [[security-review|Security Review]], and [[tech/README|Tech]].


Version: `v1.0`

## Purpose

Deliver approved feature work through build completion without drifting outside the approved plan, source-of-truth rules, or human approval boundaries.

## When To Use It

Use this SOP after an initiative has entered `stage:build` and there is approved feature scope to implement.

## Inputs Required

- approved execution plan or scoped issue
- related GitHub issue with current stage and owner
- linked project doc if one exists
- applicable Accepted decisions
- acceptance criteria and launch-readiness expectations

## Steps

1. Confirm the issue is in `stage:build`, read the linked plan, project, and decisions, and record `[[feature-delivery|Feature Delivery]] v1.0` in the issue.
2. Break the approved scope into the next executable task set and note the current step in the issue.
3. Implement only the approved scope, keeping progress, blockers, and exceptions visible in the issue.
4. Run or trigger the supporting review SOPs that apply, including [[testing|Testing]], [[visual-review|Visual Review]], and [[security-review|Security Review]].
5. Write durable delivery notes only when the implementation creates reusable evidence, then store them in `source-of-truth/artifacts/` with backlinks.
6. Handoff to [[release-checklist|Release Checklist]] when the scope, evidence, and known issues are complete, or stop for approval if the scope changed materially.

## Agent Actions Allowed

- implement approved work inside the accepted scope
- update linked issue state, next step, blockers, and artifact links
- draft delivery notes and release inputs
- propose but not self-approve scope exceptions

## Human Approvals Required

| Trigger | Required approval |
| --- | --- |
| material scope change | delivery or product owner approval |
| change to launch criteria, cost, or timeline with business impact | accountable human owner approval |
| unresolved accepted-risk request | human risk acceptance |

## Output Artifacts

- updated GitHub issue with active SOP, current step, blockers, and outputs
- delivery note or build artifact in `source-of-truth/artifacts/` when durable evidence is needed
- linked test, visual review, and security review results

## Links To Source Of Truth

- [[files-and-folders|Files And Folders]]
- [[github|GitHub]]
- [[lifecycle]]
- [[decision-gates]]
- [[agent-responsibilities]]

## Related Decision Records

- [[dr-0001-sop-library-location-and-governance|Decision 001 - SOP Library Location And Governance]]

## Quality Checks

- scope matches the approved plan
- issue shows one current step and one next action
- all created artifacts backlink to the related issue, idea, project, or decision
- linked review SOPs are completed or explicitly marked not applicable

## Stop Conditions

- approved scope is unclear or missing
- an Accepted decision conflicts with the planned change
- the work requires a write outside approved paths
- a material scope exception appears without human approval

## Dashboard Signals

| Field | Value for this SOP |
| --- | --- |
| Active SOP | `Feature Delivery` |
| Current step | `confirm-scope`, `implement`, `verify`, or `handoff` |
| Blocked step | any build step blocked by dependency, defect, or approval |
| Human approval needed | scope change, risk exception, or launch-impacting deviation |
| Output artifact | latest delivery note, PR link, or artifact path |
| SOP version used | `v1.0` |

## GitHub Issue Labels

- `stage:build`
- `sop:feature-delivery`
- `status:blocked` when applicable
- `risk:*` when the issue risk level changes

## Done Criteria

- approved build scope is implemented or explicitly descoped with approval
- required reviews are linked
- issue state is current
- launch handoff is ready or the blocking approval is explicitly recorded

<!-- Reviewed and Approved on -->
