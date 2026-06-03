---
aliases:
  - Agent Status Index Template
---

# Agent Status Index Template

## Before You Edit This File

Frame of mind: This template defines the summary of active statuses. Keep it a triage view, not a full status archive.

Ask yourself before changing it:
- Which agents are active, blocked, or waiting for approval?
  Prompt: Say whether this role may decide, recommend, draft, or only inform; then name the human handoff.
- What columns help a human decide what needs attention today?
  Prompt: Say whether this role may decide, recommend, draft, or only inform; then name the human handoff.
- Does every row link to the source status file?
  Prompt: Name the exact files or records someone should open before trusting this answer.

Cross-check [[source-of-truth/agent-status/index|Agent Status Index]], [[agent-status-file-contract|Agent Status File Contract]], and [[dashboard/common-spec|Common Dashboard Spec]].


Use this table format for `source-of-truth/agent-status/index.md`.

| Agent ID | Agent name | Status | Goal | Current task | Blocked | Needs approval | Confidence | Cost | Linked issue | Last updated |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| agent-001 | Example Agent | Active | Ship approved feature scope | Implement launch checklist fixes | No | No | Medium | Estimate: 12 hours | #123 | 2026-06-01T00:00:00Z |

Remove the example row when publishing a live index unless it represents a real active agent.

## Related

- [[agent-status-file-contract]]
- [[source-of-truth/agent-status/index|Agent Status Index]]

<!-- Reviewed and Approved on -->
