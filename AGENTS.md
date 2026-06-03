## Before You Edit This File

Frame of mind: This is the repo's house rule sheet. Read it as the editor's contract: what kind of repo this is, which layers are authoritative, and how future changes should be validated.

Ask yourself before changing it:
- Does this guidance help a non-technical editor avoid breaking the operating model?
  Prompt: Answer in plain English first, then decide which file or decision record should hold the final version.
- Does it tell agents where they may write, and where they must only read?
  Prompt: Answer in plain English first, then decide which file or decision record should hold the final version.
- Does it avoid inventing live GitHub, dashboard, or implementation state?
  Prompt: Mark the item as live now, planned later, or out of scope; do not leave it implied.

Cross-check [[lookherefirst|Look Here First]], [[question|question.md]], and [[source-of-truth/files-and-folders|Files And Folders]].

## Repo Guidance

This repository is a documentation-first operating model. Treat Markdown as the product.

## File Types

- Prefer editing existing `.md` files instead of creating new structure unless the change clearly needs a new note.
- Keep notes Obsidian-friendly with wiki links like `[[note-name|Note Name]]` where the target exists.
- Maintain frontmatter aliases and `## Related` sections on durable notes.

## Consistency Rules

- When a rule changes, update every governing note that defines or depends on that rule.
- Keep agent docs synchronized across roster, schedules, workflows, routing, and approval boundaries when adding or changing an agent.
- Keep SOP references aligned with `sop-library/sop-registry.md`.
- Do not invent live GitHub configuration, issue IDs, or secret paths when the docs are still placeholder-only.

## Source Of Truth

- Treat `source-of-truth/` as the durable knowledge layer.
- Treat `source-of-truth/memory/` as durable recurring agent memory, not as a replacement for decisions or journals.
- Treat `sop-library/` as the reusable procedure layer.
- Treat `operating-model/` and `dashboard/` as governing specification layers.

## Core Agents

- `Backlog Groomer` is part of the baseline agent roster.
- Use the definitions in `agents/agent-roster.md`, `agents/agent-schedules.md`, `agents/agent-workflows.md`, `agents/agent-dashboard-routing.md`, and `agents/agent-approval-rules.md` as the source of truth for its behavior.

## Validation

- After documentation changes, verify wiki links still resolve and that important hub notes still interlink cleanly.
