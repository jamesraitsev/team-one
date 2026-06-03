---
aliases:
  - SOP Config Example
  - SOP Config
---

# SOP Config Example

## Before You Edit This File

Frame of mind: This file is configuration guidance, not live configuration. Keep it generic and never add secrets.

Ask yourself before changing it:
- Is this example needed for local, shared-repo, or override SOP resolution?
  Prompt: State whether this belongs in a reusable SOP, an agent workflow, or a one-time record.
- Does it avoid real tokens, private paths, and unapproved authority changes?
  Prompt: Say whether this role may decide, recommend, draft, or only inform; then name the human handoff.
- Does it explain which source wins when multiple SOP locations exist?
  Prompt: Name the exact files or records someone should open before trusting this answer.

Cross-check [[sop-usage-rules|SOP Usage Rules]], [[source-of-truth/github|GitHub]], and [[AGENTS|AGENTS.md]].


This file shows the expected configuration shape for the SOP system. It is documentation only, not a live config file.

| Field | Example value | Purpose |
| --- | --- | --- |
| `sop-library_location` | `./sop-library` | Default repo-local SOP library path |
| `shared_sop_repo_owner` | `acme-org` | Owner of the shared SOP repo |
| `shared_sop_repo_name` | `agent-sop-library` | Shared repo name |
| `branch` | `main` | Branch to read shared SOPs from |
| `base_folder` | `sop-library` | Base folder inside the shared repo |
| `local_override_folder` | `./local/sop_overrides` | Optional local folder that overrides matching SOP names |
| `approved_write_paths` | `source-of-truth/ideas/, source-of-truth/decisions/, source-of-truth/journals/, source-of-truth/projects/, source-of-truth/research/, source-of-truth/artifacts/` | Only durable paths an SOP may write to in this repo |
| `read_only_paths` | `operating-model/, sop-library/` | Paths agents may read for rules but should not treat as execution-output locations |
| `sop_versioning_rule` | `semantic-intent: major approval/output change, minor step expansion, patch wording fix` | Versioning contract |

## Example Notes

- Use repo-local `sop-library/` when the repo owns its SOPs.
- Use a shared repo when multiple repos must consume the same SOP library.
- Use a local override folder only when a team needs a controlled deviation from the shared baseline.
- Never put secrets in SOP config documentation.

## Related

- [[sop-library/README|SOP Library]]
- [[sop-usage-rules|SOP Usage Rules]]
- [[sop-registry|SOP Registry]]
- [[source-of-truth/files-and-folders|Files And Folders]]

<!-- Reviewed and Approved on -->
