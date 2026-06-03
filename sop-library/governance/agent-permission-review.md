---
aliases:
  - Agent Permission Review
---

# Agent Permission Review

## Before You Edit This File

Frame of mind: This SOP reviews what agents may do. It should keep autonomy aligned with visibility, approvals, and safety boundaries.

Ask yourself before changing it:
- What permissions does the agent actually need?
  Prompt: Name the exposure, who can approve the risk, and what evidence proves it is controlled.
- Which actions require human approval no matter what?
  Prompt: Say whether this role may decide, recommend, draft, or only inform; then name the human handoff.
- Can dashboard and status records show what the agent did?
  Prompt: Name the exact files or records someone should open before trusting this answer.

Cross-check [[approval-boundaries|Approval Boundaries]], [[autonomy-ramp|Autonomy Ramp]], and [[agents/agent-approval-rules|Agent Approval Rules]].


Version: `v1.0`

## Purpose

Check whether a planned agent action is inside the current approval boundary before execution continues.

## When To Use It

Use this SOP when an action may affect scope, risk, production behavior, permissions, or another boundary governed by the operating model.

## Inputs Required

- planned action
- current issue stage and status
- linked decisions and approvals
- user, customer, or production impact context

## Steps

1. Read the current stage, linked issue, approvals, and decisions, then record `[[agent-permission-review|Agent Permission Review]] v1.0` in the issue or review note.
2. Compare the planned action to the allowed agent actions in [[agent-responsibilities]] and the current stage gate in [[decision-gates]].
3. Check whether the action changes scope, risk posture, cost, external behavior, or policy.
4. If the action is in-bounds, record the reasoning and proceed.
5. If the action crosses a boundary, stop and prepare a concise approval request with the exact action, reason, risk, and proposed next step.
6. Update the issue with the permission outcome before further execution.

## Agent Actions Allowed

- assess boundary compliance
- proceed with clearly in-bounds actions
- draft escalation requests for out-of-bounds actions

## Human Approvals Required

| Trigger | Required approval |
| --- | --- |
| material scope, risk, or production-impacting action | accountable human owner approval |
| legal, compliance, privacy, or security-sensitive action | appropriate human approver approval |

## Output Artifacts

- issue update with permission decision
- escalation request when approval is needed
- optional durable note if the boundary interpretation should be reused

## Links To Source Of Truth

- [[agent-responsibilities]]
- [[decision-gates]]
- [[files-and-folders|Files And Folders]]
- [[github|GitHub]]

## Related Decision Records

- [[dr-0001-sop-library-location-and-governance|Decision 001 - SOP Library Location And Governance]]

## Quality Checks

- the action is evaluated against the current stage, not a generic rule
- reasoning cites the relevant operating document or decision
- out-of-bounds actions are stopped before execution
- issue state reflects the permission outcome

## Stop Conditions

- the current stage or approval state is unclear
- the action conflicts with an Accepted decision
- the required approver is missing

## Dashboard Signals

| Field | Value for this SOP |
| --- | --- |
| Active SOP | `Agent Permission Review` |
| Current step | `read-boundary`, `evaluate-action`, `proceed`, or `await-approval` |
| Blocked step | missing approval or conflicting decision |
| Human approval needed | any out-of-bounds action |
| Output artifact | permission note or escalation request |
| SOP version used | `v1.0` |

## GitHub Issue Labels

- `sop:agent-permission-review`
- `status:awaiting-approval` when an escalation is open

## Done Criteria

- the action is classified as in-bounds or out-of-bounds
- reasoning is recorded
- any required approval is explicitly requested before execution continues

<!-- Reviewed and Approved on -->
