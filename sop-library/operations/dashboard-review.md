---
aliases:
  - Dashboard Review
---

# Dashboard Review

Version: `v1.0`

## Purpose

Validate that dashboard state reflects the real operating state of issues, approvals, blockers, artifacts, and SOP usage.

## When To Use It

Use this SOP when dashboard trust is in question or on a recurring cadence to keep dashboard signals aligned with the source of truth.

## Inputs Required

- dashboard fields and current stage views
- linked issues and approval queues
- artifact links and source-of-truth records
- current SOP usage data

## Steps

1. Read the dashboard definitions, issues, and durable records, then record `[[dashboard-review|Dashboard Review]] v1.0` in the review context.
2. Check stage, status, owner, approval, blocker, and artifact fields for current issues.
3. Verify that the dashboard shows the required SOP execution fields: active SOP, agent, related issue, current step, blocked step, approval need, last completed step, output artifact, and SOP version.
4. Record mismatches, stale entries, and missing fields.
5. Update safe data gaps directly where the source is clear, and escalate conflicting states for human review.
6. Link the review output back to the affected issues or durable records.

## Agent Actions Allowed

- audit dashboard fidelity
- fix obvious metadata or link gaps
- create a discrepancy list with recommended fixes

## Human Approvals Required

| Trigger | Required approval |
| --- | --- |
| conflicting source records with no clear resolution | human owner review |
| dashboard rule change | decision or operating-model approval |

## Output Artifacts

- dashboard review note
- discrepancy report
- updated issue metadata where safe

## Links To Source Of Truth

- [[files-and-folders|Files And Folders]]
- [[github|GitHub]]
- [[dashboard-model]]
- [[dr-0001-sop-library-location-and-governance|Decision 001 - SOP Library Location And Governance]]

## Related Decision Records

- [[dr-0001-sop-library-location-and-governance|Decision 001 - SOP Library Location And Governance]]

## Quality Checks

- dashboard values are compared to source records, not memory
- required SOP usage fields are present
- fixes do not invent missing approvals or decisions
- conflicts are logged instead of silently normalized

## Stop Conditions

- multiple records disagree and no source is clearly authoritative
- the dashboard depends on a missing operating rule
- fixing the dashboard would require changing an Accepted decision without review

## Dashboard Signals

| Field | Value for this SOP |
| --- | --- |
| Active SOP | `Dashboard Review` |
| Current step | `compare-state`, `log-gaps`, `fix-safe-gaps`, or `escalate` |
| Blocked step | unresolved source conflict |
| Human approval needed | dashboard rule or conflict resolution |
| Output artifact | discrepancy report or review note |
| SOP version used | `v1.0` |

## GitHub Issue Labels

- `sop:dashboard-review`
- `status:blocked` when dashboard conflicts prevent confidence

## Done Criteria

- dashboard mismatch list exists
- safe gaps are corrected
- unresolved conflicts are explicitly escalated

<!-- Reviewed and Approved on -->
