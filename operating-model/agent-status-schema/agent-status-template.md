---
aliases:
  - Agent Status Template
---

# Agent Status Template

## Before You Edit This File

Frame of mind: This template should be easy to copy during a real run. It needs enough structure for the dashboard, without becoming paperwork.

Ask yourself before changing it:
- Can a user see current task, blocker, approval state, confidence, and next action quickly?
  Prompt: Say whether this role may decide, recommend, draft, or only inform; then name the human handoff.
- Are links to issues, SOPs, decisions, and artifacts built in?
  Prompt: Name the exact files or records someone should open before trusting this answer.
- Does it avoid duplicating journal or decision content?
  Prompt: If future work depends on the answer, write it as a decision record, not just a note.

Cross-check [[agent-status-file-contract|Agent Status File Contract]], [[agent-status-rules|Agent Status Rules]], and [[source-of-truth/agent-status/index|Agent Status Index]].


Use this template for one runtime status file per active agent in `source-of-truth/agent-status/`.

```md
---
agent_id: agent-001
agent_name: Replace with agent name
agent_type: Replace with agent type
status: Active
lifecycle_stage: Build
linked_github_issue: "#123"
last_updated: 2026-06-01T00:00:00Z
---

# Agent Status: Replace With Agent Name

## Identity

| Field | Value |
| --- | --- |
| Agent ID | agent-001 |
| Agent name | Replace with agent name |
| Agent type | Replace with agent type |

## Current State

| Field | Value |
| --- | --- |
| Goal | Replace with one clear goal |
| Lifecycle stage | Idea, Validation, Plan, Build, Launch, Learn, Scale, or Kill |
| Current task | Replace with one concrete current task |
| Current SOP | `[[sop-name|SOP Name]] v1.0` or `None` |
| Status | Active, Waiting, Blocked, Needs Approval, Complete, Failed, or Archived |
| Blocked | Yes or No |
| Blocker reason | Replace with blocker reason or `None` |
| Needs approval | Yes or No |
| Approval request | Replace with the exact decision needed or `None` |
| Approval needed from | Replace with role or person, or `None` |

## Execution

| Field | Value |
| --- | --- |
| Last action | Replace with the latest completed action |
| Next action | Replace with one concrete next action |
| Confidence | High, Medium, Low, or Unknown |
| Confidence reason | Replace with explanation or `None` |
| Cost actual | Replace with known actual cost or `Unknown` |
| Cost estimate | Replace with estimate or `Unknown` |
| Cost unit | USD, tokens, API calls, minutes, or unknown |

## Links

| Field | Value |
| --- | --- |
| Linked GitHub issue | `#123`, issue URL, or `Missing` |
| Linked idea | `[[idea-name|Idea Name]]` or `None` |
| Linked decision record | `[[dr-0001-short-slug|Decision Title]]` or `None` |
| Linked journal entry | `[[2026-06-01-daily-journal|2026-06-01 Daily Journal]]` or `None` |
| Linked project | `[[project-name|Project Name]]` or `None` |
| Output artifacts | `[[artifact-name|Artifact Name]]`, file links, or `None yet` |

## Update

| Field | Value |
| --- | --- |
| Last updated | 2026-06-01T00:00:00Z |
```

## Related

- [[agent-status-rules]]
- [[agent-status-file-contract]]
- [[source-of-truth/agent-status/index|Agent Status Index]]

<!-- Reviewed and Approved on -->
