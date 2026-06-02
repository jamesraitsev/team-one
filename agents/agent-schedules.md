---
aliases:
  - Scheduled Agent Schedules
  - Agent Schedules
---

# Agent Schedules

This file defines when each scheduled agent runs and what event resets or accelerates its cadence.

Use it with [[agent-roster|Agent Roster]], [[agent-workflows|Agent Workflows]], and [[agent-dashboard-routing|Agent Dashboard Routing]].

## Schedule Table

| Agent name | Cadence | Default run window | Event-driven triggers | Notes |
| --- | --- | --- | --- | --- |
| Daily Chief of Staff Brief | Daily | Daily morning before operator planning | Material overnight change, new blocker cluster, new approval cluster | Should prepare the first high-priority Today view for the day. |
| Backlog Groomer | Daily or on demand | Daily backlog pass | Human request, issue volume spike, planning prep, major reprioritization signal | May run file-first when GitHub is not live, but must block issue-write steps. |
| Product Reviewer | Daily or before planning | Daily when active product work exists | New validation evidence, planning prep, major customer-signal shift | Should intensify when an initiative sits between Idea, Validation, and Plan. |
| CTO Reviewer | Daily or before implementation | Daily when active build work exists | Architecture-impacting change, implementation handoff, risk escalation | Must rerun before material architecture or sequencing approvals. |
| Growth Reviewer | Daily during launch, otherwise weekly | Daily in Launch stage, weekly outside launch | New campaign, launch date shift, content review request, traction anomaly | May create more frequent approval packets during launch windows. |
| Weekly CFO Cost and Progress Reviewer | Weekly | Weekly operating review window | Spend spike, vendor change, ROI concern, material throughput drop | Should compare cost movement with stage and value evidence. |
| QA / Release Reviewer | Before merge, before deploy, and weekly | Weekly release-health review | Merge candidate, release candidate, regression alert, acceptance-criteria dispute | Must run before any deploy approval. |
| Security / Secrets Reviewer | Before deploy, after dependency changes, and weekly | Weekly security review window | Dependency update, auth change, permission change, deploy prep | Must run after dependency changes that could alter security posture. |
| Customer Signal Reviewer | Daily during launch, otherwise weekly | Daily in Launch stage, weekly outside launch | Support spike, complaint cluster, analytics anomaly, feature-request burst | Should increase cadence when real demand or churn signals move quickly. |
| Source-of-Truth Steward | Daily and whenever durable records change materially | Daily source-of-truth hygiene review | New source-of-truth conflict, link-health regression, missing backlink, orphan artifact, decision-index drift | Should rerun before other governance conclusions are trusted when record integrity is in doubt. |
| Decision Record Steward | Weekly and whenever decisions change | Weekly governance review | New decision, decision status change, accepted conflict, supersession need | Must rerun whenever a decision changes materially. |

## Cadence Rules

| Rule | Required behavior |
| --- | --- |
| Daily morning | Run before the operator's primary planning session when possible. |
| Weekly | Run on a predictable weekly cadence so stale signals are obvious. |
| Before merge | Finish review before merge approval is granted. |
| Before deploy | Finish review before go or no-go approval is granted. |
| On demand | Human request may trigger an extra run without replacing the normal cadence. |
| Event-driven | Material source changes may trigger an immediate rerun. |

## Staleness Rules

Treat a scheduled-agent output as stale when:

- a daily agent has not updated during the current operating day
- a weekly agent has not updated during the current review week
- an event-driven trigger occurred after the last update
- the linked decision, approval, or blocker changed materially after the last run

When stale:

1. update the runtime status to show the next rerun needed
2. route a reminder or risk signal to the dashboard
3. do not treat the prior recommendation as current if the source inputs changed materially

## Rerun Rules

Rerun a scheduled agent early when:

- a new blocker appears
- a new approval request appears
- a linked decision changes
- the active SOP changes
- a new source-of-truth conflict appears
- a major metric or cost signal changes the recommendation

## Schedule Safety

Cadence never overrides approval boundaries.

If a scheduled rerun reaches an approval boundary, the agent must stop, publish the approval request, and wait for the human decision instead of continuing on cadence alone.

## Related

- [[agent-roster|Agent Roster]]
- [[agent-workflows|Agent Workflows]]
- [[agent-dashboard-routing|Agent Dashboard Routing]]

<!-- Reviewed and Approved on -->
