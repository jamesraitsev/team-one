---
aliases:
  - Agent Status Rules
---

# Agent Status Rules

## Before You Edit This File

Frame of mind: This file defines how active status changes over time. Keep it operational: create, update, block, request approval, close.

Ask yourself before changing it:
- When must an agent status file be created or updated?
  Prompt: Keep this to current state: what is happening, what is blocked, and the next action.
- What exact fields change when work is blocked or needs approval?
  Prompt: Say whether this role may decide, recommend, draft, or only inform; then name the human handoff.
- When is a status archived instead of left active?
  Prompt: Keep this to current state: what is happening, what is blocked, and the next action.

Cross-check [[agent-status-file-contract|Agent Status File Contract]], [[agent-approval-rules|Agent Approval Rules]], and [[dashboard/common-spec|Common Dashboard Spec]].


This file defines when agent status must be created, updated, linked, and closed.

Use it with:

- [[operating-model/agent-status-schema/README|Agent Status Schema]]
- [[lifecycle]]
- [[decision-gates]]
- [[agent-responsibilities]]
- [[source-of-truth/files-and-folders|Files And Folders]]
- [[source-of-truth/github|GitHub]]
- [[sop-usage-rules|SOP Usage Rules]]

## Where Status Must Be Written

Write runtime status files only in:

- `source-of-truth/agent-status/`

Agents must not write runtime status files:

- at the repo root
- inside `operating-model/`
- inside `sop-library/`
- inside unrelated initiative folders

## When Status Must Be Created

Create a status file when:

- an agent begins active work on an initiative, issue, or governed operating task
- an agent starts executing a current SOP for an active work item
- an agent takes ownership of a blocked item that still needs active coordination
- a human needs a durable runtime record of the agent's progress, blockers, or approval state

## When Status Must Be Updated

Update the existing status file when:

- the current task changes materially
- the lifecycle stage changes
- the runtime status changes
- a blocker appears, changes, or clears
- the required approval state changes
- the active SOP changes
- the linked issue or durable records change materially
- the last action or next action changes materially
- confidence changes
- known or estimated cost changes materially

## Required Fields

Every non-archived status file must include:

| Field | Rule |
| --- | --- |
| Agent ID | Required |
| Agent name | Required |
| Agent type | Required |
| Goal | Required for every active agent |
| Lifecycle stage | Required |
| Current task | Required for every active agent |
| Status | Required |
| Blocked | Required |
| Needs approval | Required |
| Last action | Required for every active agent |
| Next action | Required for every active agent |
| Confidence | Required |
| Cost actual | Required, use `Unknown` if not known |
| Cost estimate | Required, use `Unknown` if not known |
| Cost unit | Required |
| Linked GitHub issue | Required unless the GitHub contract is explicitly changed |
| Last updated | Required in ISO 8601 format |

## Optional Fields

These fields may be empty or `None` when not applicable:

- Current SOP
- Blocker reason when `Blocked` is `No`
- Approval request when `Needs approval` is `No`
- Approval needed from when `Needs approval` is `No`
- Confidence reason unless confidence is `Low` or `Unknown`
- Linked idea
- Linked decision record
- Linked journal entry
- Linked project
- Output artifacts

## Valid Status Values

Use only these runtime status values:

- `Active`
- `Waiting`
- `Blocked`
- `Needs Approval`
- `Complete`
- `Failed`
- `Archived`

These values describe the agent's runtime execution state. They do not replace the initiative ticket status vocabulary in [[lifecycle]].

## Valid Confidence Values

Use only these values:

- `High`
- `Medium`
- `Low`
- `Unknown`

## Blocker Rules

When an agent is blocked:

1. set `Status` to `Blocked`
2. set `Blocked` to `Yes`
3. provide a concrete `Blocker reason`
4. identify the exact missing decision, issue, approval, dependency, credential, or write-path rule when known
5. set `Next action` to the unblock action, not a vague continuation statement

## Approval Rules

When approval is required:

1. set `Status` to `Needs Approval` unless the work is also blocked for another reason
2. set `Needs approval` to `Yes`
3. state the exact decision needed in `Approval request`
4. name the required approver role or person in `Approval needed from`
5. keep `Next action` specific, for example `Review launch checklist and approve go or no-go`

## Cost Rules

| Rule | Required behavior |
| --- | --- |
| Actual cost known | Report it in `Cost actual`. |
| Actual cost unknown | Use `Unknown` in `Cost actual`. |
| Estimate known | Report it in `Cost estimate`. |
| Estimate unknown | Use `Unknown` in `Cost estimate`. |
| Precision | Never invent precise costs. |
| Unit | Always include `Cost unit`. |

## Link Rules

Use these patterns where the record exists:

| Record type | Preferred format |
| --- | --- |
| Idea | `[[idea-name|Idea Name]]` |
| Decision | `[[dr-0001-short-slug|Decision Title]]` |
| Journal | `[[2026-06-01-daily-journal|2026-06-01 Daily Journal]]` |
| Project | `[[project-name|Project Name]]` |
| SOP | `[[sop-name|SOP Name]] v1.0` |
| GitHub issue | `#123` or full issue URL |
| Artifact | Obsidian link or file link |

## Missing Link Rules

When a required link is missing:

1. do not invent the missing record
2. use `Missing` for the required field when the contract requires that record
3. set the status to `Blocked` if the missing record is a stop condition
4. explain the missing link in `Blocker reason`
5. set `Next action` to the concrete record-creation or approval step needed

## GitHub Placeholder Contract Rules

`source-of-truth/github.md` currently defines GitHub Issues as the executable backlog, but its live repo and `.env` values are placeholder-only.

Agents must follow these rules:

1. do not invent a real repo name, `.env` path, or token variable
2. do not claim that live GitHub access is configured unless the configured values are actually present
3. if a linked GitHub issue is required for active work and no real issue exists, stop and mark the status `Blocked`
4. if work can proceed locally but cannot sync to GitHub because config is placeholder-only, record that explicitly as the blocker

## Decision Conflict Rules

If an Accepted decision record conflicts with current work:

1. stop the dependent work
2. mark the status `Blocked`
3. link the conflicting decisions when known
4. request the exact human decision needed to resolve the conflict
5. do not silently choose one decision over another

## Close And Archive Rules

| Situation | Required behavior |
| --- | --- |
| Work complete | Set `Status` to `Complete`, update `Last action`, and set the next durable handoff action if any. |
| Work failed | Set `Status` to `Failed` and explain the terminal blocker or outcome. |
| Runtime record no longer active | Move the file to the archive path defined in [[agent-status-file-contract]] and set `Status` to `Archived`. |

## Stop Conditions

Agents must stop and report `Blocked` when:

- the source-of-truth contract is missing or unclear
- a required GitHub issue is missing
- a required SOP is missing
- a required decision record is missing
- two Accepted decisions conflict
- human approval is required
- secrets or credentials are needed but unavailable
- the agent cannot verify that the write path is approved

## Next Action Quality Rule

Agents must not use vague next actions such as:

- `continue working`
- `investigate more`
- `follow up later`

Every `Next action` should name the next concrete step that restores flow.

## Related

- [[agent-status-template]]
- [[agent-status-file-contract]]
- [[agent-status-dashboard-contract]]

<!-- Reviewed and Approved on -->
