---
aliases:
  - Agent Profiles
  - Project Curator Agent Profiles
---

# Agent Profiles

## Before You Edit This File

Frame of mind: This folder is the portable role library for the project-curator system. Every individual agent profile should use the same structure so the system can be dropped into another software project cleanly.

Ask yourself before changing it:
- Does every agent live under `agents/profiles/<agent-slug>/README.md`?
  Prompt: Keep profiles folder-based and consistent; do not add loose one-off agent files.
- Does each profile define purpose, cadence, trigger, responsibilities, inputs, outputs, interactions, routing, memory, and approval boundaries?
  Prompt: If a field is not known, write the current assumption and the decision needed.
- Is this role portable to another software project with only small edits?
  Prompt: Remove project-specific facts from the profile and put them in source-of-truth records instead.

Cross-check [[agent-roster|Agent Roster]], [[agent-template|Agent Template]], and [[agents-overview|Agents Overview]].

## Purpose

`agents/profiles/` stores individual project-curator agent profiles.

The agent system docs in `agents/*.md` define the shared operating model. The profile folders define the individual agents.

## Profiles

| Agent | Profile | Purpose |
| --- | --- | --- |
| Daily Chief of Staff Brief | [[agents/profiles/daily-chief-of-staff-brief/README|Daily Chief of Staff Brief]] | Summarize what changed, what matters today, what is blocked, and what needs approval. |
| Backlog Groomer | [[agents/profiles/backlog-groomer/README|Backlog Groomer]] | Review backlog quality, duplicates, stale work, missing links, blocked work, and top ranked items. |
| Product Reviewer | [[agents/profiles/product-reviewer/README|Product Reviewer]] | Review user value, lifecycle fit, assumptions, validation gaps, and whether work should continue. |
| CTO Reviewer | [[agents/profiles/cto-reviewer/README|CTO Reviewer]] | Review architecture, sequencing, dependencies, reliability, scalability, operational risk, and engineering readiness. |
| Growth Reviewer | [[agents/profiles/growth-reviewer/README|Growth Reviewer]] | Review launch motion, channels, positioning, conversion, traction, and next experiments. |
| Weekly CFO Cost and Progress Reviewer | [[agents/profiles/weekly-cfo-cost-and-progress-reviewer/README|Weekly CFO Cost and Progress Reviewer]] | Review cost, throughput, value, ROI, and whether to continue, pause, reduce spend, or double down. |
| QA / Release Reviewer | [[agents/profiles/qa-release-reviewer/README|QA / Release Reviewer]] | Review test coverage, regressions, visual quality, acceptance criteria, and release readiness. |
| Security / Secrets Reviewer | [[agents/profiles/security-secrets-reviewer/README|Security / Secrets Reviewer]] | Review secrets handling, auth, permissions, dependency risk, and unsafe agent permissions. |
| Customer Signal Reviewer | [[agents/profiles/customer-signal-reviewer/README|Customer Signal Reviewer]] | Review feedback, analytics, complaints, requests, activation, retention, and evidence of demand. |
| Linda | [[agents/profiles/linda/README|Linda]] | Audit repo health for clarity, overlaps, sequencing, placement, underused systems, and score trend. |
| Source-of-Truth Steward | [[agents/profiles/source-of-truth-steward/README|Source-of-Truth Steward]] | Review durable knowledge for broken links, missing backlinks, stale status records, orphan artifacts, and cross-record drift. |
| Decision Record Steward | [[agents/profiles/decision-record-steward/README|Decision Record Steward]] | Review new, stale, conflicting, missing, or superseded decisions and escalate needed human review. |

## Structure Rule

Every agent profile should use this path pattern:

`agents/profiles/<agent-slug>/README.md`

Do not create special one-off agent files at the root of `agents/`. Shared system docs belong in `agents/`; individual agent identities belong in `agents/profiles/`.

## Related

- [[agent-roster|Agent Roster]]
- [[agent-template|Agent Template]]
- [[agent-workflows|Agent Workflows]]
- [[agent-approval-rules|Agent Approval Rules]]
