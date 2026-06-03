---
aliases:
  - Operating Model Overview
  - Agent Operating Model
---

# Agent Operating Model

## Before You Edit This File

Frame of mind: This is the operating model's front door. A new person should understand the whole system's purpose, live-vs-spec posture, and authority order from this file.

Ask yourself before changing it:
- What is this system trying to make easier or safer?
  Prompt: Write the plain-English answer first; add structure only after the meaning is clear.
- Which folders define rules, which store live records, and which are future-facing?
  Prompt: Name the exact files or records someone should open before trusting this answer.
- Does any statement here overpromise GitHub, dashboard, agent, or app capabilities that are not live yet?
  Prompt: Mark the item as live now, planned later, or out of scope; do not leave it implied.

Cross-check [[question|question.md]], [[source-of-truth/files-and-folders|Files And Folders]], [[lifecycle]], and [[dashboard/README|Dashboard Specification]].


This folder defines the operating model for an agent-driven project system. It gives every initiative the same path from a raw idea to a final decision so work can be evaluated consistently, automated safely, and audited later.

Related notes: [[lifecycle]], [[decision-gates]], [[dashboard-model]], [[dashboard/README|Dashboard Specification]], [[agent-responsibilities]]

## Why This Exists

Without a shared lifecycle, agents can create activity without creating decisions. Humans then have to reconstruct why something moved forward, what evidence existed, and whether the work should continue. This operating model fixes that by defining:

- one lifecycle for every initiative
- the evidence needed to move between stages
- what agents may do without approval
- where humans must decide
- how dashboards, tickets, memory, and ADRs stay aligned

## Lifecycle

Every initiative moves through the same sequence:

`Idea -> Validation -> Plan -> Build -> Launch -> Learn -> Scale or Kill`

Stage definitions live in [[lifecycle]], and stage movement rules live in [[decision-gates]].

The final branch is intentional:

- `Scale` means the initiative earned more investment.
- `Kill` means the initiative is stopped on purpose, with the learning preserved.

## How To Use This Model

| System | How it uses the model |
| --- | --- |
| Agents | Create artifacts, collect evidence, update issue state, propose next actions, and prepare decision packets using the rules in [[agent-responsibilities]]. |
| Humans | Approve movement at decision gates, resolve tradeoffs, set risk tolerance, and decide whether to scale or kill. |
| Dashboards | Show stage, health, blockers, approval status, evidence completeness, and recommended next action as defined in [[dashboard-model]]. |
| Tickets | Represent initiatives and stage work, carry labels, link artifacts, and preserve execution history. |

## Core Operating Rules

| Rule | Practical meaning |
| --- | --- |
| One initiative, one current stage | An initiative should have exactly one active lifecycle stage at a time. |
| No silent stage changes | Moving stages requires recorded evidence and an explicit approval event. |
| Agents prepare, humans decide | Agents can gather, summarize, draft, and execute within the guardrails; humans approve material risk and irreversible actions. |
| Artifacts before movement | A stage is not complete because work happened; it is complete when the required artifacts exist and pass review. |
| Learning is mandatory | Every launched initiative must produce learning, even if it is later killed. |
| Killing is a valid outcome | Failed initiatives should be stopped quickly and documented cleanly rather than left to drift. |

## Recommended Ticket Model

Use one primary GitHub issue per initiative and keep it open through the lifecycle. Support it with linked sub-issues only when necessary for execution. The primary issue should always show:

- current stage
- current owner
- approval state
- links to required artifacts
- metrics snapshot
- blockers
- recommended next action

## Recommended Artifact Pattern

| Artifact | Purpose |
| --- | --- |
| Initiative brief | Captures the problem, idea, owner, and expected outcome. |
| Validation summary | Records market, user, technical, and operational evidence. |
| Execution plan | Defines scope, milestones, risks, dependencies, and success metrics. |
| Build log or delivery notes | Tracks implementation progress, decisions, and exceptions. |
| Launch checklist and results | Confirms readiness and records what shipped. |
| Learning review | Summarizes results, metrics, lessons, and recommendation. |
| ADR or memory entry | Preserves durable decisions and reusable context. |

## Files And Related Specs

| File | Purpose |
| --- | --- |
| `README.md` | Overview of the operating model and how the system uses it. |
| [[lifecycle]] | Detailed rules for each lifecycle stage. |
| [[decision-gates]] | Approval logic and evidence requirements between stages. |
| [[dashboard-model]] | Dashboard behavior, statuses, cards, queues, and alerts. |
| [[dashboard/README|Dashboard Specification]] | Root-level dashboard specification folder for Step 6, including tab contracts, card contracts, and MVP scope. |
| [[agent-responsibilities]] | Stage-by-stage boundary between agent autonomy and human approval. |
| [[operating-model/agent-status-schema/README|Agent Status Schema]] | Runtime status rules, templates, and dashboard contract for active agents. |
| [[operating-model/decision-record-system/README|Decision Record System]] | Rules, templates, naming, and workflow for durable load-bearing decisions. |
| [[agents-overview|Agents Overview]] | Step 8 agent roster, optional schedules, workflows, outputs, and approval boundaries. |
| [[guardrails|Guardrails]] | Shared autonomy ramp, safe-action rules, and approval-boundary guardrails. |
| [[source-of-truth/files-and-folders|Files And Folders]] | Canonical file and folder contract for durable knowledge under the repo root `source-of-truth/` folder. |
| [[source-of-truth/github|GitHub]] | Canonical GitHub backlog and `.env` integration contract. |

## Step 2: One Source Of Truth

Step 2 defines how the system chooses and operates its source of truth.

The model is intentionally configurable:

- the executable backlog defaults to GitHub Issues unless a profile says otherwise
- repo files are always the durable knowledge layer
- the durable knowledge root may be this workspace, another repo, or a folder inside either one
- structured folders such as `ideas/`, `decisions/`, `journals/`, `projects/`, `research/`, and `artifacts/` are supported when enabled in the active profile
- durable load-bearing decisions should use the decision record system docs in `operating-model/decision-record-system/` and be stored in `source-of-truth/decisions/`

Use these docs together:

| Document | Use it for |
| --- | --- |
| [[source-of-truth/files-and-folders|Files And Folders]] | Defining the durable knowledge root, approved folders, link rules, and artifact backlink requirements. |
| [[source-of-truth/github|GitHub]] | Defining the GitHub backlog repo, issue contract, sync behavior, and `.env` location for local secrets. |

## Step 4: Reusable SOP Library

Step 4 defines how repeated workflows become reusable standard operating procedures instead of being re-explained inside each initiative.

This repo uses one shared SOP library with categories. `SDLC` is one category inside that library, not the whole operating system.

Use these docs together:

| Document | Use it for |
| --- | --- |
| [[sop-library/README|SOP Library]] | Overview of the reusable SOP system and storage model. |
| [[sop-registry|SOP Registry]] | Canonical list of SOPs, versions, inputs, outputs, and approval boundaries. |
| [[sop-usage-rules|SOP Usage Rules]] | Execution rules, dashboard fields, storage precedence, and stop conditions. |

## Step 5: Agent Status Schema

Step 5 defines how active agents publish runtime execution state in a durable, dashboard-readable format.

The system split is intentional:

- `operating-model/agent-status-schema/` defines the rules, templates, and dashboard contract
- `source-of-truth/agent-status/` stores the active runtime status files and index

Use these docs together:

| Document | Use it for |
| --- | --- |
| [[operating-model/agent-status-schema/README|Agent Status Schema]] | Overview of the runtime status system and how it connects to the rest of the repo. |
| [[operating-model/agent-status-schema/agent-status-rules|Agent Status Rules]] | Creation, update, blocker, approval, and close rules for runtime status. |
| [[operating-model/agent-status-schema/agent-status-file-contract|Agent Status File Contract]] | Canonical runtime file model, naming, paths, and archive rules. |
| [[source-of-truth/agent-status/index|Agent Status Index]] | Human-readable summary of active agent status records. |

## Step 6: Decision-Centered Dashboard Specification

Step 6 defines the dashboard before any UI or application code is built.

The Step 6 notes live in the repo-root `dashboard/` folder so they can stay adjacent to the broader source-of-truth system instead of nested inside the operating-model rules folder.

This step narrows the dashboard's role:

- show decisions before activity
- show blockers before noise
- recommend the next human action
- link every claim back to the source of truth
- expose confidence and cost where available

Use these docs together:

| Document | Use it for |
| --- | --- |
| [[dashboard/README|Dashboard Specification]] | Overview of the dashboard specification and how it fits the operating model. |
| [[dashboard/common-spec|Common Dashboard Spec]] | Shared dashboard folder structure, tab contracts, card rules, source rules, actions, metrics, and rebuild requirements. |

## Step 8: Agents

Step 8 defines the recurring agents that operate the system on a daily, weekly, or event-driven cadence.

These agents do not replace lifecycle rules, decisions, SOPs, or the dashboard. They apply those systems on a repeatable schedule so the human operator gets consistent briefs, backlog recommendations, review packets, and approval requests.

Use these docs together:

| Document | Use it for |
| --- | --- |
| [[agents-overview|Agents Overview]] | Overview of the agent system and its repo connections. |
| [[agent-roster|Agent Roster]] | Canonical list of agents, their purpose, triggers, and outputs. |
| [[agent-schedules|Agent Schedules]] | Daily, weekly, and event-driven cadence rules for each agent. |
| [[agent-workflows|Agent Workflows]] | Step-by-step operating flow for each agent. |
| [[agent-output-contracts|Agent Output Contracts]] | Required output fields and dashboard-ready reporting format. |
| [[agent-dashboard-routing|Agent Dashboard Routing]] | Rules for how each agent populates the dashboard tabs and cards. |
| [[agent-approval-rules|Agent Approval Rules]] | Approval boundaries, escalation rules, and prohibited self-approval behavior. |

## Implementation Intent

These docs are written so a later agent can build:

- dashboard tabs and stage columns
- GitHub labels and issue automations
- approval workflows
- memory and ADR writing rules
- initiative health alerts
- stage transition checks
- reusable SOP execution and reporting

If a later implementation conflicts with this documentation, update the docs first or alongside the code so the operating model remains the source of truth.

## Related

- [[lifecycle]]
- [[decision-gates]]
- [[dashboard/README|Dashboard Specification]]
- [[operating-model/agent-status-schema/README|Agent Status Schema]]
- [[operating-model/decision-record-system/README|Decision Record System]]
- [[agents-overview|Agents Overview]]

<!-- Reviewed and Approved on -->
