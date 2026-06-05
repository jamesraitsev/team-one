---
aliases:
  - Agent Status File Contract
---

# Agent Status File Contract

## Before You Edit This File

Frame of mind: This is the field contract for active status files. Every dashboard and agent should be able to trust these fields.

Ask yourself before changing it:
- Which fields are required for every active run?
  Prompt: Answer in plain English first, then decide which file or decision record should hold the final version.
- Which links prove the status is grounded in real records?
  Prompt: Name the exact files or records someone should open before trusting this answer.
- What fields must not contain decisions that belong elsewhere?
  Prompt: If future work depends on the answer, write it as a decision record, not just a note.

Cross-check [[agent-status-rules|Agent Status Rules]], [[agent-status-template|Agent Status Template]], and [[common-spec|Common Dashboard Spec]].


This file defines the runtime file model for agent status records.

## One Status File Per Active Agent

Each active agent should have exactly one active runtime status file for its current execution context.

If the same agent starts a different active execution context, create a separate status file only when the work is truly independent and needs independent tracking.

## Approved File Path Format

Use these paths:

- Active status files: `source-of-truth/agent-status/`
- Archived status files: `source-of-truth/agent-status/archive/`
- Runtime index: `source-of-truth/agent-status/index.md`

## File Naming Rule

Use stable, readable filenames:

`agent-<id>-<short-slug>.md`

Examples:

- `agent-001-feature-delivery.md`
- `agent-qa-visual-review.md`

Do not rename active files casually because linked references may depend on them.

## Required Frontmatter

Every active status file must include:

```yaml
---
agent_id: agent-001
agent_name: Example Agent
agent_type: delivery
status: Active
lifecycle_stage: Build
linked_github_issue: "#123"
last_updated: 2026-06-01T00:00:00Z
---
```

## Required Body Sections

Every active status file must include these sections:

1. `Identity`
2. `Current State`
3. `Execution`
4. `Links`
5. `Update`

## Update Rule

When a status file changes:

1. update the file in place
2. update `Last updated` in ISO 8601 format
3. keep the file name stable unless the human explicitly requests a rename
4. update the runtime index when summary fields change materially

## Link Rule

Every status file should link to its governing records where they exist:

- GitHub issue
- idea
- decision
- journal
- project
- artifacts
- SOP

Use wiki links where possible and normal issue references or URLs where needed.

## Archive Rule

When a status record is no longer active:

1. set `Status` to `Archived` in the final update
2. move the file to `source-of-truth/agent-status/archive/`
3. remove it from the active index
4. preserve links and timestamps

## Index Rule

`source-of-truth/agent-status/index.md` should summarize active runtime status records only.

Archived records should not remain in the active index.

## Related

- [[agent-status-template]]
- [[agent-status-rules]]
- [[source-of-truth/agent-status/index|Agent Status Index]]

<!-- Reviewed and Approved on -->
