---
aliases:
  - Scheduled Agents
  - Recurring Agents
---

# Scheduled Agents

This folder defines Step 8 of the agent operating model: scheduled agents.

Scheduled agents are recurring operating agents that review the system on a daily, weekly, or event-driven cadence. They do not invent a new operating model. They apply the existing lifecycle, dashboard, source-of-truth, SOP, decision-record, approval, and agent-status rules on a repeatable schedule.

Use it with:

- [[operating-model/README|Operating Model Overview]]
- [[lifecycle]]
- [[decision-gates]]
- [[dashboard/README|Dashboard Specification]]
- [[dashboard/approval-queues|Approval Queues]]
- [[operating-model/agent-status-schema/README|Agent Status Schema]]
- [[operating-model/decision-record-system/README|Decision Record System]]
- [[source-of-truth/files-and-folders|Files And Folders]]
- [[source-of-truth/github|GitHub]]
- [[sop-registry|SOP Registry]]
- [[sop-usage-rules|SOP Usage Rules]]
- [[guardrails|Guardrails]]

## Purpose

The scheduled-agent system exists so the repo can run recurring review, coordination, and governance workflows without depending on ad hoc prompting or undocumented memory.

It standardizes:

- which recurring agents exist
- when each agent runs
- what each agent reads
- what each agent may write
- where outputs go
- when approval is required
- how status and dashboard updates stay durable and auditable

## Why It Exists

Without a scheduled-agent layer, recurring work becomes inconsistent:

- important reviews happen late or not at all
- dashboard state drifts from the durable source records
- approvals get buried in chat or issue comments
- quality, security, growth, and cost reviews happen unevenly
- decisions become stale because nobody owns recurring decision hygiene

Scheduled agents make recurring operating work explicit, reviewable, and linkable.

## System Boundary

Scheduled agents may:

- read from approved source records
- summarize and compare evidence
- draft dashboard-ready outputs
- update runtime agent status files
- create or update approval queue items when approval is required
- recommend decisions, priorities, or stop actions

Scheduled agents must not:

- approve their own work
- silently override Accepted decisions
- write durable outputs outside approved folders
- invent live GitHub state when `[[source-of-truth/github|GitHub]]` remains placeholder-only
- deploy, publish, spend, delete data, change permissions, or change architecture without explicit approval

## How It Connects To The Dashboard

Every scheduled agent must produce dashboard-ready output that can route into one or more of these dashboard tabs:

- [[dashboard/dashboard-tabs#Today|Today]]
- [[dashboard/dashboard-tabs#Needs Approval|Needs Approval]]
- [[dashboard/dashboard-tabs#Blocked Agents|Blocked Agents]]
- [[dashboard/dashboard-tabs#Top Backlog|Top Backlog]]
- [[dashboard/dashboard-tabs#Recent Decisions|Recent Decisions]]
- [[dashboard/dashboard-tabs#Metrics|Metrics]]
- [[dashboard/dashboard-tabs#Cost|Cost]]

The dashboard remains a reader and action surface. Scheduled agents prepare the packets, summaries, cards, and escalation signals that the dashboard consumes.

## How It Connects To Approvals

If a scheduled agent reaches a decision that requires human approval, it must:

1. update its runtime status file under `source-of-truth/agent-status/`
2. set `Needs approval` to `Yes`
3. state the exact approval request
4. create or update the approval queue item using the rules in [[dashboard/approval-queues|Approval Queues]]
5. stop the approval-dependent path until the human decision exists

## How It Connects To Source Of Truth

Scheduled agents are read-heavy, but every output still has to link back to the durable record set under `source-of-truth/`.

Required read discipline:

- read the governing records before writing conclusions
- treat `source-of-truth/` as the durable knowledge layer
- treat `sop-library/` as the reusable procedure layer
- treat `source-of-truth/agent-status/` as runtime execution state
- treat `source-of-truth/decisions/` as load-bearing decision authority

Required write discipline:

- do not create scattered review files outside approved folders
- write runtime state only in `source-of-truth/agent-status/`
- write durable decision changes only in `source-of-truth/decisions/`
- update linked durable artifacts or journals only in approved folders
- update approval state through approved dashboard and source-of-truth paths

## GitHub And Placeholder Safety

`[[source-of-truth/github|GitHub]]` currently defines GitHub Issues as the executable backlog, but its live repo and local secret settings are placeholder-only.

Scheduled agents must therefore follow these rules:

- do not invent a real repo, issue, token, or `.env` path
- do not claim live GitHub sync is configured unless it actually is
- if the agent can perform a file-first review without issue writes, it may continue only if it records the GitHub sync limitation explicitly in status and output
- if the agent requires a real linked issue to proceed, it must stop and publish a blocker

## Files In This Folder

| File | Purpose |
| --- | --- |
| [[scheduled-agents|Scheduled Agents]] | Overview of the scheduled-agent system and how it connects to the rest of the repo. |
| [[agent-roster|Agent Roster]] | Canonical recurring agent roster. |
| [[agent-template|Agent Template]] | Reusable template for authoring or extending scheduled agents. |
| [[agent-schedules|Agent Schedules]] | Cadence rules for daily, weekly, and event-driven runs. |
| [[agent-workflows|Agent Workflows]] | Step-by-step workflows for each scheduled agent. |
| [[agent-output-contracts|Agent Output Contracts]] | Required output format and dashboard-ready reporting fields. |
| [[agent-dashboard-routing|Agent Dashboard Routing]] | Rules for which dashboard tabs and cards each agent updates. |
| [[agent-approval-rules|Agent Approval Rules]] | Approval boundaries for each scheduled agent. |
| [[memory-and-decision-hygiene|Memory And Decision Hygiene]] | Consolidated rules for daily memory capture, decision capture, and durable write paths. |
| [[guardrails|Guardrails]] | Shared autonomy ramp, safe-action rules, and approval-boundary rules. |

## Core Rules

1. Every scheduled agent must update an agent status file.
2. Every scheduled agent must link output back to source of truth.
3. Every scheduled agent must write dashboard-ready output.
4. Every approval request must create or update an approval queue item.
5. Agents must not approve their own work.
6. Agents must not silently override Accepted decisions.
7. Agents must not create scattered docs outside approved folders.
8. Agents must stop if source of truth is missing, decisions conflict, or write permissions are unclear.
9. Public posting, deploys, spending, data deletion, permission changes, and architecture changes require explicit approval.
10. Scheduled-agent docs define process only and do not create application code.
11. Scheduled-agent work must not create real secrets or `.env` files.
12. Every daily run must update durable memory with decisions made, assumptions changed, open questions, new risks, tickets created, and tickets closed.
13. Wider autonomy may be added only after the dashboard can show what happened and the applicable operating-model/guardrails are documented.

## Expected Operating Pattern

Each recurring run should follow this high-level shape:

1. Read the governing source records and relevant SOPs.
2. Create or update the agent runtime status file.
3. Perform the scheduled review or synthesis.
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
