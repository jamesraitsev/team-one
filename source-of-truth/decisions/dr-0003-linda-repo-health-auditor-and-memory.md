---
aliases:
  - "Decision 0003"
  - "DR 0003"
  - "Decision 003 - Linda Repo Health Auditor And Memory"
  - "Linda Repo Health Auditor And Memory"
---

# DR-0003: Linda Repo Health Auditor And Memory

## Before You Edit This File

Frame of mind: This decision makes Linda and her memory path part of the operating model. Edit it only if her authority, score memory, or write location changes.

Ask yourself before changing it:
- Is Linda still an auditor, not an approver?
  Prompt: Say whether she may decide, recommend, draft, or only inform; then name the human handoff.
- Is `source-of-truth/memory/` still the right place for score history?
  Prompt: Mark the item as live now, planned later, or out of scope; do not leave it implied.
- What depends on Linda's score and must-look findings?
  Prompt: Name the exact files or records someone should open before trusting this answer.

Cross-check [[agents/profiles/linda/README|Linda]], [[repo-health-audit|Repo Health Audit]], and [[source-of-truth/memory/linda-repo-health|Linda Repo Health Memory]].

## Metadata

| Field | Value |
| --- | --- |
| ID | DR-0003 |
| Title | Linda Repo Health Auditor And Memory |
| Status | Accepted |
| Date | 2026-06-01 |
| Owner | Repo operating model owner |

## Related

| Field | Value |
| --- | --- |
| Related ideas | None yet |
| Related GitHub issues | None yet |
| Related projects | None yet |
| Related journals | None yet |
| Related source-of-truth docs | [[source-of-truth/files-and-folders|Files And Folders]], [[source-of-truth/memory/README|Memory]], [[source-of-truth/memory/linda-repo-health|Linda Repo Health Memory]], [[agent-roster|Agent Roster]], [[agents/profiles/linda/README|Linda]] |

## Context

The repo needs a recurring, named auditor that can assess whether the documentation system remains clear, non-overlapping, properly sequenced, correctly placed, and useful.

The user wants to address this agent as `Linda`, start the day with her report, and compare today's repo-health score with the prior score.

Without a durable memory location, Linda's score history and carried-forward findings would live only in chat.

## Decision

Create Linda as the repo-health auditor and give her an approved memory path under `source-of-truth/memory/`.

The decision includes these rules:

1. Linda is addressed as `Linda`.
2. Linda audits clarity, overlaps, sequencing, placement, utilization, and memory continuity.
3. Linda scores repo health from `0` to `100`.
4. Linda writes and reads `source-of-truth/memory/linda-repo-health.md`.
5. Linda may recommend and challenge, but she may not accept decisions, change authority, move files structurally, delete files, or approve her own recommendations.
6. Linda's report should be concise and must prioritize must-look findings over comprehensive commentary.

## Why This Decision Was Made

This creates a named accountability loop for repo health.

It also separates Linda's durable score memory from journals, decisions, artifacts, and runtime status.

## What Depends On This Decision

- [[agents/profiles/linda/README|Linda]]
- [[repo-health-audit|Repo Health Audit]]
- [[source-of-truth/memory/README|Memory]]
- [[source-of-truth/memory/linda-repo-health|Linda Repo Health Memory]]
- agent roster, schedules, workflows, routing, and approval rules

## What This Decision Enables

- daily or on-demand repo-health scoring
- score comparison across runs
- sparse must-look findings
- carried-forward audit memory
- a named challenge role for the operator

## What This Decision Blocks

- Linda silently rewriting accepted authority
- score history living only in chat
- treating repo-health findings as accepted structural decisions without human approval

## Review Trigger

Review when Linda's authority changes, memory moves, score rubric changes materially, or another agent becomes the canonical repo-health auditor.

## Supersedes

- None

## Superseded By

- None

<!-- Reviewed and Approved on -->
