---
aliases:
  - Repo Health Audit
  - Linda Repo Health Audit
---

# Repo Health Audit

## Before You Edit This File

Frame of mind: This SOP is Linda's audit procedure. It should produce a sparse, high-signal repo-health score and a short list of findings James must actually read.

Ask yourself before changing it:
- What evidence should Linda read before scoring?
  Prompt: Name the active files, memory record, and decision records that ground the audit.
- What makes a finding worth interrupting James?
  Prompt: Keep only ambiguity, overlap, sequencing, placement, underuse, or memory issues that change what James should do.
- How does the score compare to yesterday?
  Prompt: Read the prior score first, then state score, delta, and why it moved.

Cross-check [[agent-documentation/profiles/linda/README|Linda]], [[source-of-truth/memory/linda-repo-health|Linda Repo Health Memory]], [[source-of-truth/files-and-folders|Files And Folders]], and [[lookherefirst|Look Here First]].

Version: `v1.0`

## Purpose

Assess the health of the active repository docs for clarity, consistency, sequencing, placement, utilization, and memory continuity.

This SOP is optimized for a short operator report, not a comprehensive essay.

## Inputs

- `lookherefirst.md`
- `question.md`
- `AGENTS.md`
- active Markdown files outside `.git/`, generated `artifacts/`, and `review later/`
- `source-of-truth/decisions/index.md`
- `source-of-truth/files-and-folders.md`
- `sop-library/sop-registry.md`
- `agent-documentation/agent-roster.md`
- `source-of-truth/memory/linda-repo-health.md`

## Procedure

1. Read Linda's prior memory entry and previous score.
2. Read the active repo map from [[lookherefirst|Look Here First]].
3. Ignore generated artifacts, `.git/`, `.DS_Store`, archived `review later/`, and guidance scaffolding such as `Before You Edit This File` blocks when scoring core quality.
4. Check clarity first: identify language that a non-technical owner could misunderstand.
5. Check overlaps: find concepts, roles, rules, or files that define the same thing with different names or authority.
6. Check sequencing: identify files that depend on unresolved earlier files or decisions.
7. Check placement: identify files, agents, SOPs, records, or artifacts living in the wrong layer.
8. Check utilization: identify agents, SOPs, dashboards, or folders that look overbuilt relative to how often the repo uses them.
9. Score the repo from `0` to `100` using Linda's scoring rubric.
10. Write the new score and short report to [[source-of-truth/memory/linda-repo-health|Linda Repo Health Memory]].

## Scoring Rubric

| Area | Weight |
| --- | --- |
| Clarity | 25 |
| Overlap control | 20 |
| Sequencing | 20 |
| Placement | 15 |
| Utilization | 10 |
| Memory and continuity | 10 |

## Output

Linda's report should include:

- current score
- previous score
- delta
- at most five must-look findings
- one-day work recommendation
- one challenge question for James
- memory write confirmation

## Stop Conditions

Stop and report a blocker when:

- Linda's memory file is missing
- accepted decisions conflict
- active file order cannot be determined
- a requested cleanup would require human approval
- findings depend on archived or generated files rather than active repo docs

## Related

- [[agent-documentation/profiles/linda/README|Linda]]
- [[source-of-truth/memory/linda-repo-health|Linda Repo Health Memory]]
- [[source-of-truth/files-and-folders|Files And Folders]]
- [[sop-registry|SOP Registry]]
