---
aliases:
  - Safe Actions
  - Autonomous Safe Actions
---

# Safe Actions

## Before You Edit This File

Frame of mind: This file defines the small things agents can safely do. Keep the list narrow enough that autonomy stays boring and auditable.

Ask yourself before changing it:
- Is the action low-cost to reverse and fully visible in records?
  Prompt: Name the exact files or records someone should open before trusting this answer.
- Could it accidentally change customer-facing, financial, security, or architectural state?
  Prompt: Name the exposure, who can approve the risk, and what evidence proves it is controlled.
- What record should prove the action happened?
  Prompt: Write the plain-English answer first; add structure only after the meaning is clear.

Cross-check [[approval-boundaries|Approval Boundaries]], [[autonomy-ramp|Autonomy Ramp]], and [[agent-status-rules|Agent Status Rules]].


This note defines which actions count as safe autonomous actions once the observability baseline exists.

Use it with [[guardrails|Guardrails]], [[autonomy-ramp|Autonomy Ramp]], [[approval-boundaries|Approval Boundaries]], and [[agent-approval-rules|Agent Approval Rules]].

## Safe Action Criteria

An action is safe only when all of these are true:

- it stays inside approved scope
- it is reversible or low-cost to correct
- it updates approved durable records only
- it has no customer-facing or public impact
- it does not change deploy state
- it does not spend money
- it does not delete data
- it does not change permissions, auth posture, or secrets handling
- the dashboard and status records can explain it afterward

## Typical Safe Actions

- update `source-of-truth/agent-status/`
- write the daily memory record
- draft or refine journal notes
- prepare dashboard summaries
- fix backlinks and missing metadata where authority is clear
- classify duplicate, stale, blocked, or regression-risk items
- run tests
- collect evidence
- prepare release, risk, or decision packets
- update issue links when GitHub is actually configured and the action does not cross a commitment boundary

## Actions That Stop Being Safe

An action stops being safe when it:

- changes commitments
- changes scope materially
- changes investment level
- changes public behavior
- changes production state
- changes architecture
- changes permissions or secret posture
- depends on unclear or conflicting source records

## Stop Rule

If a supposedly safe action crosses the safe-action criteria mid-run:

1. stop
2. update runtime status
3. create or update the approval request
4. route the action to a human decision

## Related

- [[guardrails|Guardrails]]
- [[autonomy-ramp|Autonomy Ramp]]
- [[approval-boundaries|Approval Boundaries]]

<!-- Reviewed and Approved on -->
