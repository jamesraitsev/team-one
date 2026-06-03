---
aliases:
  - Decision Record Index Template
  - DR Index Template
---

# Decision Record Index Template

## Before You Edit This File

Frame of mind: This template defines how the decision index stays scannable. It should show status and relationships without repeating full decision text.

Ask yourself before changing it:
- Which fields help someone find the governing decision fast?
  Prompt: If future work depends on the answer, write it as a decision record, not just a note.
- Does the index reveal supersession, dependencies, and review triggers?
  Prompt: Answer in plain English first, then decide which file or decision record should hold the final version.
- Is it easy to update after every decision change?
  Prompt: If future work depends on the answer, write it as a decision record, not just a note.

Cross-check [[source-of-truth/decisions/index|Decision Index]], [[decision-record-rules|Decision Record Rules]], and [[decision-record-naming|Decision Record Naming]].


Use this table format in `source-of-truth/decisions/index.md`.

```md
| ID | Title | Status | Date | Related idea | Related project | Depends on | Supersedes | Superseded by | Review trigger |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| DR-0001 | [[dr-0001-short-slug|Decision Title]] | Accepted | YYYY-MM-DD | [[idea-name|Idea Name]] | [[project-name|Project Name]] | [[files-and-folders|Files And Folders]] | None | None | Review when source-of-truth root changes |
```

## Table Rules

- keep one row per decision record
- use the stable decision ID
- prefer wiki links in the `Title`, `Related idea`, `Related project`, and `Depends on` columns
- update the index whenever a decision record is created or changed
- keep supersession state visible in the table

## Related

- [[operating-model/decision-record-system/README|Decision Record System]]
- [[source-of-truth/decisions/index|Decision Index]]

<!-- Reviewed and Approved on -->
