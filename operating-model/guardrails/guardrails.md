---
aliases:
  - Guardrails
  - Autonomy Guardrails
---

# Guardrails

## Before You Edit This File

Frame of mind: This is the safety layer. It should state non-negotiable limits that agent-specific rules cannot weaken.

Ask yourself before changing it:
- What risks must always stop or escalate work?
  Prompt: Name the risk, severity, and the smallest safe next step.
- Which actions are never autonomous regardless of agent role?
  Prompt: Answer in plain English first, then decide which file or decision record should hold the final version.
- Does this rule protect humans from hidden cost, security, legal, or public-impact exposure?
  Prompt: Say whether this role may decide, recommend, draft, or only inform; then name the human handoff.

Cross-check [[approval-boundaries|Approval Boundaries]], [[safe-actions|Safe Actions]], [[autonomy-ramp|Autonomy Ramp]], and [[agent-documentation/agent-approval-rules|Agent Approval Rules]].


This folder defines the autonomy and approval guardrails for the operating model.

Use it with [[operating-model/README|Operating Model Overview]], [[2. dashboard/README|Dashboard Specification]], [[agent-approval-rules|Agent Approval Rules]], [[decision-gates|Decision Gates]], and [[common-spec|Common Dashboard Spec]].

## Purpose

The operating model already defines stages, decisions, approvals, dashboard behavior, and agent status.

This folder adds one explicit rule:

Increase agent autonomy only after the dashboard can show what happened.

That means autonomy expands only when the system can already show:

- what the agent did
- why it did it
- what source records justify it
- what changed
- what is blocked
- what still needs approval

## Core Principles

1. Visibility before autonomy.
2. Safe actions before high-impact actions.
3. Approved scope before open-ended execution.
4. Explicit approval boundaries before permission expansion.
5. Reversible internal changes before irreversible external changes.

## Files In This Folder

| File | Purpose |
| --- | --- |
| [[guardrails|Guardrails]] | Overview of the autonomy and approval guardrail system. |
| [[autonomy-ramp|Autonomy Ramp]] | Phased model for when and how autonomy may increase. |
| [[approval-boundaries|Approval Boundaries]] | Exact actions that may proceed autonomously and actions that always require approval. |
| [[safe-actions|Safe Actions]] | Criteria and examples for actions agents may perform without approval once observability is sufficient. |

## Non-Negotiable Rule

Agents must not receive broader autonomy only because the work feels repetitive.

Autonomy may expand only when:

- the dashboard can show what happened in a durable, linkable, human-readable way
- the runtime status and daily memory records are current
- the approval path for high-impact actions is already defined
- the safe-action boundary is written down

## Related

- [[autonomy-ramp|Autonomy Ramp]]
- [[approval-boundaries|Approval Boundaries]]
- [[safe-actions|Safe Actions]]

<!-- Reviewed and Approved on -->
