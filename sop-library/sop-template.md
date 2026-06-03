---
aliases:
  - SOP Template
---

# SOP Template

## Before You Edit This File

Frame of mind: This is the pattern for new procedures. Keep it clear for non-technical editors and strict enough for agents to execute.

Ask yourself before changing it:
- Does the template state purpose, inputs, steps, outputs, stop conditions, and approval needs?
  Prompt: Say whether this role may decide, recommend, draft, or only inform; then name the human handoff.
- Does it require backlinks to durable records?
  Prompt: Name the exact files or records someone should open before trusting this answer.
- Can the result be routed to dashboard or agent outputs?
  Prompt: Describe what the human should see or do from the dashboard in one practical sentence.

Cross-check [[sop-usage-rules|SOP Usage Rules]], [[sop-registry|SOP Registry]], and [[agent-output-contracts|Agent Output Contracts]].


Use this template for every new SOP.

```md
# SOP Name

## Purpose

## When To Use It

## Inputs Required

## Steps
1. Step one.
2. Step two.
3. Step three.

## Agent Actions Allowed

## Human Approvals Required

## Output Artifacts

## Links To Source Of Truth
- [[files-and-folders|Files And Folders]]
- [[github|GitHub]]

## Related Decision Records

## Quality Checks

## Stop Conditions

## Dashboard Signals

## GitHub Issue Labels

## Done Criteria
```

## Authoring Rules

- Keep steps executable by an agent without extra interpretation.
- State exactly what the agent may do alone and what must pause for human approval.
- Name output artifacts and where they belong.
- Prefer Obsidian links for related ideas, decisions, journals, projects, and SOPs.
- Update `sop-registry.md` whenever the SOP is created or changed.

<!-- Reviewed and Approved on -->
