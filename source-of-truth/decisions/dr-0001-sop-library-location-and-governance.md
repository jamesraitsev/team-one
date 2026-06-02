---
aliases:
  - "Decision 0001"
  - "DR 0001"
  - "Decision 001 - SOP Library Location And Governance"
  - "SOP Library Location And Governance"
---

# DR-0001: SOP Library Location And Governance

## Metadata

| Field | Value |
| --- | --- |
| ID | DR-0001 |
| Title | SOP Library Location And Governance |
| Status | Accepted |
| Date | 2026-06-01 |
| Owner | Repo operating model owner |

## Related

| Field | Value |
| --- | --- |
| Related ideas | [[sop-library-system|SOP Library System]] |
| Related GitHub issues | None yet |
| Related projects | None yet |
| Related journals | None yet |
| Related source-of-truth docs | [[files-and-folders|Files And Folders]], [[github|GitHub]], [[lifecycle]], [[decision-gates]] |

## Context

The repo already defines `source-of-truth/` as the canonical durable knowledge root for initiative records such as ideas, decisions, journals, projects, research, and artifacts.

Step 4 introduces a reusable SOP system that must be shared across repos, link back to issues and durable records, and remain distinct from initiative-specific knowledge.

Without an explicit decision, creating a top-level SOP library would conflict with the current file-and-folder contract and leave agents guessing where SOP changes belong.

## Decision

Use a top-level `sop-library/` folder as the reusable SOP library for this repo.

The decision includes these rules:

1. `source-of-truth/` remains the canonical durable knowledge root for initiative records.
2. `sop-library/` is an approved top-level operating folder for reusable SOPs only.
3. Outputs created while following an SOP must still be written only to approved durable folders under `source-of-truth/` or to the related GitHub issue.
4. Every SOP change must update `sop-library/sop-registry.md` in the same change.
5. GitHub issues using an SOP must record the SOP name, version, and current step.
6. If an SOP conflicts with an Accepted decision record, execution must stop and escalate the conflict.

## Why This Decision Was Made

This keeps reusable procedures separate from initiative history while preserving one clear source of truth for each kind of durable record.

It also supports the required storage modes:

- repo-local SOPs in this repo
- shared SOPs stored in another repo
- configured local override folders

## What Depends On This Decision

- `sop-library/` structure and category model
- SOP registry maintenance
- GitHub issue linking for active SOPs
- dashboard display of SOP execution fields
- future automation that resolves SOP location precedence

## What This Decision Enables

- one reusable SOP library with category folders
- SDLC as one category instead of the whole system
- cross-repo sharing without moving initiative records
- consistent SOP execution reporting

## What This Decision Blocks

- storing initiative-specific artifacts in `sop-library/`
- adding new SOP locations without documenting precedence
- silently overriding an Accepted decision with an SOP

## What Would Invalidate This Decision

This decision should be reviewed if the repo moves to a different durable-knowledge root, replaces GitHub Issues as the executable backlog, or centralizes SOPs in an external system that becomes the authoritative source.

## Review Trigger

Review when the source-of-truth root changes, a shared SOP repo becomes authoritative, or another Accepted decision changes write-path governance.

## Consequences

The repo now has one intentional durable-doc exception outside `source-of-truth/`, which increases the need for cross-link discipline.

In return, reusable operating procedures stay cleanly separated from initiative records and can be mirrored or reused across repos.

## Supersedes

- None

## Superseded By

- None

<!-- Reviewed and Approved on -->
