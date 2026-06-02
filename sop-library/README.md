---
aliases:
  - SOP Library
  - Reusable SOP Library
---

# SOP Library

This folder is the reusable SOP library for the repo's agent operating model.

It turns repeated workflows into explicit, executable procedures that agents can follow across repos, projects, and initiatives without recreating process from scratch.

## Design Rules

| Rule | Meaning in this repo |
| --- | --- |
| One SOP library | All reusable SOPs live under `sop-library/`. |
| Categories, not silos | `SDLC` is one category alongside product, growth, operations, and governance. |
| Reusable only | Do not store initiative-specific notes, delivery logs, or project outputs here. |
| Registry is required | Every active SOP must have a matching row in `sop-registry.md`. |
| Decision-aware | If an SOP conflicts with an Accepted decision record, stop and escalate. |
| Obsidian-first linking | Prefer `[[idea-name|Idea Name]]`, `[[decision-name|Decision Name]]`, `[[project-name|Project Name]]`, and `[[journal-name|Journal Name]]` when the record exists. |

## Supported Storage Modes

The SOP system supports three storage patterns:

| Mode | Description | Typical use |
| --- | --- | --- |
| Repo-local SOPs | SOPs stored in this repo under `sop-library/` | Default for this repo |
| Shared repo SOPs | SOPs stored in another repo and mirrored or referenced here | Cross-repo operating standards |
| Configured folder SOPs | SOPs loaded from a configured folder path | Team-local overrides or private internal variants |

The active resolution rules live in [[sop-usage-rules|SOP Usage Rules]].

## Required Companion Files

| File | Purpose |
| --- | --- |
| [[sop-registry|SOP Registry]] | Canonical list of SOPs and their contract metadata |
| [[sop-template|SOP Template]] | Authoring template for new SOPs |
| [[sop-usage-rules|SOP Usage Rules]] | Execution, linking, approval, and dashboard rules |
| [[sop-config.example|SOP Config Example]] | Example configuration for local, shared-repo, and override usage |
| [[categories|SOP Categories]] | Category definitions and ownership boundaries |

## Category Map

| Category | Focus |
| --- | --- |
| `sdlc/` | Build, testing, release, security, and visual quality procedures |
| `product/` | Idea quality, validation planning, and backlog shaping |
| `growth/` | Launch, copy, and content approval workflows |
| `operations/` | Journals, reviews, and recurring operating cadence |
| `governance/` | Source-of-truth, permissions, and decision hygiene |

## Links Into The Rest Of The System

SOP execution must link back to the existing operating model:

- [[files-and-folders|Files And Folders]]
- [[github|GitHub]]
- [[lifecycle]]
- [[decision-gates]]
- [[agent-responsibilities]]
- [[dr-0001-sop-library-location-and-governance|Decision 001 - SOP Library Location And Governance]]

## Update Rule

When an SOP is created or changed:

1. Update the SOP file.
2. Update `sop-registry.md`.
3. Update any linked decision record if the change introduces or changes a load-bearing operating rule.

## Related

- [[sop-registry|SOP Registry]]
- [[sop-usage-rules|SOP Usage Rules]]
- [[categories|SOP Categories]]
- [[source-of-truth/files-and-folders|Files And Folders]]
- [[operating-model/README|Operating Model Overview]]

<!-- Reviewed and Approved on -->
