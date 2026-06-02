---
aliases:
  - Decision Record Index Template
  - DR Index Template
---

# Decision Record Index Template

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
