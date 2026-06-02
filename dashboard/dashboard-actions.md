---
aliases:
  - Dashboard Actions
---

# Dashboard Actions

This file defines allowed human actions for the dashboard, including the approval queue workflow.

Use it with [[dashboard-data-contract]], [[dashboard-card-contract]], [[approval-queues]], and [[operating-model/decision-gates|Decision Gates]].

## Action Model

These are logical dashboard actions, not a commitment to direct mutation in the first build.

If the dashboard launches read-only first:

- the action should open the governing source record and prepare the exact change or follow-up
- the dashboard must not pretend the action has already changed the source of truth

If the dashboard later becomes write-enabled:

- every action must update the source record named below
- every action must leave an audit trail

## Approval Queue Actions

Approval cards use only these actions:

1. `Approve`
2. `Reject`
3. `Revise`
4. `Schedule`
5. `Promote to issue`
6. `Archive`

## Approve

| Field | Definition |
| --- | --- |
| What the action means | Accept the pending approval request and authorize the exact proposed path. |
| What source of truth gets updated | Governing decision record when load-bearing, linked durable note or journal, linked issue when GitHub is live, and any linked status file that was waiting on approval. |
| What audit trail is required | Approver identity, timestamp, approved scope, evidence links, accepted risks, exact approved next step, and resulting approval status of `Approved`. |
| What agent may do next | Resume only the exact approved next step and only if no other blocker remains. |
| What requires confirmation | Any irreversible change, launch approval, accepted risk, budget change, or durable policy change. |

## Reject

| Field | Definition |
| --- | --- |
| What the action means | Decline the pending approval request and stop that path. |
| What source of truth gets updated | Governing decision record when relevant, linked durable note or journal, linked issue when GitHub is live, plus linked status file if it was approval-blocked. |
| What audit trail is required | Rejector identity, timestamp, short rejection reason, consequence, resulting approval status of `Rejected`, and required follow-up if any. |
| What agent may do next | Stop that path and only propose an alternative when requested or clearly needed. |
| What requires confirmation | Rejection that kills an initiative, rejects a launch, or rejects a durable operating decision. |

## Revise

| Field | Definition |
| --- | --- |
| What the action means | Request a revised approval packet before a decision is made. |
| What source of truth gets updated | Approval item, linked status file, linked durable note or journal, and linked issue when GitHub is live. |
| What audit trail is required | Reviewer identity, timestamp, revision instructions, exact resubmission criteria, and resulting approval status of `Needs Revision`. |
| What agent may do next | Revise the request and return a new approval card; the agent must not continue silently. |
| What requires confirmation | Revision request that changes approved scope, cost tolerance, or policy boundaries. |

## Schedule

| Field | Definition |
| --- | --- |
| What the action means | Move the approval to a scheduled decision time or window instead of deciding immediately. |
| What source of truth gets updated | Approval item, linked durable note or journal, linked issue when GitHub is live, and linked status file when the schedule changes agent flow. |
| What audit trail is required | Scheduler identity, timestamp, scheduled date and time or target window, reason, and resulting approval status of `Scheduled`. |
| What agent may do next | Wait until the scheduled trigger is reached; the agent may not treat the schedule as approval. |
| What requires confirmation | Scheduling that affects launch timing, publishing, spend, or public commitments. |

## Promote To Issue

| Field | Definition |
| --- | --- |
| What the action means | Convert an approval item into explicit issue-tracked execution when issue-based execution is required. |
| What source of truth gets updated | GitHub issue system only when configured, plus related durable records and the approval history. |
| What audit trail is required | Creator identity, timestamp, resulting issue reference when live, file-first fallback note when GitHub is placeholder-only, linked governing records, and resulting approval status of `Promoted`. |
| What agent may do next | Proceed only under the new issue when issue-based execution is required. |
| What requires confirmation | Promotion when GitHub is not configured, when the work crosses budget scope, or when the issue creates a new durable commitment. |

## Archive

| Field | Definition |
| --- | --- |
| What the action means | Remove an approval item from the active queue while preserving its history. |
| What source of truth gets updated | Approval item history, linked durable note or journal, and linked issue when GitHub is live. |
| What audit trail is required | Identity, timestamp, archive reason, final approval status of `Archived`, and replacement link if one exists. |
| What agent may do next | Agents may not act on archived approval items unless a human restores them. |
| What requires confirmation | Archiving an item that is still linked to active work or whose final outcome is not documented. |

## Other Dashboard Actions

These actions still apply to non-approval cards surfaced elsewhere in the dashboard.

### Defer

| Field | Definition |
| --- | --- |
| What the action means | Intentionally postpone a non-approval decision or work item without silently ignoring it. |
| What source of truth gets updated | Linked issue or durable note, plus linked status file if active work is paused by the deferral. |
| What audit trail is required | Identity, timestamp, reason, review date or condition, and resulting next action. |
| What agent may do next | Wait, perform allowed prep work, or shift to another prioritized task. |
| What requires confirmation | Deferral that affects launch timing, budget usage, or existing commitments. |

### Create Decision Record

| Field | Definition |
| --- | --- |
| What the action means | Create a durable record for a load-bearing decision that work depends on. |
| What source of truth gets updated | `source-of-truth/decisions/` and [[source-of-truth/decisions/index|Decision Index]] |
| What audit trail is required | Creator identity, timestamp, triggering work item, linked idea or project, and initial status such as `Proposed`. |
| What agent may do next | Draft the decision record, link dependent work, and surface it in approval or decision views as needed. |
| What requires confirmation | Any decision that would be recorded directly as `Accepted`, or any decision that changes governance, launch rules, policy, or architecture. |

### Mark Blocked

| Field | Definition |
| --- | --- |
| What the action means | Mark that work cannot proceed because a concrete blocker now exists. |
| What source of truth gets updated | Agent status file first, then linked issue or durable note if the blocker materially affects execution. |
| What audit trail is required | Identity, timestamp, blocker reason, blocker type, impacted work, and unblock action. |
| What agent may do next | Stop active flow, gather safe evidence, and wait on the unblock path. |
| What requires confirmation | Marking a blocker because of an accepted-risk dispute, policy exception, or source-of-truth conflict. |

### Mark Unblocked

| Field | Definition |
| --- | --- |
| What the action means | Confirm that the documented blocker has been resolved. |
| What source of truth gets updated | Agent status file first, then linked issue or decision record if the resolution changed them. |
| What audit trail is required | Identity, timestamp, resolution note, evidence link, and resulting next action. |
| What agent may do next | Resume the next allowed step immediately. |
| What requires confirmation | Clearing a blocker when the underlying approval or decision is still missing. |

### Request Agent Follow Up

| Field | Definition |
| --- | --- |
| What the action means | Ask an agent to gather more evidence, update links, or prepare a better recommendation without changing the governing decision yet. |
| What source of truth gets updated | Linked issue or status file with the explicit follow-up request, or linked durable note when that is the approved coordination surface. |
| What audit trail is required | Requester identity, timestamp, requested output, due date or SLA if known, and related source links. |
| What agent may do next | Execute the specific follow-up and publish the result to the approved write path. |
| What requires confirmation | Follow-up that would trigger expensive work, external side effects, or a change outside the agent's approved boundary. |

## Write Safety Rules

| Rule | Required behavior |
| --- | --- |
| Source conflict | Block the action until the conflict is resolved. |
| Missing required record | Block the action and recommend creating or linking the record first. |
| Read-only mode | Stage the action as a suggested source update, not as a completed mutation. |
| Missing audit trail | Treat the action as incomplete. |
| Silent approval | Never treat silence, lack of reply, or mere time passage as approval. |
| Load-bearing approval | Create or update a decision record when the approved change alters a durable operating, policy, architecture, or launch decision. |
| Placeholder-only GitHub | Do not claim live issue mutation when [[source-of-truth/github|GitHub]] still contains placeholder config. |

## Related

- [[dashboard-data-contract]]
- [[approval-queues]]
- [[operating-model/decision-record-system/decision-record-rules|Decision Record Rules]]
- [[operating-model/agent-status-schema/agent-status-rules|Agent Status Rules]]
- [[sop-library/operations/dashboard-review|Dashboard Review]]

<!-- Reviewed and Approved on -->
