---
aliases:
  - Dashboard Tabs
---

# Dashboard Tabs

This file defines the first dashboard tabs. Use it with [[dashboard-principles]], [[dashboard-card-contract]], [[dashboard-data-contract]], [[dashboard-actions]], and [[approval-queues]].

## Shared Tab Rules

These rules apply to every tab:

- every item must link back to a source record
- every item must expose exactly one recommended next action
- every write action must be blocked when source records conflict
- every tab should degrade gracefully when GitHub is unavailable or placeholder-only in [[source-of-truth/github|GitHub]]
- every tab should show `Last updated` from its source records, not from dashboard render time

## Today

| Field | Definition |
| --- | --- |
| Purpose | Show what matters today across decisions, approvals, overnight changes, risks, and blocked work. |
| Primary user question | `What needs my attention first today?` |
| Cards or sections shown | Decision cards, recommendation cards, risk cards, blocker cards, approval cards, overnight change summary, approval queue priority slice, top 5 priorities strip, regression risk strip. |
| Required data fields | Title, summary, why it matters, recommended action, current stage, status, blocker state, approval state, confidence, cost state, source links, last updated, priority rationale when the card changes ordering. |
| Data sources | [[source-of-truth/agent-status/index|Agent Status Index]], individual status files in `source-of-truth/agent-status/`, [[source-of-truth/decisions/index|Decision Index]], current decision records, [[approval-queues]], GitHub issue summaries when configured, linked journals if they record overnight changes. |
| Empty state | `No urgent decisions, blockers, or approvals are currently surfaced for today.` |
| Error state | `Today view is incomplete because one or more source feeds are missing, stale, or conflicting.` |
| Human actions available | Approve, reject, revise, schedule, mark blocked, mark unblocked, request agent follow up, create decision record, archive. |
| Agent actions allowed | Refresh derived summaries, prepare evidence packets, link missing artifacts, draft recommendation text, never auto-approve. |
| Links back to source of truth | Status file, decision record, linked issue, linked journal, linked project, linked idea, linked SOP. |
| Sorting rules | Sort by highest-priority approvals first, then decision urgency, then blocker severity, then approval age, then risk, then last updated recency. |
| Refresh rules | Refresh on dashboard open, on material source update, and on the start of each operator day. |
| What must not be shown | Full comment feeds, full issue lists, commit history without operator relevance, vanity metrics, unlinked activity. |

Today must include:

- top decisions
- top recommended actions
- overnight changes
- top 5 priorities
- new risks
- regression risk needing human awareness
- blocked work that needs human attention
- the highest-priority approvals from the active approval queue

Today should make overnight GitHub movement readable when GitHub is configured by showing only:

- issues newly blocked overnight
- issues unblocked overnight
- issues whose priority changed overnight
- issues with new regression risk overnight
- issues newly identified as duplicates or stale overnight

## Needs Approval

| Field | Definition |
| --- | --- |
| Purpose | Show only active approval cards for work that cannot proceed without a human approval. |
| Primary user question | `What exact approvals are holding flow right now?` |
| Cards or sections shown | Active approval cards grouped by approval type, history link, approval queue summary, approval-source breakdown. |
| Required data fields | Exact decision needed, agent recommendation, consequence of approve, consequence of reject, consequence of defer or schedule, risk, confidence, cost impact, source links, created at, due date if any, current status, last updated. |
| Data sources | [[approval-queues]], agent status files with `Needs approval: Yes`, decision records with `Proposed` status, GitHub issues flagged as approval waiting when configured, SOPs that require approval from [[sop-registry|SOP Registry]]. |
| Empty state | `No active work is waiting on human approval.` |
| Error state | `Approval queue cannot be trusted because the required approval source is missing or conflicts with linked records.` |
| Human actions available | Approve, reject, revise, schedule, promote to issue, archive. |
| Agent actions allowed | Prepare approval packet, gather missing evidence, restate consequences, update links, return revised approval cards, never resolve the approval itself. |
| Links back to source of truth | Status file, decision record, linked issue, linked idea, linked journal, launch checklist or other artifact, related SOP. |
| Sorting rules | Sort by risk, age, due date, cost impact, and blocked work, with blocked work impact first by default. |
| Refresh rules | Refresh on every source update that changes approval state, on approval action, and on manual operator refresh. |
| What must not be shown | Optional reviews, general updates, items that can proceed without approval, approvals with vague requests. |

Each item must state:

- the exact approval needed
- the consequence of approving
- the consequence of rejecting
- the consequence of deferring or scheduling

The tab must show only active approval statuses:

- `Pending`
- `Needs Revision`
- `Scheduled`

Approved, rejected, promoted, and archived cards should move to approval history rather than remain in the active queue.

## Blocked Agents

| Field | Definition |
| --- | --- |
| Purpose | Show agents that cannot continue and what will unblock them, including agents blocked by pending approvals. |
| Primary user question | `Which agents are stopped, and what concrete action restarts flow?` |
| Cards or sections shown | Blocker cards, recommendation cards, risk cards when the blocker increases delivery or launch risk, approval-blocked grouping. |
| Required data fields | Agent ID, agent name, impacted work, blocker reason, blocker type, blocked since, blocker owner when known, unblock action, linked approval if any, confidence, cost state, source links, last updated. |
| Data sources | Agent status files with `Status: Blocked`, [[operating-model/agent-status-schema/agent-status-dashboard-contract|Agent Status Dashboard Contract]], linked decisions, linked issues, linked SOPs, linked journals if they explain the blocker. |
| Empty state | `No agents are currently blocked.` |
| Error state | `Blocked state cannot be trusted because one or more agent status records are stale, missing, or contradictory.` |
| Human actions available | Mark unblocked, mark blocked, approve, reject, revise, schedule, request agent follow up, create decision record, archive. |
| Agent actions allowed | Update blocker details, attach missing source links, restate unblock path, never clear a blocker without updating the source record. |
| Links back to source of truth | Agent status file, linked issue, linked decision, linked project, linked journal, related SOP. |
| Sorting rules | Sort by blocker severity first, then blocked-since age, then impact breadth, then cost accumulation. |
| Refresh rules | Refresh on every status update and alert when a blocker becomes stale. |
| What must not be shown | Healthy agents, blockers without an unblock path, blockers without a source record, speculative blocker causes. |

Each blocker must state:

- blocker reason
- blocked since time
- impacted work
- unblock action

The tab should clearly identify agents blocked by pending approvals and link back to the approval card driving the block.

## Top Backlog

| Field | Definition |
| --- | --- |
| Purpose | Show only the highest-value backlog items that deserve near-term attention. |
| Primary user question | `What should we work on next, and why is it ranked that way?` |
| Cards or sections shown | Top 5 priority cards, duplicate-issue queue, stale-issue queue, blocked-work slice, regression-risk slice, recommendation cards, risk cards, dependency summary, conflict-resolution slice. |
| Required data fields | Title, rank or score, impact, urgency, dependency order, risk reduction, learning value, effort estimate if known, recommended action, source links, last updated, owner or owner gap, stale state, duplicate state, blocker state, regression-risk state when applicable. |
| Data sources | GitHub Issues when configured, linked ideas in `source-of-truth/ideas/`, linked decisions, linked projects, backlog-related SOP outputs. |
| Empty state | `No ranked backlog items are available yet.` |
| Error state | `Backlog ranking is unavailable because issue data, priority inputs, or source links are missing or conflicting.` |
| Human actions available | Approve, reject, revise, defer, promote to issue, create decision record, request agent follow up, archive. |
| Agent actions allowed | Recompute derived rank, attach supporting links, draft rationale, never silently reprioritize durable backlog policy. |
| Links back to source of truth | Linked issue, linked idea, linked decision, linked project, supporting research note if one exists. |
| Sorting rules | Sort by rank using impact, urgency, dependency order, risk reduction, learning value, and effort, then by last updated. |
| Refresh rules | Refresh on backlog grooming updates and when ranking inputs materially change. |
| What must not be shown | Entire issue backlog, unlabeled raw issue dumps, rank with no rationale, items with no source link. |

Top Backlog must include these visual surfaces:

- `Top 5 priorities`
- `Duplicate issues`
- `Stale issues`
- `Blocked work`
- `Regression risk`
- `What changed overnight`

### Top 5 Priorities

Show only five items by default.

Each item must state:

- why it is in the top 5 now
- what would move it up or down
- what is blocked if it does not move
- whether the ranking depends on a human approval or unresolved conflict

### Duplicate Issues

Show issues that appear to represent the same problem, scope, or deliverable.

Each duplicate cluster must state:

- the proposed canonical issue
- the duplicate issues linked to it
- the operator risk if duplicates remain unresolved
- the recommended cleanup action

### Stale Issues

Show issues that still appear active or important but have not been updated within the expected cadence.

Each stale item must state:

- last meaningful update
- expected cadence
- likely owner or missing owner signal
- recommended revive, close, re-rank, or merge action

### Blocked Work

Show backlog items whose next step cannot proceed because of approval, dependency, evidence, or decision gaps.

Each blocked item must state:

- the exact blocker
- what work is waiting behind it
- whether the blocker belongs in [[approval-queues]]
- the smallest unblock action

### Regression Risk

Show issues whose implementation, release path, or recent changes create meaningful regression risk.

Each regression-risk item must state:

- the risk surface
- the evidence source
- whether the risk blocks merge or deploy
- the next quality or release action

### What Changed Overnight

Show only changes that alter priority, safety, or flow.

Each overnight item must state:

- what changed
- why the change matters today
- whether it affects rank, blocker state, approval state, or regression risk
- the recommended operator response

## Priority Conflict Breakdown

When the backlog contains a conflict, do not surface one generic `priority conflict`.

Break the conflict into one or more of these types:

1. `Identity conflict`
2. `Ranking conflict`
3. `Dependency conflict`
4. `Evidence conflict`
5. `Decision conflict`

Each conflict card must state:

- the conflict type
- the exact records in disagreement
- what the conflict is distorting
- the smallest decision that resolves it
- whether the conflict blocks ranking, merge, deploy, or investment

## Recent Decisions

| Field | Definition |
| --- | --- |
| Purpose | Show the latest accepted, proposed, superseded, and conflicting decisions with dependency context. |
| Primary user question | `What changed in the governing decisions, and what work does it affect?` |
| Cards or sections shown | Decision cards, risk cards for conflicts, recommendation cards for needed follow-up. |
| Required data fields | Decision ID, title, status, date, why it matters, what depends on it, what would invalidate it, recommended action, source links, last updated. |
| Data sources | [[source-of-truth/decisions/index|Decision Index]], individual decision records, linked projects, linked issues, linked agent status files when blocked by decision gaps. |
| Empty state | `No recent decision activity is available.` |
| Error state | `Decision feed is blocked because accepted decisions conflict or the decision index is out of sync with records.` |
| Human actions available | Approve, reject, revise, defer, archive, request agent follow up. |
| Agent actions allowed | Draft summaries, detect dependencies, flag conflicts, never resolve conflicting accepted decisions alone. |
| Links back to source of truth | Decision record, decision index, linked issue, linked idea, linked project, linked journal. |
| Sorting rules | Sort by status priority: conflicting, proposed, accepted, superseded, then by decision date descending. |
| Refresh rules | Refresh whenever a decision record or decision index changes. |
| What must not be shown | Undocumented decisions inferred from chat, unlinked policy claims, accepted conflicts normalized away. |

Recent decisions must include:

- accepted decisions
- proposed decisions
- superseded decisions
- conflicting decisions
- what depends on each decision
- what would invalidate each decision

## Metrics

| Field | Definition |
| --- | --- |
| Purpose | Show lifecycle-aware product, engineering, growth, launch, learning, and project ROI metrics. |
| Primary user question | `Are the active initiatives producing the expected outcomes for their stage, and should each project keep going or pause?` |
| Cards or sections shown | Metric cards, project ROI cards, risk cards, recommendation cards when a metric crosses a threshold. |
| Required data fields | Project scope, reporting window, metric name, value, target or baseline, lifecycle stage, trend, why it matters, recommended action when outside bounds, source links, last updated. |
| Data sources | Metrics files or APIs defined in the active setup, linked project notes, launch and learn artifacts, GitHub-derived flow metrics when configured, journals when they contain the latest baseline note. |
| Empty state | `No metrics source is configured for this view yet.` |
| Error state | `Metrics cannot be trusted because the configured source is stale, missing, or lacks lifecycle context.` |
| Human actions available | Revise, defer, create decision record, request agent follow up, archive. |
| Agent actions allowed | Refresh calculated metrics, compare actual versus target, flag regression, never invent baselines or targets. |
| Links back to source of truth | Metrics note or API reference, linked project, linked issue, linked decision, linked journal, launch or learn artifact. |
| Sorting rules | Sort by lifecycle relevance first, then threshold breach severity, then trend direction, then last updated. |
| Refresh rules | Refresh on metric source update cadence and on manual operator refresh. |
| What must not be shown | Vanity metrics without context, metrics with no source link, metrics detached from lifecycle stage. |

Metrics must show:

- product metrics
- engineering metrics
- growth metrics
- launch metrics
- learning metrics
- per-project ROI summaries

Each project ROI summary in `Metrics` must show:

- project name
- reporting window
- tickets closed
- downloads when applicable
- conversion with its explicit project definition
- CAC with its explicit project definition
- current `Keep going`, `Pause`, or `Unknown` recommendation
- recommendation rationale

## Cost

| Field | Definition |
| --- | --- |
| Purpose | Show spend and unit economics for AI, tools, infrastructure, ads, and other operating cost with per-project attribution. |
| Primary user question | `What is this system costing, and is the spend producing useful output?` |
| Cards or sections shown | Cost cards, project ROI cards, metric cards for cost efficiency, risk cards when spend rises without justification, recommendation cards. |
| Required data fields | Project scope, reporting window, cost category, value, status as actual or estimated or unknown, period, cost per useful output when available, variance versus expectation when available, why it matters, source links, last updated. |
| Data sources | Cost files or APIs defined in the active setup, agent status cost fields, GitHub or tool usage exports when configured, infrastructure billing summaries, ad platform summaries, linked journals or projects when they contain the accepted estimate. |
| Empty state | `No cost source is configured for this view yet.` |
| Error state | `Cost view is incomplete because one or more cost sources are unavailable, stale, or only partially linked.` |
| Human actions available | Approve, reject, revise, defer, create decision record, request agent follow up, archive. |
| Agent actions allowed | Refresh summaries, classify cost as actual or estimated or unknown, flag anomalies, never fabricate precise spend. |
| Links back to source of truth | Cost note or API reference, agent status file, linked issue, linked project, linked decision, linked journal. |
| Sorting rules | Sort by total cost impact first, then unexplained variance, then unknown-cost risk, then last updated. |
| Refresh rules | Refresh on billing update cadence, on material status-file cost change, and on manual operator refresh. |
| What must not be shown | Spend with no provenance, precise numbers copied from memory, cost with no useful-output context when that denominator exists. |

Cost must show:

- AI spend
- tool spend
- infrastructure spend
- ad spend
- estimated cost
- actual cost
- cost per useful output where available
- per-project total attributable spend

Each project cost summary in `Cost` must show:

- AI spend
- tool spend
- ad spend
- total attributable spend
- whether each value is `Actual`, `Estimated`, or `Unknown`
- direct source links for each spend category

## Related

- [[dashboard-principles]]
- [[dashboard-card-contract]]
- [[dashboard-data-contract]]
- [[dashboard-actions]]
- [[dashboard-mvp]]
- [[approval-queues]]

<!-- Reviewed and Approved on -->
