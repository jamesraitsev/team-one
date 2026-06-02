---
aliases:
  - Files And Folders
  - Source Of Truth Files
---

# Files And Folders

This file defines the durable knowledge source of truth for files and folders.

The canonical root is `source-of-truth/` at the repo root.

## Root Contract

| Field | Value |
| --- | --- |
| Source-of-truth root | `source-of-truth/` |
| Durable knowledge type | Markdown files in approved folders |
| Executable backlog reference | Defined separately in [[github|GitHub]]. |
| Shared operating library exception | `sop-library/` may exist at the repo root for reusable SOPs. It is not the initiative record store and must follow the SOP rules in `sop-library/`. |

## Approved Folders

Create durable files only inside these folders under `source-of-truth/`.

| Folder | Purpose | Required rule |
| --- | --- | --- |
| `agent-status/` | Active runtime agent status records | One active status file per active agent execution context, plus `index.md` for the active summary. |
| `ideas/` | Individual idea records | One markdown file per idea. |
| `decisions/` | Durable decision records | Each decision links back to one or more ideas. |
| `journals/` | Daily journals | Each journal links to related ideas, decisions, projects, and issues where possible. |
| `projects/` | Project and initiative docs | Each project links to its governing idea and related decisions. |
| `research/` | Supporting research and evidence | Each note links to the idea, project, or decision it informs. |
| `artifacts/` | Durable outputs and deliverables | Every artifact links back to an idea, issue, decision, journal, or project. |

Agents must not create scattered files outside these approved folders unless this contract is explicitly changed first.

Decision record rules, templates, and workflow documentation live outside this root in `operating-model/decision-record-system/`, but the actual durable decision records still belong in `source-of-truth/decisions/`.

## Approved Top-Level Operating Folders

The following top-level folder is also approved because it is a reusable operating-system asset rather than an initiative record store.

| Folder | Purpose | Required rule |
| --- | --- | --- |
| `sop-library/` | Shared standard operating procedures used across repos, projects, and initiatives | Keep SOPs categorized, keep `sop-registry.md` current, and do not write initiative-specific outputs here. |
| `operating-model/guardrails/` | Shared autonomy, safe-action, and approval-boundary rules used across the operating model | Keep approval boundaries explicit, keep autonomy tied to dashboard visibility, and do not store initiative-specific outputs here. |

## Link Rules

| Rule | Required behavior |
| --- | --- |
| Idea links | Use `[[idea-name|Idea Name]]`. |
| Alias links | If an idea has an alias, support links like `[[new-mobile-app-idea|New Mobile App Idea]]`. |
| Human-readable titles | Use stable, readable idea titles. |
| Duplicate prevention | Avoid duplicate idea names. If a duplicate exists, propose a clearer title before creating more links. |
| Rename safety | Do not rename existing idea files unless explicitly asked. |
| Related section | Add a `Related` section where links are useful. |
| Preferred references | Prefer Obsidian links over plain text for known ideas, decisions, projects, and journals. |

## Read And Write Rules

| Action | Required behavior |
| --- | --- |
| New agent status | Create or update files in `source-of-truth/agent-status/` only, following the runtime status contract. |
| Read before write | Read the linked idea, decision, project, journal, and artifact records before updating related context. |
| New idea | Create one markdown file in `source-of-truth/ideas/`. |
| New decision | Create or update a file in `source-of-truth/decisions/` and link back to the related idea. |
| New journal | Create a file in `source-of-truth/journals/` and link to relevant ideas, decisions, projects, and issues. |
| New project | Create a file in `source-of-truth/projects/` and link to the governing idea and issue. |
| New research | Create a file in `source-of-truth/research/` and link to what it informs. |
| New artifact | Create a file in `source-of-truth/artifacts/` and add a backlink immediately. |
| New SOP | Create or update files in `sop-library/`, then update `sop-library/sop-registry.md` in the same change. |

## Update Rules

| Situation | Required behavior |
| --- | --- |
| Decision changes | Update the existing decision record instead of silently replacing context. |
| Conflicting file records | Stop and report the conflict. |
| Missing folder | Stop and explain what is missing. |
| Missing backlink | Treat the file as incomplete until the backlink exists. |
| SOP contract changes | Update both the SOP file and `sop-library/sop-registry.md`, and create or update a decision record if the change is load-bearing. |

Durable decisions must not be scattered across random files, issue comments, or untracked notes when they belong in `source-of-truth/decisions/`.

## Dashboard Expectations

The dashboard should show:

| Field | Meaning |
| --- | --- |
| Active source of truth | `source-of-truth/` |
| Agent status location | `source-of-truth/agent-status/` |
| Idea backlog location | `source-of-truth/ideas/` |
| Decision record location | `source-of-truth/decisions/` |
| Journal location | `source-of-truth/journals/` |
| Obsidian link health | Whether required links resolve across ideas, decisions, projects, journals, and issues |
| Artifacts created without links | Queue of orphan artifacts |
| Conflicts needing review | Queue of conflicting file records |
| Active SOP library | `sop-library/` |
| SOP registry health | Whether every active SOP has a matching registry row and version |

## Related

- [[github|GitHub]]
- [[operating-model/decision-record-system/README|Decision Record System]]
- [[dr-0001-sop-library-location-and-governance|Decision 001 - SOP Library Location And Governance]]
- [[dr-0002-agent-status-runtime-location-and-contract|Decision 002 - Agent Status Runtime Location And Contract]]

<!-- Reviewed and Approved on -->
