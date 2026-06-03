---
aliases:
  - Agents
  - Agent System
  - Scheduled Agents
  - Recurring Agents
---

# Agents

## Before You Edit This File

Frame of mind: This file defines the agent system at a high level. Agents are recurring operators that prepare, summarize, route, and recommend; they do not replace human approval.

Ask yourself before changing it:
- Why does this agent system exist?
  Prompt: Answer as if explaining it to a new teammate in one sentence.
- What work should be scheduled versus on-demand?
  Prompt: Write the plain-English answer first; add structure only after the meaning is clear.
- What visibility and approval rules must exist before agents do more than report?
  Prompt: Say whether this role may decide, recommend, draft, or only inform; then name the human handoff.

Cross-check [[agent-roster|Agent Roster]], [[agent-schedules|Agent Schedules]], [[agent-approval-rules|Agent Approval Rules]], and [[autonomy-ramp|Autonomy Ramp]].


This folder defines Step 8 of the agent operating model: agents.

Agents are project curators that can be invoked by a human or run on a daily, weekly, or event-driven cadence. `Scheduled` describes cadence, not a separate class of agent. The profiles live in [[agents/profiles/README|Agent Profiles]].

Agents do not invent a new operating model. They apply the existing lifecycle, dashboard, source-of-truth, SOP, decision-record, approval, and agent-status rules.

Use it with:

- [[operating-model/README|Operating Model Overview]]
- [[lifecycle]]
- [[decision-gates]]
- [[dashboard/README|Dashboard Specification]]
- [[dashboard/common-spec|Common Dashboard Spec]]
- [[operating-model/agent-status-schema/README|Agent Status Schema]]
- [[operating-model/decision-record-system/README|Decision Record System]]
- [[source-of-truth/files-and-folders|Files And Folders]]
- [[source-of-truth/github|GitHub]]
- [[sop-registry|SOP Registry]]
- [[sop-usage-rules|SOP Usage Rules]]
- [[guardrails|Guardrails]]

## Purpose

The agent system exists so the repo can run recurring review, coordination, and governance workflows without depending on ad hoc prompting or undocumented memory.

It standardizes:

- which agents exist
- when each agent runs
- what each agent reads
- what each agent may write
- where outputs go
- when approval is required
- how status and dashboard updates stay durable and auditable

## Why It Exists

Without an agent layer, recurring work becomes inconsistent:

- important reviews happen late or not at all
- dashboard state drifts from the durable source records
- approvals get buried in chat or issue comments
- quality, security, growth, and cost reviews happen unevenly
- decisions become stale because nobody owns recurring decision hygiene

Agents make recurring operating work explicit, reviewable, and linkable.

## System Boundary

Agents may:

- read from approved source records
- summarize and compare evidence
- draft dashboard-ready outputs
- update runtime agent status files
- create or update approval queue items when approval is required
- recommend decisions, priorities, or stop actions

Agents must not:

- approve their own work
- silently override Accepted decisions
- write durable outputs outside approved folders
- invent live GitHub state when `[[source-of-truth/github|GitHub]]` remains placeholder-only
- deploy, publish, spend, delete data, change permissions, or change architecture without explicit approval

## How It Connects To The Dashboard

Every agent must produce dashboard-ready output that can route into one or more of these dashboard tabs:

- [[dashboard/common-spec|Today]]
- [[dashboard/common-spec|Needs Approval]]
- [[dashboard/common-spec|Blocked Agents]]
- [[dashboard/common-spec|Top Backlog]]
- [[dashboard/common-spec|Recent Decisions]]
- [[dashboard/common-spec|Metrics]]
- [[dashboard/common-spec|Cost]]

The dashboard remains a reader and action surface. Agents prepare the packets, summaries, cards, and escalation signals that the dashboard consumes.

## How It Connects To Approvals

If an agent reaches a decision that requires human approval, it must:

1. update its runtime status file under `source-of-truth/agent-status/`
2. set `Needs approval` to `Yes`
3. state the exact approval request
4. create or update the approval queue item using the rules in [[dashboard/common-spec|Common Dashboard Spec]]
5. stop the approval-dependent path until the human decision exists

## How It Connects To Source Of Truth

Agents are read-heavy, but every output still has to link back to the durable record set under `source-of-truth/`.

Required read discipline:

- read the governing records before writing conclusions
- treat `source-of-truth/` as the durable knowledge layer
- treat `sop-library/` as the reusable procedure layer
- treat `source-of-truth/agent-status/` as runtime execution state
- treat `source-of-truth/memory/` as recurring agent memory for approved memory streams such as Linda's repo-health history
- treat `source-of-truth/decisions/` as load-bearing decision authority

Required write discipline:

- do not create scattered review files outside approved folders
- write runtime state only in `source-of-truth/agent-status/`
- write recurring agent memory only in `source-of-truth/memory/`
- write durable decision changes only in `source-of-truth/decisions/`
- update linked durable artifacts or journals only in approved folders
- update approval state through approved dashboard and source-of-truth paths

## GitHub And Placeholder Safety

`[[source-of-truth/github|GitHub]]` currently defines GitHub Issues as the executable backlog, but its live repo and local secret settings are placeholder-only.

Agents must therefore follow these rules:

- do not invent a real repo, issue, token, or `.env` path
- do not claim live GitHub sync is configured unless it actually is
- if the agent can perform a file-first review without issue writes, it may continue only if it records the GitHub sync limitation explicitly in status and output
- if the agent requires a real linked issue to proceed, it must stop and publish a blocker

## Files In This Folder

| File | Purpose |
| --- | --- |
| [[agents-overview|Agents Overview]] | Overview of the agent system and how it connects to the rest of the repo. |
| [[agents/profiles/README|Agent Profiles]] | Folder-based profiles for every individual project-curator agent. |
| [[agent-roster|Agent Roster]] | Canonical recurring agent roster. |
| [[agent-template|Agent Template]] | Reusable template for authoring or extending agents. |
| [[agent-schedules|Agent Schedules]] | Cadence rules for daily, weekly, and event-driven runs. |
| [[agent-workflows|Agent Workflows]] | Step-by-step workflows for each agent. |
| [[agent-output-contracts|Agent Output Contracts]] | Required output format and dashboard-ready reporting fields. |
| [[agent-dashboard-routing|Agent Dashboard Routing]] | Rules for which dashboard tabs and cards each agent updates. |
| [[agent-approval-rules|Agent Approval Rules]] | Approval boundaries for each agent. |
| [[memory-and-decision-hygiene|Memory And Decision Hygiene]] | Consolidated rules for daily memory capture, decision capture, and durable write paths. |
| [[guardrails|Guardrails]] | Shared autonomy ramp, safe-action rules, and approval-boundary rules. |

## Core Rules

1. Every agent must update an agent status file.
2. Every agent must link output back to source of truth.
3. Every agent must write dashboard-ready output.
4. Every approval request must create or update an approval queue item.
5. Agents must not approve their own work.
6. Agents must not silently override Accepted decisions.
7. Agents must not create scattered docs outside approved folders.
8. Agents must stop if source of truth is missing, decisions conflict, or write permissions are unclear.
9. Public posting, deploys, spending, data deletion, permission changes, and architecture changes require explicit approval.
10. Agent docs define process only and do not create application code.
11. Agent work must not create real secrets or `.env` files.
12. Every daily run must update durable memory with decisions made, assumptions changed, open questions, new risks, tickets created, and tickets closed.
13. Linda must update her repo-health memory when she scores the repo.
14. Wider autonomy may be added only after the dashboard can show what happened and the applicable operating-model/guardrails are documented.

## Expected Operating Pattern

Each recurring run should follow this high-level shape:

1. Read the governing source records and relevant SOPs.
2. Create or update the agent runtime status file.
3. Perform the agent review or synthesis.
4. Produce dashboard-ready output using the shared output contract.
5. Raise approvals or blockers when required.
6. Link every conclusion back to the governing records.

## Related

- [[agent-roster|Agent Roster]]
- [[agent-schedules|Agent Schedules]]
- [[agent-workflows|Agent Workflows]]
- [[agent-output-contracts|Agent Output Contracts]]
- [[agent-dashboard-routing|Agent Dashboard Routing]]
- [[agent-approval-rules|Agent Approval Rules]]
- [[memory-and-decision-hygiene|Memory And Decision Hygiene]]
- [[guardrails|Guardrails]]

<!-- Reviewed and Approved on -->
