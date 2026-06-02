---
aliases:
  - Weekly Review
---

# Weekly Review

Version: `v1.0`

## Purpose

Review the weekly state of active initiatives, approvals, blockers, and learning signals across the operating model.

## When To Use It

Use this SOP on a weekly cadence or before a planning or leadership review.

## Inputs Required

- active issues by stage
- current blockers and approval queues
- recent journals and decisions
- key metrics or dashboard snapshots

## Steps

1. Read the current issues, dashboard state, journals, and decisions, then record `[[weekly-review|Weekly Review]] v1.0` in the review note or primary coordination issue.
2. Summarize stage movement, stalled work, overdue approvals, and major risks.
3. Identify where the backlog, durable docs, or dashboard state are out of sync.
4. Record recommended interventions with owners and due dates.
5. Update the affected issues with execution-facing follow-ups.
6. Escalate any material reprioritization, risk acceptance, or scope shifts for human decision.

## Agent Actions Allowed

- summarize weekly operating state
- identify mismatches, bottlenecks, and stale blockers
- propose interventions and cleanup actions

## Human Approvals Required

| Trigger | Required approval |
| --- | --- |
| commitment, priority, or investment change | accountable human owner approval |
| accepted unresolved risk | human risk acceptance |

## Output Artifacts

- weekly review note in an approved durable location when needed
- issue updates with actions and owners
- discrepancy or escalation list

## Links To Source Of Truth

- [[files-and-folders|Files And Folders]]
- [[github|GitHub]]
- [[dashboard-model]]
- [[decision-gates]]

## Related Decision Records

- [[dr-0001-sop-library-location-and-governance|Decision 001 - SOP Library Location And Governance]]

## Quality Checks

- review covers all active stages
- blockers have owners and ages
- interventions are concrete and assigned
- material changes are escalated instead of implied

## Stop Conditions

- dashboard data is too stale to support review
- issue state conflicts with durable records
- a material reprioritization is required but no approver is defined

## Dashboard Signals

| Field | Value for this SOP |
| --- | --- |
| Active SOP | `Weekly Review` |
| Current step | `collect-state`, `summarize-risks`, `assign-actions`, or `escalate` |
| Blocked step | stale data or unresolved conflicts |
| Human approval needed | priority, commitment, or risk decision |
| Output artifact | weekly review note or issue update |
| SOP version used | `v1.0` |

## GitHub Issue Labels

- `sop:weekly-review`
- issue-specific stage labels remain unchanged unless a separate approved change occurs

## Done Criteria

- weekly state is summarized
- interventions are assigned
- escalations are explicit and linked

<!-- Reviewed and Approved on -->
