---
aliases:
  - Visual Review
---

# Visual Review

Version: `v1.0`

## Purpose

Confirm that user-visible changes match the approved behavior, layout, and content expectations before release.

## When To Use It

Use this SOP for UI, content, or workflow changes with visible user impact.

## Inputs Required

- changed UI or workflow target
- expected design, prior state, or acceptance reference
- environments or screenshots needed for comparison
- linked issue and known edge cases

## Steps

1. Read the linked issue and reference state, then record `[[visual-review|Visual Review]] v1.0` in the issue when this review begins.
2. Compare the changed flow against the approved reference on the main supported viewport or device set.
3. Check layout, copy placement, empty states, error states, and obvious accessibility-impacting regressions.
4. Capture durable screenshots or notes only when the review result needs future reference, then store them in `source-of-truth/artifacts/`.
5. Record pass, fail, or deviation status in the issue, including the exact step where the problem appears.
6. Escalate intentional visual deviations for approval before treating them as acceptable.

## Agent Actions Allowed

- run comparative visual checks
- document visible regressions and acceptable minor polish items
- recommend fix or proceed based on evidence

## Human Approvals Required

| Trigger | Required approval |
| --- | --- |
| intentional deviation from the approved UI or content | product or design owner approval |
| unresolved visible regression accepted for launch | human risk acceptance |

## Output Artifacts

- issue update with review result and exact findings
- optional screenshot set or visual review note in `source-of-truth/artifacts/`

## Links To Source Of Truth

- [[files-and-folders|Files And Folders]]
- [[github|GitHub]]
- [[lifecycle]]
- [[agent-responsibilities]]

## Related Decision Records

- [[dr-0001-sop-library-location-and-governance|Decision 001 - SOP Library Location And Governance]]

## Quality Checks

- review uses a defined reference state
- visible regressions include reproduction details
- screenshots are labeled and backlinked when stored
- acceptance is not implied for unresolved deviations

## Stop Conditions

- no approved reference exists for a visible change
- the environment cannot display the target flow
- a material visual deviation needs approval and none is recorded

## Dashboard Signals

| Field | Value for this SOP |
| --- | --- |
| Active SOP | `Visual Review` |
| Current step | `load-reference`, `compare`, `capture-findings`, or `report` |
| Blocked step | missing reference or inaccessible environment |
| Human approval needed | intentional deviation or accepted visible regression |
| Output artifact | screenshot set, artifact path, or issue note |
| SOP version used | `v1.0` |

## GitHub Issue Labels

- `stage:build`
- `sop:visual-review`
- `status:blocked` when visual defects block completion

## Done Criteria

- visible behavior is checked against a reference
- findings are recorded with evidence
- unresolved deviations are either fixed or escalated for approval

<!-- Reviewed and Approved on -->
