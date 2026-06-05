---
aliases:
  - "Decision 0002"
  - "DR 0002"
  - "Decision 002 - Agent Status Runtime Location And Contract"
  - "Agent Status Runtime Location And Contract"
---

# DR-0002: Agent Status Runtime Location And Contract

## Before You Edit This File

Frame of mind: This decision explains where live agent runtime status belongs. Edit it only if status storage, dashboard reading, or runtime authority changes.

Ask yourself before changing it:
- Is `source-of-truth/agent-status/` still the one live status location?
  Prompt: Name the exact files or records someone should open before trusting this answer.
- Does status describe current execution without replacing decisions, journals, or project records?
  Prompt: Name the exact files or records someone should open before trusting this answer.
- Would dashboard behavior break if this contract changed?
  Prompt: Describe what the human should see or do from the dashboard in one practical sentence.

Cross-check [[operating-model/agent-status-schema/README|Agent Status Schema]], [[source-of-truth/agent-status/index|Agent Status Index]], and [[common-spec|Common Dashboard Spec]].


## Metadata

| Field | Value |
| --- | --- |
| ID | DR-0002 |
| Title | Agent Status Runtime Location And Contract |
| Status | Accepted |
| Date | 2026-06-01 |
| Owner | Repo operating model owner |

## Related

| Field | Value |
| --- | --- |
| Related ideas | None yet |
| Related GitHub issues | None yet |
| Related projects | None yet |
| Related journals | None yet |
| Related source-of-truth docs | [[files-and-folders|Files And Folders]], [[github|GitHub]], [[dashboard-model]], [[agent-responsibilities]] |

## Context

The repo already defines `source-of-truth/` as the canonical durable knowledge root for initiative records and allows `sop-library/` as a specific top-level exception for reusable SOPs.

Step 5 adds a shared runtime status system for agents. Without an explicit decision, agents would have to guess whether runtime status belongs at the repo root, inside the operating model docs, inside project notes, or in another unapproved path.

That ambiguity would create inconsistent write locations, weak dashboard inputs, and avoidable conflicts with the existing file-and-folder contract.

## Decision

Use `source-of-truth/agent-status/` as the approved runtime status location for active agent status files.

The decision includes these rules:

1. `source-of-truth/agent-status/` is an approved durable folder for active runtime status records.
2. `source-of-truth/agent-status/index.md` is the summary index of active agent status.
3. Archived agent status files should move to `source-of-truth/agent-status/archive/`.
4. Each active agent should maintain one active status file for its current execution context.
5. Agent runtime status uses its own status vocabulary and does not replace the initiative lifecycle status vocabulary in [[lifecycle]].
6. Agent status files must link to governing issues, decisions, projects, journals, ideas, artifacts, and SOPs where those records exist.

## Why This Decision Was Made

Placing runtime status under `source-of-truth/` keeps it inside the approved durable knowledge root while still separating it from ideas, decisions, journals, projects, research, and artifacts.

It also gives the dashboard one predictable runtime location to read without expanding the list of top-level exceptions beyond the already-approved `sop-library/`.

## What Depends On This Decision

- the `operating-model/agent-status-schema/` documentation
- the `source-of-truth/agent-status/` folder contract
- dashboard views for active, blocked, and approval-waiting agents
- future automation that reads or validates runtime agent state
- any SOP workflow that publishes live agent execution status

## What This Decision Enables

- one consistent runtime status file model for agents
- dashboard triage based on durable status files
- explicit blocker and approval reporting across agents
- auditable links between runtime execution and durable records

## What This Decision Blocks

- ad hoc runtime status files at the repo root
- storing runtime agent status in `operating-model/`
- storing runtime agent status in `sop-library/`
- multiple incompatible status formats for active agents

## What Would Invalidate This Decision

This decision should be reviewed if the durable knowledge root moves away from `source-of-truth/`, if runtime status becomes authoritative in another system, or if a later accepted operating-model decision changes approved write-path governance.

## Review Trigger

Review when the source-of-truth root changes, dashboard automation requires a different canonical runtime store, or another Accepted decision changes file-location governance for live agent state.

## Consequences

The repo gains one additional approved folder under `source-of-truth/`, which slightly expands the durable knowledge contract.

In return, runtime agent state becomes predictable, linkable, and auditable without creating another top-level operating exception.

## Supersedes

- None

## Superseded By

- None

<!-- Reviewed and Approved on -->
