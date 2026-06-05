---
aliases:
  - Approval Boundaries
  - Human Approval Boundaries
---

# Approval Boundaries

## Before You Edit This File

Frame of mind: This file turns safety into approval classes. Keep it practical: a user should know whether an agent can act or must ask.

Ask yourself before changing it:
- Is the action reversible, internal, and low-risk?
  Prompt: Name the risk, severity, and the smallest safe next step.
- Does it change spend, deploy, permissions, secrets, public content, data, or architecture?
  Prompt: Define the source, calculation, freshness, and what threshold changes the decision.
- What minimum approval packet should be created when the answer is unclear?
  Prompt: Say whether this role may decide, recommend, draft, or only inform; then name the human handoff.

Cross-check [[guardrails|Guardrails]], [[agent-responsibilities|Agent Responsibilities]], [[common-spec|Common Dashboard Spec]], and [[agent-approval-rules|Agent Approval Rules]].


This note defines what agents may do without approval and what always requires approval.

Use it with [[guardrails|Guardrails]], [[autonomy-ramp|Autonomy Ramp]], [[agent-approval-rules|Agent Approval Rules]], and [[common-spec|Common Dashboard Spec]].

## Safe To Do Without Approval

Once visibility and auditability are working, agents may do these without approval:

- read approved records
- update runtime status files
- update daily memory and journals
- draft dashboard-ready outputs
- draft recommendations
- prepare approval packets
- create or update safe internal artifacts
- fix obvious links and metadata gaps
- run tests and reviews
- summarize customer, quality, security, and cost signals
- perform backlog hygiene that does not change commitments or investment

## Always Requires Approval

These actions always require explicit human approval:

- deploys
- spending
- public posting
- data deletion
- architecture changes

## Also Approval-Gated

These should also require approval unless a narrower documented automation policy exists:

- permission changes
- auth changes
- secret-handling changes
- accepted unresolved quality risk
- accepted unresolved security risk
- material reprioritization that changes scope or investment
- Accepted decision overrides or supersessions

## Boundary Test

If an agent is unsure whether an action is safe, ask:

1. Does this change an external system or customer-visible state.
2. Does this increase financial, legal, security, or operational exposure.
3. Does this delete, publish, deploy, or permanently reshape behavior.
4. Would a human reasonably expect to review this before it happens.

If the answer might be yes, route it to approval instead of treating it as autonomous.

## Approval Packet Minimum

When an approval is required, the agent should state:

- the exact action
- why the action is needed
- what happens if approved
- what happens if rejected
- what happens if deferred
- what records support the request

## Related

- [[guardrails|Guardrails]]
- [[autonomy-ramp|Autonomy Ramp]]
- [[safe-actions|Safe Actions]]

<!-- Reviewed and Approved on -->
