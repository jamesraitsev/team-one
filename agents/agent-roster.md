---
aliases:
  - Scheduled Agent Roster
  - Agent Roster
---

# Agent Roster

## Before You Edit This File

Frame of mind: This is the role map for agents. For each role, define what it owns, what it influences, who it interacts with, and what it must never approve alone.

Ask yourself before changing it:
- What is this agent responsible for, and what is outside its lane?
  Prompt: Write the role in one sentence, then name one thing it must not own.
- Does it have voting or recommendation rights, and where does human approval take over?
  Prompt: Say whether this role may decide, recommend, draft, or only inform; then name the human handoff.
- Which SOPs, dashboard tabs, and source records does it read or update?
  Prompt: Name the exact files or records someone should open before trusting this answer.

For example, the CTO Reviewer should review architecture, sequencing, dependencies, technical risk, and implementation readiness; it should not approve architecture changes, deploys, or accepted technical risk alone. Cross-check [[tech/README|Tech]], [[security-review|Security Review]], [[feature-delivery|Feature Delivery]], and [[agent-responsibilities|Agent Responsibilities]].


This file defines the initial agent roster for the operating model.

Use it with [[agents-overview|Agents Overview]], [[agent-schedules|Agent Schedules]], [[agent-workflows|Agent Workflows]], [[agent-output-contracts|Agent Output Contracts]], and [[agent-approval-rules|Agent Approval Rules]].

## Roster

| Agent name | Profile | Primary purpose | Default cadence | Primary trigger | Typical SOPs used | Primary dashboard destinations |
| --- | --- | --- | --- | --- | --- | --- |
| Daily Chief of Staff Brief | [[agents/profiles/daily-chief-of-staff-brief/README|Profile]] | Summarize what changed, what matters today, what is blocked, and what needs approval. | Daily morning | Start of operator day | [[daily-journal|Daily Journal]], [[dashboard-review|Dashboard Review]], [[source-of-truth-check|Source Of Truth Check]] | Today, Needs Approval, Blocked Agents |
| Backlog Groomer | [[agents/profiles/backlog-groomer/README|Profile]] | Review backlog quality, duplicates, stale work, missing links, blocked work, and top ranked items. | Daily or on demand | Daily backlog pass or human request | [[backlog-grooming|Backlog Grooming]], [[source-of-truth-check|Source Of Truth Check]] | Top Backlog, Today, Needs Approval |
| Product Reviewer | [[agents/profiles/product-reviewer/README|Profile]] | Review user value, lifecycle fit, assumptions, validation gaps, and whether work should continue. | Daily or before planning | Planning prep or new evidence | [[idea-triage|Idea Triage]], [[validation-planning|Validation Planning]], [[source-of-truth-check|Source Of Truth Check]] | Today, Top Backlog, Metrics, Recent Decisions |
| CTO Reviewer | [[agents/profiles/cto-reviewer/README|Profile]] | Review architecture, sequencing, dependencies, reliability, scalability, and engineering readiness. | Daily or before implementation | Implementation prep or architecture-impacting change | [[feature-delivery|Feature Delivery]], [[decision-record-review|Decision Record Review]], [[source-of-truth-check|Source Of Truth Check]] | Today, Blocked Agents, Recent Decisions, Needs Approval |
| Growth Reviewer | [[agents/profiles/growth-reviewer/README|Profile]] | Review launch motion, channels, positioning, conversion, traction, and next experiments. | Daily during launch, otherwise weekly | Launch-stage activity or weekly growth review | [[launch-planning|Launch Planning]], [[copy-review|Copy Review]], [[content-approval|Content Approval]], [[dashboard-review|Dashboard Review]] | Today, Metrics, Needs Approval |
| Weekly CFO Cost and Progress Reviewer | [[agents/profiles/weekly-cfo-cost-and-progress-reviewer/README|Profile]] | Review cost, throughput, value, ROI, and whether to continue, pause, reduce spend, or double down. | Weekly | Weekly operating review | [[weekly-review|Weekly Review]], [[dashboard-review|Dashboard Review]], [[source-of-truth-check|Source Of Truth Check]] | Cost, Today, Needs Approval, Metrics |
| QA / Release Reviewer | [[agents/profiles/qa-release-reviewer/README|Profile]] | Review test coverage, regressions, visual quality, acceptance criteria, and release readiness. | Before merge, before deploy, and weekly | Release event, merge gate, or weekly audit | [[testing|Testing]], [[visual-review|Visual Review]], [[release-checklist|Release Checklist]] | Today, Needs Approval, Blocked Agents |
| Security / Secrets Reviewer | [[agents/profiles/security-secrets-reviewer/README|Profile]] | Review secrets handling, auth, permissions, dependency risk, and unsafe agent permissions. | Before deploy, after dependency changes, and weekly | Dependency change, deploy prep, or weekly audit | [[security-review|Security Review]], [[agent-permission-review|Agent Permission Review]], [[source-of-truth-check|Source Of Truth Check]] | Needs Approval, Blocked Agents, Today, Recent Decisions |
| Customer Signal Reviewer | [[agents/profiles/customer-signal-reviewer/README|Profile]] | Review feedback, analytics, complaints, requests, activation, retention, and evidence of demand. | Daily during launch, otherwise weekly | Launch-stage cadence or weekly signal review | [[dashboard-review|Dashboard Review]], [[validation-planning|Validation Planning]], [[daily-journal|Daily Journal]] | Metrics, Today, Top Backlog |
| Linda | [[agents/profiles/linda/README|Profile]] | Audit repo health for clarity, overlaps, sequencing, placement, underused systems, and score trend. | Daily or on demand | Daily repo-health check, human request, major structural edit, or before expanding the repo | [[repo-health-audit|Repo Health Audit]], [[source-of-truth-check|Source Of Truth Check]], [[decision-record-review|Decision Record Review]] | Today, Blocked Agents, Recent Decisions, Needs Approval |
| Source-of-Truth Steward | [[agents/profiles/source-of-truth-steward/README|Profile]] | Review the durable knowledge system for broken links, missing backlinks, stale status records, orphan artifacts, and cross-record drift before other agents trust it. | Daily and whenever durable records change materially | Daily hygiene pass, source-of-truth conflict, or human request | [[source-of-truth-check|Source Of Truth Check]], [[decision-record-review|Decision Record Review]], [[daily-journal|Daily Journal]] | Today, Blocked Agents, Needs Approval, Recent Decisions |
| Decision Record Steward | [[agents/profiles/decision-record-steward/README|Profile]] | Review new, stale, conflicting, missing, or superseded decisions and escalate needed human review. | Weekly and whenever decisions change | Decision change or weekly governance pass | [[decision-record-review|Decision Record Review]], [[source-of-truth-check|Source Of Truth Check]], [[weekly-review|Weekly Review]] | Recent Decisions, Needs Approval, Blocked Agents |

## Shared Read Requirements

Every agent should read the records that govern its current run:

- relevant files under `source-of-truth/`
- the applicable SOPs and their registry row
- active agent status files that affect the run
- related decision records before making a recommendation
- dashboard files when output routing or approval behavior matters

## Shared Write Requirements

Every agent must at minimum write:

- one runtime status update in `source-of-truth/agent-status/`
- one dashboard-ready output packet using [[agent-output-contracts|Agent Output Contracts]]
- one approval queue update when approval is required

Every agent may additionally write:

- a linked journal note in `source-of-truth/journals/`
- a durable artifact in `source-of-truth/artifacts/`
- a decision record update in `source-of-truth/decisions/` when the governing SOP and approval state allow it

## Human Boundary

All agents prepare evidence and recommendations.

Only the human operator may approve:

- public posting
- deploys
- spending changes
- data deletion
- permission changes
- architecture changes
- Accepted decision overrides

## Related

- [[agent-template|Agent Template]]
- [[agents/profiles/README|Agent Profiles]]
- [[agent-schedules|Agent Schedules]]
- [[agent-workflows|Agent Workflows]]
- [[agent-dashboard-routing|Agent Dashboard Routing]]
- [[agent-approval-rules|Agent Approval Rules]]

<!-- Reviewed and Approved on -->
