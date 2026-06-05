---
aliases:
  - Agent Status Dashboard Contract
---

# Agent Status Dashboard Contract

## Before You Edit This File

Frame of mind: This file tells the dashboard how to read agent status. Be precise so the dashboard never invents state.

Ask yourself before changing it:
- Which status fields may appear on cards and queues?
  Prompt: Describe what the human should see or do from the dashboard in one practical sentence.
- How should stale, missing, blocked, and approval-needed status be shown?
  Prompt: Say whether this role may decide, recommend, draft, or only inform; then name the human handoff.
- What conflicts should block dashboard actions?
  Prompt: Describe what the human should see or do from the dashboard in one practical sentence.

Cross-check [[common-spec|Common Dashboard Spec]], [[common-spec|Common Dashboard Spec]], and [[agent-status-file-contract|Agent Status File Contract]].


This file defines how the dashboard should render agent runtime status from `source-of-truth/agent-status/`.

Use it with:

- [[dashboard-model]]
- [[operating-model/agent-status-schema/README|Agent Status Schema]]
- [[agent-status-rules]]
- [[source-of-truth/agent-status/index|Agent Status Index]]

## Dashboard Views

| View | Required behavior |
| --- | --- |
| Active agents | Show agents with `Status` of `Active` or `Waiting`. |
| Blocked agents | Show agents with `Status` of `Blocked`, grouped by blocker type when possible. |
| Agents needing approval | Show agents with `Status` of `Needs Approval` or `Needs approval` of `Yes`. |
| Agents with low confidence | Show agents with `Confidence` of `Low` or `Unknown`. |
| Agents with rising cost | Show agents whose reported actual or estimated cost is increasing materially over recent updates. |
| Agents without linked issues | Show agents whose `Linked GitHub issue` is `Missing` or `None`. |
| Agents without current SOPs | Show agents executing repeated governed work without a recorded SOP when an SOP should apply. |
| Agents blocked by missing decisions | Show agents whose blocker reason references a missing or conflicting decision record. |
| Agents blocked by source-of-truth conflicts | Show agents blocked by conflicting durable records, missing approved folders, or write-path uncertainty. |
| Agents writing outside approved paths | Show any reported output path outside `source-of-truth/` or `sop-library/` rules as a critical exception. |

## Card Fields

Each agent status card should show:

- Agent ID
- Agent name
- Agent type
- Status
- Lifecycle stage
- Goal
- Current task
- Current SOP
- Blocked
- Needs approval
- Confidence
- Cost summary
- Linked GitHub issue
- Last updated
- Recommended human action

## Recommended Human Action Rule

Every surfaced record should produce exactly one recommended human action.

| Situation | Recommended human action |
| --- | --- |
| Missing issue | Create or link the required GitHub issue. |
| Missing decision | Create, review, or approve the required decision record. |
| Approval pending | Approve or reject the exact request in the status file. |
| Source-of-truth conflict | Resolve the file or decision conflict before execution resumes. |
| Low confidence | Review assumptions, evidence, or scope before more work proceeds. |
| Rising cost | Confirm whether to continue investing, re-scope, or stop. |

## Freshness Rule

The dashboard should show `Last updated` exactly as recorded in the status file and should flag stale records when updates fall outside the expected cadence for the work.

## Severity Guidance

| Condition | Suggested severity |
| --- | --- |
| Missing issue on active work | `warning` |
| Missing decision or conflicting Accepted decisions | `critical` |
| Missing approved write path | `critical` |
| Needs approval | `warning` |
| Low confidence | `warning` |
| Rising cost without approved exception | `warning` |
| Unknown cost and low confidence together | `critical` |

## Data Source Rule

Use the runtime status files as the detailed source and `source-of-truth/agent-status/index.md` as the summary index.

Do not infer agent runtime state only from:

- chat history
- issue comments
- commit history
- unlinked artifacts

## Related

- [[agent-status-file-contract]]
- [[agent-status-index-template]]
- [[source-of-truth/agent-status/index|Agent Status Index]]

<!-- Reviewed and Approved on -->
