---
aliases:
  - Scheduled Agent Roster
  - Agent Roster
---

# Agent Roster

This file defines the initial scheduled-agent roster for the operating model.

Use it with [[scheduled-agents|Scheduled Agents]], [[agent-schedules|Agent Schedules]], [[agent-workflows|Agent Workflows]], [[agent-output-contracts|Agent Output Contracts]], and [[agent-approval-rules|Agent Approval Rules]].

## Roster

| Agent name | Primary purpose | Default schedule | Primary trigger | Typical SOPs used | Primary dashboard destinations |
| --- | --- | --- | --- | --- | --- |
| Daily Chief of Staff Brief | Summarize what changed, what matters today, what is blocked, and what needs approval. | Daily morning | Start of operator day | [[daily-journal|Daily Journal]], [[dashboard-review|Dashboard Review]], [[source-of-truth-check|Source Of Truth Check]] | Today, Needs Approval, Blocked Agents |
| Backlog Groomer | Review backlog quality, duplicates, stale work, missing links, blocked work, and top ranked items. | Daily or on demand | Daily backlog pass or human request | [[backlog-grooming|Backlog Grooming]], [[source-of-truth-check|Source Of Truth Check]] | Top Backlog, Today, Needs Approval |
| Product Reviewer | Review user value, lifecycle fit, assumptions, validation gaps, and whether work should continue. | Daily or before planning | Planning prep or new evidence | [[idea-triage|Idea Triage]], [[validation-planning|Validation Planning]], [[source-of-truth-check|Source Of Truth Check]] | Today, Top Backlog, Metrics, Recent Decisions |
| CTO Reviewer | Review architecture, sequencing, dependencies, reliability, scalability, and engineering readiness. | Daily or before implementation | Implementation prep or architecture-impacting change | [[feature-delivery|Feature Delivery]], [[decision-record-review|Decision Record Review]], [[source-of-truth-check|Source Of Truth Check]] | Today, Blocked Agents, Recent Decisions, Needs Approval |
| Growth Reviewer | Review launch motion, channels, positioning, conversion, traction, and next experiments. | Daily during launch, otherwise weekly | Launch-stage activity or weekly growth review | [[launch-planning|Launch Planning]], [[copy-review|Copy Review]], [[content-approval|Content Approval]], [[dashboard-review|Dashboard Review]] | Today, Metrics, Needs Approval |
| Weekly CFO Cost and Progress Reviewer | Review cost, throughput, value, ROI, and whether to continue, pause, reduce spend, or double down. | Weekly | Weekly operating review | [[weekly-review|Weekly Review]], [[dashboard-review|Dashboard Review]], [[source-of-truth-check|Source Of Truth Check]] | Cost, Today, Needs Approval, Metrics |
| QA / Release Reviewer | Review test coverage, regressions, visual quality, acceptance criteria, and release readiness. | Before merge, before deploy, and weekly | Release event, merge gate, or weekly audit | [[testing|Testing]], [[visual-review|Visual Review]], [[release-checklist|Release Checklist]] | Today, Needs Approval, Blocked Agents |
| Security / Secrets Reviewer | Review secrets handling, auth, permissions, dependency risk, and unsafe agent permissions. | Before deploy, after dependency changes, and weekly | Dependency change, deploy prep, or weekly audit | [[security-review|Security Review]], [[agent-permission-review|Agent Permission Review]], [[source-of-truth-check|Source Of Truth Check]] | Needs Approval, Blocked Agents, Today, Recent Decisions |
| Customer Signal Reviewer | Review feedback, analytics, complaints, requests, activation, retention, and evidence of demand. | Daily during launch, otherwise weekly | Launch-stage cadence or weekly signal review | [[dashboard-review|Dashboard Review]], [[validation-planning|Validation Planning]], [[daily-journal|Daily Journal]] | Metrics, Today, Top Backlog |
| Source-of-Truth Steward | Review the durable knowledge system for broken links, missing backlinks, stale status records, orphan artifacts, and cross-record drift before other agents trust it. | Daily and whenever durable records change materially | Daily hygiene pass, source-of-truth conflict, or human request | [[source-of-truth-check|Source Of Truth Check]], [[decision-record-review|Decision Record Review]], [[daily-journal|Daily Journal]] | Today, Blocked Agents, Needs Approval, Recent Decisions |
| Decision Record Steward | Review new, stale, conflicting, missing, or superseded decisions and escalate needed human review. | Weekly and whenever decisions change | Decision change or weekly governance pass | [[decision-record-review|Decision Record Review]], [[source-of-truth-check|Source Of Truth Check]], [[weekly-review|Weekly Review]] | Recent Decisions, Needs Approval, Blocked Agents |

## Shared Read Requirements

Every scheduled agent should read the records that govern its current run:

- relevant files under `source-of-truth/`
- the applicable SOPs and their registry row
- active agent status files that affect the run
- related decision records before making a recommendation
- dashboard files when output routing or approval behavior matters

## Shared Write Requirements

Every scheduled agent must at minimum write:

- one runtime status update in `source-of-truth/agent-status/`
- one dashboard-ready output packet using [[agent-output-contracts|Agent Output Contracts]]
- one approval queue update when approval is required

Every scheduled agent may additionally write:

- a linked journal note in `source-of-truth/journals/`
- a durable artifact in `source-of-truth/artifacts/`
- a decision record update in `source-of-truth/decisions/` when the governing SOP and approval state allow it

## Human Boundary

All scheduled agents prepare evidence and recommendations.

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
- [[agent-schedules|Agent Schedules]]
- [[agent-workflows|Agent Workflows]]
- [[agent-dashboard-routing|Agent Dashboard Routing]]
- [[agent-approval-rules|Agent Approval Rules]]

<!-- Reviewed and Approved on -->
