---
aliases:
  - SOP Categories
  - Categories
---

# SOP Categories

## Before You Edit This File

Frame of mind: This file defines SOP category boundaries. Use it to prevent every procedure from becoming a vague general operations note.

Ask yourself before changing it:
- Which category owns this kind of work?
  Prompt: Answer in plain English first, then decide which file or decision record should hold the final version.
- Where do product, growth, governance, operations, and SDLC procedures overlap?
  Prompt: State whether this belongs in a reusable SOP, an agent workflow, or a one-time record.
- Is any category missing an owner or clear purpose?
  Prompt: Name the accountable person or role; if unclear, write `Unassigned` rather than guessing.

Cross-check [[sop-library/README|SOP Library]], [[sop-registry|SOP Registry]], and all category folders.


This file defines the category model for the reusable SOP library.

## Category Rules

| Rule | Meaning |
| --- | --- |
| One primary category per SOP | Each SOP belongs to one primary folder even if it touches multiple functions. |
| Reuse over duplication | Link to a related SOP instead of cloning similar steps into another category. |
| SDLC is a category | Software delivery procedures are only one part of the operating system. |
| Governance stays cross-cutting | Governance SOPs define review and control patterns that other categories must respect. |

## Categories

| Category | Folder | Use it for | Example SOPs |
| --- | --- | --- | --- |
| SDLC | `sop-library/sdlc/` | Planning, building, testing, reviewing, releasing, and securing shipped work | `[[feature-delivery|Feature Delivery]]`, `[[testing|Testing]]`, `[[security-review|Security Review]]` |
| Product | `sop-library/product/` | Intake, validation framing, prioritization, and backlog quality | `[[idea-triage|Idea Triage]]`, `[[validation-planning|Validation Planning]]`, `[[backlog-grooming|Backlog Grooming]]` |
| Growth | `sop-library/growth/` | Launch preparation, copy quality, and content release controls | `[[launch-planning|Launch Planning]]`, `[[copy-review|Copy Review]]`, `[[content-approval|Content Approval]]` |
| Operations | `sop-library/operations/` | Recurring operational cadence and evidence capture | `[[daily-journal|Daily Journal]]`, `[[weekly-review|Weekly Review]]`, `[[dashboard-review|Dashboard Review]]` |
| Governance | `sop-library/governance/` | Decision hygiene, permissions, repo-health auditing, and source-of-truth enforcement | `[[decision-record-review|Decision Record Review]]`, `[[source-of-truth-check|Source Of Truth Check]]`, `[[agent-permission-review|Agent Permission Review]]`, `[[repo-health-audit|Repo Health Audit]]` |

## Category Selection Heuristic

Use this order when choosing a category:

1. Put the SOP where the primary operator will look first.
2. Keep the lifecycle or operating outcome more important than the tactic.
3. If the SOP mostly checks compliance with existing rules, place it in `governance/`.

## Related

- [[sop-library/README|SOP Library]]
- [[sop-registry|SOP Registry]]
- [[sop-template|SOP Template]]
- [[sop-usage-rules|SOP Usage Rules]]

<!-- Reviewed and Approved on -->
