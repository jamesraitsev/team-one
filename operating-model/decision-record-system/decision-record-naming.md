---
aliases:
  - Decision Record Naming
  - DR Naming
---

# Decision Record Naming

This file defines stable naming rules for decision records.

## Naming Rules

| Rule | Required behavior |
| --- | --- |
| Stable numeric IDs | Use stable IDs such as `DR-0001`, `DR-0002`, and `DR-0003`. |
| Filename format | Use filenames like `DR-0001-source-of-truth.md`. |
| No ID reuse | Never reuse a retired, rejected, deprecated, or superseded ID. |
| No renumbering | Do not renumber existing records after creation. |
| Rename safety | Do not rename existing records unless explicitly asked. |
| Human-readable titles | Put the readable decision title inside the file, even when the filename is short. |

## Obsidian-Friendly Guidance

Use filenames that are stable and readable enough to support wiki linking without constant cleanup.

Preferred pattern:

`DR-0001-short-slug.md`

Recommended file title pattern:

`# DR-0001: Human Readable Decision Title`

Recommended aliases:

- `Decision 0001`
- `DR 0001`
- the plain-English decision title if it is distinctive

## ID Allocation

When creating a new decision:

1. inspect `source-of-truth/decisions/index.md`
2. find the highest existing ID
3. increment it by one
4. create the new file
5. add the row to the index immediately

## Related

- [[decision-record-template|Decision Record Template]]
- [[decision-record-index-template|Decision Record Index Template]]
- [[source-of-truth/decisions/index|Decision Index]]

<!-- Reviewed and Approved on -->
