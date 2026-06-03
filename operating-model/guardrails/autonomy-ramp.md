---
aliases:
  - Autonomy Ramp
  - Autonomy Phases
  - Visibility Before Autonomy
---

# Autonomy Ramp

## Before You Edit This File

Frame of mind: This file defines how agents earn more freedom. Autonomy should increase only after visibility, audit trail, and approval routing work.

Ask yourself before changing it:
- What capability must exist before the next autonomy level?
  Prompt: Write the plain-English answer first; add structure only after the meaning is clear.
- Can the dashboard show what changed, why, and what still needs approval?
  Prompt: Say whether this role may decide, recommend, draft, or only inform; then name the human handoff.
- What actions remain permanently human-gated?
  Prompt: Say whether this role may decide, recommend, draft, or only inform; then name the human handoff.

Cross-check [[guardrails|Guardrails]], [[approval-boundaries|Approval Boundaries]], [[dashboard/README|Dashboard Specification]], and [[agent-approval-rules|Agent Approval Rules]].


This note defines how autonomy increases over time.

Use it with [[guardrails|Guardrails]], [[dashboard/README|Dashboard Specification]], [[agent-approval-rules|Agent Approval Rules]], and [[agent-workflows|Agent Workflows]].

## Core Rule

Do not widen permissions first and hope observability catches up later.

The correct order is:

1. make the work visible
2. make the outputs durable
3. make the approvals explicit
4. allow safe autonomous actions
5. keep high-impact actions gated

## Activation Prerequisites

Before increasing autonomy, the system should already show:

- current agent status
- last action
- next action
- source links
- decisions made
- assumptions changed
- open questions
- new risks
- tickets created
- tickets closed
- active approvals
- blockers
- overnight changes when relevant

If the dashboard cannot show these reliably, autonomy should not be expanded.

## Phase 0: Visibility First

Agents may:

- read approved records
- summarize and compare evidence
- update runtime status
- update daily memory
- draft recommendations
- prepare dashboard-ready outputs

Agents may not:

- execute high-impact writes
- change external systems in ways the dashboard cannot explain later

## Phase 1: Safe Internal Actions

After visibility is working, agents may perform safe internal actions without approval.

Examples:

- status-file updates
- journal updates
- link repairs
- safe metadata cleanup
- backlog hygiene that does not change commitments
- issue deduplication proposals
- stale-issue surfacing
- test execution
- dashboard-card preparation

## Phase 2: Scoped Execution

After the safe-action boundary is stable, agents may execute approved work inside an already approved scope.

Examples:

- implement approved build work
- maintain tickets and artifacts
- run verification steps
- prepare release packets
- prepare approval packets

This phase still does not include irreversible or externally visible actions.

## Phase 3: Human-Gated High-Impact Actions

These actions remain approval-gated even after autonomy expands:

- deploys
- spending
- public posting
- data deletion
- architecture changes

This phase may also require approval for:

- permission changes
- auth or secret posture changes
- accepted risk exceptions
- material reprioritization that changes scope or investment

## Downgrade Rule

Autonomy should be reduced again when:

- the dashboard cannot explain recent actions
- source links are missing
- status files are stale
- daily memory is missing
- approval boundaries become unclear
- Accepted decisions conflict

## Related

- [[guardrails|Guardrails]]
- [[approval-boundaries|Approval Boundaries]]
- [[safe-actions|Safe Actions]]

<!-- Reviewed and Approved on -->
