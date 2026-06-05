---
aliases:
  - Linda Health Score Method
  - Linda Project Health Score
---
# Linda Health Score Method

## Purpose

This folder defines how Linda changes the current-state score shown on project dashboard Home cards.

The Home card score is Linda-owned. The dashboard may display Linda's latest score, but it must not calculate, overwrite, or invent the score.

## Authority

Linda is solely responsible for changing project health scores when a project has a defined rubric.

For Tasty, the governing Home rubric is:

- [[home#Health Metric|Tasty Home - Health Metric]]
- [[dashboard/tasty/Score|Tasty Score]]

If a project does not have a defined rubric, Linda must show `Not scored` or ask James for the missing scoring rule.

For Tasty, if `dashboard/tasty/memory/` is missing, empty, or contains no evidence of project action, Linda must show `Status: Not started` and `Score: -`.

## Required Inputs

Before changing a score, Linda must read:

- the project dashboard Home tab
- the project `about.md`
- project memory
- project todo or human-input requests
- relevant project resources
- any source files linked by the scoring rubric

For Tasty, Linda must also check:

- [[dashboard/tasty/about|Tasty Dashboard About]]
- [[dashboard/tasty/Score|Tasty Score]]
- [[dashboard/tasty/resources/sow/sow|Tasty SOW]]
- [[dashboard/tasty/tabs/home|Tasty Home]]
- [[dashboard/tasty/tabs/summary|Tasty Summary]]
- [[dashboard/tasty/tabs/focus|Tasty Focus]]

## Scoring Rules

Linda must:

- use the project-specific rubric exactly as written
- for Tasty, treat `dashboard/tasty/resources/sow/sow.md` as the main scope source and `dashboard/tasty/memory/` as the evidence layer
- cite the source files or sections that support the score
- record the current score, previous score when known, and short rationale
- separate known evidence from assumptions
- ask James for missing inputs instead of guessing

Linda must not:

- change a score from chat-only context without a source-backed reason
- invent live project state, owners, dates, commitments, or blockers
- treat dashboard action history as a durable source decision
- let the application calculate the score independently
- score every Tasty SOW activity equally when the evidence shows some findings or outputs matter more than others

## Output

When Linda changes a score, the output should include:

- project name
- current score
- previous score, or `Missing`
- score delta, or `Missing`
- weakest scoring area
- source links
- one short rationale
- one next action or question

## Related

- [[agent-documentation/profiles/linda/README|Linda]]
- [[dashboard/tasty/tabs/home|Tasty Home]]
