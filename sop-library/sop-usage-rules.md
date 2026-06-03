---
aliases:
  - SOP Usage Rules
  - SOP Rules
---

# SOP Usage Rules

## Before You Edit This File

Frame of mind: This file defines how SOPs are actually used. It should tell agents how to pick, run, stop, and report a procedure.

Ask yourself before changing it:
- When is an SOP required, optional, or prohibited?
  Prompt: State whether this belongs in a reusable SOP, an agent workflow, or a one-time record.
- What inputs and outputs must be linked before execution is valid?
  Prompt: Name the exact files or records someone should open before trusting this answer.
- What stop conditions prevent unsafe or stale SOP use?
  Prompt: State whether this belongs in a reusable SOP, an agent workflow, or a one-time record.

Cross-check [[sop-registry|SOP Registry]], [[agent-workflows|Agent Workflows]], and [[source-of-truth/files-and-folders|Files And Folders]].


This file defines how agents select, run, link, and report SOP execution.

This note is written to stay Obsidian-friendly:

- prefer wiki links for ideas, decisions, projects, journals, and SOPs
- use note titles and aliases instead of fragile relative file paths where possible
- keep the registry, decision index, and related notes linkable as standalone notes

## Resolution Order

When multiple SOP locations are configured, resolve in this order:

1. Local override folder if configured and readable
2. Repo-local `sop-library/`
3. Shared SOP repo and base folder

If two SOPs with the same name disagree, stop and escalate the conflict instead of mixing steps.

## Execution Rules

| Rule | Required behavior |
| --- | --- |
| Read before run | Read the SOP, linked decision records, and linked source-of-truth records before changing execution state. |
| Record the active SOP | Add the SOP name and version to the related GitHub issue, decision, journal, or project note. |
| Record the active SOP in agent status | If an active agent status file exists, record the SOP name and version there as well. |
| Keep one current step | Expose exactly one active step for the SOP execution record. |
| Respect approved write paths | Write outputs only to approved durable folders in `source-of-truth/` or to the related issue. |
| Update the registry on change | Any SOP edit requires a same-change update to `sop-registry.md`. |
| Stop on rule conflict | If the SOP conflicts with an Accepted decision record or documented source-of-truth rule, stop and report the conflict. |

## Linking Rules

Use these link patterns where the record exists:

| Record type | Preferred link |
| --- | --- |
| Idea | `[[idea-name|Idea Name]]` |
| Decision | `[[decision-name|Decision Name]]` |
| Journal | `[[2026-06-01-daily-journal|2026-06-01 Daily Journal]]` |
| Project | `[[project-name|Project Name]]` |
| SOP | `[[feature-delivery|Feature Delivery]]` |
| GitHub issue | `#123` or full issue URL |

If an SOP depends on a record that does not exist yet, create the missing durable record in the approved folder or stop if the active source-of-truth contract blocks creation.

## Dashboard Contract

Every active SOP execution should publish these fields:

| Field | Meaning |
| --- | --- |
| Active SOP | Canonical SOP name |
| Agent using the SOP | Agent identity or automation name |
| Agent status file | Runtime status record in `source-of-truth/agent-status/` when active work is being tracked there |
| Related issue | GitHub issue number or URL |
| Related idea | Obsidian idea link when available |
| Current step | The step currently in progress |
| Blocked step | The blocked step, if any |
| Human approval needed | The next approval event or `none` |
| Last completed step | Most recent finished step |
| Output artifact | Latest durable output path or issue update |
| SOP version used | Version string recorded for this run |

## Versioning Rule

Use semantic intent without heavy release mechanics:

- `major` when the approval boundary, required outputs, or stop conditions change
- `minor` when steps or quality checks expand without breaking prior usage
- `patch` when wording, examples, or non-behavioral details are corrected

Record the version in the SOP file header or intro when version tracking becomes operationalized in tooling. Until then, the registry version is the source of truth.

## Cross-Repo Use

When the active SOP comes from another repo:

1. Record the source repo, branch, and path.
2. Confirm local write paths still follow [[files-and-folders|Files And Folders]].
3. Do not copy the SOP locally unless a local override is intended.

## Stop Conditions

Stop and escalate when:

- the SOP requires a write outside approved paths
- the linked issue conflicts with durable records
- a required approval is missing
- the SOP depends on an undocumented load-bearing decision
- two configured SOP sources provide conflicting active procedures

## Related

- [[sop-library/README|SOP Library]]
- [[sop-registry|SOP Registry]]
- [[sop-config.example|SOP Config Example]]
- [[source-of-truth/files-and-folders|Files And Folders]]
- [[source-of-truth/github|GitHub]]

<!-- Reviewed and Approved on -->
