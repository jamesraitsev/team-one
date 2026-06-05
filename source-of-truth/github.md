---
aliases:
  - GitHub
  - Source Of Truth GitHub
---

# GitHub

## Before You Edit This File

Frame of mind: This file defines GitHub as an execution surface only when real configuration exists. Until then, treat GitHub as intended infrastructure, not live operational truth.

Ask yourself before changing it:
- Is GitHub required now, optional now, or future-only?
  Prompt: Mark the item as live now, planned later, or out of scope; do not leave it implied.
- Are repo, auth, issue labels, and sync behavior filled with real values rather than placeholders?
  Prompt: Answer with the current fallback first: file-only, GitHub-linked, or GitHub-required.
- What should agents do when an issue reference is missing?
  Prompt: Answer with the current fallback first: file-only, GitHub-linked, or GitHub-required.

Cross-check [[source-of-truth/files-and-folders|Files And Folders]], [[2. dashboard/README|Dashboard]], and [[agent-approval-rules|Agent Approval Rules]].


This file defines the GitHub backlog and local secret configuration for the source-of-truth system.

GitHub Issues are the executable backlog unless you explicitly change that rule later.

## Local Configuration

Fill in these values for the live setup.

| Field | Set this to |
| --- | --- |
| `backlog_source` | `github-issues` |
| `github_repo` | `owner/repo` |
| `github_issue_location` | `repository issues` |
| `env_file_path` | `/absolute/path/to/.env` or a repo-relative local path such as `.env.local` |
| `token_env_var_name` | Existing local variable name only, for example `GITHUB_TOKEN` or `GH_TOKEN` |

## Secret Rules

| Rule | Required behavior |
| --- | --- |
| Token source | Load GitHub tokens from the `.env` file at `env_file_path`. |
| No secret exposure | Do not print, inspect, copy, summarize, or store real token values. |
| No committed secrets | `.env` files are local secrets and must not be committed. |
| Variable naming | Do not assume the token variable name unless it already exists. |
| Presence checks | Agents may verify that the configured env var exists, but must never expose its value. |

## Issue Contract

| Field | Required behavior |
| --- | --- |
| Stage | Use the lifecycle stage labels from [[lifecycle]]. |
| Status | Use the shared status vocabulary from [[lifecycle]]. |
| Related agent status | Include the active runtime status file when one exists, for example `[[source-of-truth/agent-status/agent-001-feature-delivery|Agent Status]]`. |
| Related idea | Include an Obsidian link such as `[[new-mobile-app-idea|New Mobile App Idea]]`. |
| Related decision | Include Obsidian links to related decision records. |
| Related project | Include Obsidian links to related project docs. |
| Related SOP | Include the active SOP link and version, for example `[[feature-delivery|Feature Delivery]] v1.0`. |
| Related issue links | Include normal GitHub issue references or URLs when available. |
| Artifact links | Include links to durable files created under `source-of-truth/`. |

Recommended issue block:

```md
## Related
- Agent status: [[source-of-truth/agent-status/agent-001-feature-delivery|Agent Status]]
- Idea: [[new-mobile-app-idea|New Mobile App Idea]]
- Decision: [[decision-001-pilot-scope|Decision 001 - Pilot Scope]]
- Project: [[mobile-pilot-project|Mobile Pilot Project]]
- SOP: [[feature-delivery|Feature Delivery]] v1.0
- Parent issue: #123
```

## Sync Rules

| Event | Required behavior |
| --- | --- |
| New issue starts execution | Confirm the linked durable records exist first. |
| Agent status changes materially | Update the issue with the latest blocker, approval, or artifact links when they matter to execution. |
| New durable record is created | Update the issue with the relevant link if an issue exists. |
| Decision is approved or changed | Update both the issue and the decision record. |
| Journal or artifact is created | Link it from the issue when it matters to execution. |
| SOP is started or changed | Update the issue with the active SOP, current step, and SOP version used. |
| Issue is closed | Confirm durable docs reflect the final outcome. |

## Stop Conditions

Stop and explain the problem when:

- `github_repo` is not defined
- `env_file_path` is not defined
- the `.env` file is missing or unreachable
- the configured token env var is required but missing
- issue state conflicts with linked durable files

## Dashboard Expectations

The dashboard should show:

| Field | Meaning |
| --- | --- |
| Connected repo | The value of `github_repo` |
| Backlog source | `github-issues` unless changed explicitly |
| Last successful sync | Most recent confirmed alignment between issues and durable files |
| Conflicts needing review | Open issue-to-file mismatches |
| Sources unavailable or misconfigured | Missing repo, missing `.env`, missing token env var, or missing issue access |
| Active SOP by issue | Current SOP and version attached to each executing issue |

## Related

- [[files-and-folders|Files And Folders]]
- [[lifecycle]]
- [[dr-0001-sop-library-location-and-governance|Decision 001 - SOP Library Location And Governance]]

<!-- Reviewed and Approved on -->
