---
aliases:
  - Scheduled Agent Output Contracts
  - Agent Output Contracts
---

# Agent Output Contracts

## Before You Edit This File

Frame of mind: This file defines what agents produce. Outputs should be structured enough for dashboards and humans, without hiding uncertainty.

Ask yourself before changing it:
- What fields must every agent output include?
  Prompt: Name the deliverable, its owner, and the source record it must link back to.
- How should confidence, evidence, blockers, risks, approvals, and next action be stated?
  Prompt: Say whether this role may decide, recommend, draft, or only inform; then name the human handoff.
- Where does the output get written or routed?
  Prompt: Name the deliverable, its owner, and the source record it must link back to.

Cross-check [[agent-dashboard-routing|Agent Dashboard Routing]], [[dashboard/common-spec|Common Dashboard Spec]], and [[agent-status-file-contract|Agent Status File Contract]].


This file defines the required output format for agents.

Use it with [[agent-workflows|Agent Workflows]], [[agent-dashboard-routing|Agent Dashboard Routing]], and [[dashboard/common-spec|Common Dashboard Spec]].

## Purpose

Every agent must produce output that is:

- durable
- linkable
- dashboard-ready
- approval-ready when needed
- readable without chat history

## Required Output Fields

Every agent output packet must include these sections in this order:

1. `Brief summary`
2. `Findings`
3. `Recommended decisions`
4. `Blockers`
5. `Approval requests`
6. `Linked issues`
7. `Linked ideas`
8. `Linked decisions`
9. `Linked SOPs`
10. `Cost or risk impact`
11. `Dashboard cards created or updated`
12. `Agent status update`

When the output changes priority, backlog rank, or conflict state, it must also include within `Findings` or `Recommended decisions`:

- the ranking rationale
- whether the issue appears duplicate, stale, blocked, or regression-prone
- the conflict type when a conflict exists
- the smallest resolution step instead of one bundled escalation

For daily runs, every output packet must also include a `Memory and decision hygiene` section with these subsections:

1. `Decisions made`
2. `Assumptions changed`
3. `Open questions`
4. `New risks`
5. `Tickets created`
6. `Tickets closed`

For Linda runs, the output packet must also include a `Repo health audit` section with these subsections:

1. `Current score`
2. `Previous score`
3. `Delta`
4. `Weakest area`
5. `Must-look findings`
6. `One-day work`
7. `Challenge for James`
8. `Memory update`

## Field Contract

| Field | Required behavior |
| --- | --- |
| Brief summary | Summarize the run in 2 to 5 sentences with the top operator takeaway first. |
| Findings | List the materially important observations only, each linked back to source records. |
| Recommended decisions | State the exact next decision or recommendation, not generic advice. |
| Blockers | State every active blocker, why it blocks progress, and what unblocks it. Use `None` when no blocker exists. |
| Approval requests | State the exact approval needed, consequence of approve, consequence of reject, and consequence of defer. Use `None` when no approval is needed. |
| Linked issues | Use real issue references or `Missing` when the contract requires an issue but none is available. Do not invent IDs. |
| Linked ideas | Use wiki links to related ideas when they exist, otherwise `None`. |
| Linked decisions | Use wiki links to governing or affected decisions when they exist, otherwise `None`. |
| Linked SOPs | Record canonical SOP names and the version source from `sop-library/sop-registry.md`. |
| Cost or risk impact | State the cost effect, risk effect, or `Unknown` when evidence is incomplete. Do not invent precision. |
| Dashboard cards created or updated | Name the dashboard tabs and card types the output should populate. |
| Agent status update | State the runtime status change, next action, confidence, and whether approval is needed. |
| Memory and decision hygiene | Required for daily runs. Summarize what must persist to the next day and link the durable records. |

## Output Skeleton

```md
## Brief summary
<2 to 5 sentences>

## Findings
- <finding with source link>
- <finding with source link>

## Recommended decisions
- <exact recommendation>

## Blockers
- <blocker and unblock action>

## Approval requests
- <exact approval request and consequences>

## Linked issues
- <issue reference or Missing>

## Linked ideas
- <wiki link or None>

## Linked decisions
- <wiki link or None>

## Linked SOPs
- <SOP name> v<version from registry or current registry row>

## Cost or risk impact
- <impact statement>

## Dashboard cards created or updated
- Tab: <Today | Needs Approval | Blocked Agents | Top Backlog | Recent Decisions | Metrics | Cost>
- Card type: <recommendation | blocker | approval | decision | risk | metric | backlog>

## Agent status update
- Status: <Active | Waiting | Blocked | Needs Approval | Complete | Failed>
- Blocked: <Yes | No>
- Needs approval: <Yes | No>
- Next action: <exact next step>
- Confidence: <High | Medium | Low | Unknown>

## Memory and decision hygiene

### Decisions made
- <decision, status, linked issue or decision, why it matters>

### Assumptions changed
- <old assumption -> new assumption, trigger, affected work, durable decision needed or None>

### Open questions
- <question, why it matters, owner, blocking effect>

### New risks
- <risk, affected work, severity, mitigation, approval need>

### Tickets created
- <ticket reference or Missing, why created, related record, next action>

### Tickets closed
- <ticket reference or Missing, closure reason, closure type, related updates>
```

## Dashboard Readiness Rules

An output packet is dashboard-ready only when:

- every finding links back to a governing record
- the recommendation is explicit
- the blocker state is explicit
- the approval state is explicit
- the destination tabs are named
- the status update is internally consistent with the runtime status file

## Approval Readiness Rules

An approval request is valid only when it includes:

- the exact human decision needed
- the reason the agent cannot proceed alone
- the impact of approve
- the impact of reject
- the impact of defer or schedule
- links to the governing records

## Failure Rules

If an agent cannot produce a compliant output packet:

1. mark the runtime status `Blocked` or `Needs Approval`, whichever is accurate
2. explain the exact missing input, decision, or permission
3. do not publish a confident recommendation

If a daily run cannot produce the memory-hygiene block:

1. mark the output incomplete
2. update the runtime status with the missing durable write path or missing source record
3. do not treat the run as complete until the memory update exists

## Related

- [[agent-dashboard-routing|Agent Dashboard Routing]]
- [[agent-approval-rules|Agent Approval Rules]]
- [[dashboard/common-spec|Common Dashboard Spec]]
- [[memory-and-decision-hygiene|Memory And Decision Hygiene]]

<!-- Reviewed and Approved on -->
