---
aliases:
  - Approval Queues
  - Approval Queue Workflow
---

# Approval Queues

This file defines the approval queue workflow for the decision-centered dashboard.

Use it with:

- [[dashboard/README|Dashboard Specification]]
- [[dashboard-tabs]]
- [[dashboard-card-contract]]
- [[dashboard-actions]]
- [[dashboard-data-contract]]
- [[operating-model/decision-gates|Decision Gates]]
- [[operating-model/agent-status-schema/agent-status-rules|Agent Status Rules]]
- [[operating-model/decision-record-system/decision-record-rules|Decision Record Rules]]
- [[source-of-truth/files-and-folders|Files And Folders]]
- [[source-of-truth/github|GitHub]]

## Purpose

The approval queue shows every item where an agent cannot safely continue without a human decision.

The queue makes the dashboard the primary approval surface. Agents may still publish approval state in runtime status files, issues, decisions, SOP outputs, or journals, but they must not rely on terminal output alone for approval requests.

## Queue Entry Criteria

Create or surface an approval item when any of these conditions is true:

- an agent status file has `Needs approval: Yes`
- a lifecycle gate requires human approval under [[operating-model/decision-gates|Decision Gates]]
- a decision record is `Proposed` and awaiting human acceptance
- an SOP-governed workflow requires explicit human approval
- launch, publishing, deploy, spend, deletion, permission, policy, or architecture work requires approval
- execution is blocked because silence cannot be treated as approval

The queue must not include:

- optional reviews
- informational updates
- items that can proceed safely without approval
- vague approvals with no exact decision request

## Approval Sources

The queue may read from these sources:

1. Agent status files in `source-of-truth/agent-status/`
2. Proposed decision records in `source-of-truth/decisions/`
3. SOP-governed approvals from `sop-library/`
4. Launch, release, publishing, or content approval artifacts
5. Risk, spend, deletion, permission, deploy, or architecture approvals
6. GitHub issue approval state only when GitHub is actually configured

Source precedence for one approval item:

1. Accepted and Proposed decision records
2. Linked source-of-truth notes and artifacts
3. Active agent status files
4. GitHub issue metadata when live
5. Derived dashboard summaries

## Approval Statuses

Use only these approval statuses:

1. `Pending`
2. `Approved`
3. `Rejected`
4. `Needs Revision`
5. `Scheduled`
6. `Promoted`
7. `Archived`

These are approval-item statuses. They do not replace the runtime status vocabulary in [[operating-model/agent-status-schema/agent-status-rules|Agent Status Rules]].

## Approval Actions

Allowed approval actions:

1. `Approve`
2. `Reject`
3. `Revise`
4. `Schedule`
5. `Promote to issue`
6. `Archive`

Detailed behavior for each action is defined in [[dashboard-actions]].

## Audit Trail Requirements

Every approval action must produce an audit trail in approved source records.

Minimum audit fields:

- approval item title or stable ID
- action taken
- actor identity
- timestamp
- exact decision or instruction
- linked source records
- resulting next step

Preferred write targets:

1. the governing decision record if the approval changes a load-bearing decision
2. the linked durable record under `source-of-truth/`
3. the linked journal when a coordination log is needed
4. the linked GitHub issue only when GitHub is actually configured

If GitHub remains placeholder-only in [[source-of-truth/github|GitHub]], the dashboard must use a file-first audit path and must not invent live issue sync.

## Conflict Rules

Stop and report a conflict when:

- an approval request conflicts with an Accepted decision
- linked source records disagree on the exact decision needed
- a required issue is missing for work that cannot proceed without it
- an SOP requires approval but no approver or approval artifact is identifiable
- GitHub is treated as live despite placeholder-only configuration

When a conflict exists:

1. keep the item in active approval state
2. disable write actions except safe escalation or documentation
3. link every conflicting source record
4. recommend the exact human resolution step

## History Rules

Active approval queue:

- show only items with status `Pending`, `Needs Revision`, or `Scheduled`

Approval history:

- move items with status `Approved`, `Rejected`, `Promoted`, or `Archived` out of the active queue
- preserve audit trail links
- preserve backlinks to the original source records
- do not allow agents to act on `Archived` approval items

Only a human may restore an approval item from history to the active queue.

## Sort Rules

Approval cards should be sortable by:

1. risk level
2. age
3. due date
4. cost impact
5. blocked work impact

Default sort order for active queue:

1. blocked work impact
2. risk level
3. due date
4. age
5. cost impact

## Refresh Rules

Refresh the queue:

- on dashboard open
- on every material status-file update
- on every decision-record update that changes approval state
- on every SOP output that creates or resolves an approval
- on manual operator refresh

Flag approvals as stale when the source item has not been updated within the expected cadence for blocked or approval-waiting work.

## What Happens After Each Action

### Approve

1. Mark the approval item `Approved`.
2. Write an audit entry to the source of truth.
3. Update the linked GitHub issue if GitHub is live, or the linked durable note or journal if GitHub is not live.
4. Unblock the agent if no other blocker remains.
5. Tell the agent the exact approved next step.
6. Create or update a decision record if the approval changes a load-bearing decision.

### Reject

1. Mark the approval item `Rejected`.
2. Require a short rejection reason.
3. Write the reason to the source of truth.
4. Update the linked GitHub issue if live, or the linked durable note or journal otherwise.
5. Tell the agent to stop that path.
6. Request an alternate path only when useful.

### Revise

1. Require revision instructions.
2. Keep the item in the active queue with status `Needs Revision`.
3. Send the revision request back to the agent.
4. Update the agent runtime status using the existing contract, typically `Needs Approval` or `Blocked`, and record that the approval item is `Needs Revision`.
5. Require a new approval card before the agent continues.

### Schedule

1. Require a scheduled date and time or target window.
2. Mark the item `Scheduled`.
3. Write the schedule to the source of truth.
4. Update the linked GitHub issue if live, or the linked durable note or journal otherwise.
5. Allow the agent to proceed only when the scheduled trigger is reached.
6. Link the relevant decision record if scheduling affects launch, publishing, or spend.

### Promote To Issue

1. Create or update a GitHub issue only when GitHub is actually configured.
2. If GitHub is placeholder-only, document the file-first fallback instead of inventing live issue behavior.
3. Mark the approval item `Promoted`.
4. Link the issue and the approval history.
5. Move execution tracking to GitHub Issues when issue-based execution is required.
6. Allow the agent to proceed only under the new issue when the issue is required for execution.

### Archive

1. Mark the item `Archived`.
2. Require an archive reason.
3. Preserve the audit trail.
4. Remove the item from the active queue.
5. Prevent agents from acting on the archived approval item unless a human restores it.

## Links Back To Source Of Truth

Every approval item must link back to source records. Preferred link set:

- linked agent status file
- linked issue when one exists
- linked idea when one exists
- linked decision record when one exists
- linked SOP and version when one exists
- linked journal or artifact when it records approval evidence

## Obsidian-Friendly Note Design

This note is meant to fold cleanly under `dashboard/` in Obsidian:

- stable note name: `approval-queues.md`
- aliases for search and backlinks
- wiki links to governing notes
- section structure aligned to operator questions

## Related

- [[dashboard-tabs]]
- [[dashboard-card-contract]]
- [[dashboard-actions]]
- [[dashboard-mvp]]

<!-- Reviewed and Approved on -->
