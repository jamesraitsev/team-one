---
aliases:
  - Decision Index
  - Decision Records Index
---

# Decision Index

## Before You Edit This File

Frame of mind: This is the map of accepted decisions. It should make durable authority easy to find without reading every note.

Ask yourself before changing it:
- Is every accepted or superseded decision listed with the right status?
  Prompt: If future work depends on the answer, write it as a decision record, not just a note.
- Do dependencies, supersession, and review triggers point to the right records?
  Prompt: Name the exact files or records someone should open before trusting this answer.
- Would a future agent know which decision governs a conflict?
  Prompt: Mark the item as live now, planned later, or out of scope; do not leave it implied.

Cross-check [[operating-model/decision-record-system/README|Decision Record System]], [[decision-record-rules|Decision Record Rules]], and every DR file listed here.


This index is the human-readable summary of durable decision records stored under `source-of-truth/decisions/`.

| ID | Title | Status | Date | Related idea | Related project | Depends on | Supersedes | Superseded by | Review trigger |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| DR-0001 | [[dr-0001-sop-library-location-and-governance|SOP Library Location And Governance]] | Accepted | 2026-06-01 | [[sop-library-system|SOP Library System]] | None | [[files-and-folders|Files And Folders]], [[github|GitHub]] | None | None | Review when the source-of-truth root or SOP authority model changes |
| DR-0002 | [[dr-0002-agent-status-runtime-location-and-contract|Agent Status Runtime Location And Contract]] | Accepted | 2026-06-01 | None | None | [[files-and-folders|Files And Folders]], [[github|GitHub]], [[dashboard-model]], [[agent-responsibilities]] | None | None | Review when the source-of-truth root changes or runtime status moves to another authority |
| DR-0003 | [[dr-0003-linda-repo-health-auditor-and-memory|Linda Repo Health Auditor And Memory]] | Accepted | 2026-06-01 | None | None | [[files-and-folders|Files And Folders]], [[agent-roster|Agent Roster]], [[sop-registry|SOP Registry]] | None | None | Review when Linda's authority, score rubric, or memory location changes |

## Related

- [[operating-model/decision-record-system/README|Decision Record System]]
- [[operating-model/decision-record-system/decision-record-rules|Decision Record Rules]]
- [[files-and-folders|Files And Folders]]
- [[github|GitHub]]

<!-- Reviewed and Approved on -->
