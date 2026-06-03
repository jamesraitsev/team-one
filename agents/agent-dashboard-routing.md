---
aliases:
  - Scheduled Agent Dashboard Routing
  - Agent Dashboard Routing
---

# Agent Dashboard Routing

## Before You Edit This File

Frame of mind: This file defines where agent outputs appear. Routing should help a human decide, not flood the dashboard.

Ask yourself before changing it:
- Which dashboard tab or queue should receive this output?
  Prompt: Describe what the human should see or do from the dashboard in one practical sentence.
- Is the item a decision, blocker, metric, approval, cost issue, or status update?
  Prompt: Say whether this role may decide, recommend, draft, or only inform; then name the human handoff.
- What source links must travel with the routed item?
  Prompt: Name the exact files or records someone should open before trusting this answer.

Cross-check [[dashboard/common-spec|Common Dashboard Spec]], [[dashboard/common-spec|Common Dashboard Spec]], and [[dashboard/common-spec|Common Dashboard Spec]].


This file defines where each agent writes dashboard output.

Use it with [[agent-output-contracts|Agent Output Contracts]], [[agent-workflows|Agent Workflows]], and [[dashboard/common-spec|Common Dashboard Spec]].

## Routing Table

| Agent name | Today | Needs approval | Blocked agents | Top backlog | Recent decisions | Metrics | Cost |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Daily Chief of Staff Brief | Primary | Secondary | Secondary | No | Secondary | Secondary | No |
| Backlog Groomer | Secondary | Secondary | Secondary | Primary | No | No | No |
| Product Reviewer | Primary | Secondary | No | Secondary | Secondary | Secondary | No |
| CTO Reviewer | Primary | Secondary | Primary | No | Secondary | No | No |
| Growth Reviewer | Primary | Primary when messaging or launch approval is needed | No | No | No | Primary | No |
| Weekly CFO Cost and Progress Reviewer | Primary | Secondary for spend decisions | No | No | No | Secondary | Primary |
| QA / Release Reviewer | Primary | Primary | Primary | No | No | No | No |
| Security / Secrets Reviewer | Primary | Primary | Primary | No | Secondary when decisions are affected | No | No |
| Customer Signal Reviewer | Primary | Secondary when signal response needs approval | No | Secondary | No | Primary | No |
| Linda | Primary | Secondary when cleanup requires structural approval | Primary when ambiguity, overlap, or sequencing blocks trust | No | Secondary when findings imply a decision record | No | No |
| Source-of-Truth Steward | Primary | Secondary when record repair needs approval | Primary | No | Secondary when decision hygiene is affected | No | No |
| Decision Record Steward | Secondary | Primary when decision review is required | Secondary when conflicts block work | No | Primary | No | No |

## Tab Rules

### Today

Use Today when the output changes what the human should look at first today.

Typical card types:

- recommendation
- risk
- blocker
- approval priority slice

### Needs Approval

Use Needs Approval when the agent reaches a decision the human must make before the dependent work can continue.

Typical card types:

- approval
- revision request
- approval follow-up

### Blocked Agents

Use Blocked Agents when the agent run identifies active work that cannot continue and names a concrete unblock action.

Typical card types:

- blocker
- approval-blocked item
- missing-decision conflict

### Top Backlog

Use Top Backlog when the output changes the ranked near-term work list.

Typical card types:

- ranked backlog item
- backlog recommendation
- dependency warning

### Recent Decisions

Use Recent Decisions when the output changes decision status, highlights a decision conflict, or recommends a new or updated durable decision.

Typical card types:

- decision summary
- proposed decision
- conflict alert

### Metrics

Use Metrics when the output changes interpretation of stage-aware performance, customer, launch, or delivery signals.

Typical card types:

- metric
- trend risk
- experiment recommendation

### Cost

Use Cost when the output changes cost, ROI, spend posture, or cost-risk interpretation.

Typical card types:

- cost summary
- ROI recommendation
- spend approval request

## Routing Quality Rules

| Rule | Required behavior |
| --- | --- |
| Link discipline | Every dashboard card must link back to the status file and the durable source records that support it. |
| Single recommendation | Every card should expose one recommended next action. |
| No invented state | Do not create dashboard state unsupported by source records. |
| Conflict safety | If source records conflict, route the conflict as a blocker and disable unsafe write actions. |
| Approval discipline | Approval cards must also exist in the approval queue flow, not only in a summary tab. |

## Related

- [[agent-output-contracts|Agent Output Contracts]]
- [[agent-approval-rules|Agent Approval Rules]]
- [[dashboard/common-spec|Common Dashboard Spec]]

<!-- Reviewed and Approved on -->
