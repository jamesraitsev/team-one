---
aliases:
  - Tasty Score
  - Tasty Project Score
  - Tasty Scoring Method
---
# Tasty Score

## Purpose

This file defines how Linda should score the Tasty project.

The score is a judgment rubric, not a formula. Linda should use the scope in [[sow|SOW]] as the main source of truth for what the project is supposed to produce, then compare that scope against project memory in `dashboard/tasty/memory/`.

If project memory is missing or empty, Linda should treat the project as `Not started` and show the score as `-`.

## Source Of Truth

Linda must read these before scoring:

| Source | Use |
| --- | --- |
| [[sow|SOW]] | Main scope, phases, activities, and expected outputs. |
| `dashboard/tasty/memory/` | Evidence of what has actually happened, changed, been decided, or been delivered. |
| [[about|Tasty About]] | Project description and dashboard context. |
| [[home|Tasty Home]] | Home score display contract. |

The agreement PDF in `dashboard/tasty/resources/sow/Agreement.pdf` may provide context, but [[sow|SOW]] is the main scoring source unless James says otherwise.

## Memory Evidence

Memory is the evidence layer for scoring.

A Tasty memory is a Markdown record under `dashboard/tasty/memory/` that captures one or more of these:

- an action taken
- a decision made
- a commitment or owner named
- new information discovered
- an interview, document review, observation, analysis, or workshop completed
- a finding, risk, friction point, dependency, or blocker identified
- an output drafted, reviewed, accepted, or delivered
- a material change in project direction, scope, timing, or confidence
- a question James answered that changes what Linda should believe about the project

Chat-only claims are not memory until written into `dashboard/tasty/memory/` or another explicit project source.

## Status Labels

Linda should use these status labels before or alongside a numeric score:

| Status | Meaning |
| --- | --- |
| `Not started` | No usable Tasty memory exists yet, or memory contains no evidence of project action. Show score as `-`. |
| `Started` | Some evidence exists, but the project is still collecting baseline information and has not produced phase outputs. |
| `In progress` | Evidence shows active work inside the current SOW phase. |
| `At risk` | Work exists, but timing, evidence quality, access, or output quality threatens the SOW outcome. |
| `On track` | Evidence shows the right phase work is happening and outputs are forming at the right level of quality. |
| `Complete` | The relevant SOW phase or full 90-day scope has delivered its expected outputs with source-backed evidence. |

## Scoring Method

Linda should score by reading the current evidence and asking four questions in order.

### 1. Has The Project Started?

If `dashboard/tasty/memory/` is absent, empty, or contains no evidence of action, show:

| Field | Value |
| --- | --- |
| Status | `Not started` |
| Score | `-` |
| Rationale | No memory-backed evidence of work started. |

Do not assign `0/100`. A zero score implies scored failure; `-` means the project has not started or cannot yet be scored.

### 2. Which SOW Phase Is Active?

Use the SOW phase that best matches the evidence:

| Phase | SOW window | Main question |
| --- | --- | --- |
| Baseline Assessment | Days 1 to 30 | Are we building a fact-based baseline of how Engineering work flows? |
| Deep Operating Assessment | Days 31 to 60 | Are we deepening the assessment and comparing stated process against day-to-day execution? |
| Diagnosis And Recommendations | Days 61 to 90 | Are we synthesizing root causes and turning findings into a practical implementation roadmap? |

The phase should come from evidence, not calendar time alone. If it is day 45 but baseline outputs are missing, Linda should say the project is still effectively in Baseline Assessment and explain why.

### 3. What Evidence Exists For The Phase?

Linda should look for evidence that SOW activities happened and produced usable outputs.

For Baseline Assessment, look for:

- priority-setting, approval, sequencing, and communication mapped
- decision-making and decision-rights reviewed
- strategy-to-roadmap-to-execution flow assessed
- handoffs, dependencies, approval layers, or ownership gaps identified
- product delivery lifecycle, technology leadership, engineering practices, KPIs, incidents, platform reliability, team capacity, and delivery commitments reviewed
- early signals of strength, friction, duplication, execution risk, delivery bottlenecks, and misalignment identified
- current state operating map produced
- initial risk and friction assessment produced
- early observations produced
- priority areas for Days 31 to 60 identified

For Deep Operating Assessment, look for:

- strategic priorities traced into product decisions, engineering work, delivery plans, and measurable outcomes
- accountability and informal escalation patterns assessed
- tradeoff process across speed, quality, reliability, customer impact, and business value reviewed
- delivery quality, release discipline, incident response, platform resilience, and operational rigor assessed
- Poland team working norms, communication patterns, leadership depth, cultural dynamics, technical constraints, and alignment reviewed if needed
- stated operating model compared with actual day-to-day execution
- deeper operating assessment produced
- findings on delivery discipline, reliability, leadership depth, and cross-functional alignment produced
- Poland engineering assessment produced when relevant
- initial recommendations and executive-alignment areas identified

For Diagnosis And Recommendations, look for:

- root causes identified for delivery inconsistency, reliability gaps, leadership capability issues, fragmentation, and weak execution discipline
- operating model, leadership, process, or technology changes clarified
- recommendations defined across platform reliability, technology operating model, engineering alignment, organizational design, decision rights, execution cadence, and KPIs
- recommendations prioritized by business impact, delivery risk, urgency, and implementation complexity
- findings aligned with executive leadership
- final operating diagnosis produced
- proposed technology opportunities and changes produced
- recommended decision rights and execution cadence produced
- year-end roadmap produced with sequencing, feasibility, dependencies, and resource requirements

### 4. How Strong Is The Evidence?

Linda should judge evidence quality before changing the score.

Use this guide:

| Evidence level | Meaning |
| --- | --- |
| No evidence | Memory does not show the activity or output happened. |
| Weak evidence | A note says work happened, but lacks date, source, owner, detail, or outcome. |
| Usable evidence | Memory records what happened, why it matters, and which SOW activity or output it supports. |
| Strong evidence | Memory links the action to a concrete output, decision, finding, artifact, owner, or next step. |
| Accepted evidence | James or another explicit source accepted the output, decision, or finding. |

## Score Bands

Linda should use score bands as a rough operating signal.

| Score | Meaning |
| --- | --- |
| `-` | Not started or not enough memory evidence to score. |
| `1-20` | Started, but mostly unprocessed information or weak evidence. |
| `21-40` | Evidence gathering is underway, but key SOW activities or phase outputs are missing. |
| `41-60` | Meaningful work exists and some outputs are forming, but coverage, quality, or timing is uneven. |
| `61-75` | The active phase is mostly covered with usable evidence and credible outputs. |
| `76-90` | The active phase is strong, with clear findings, outputs, and next-step implications. |
| `91-100` | The relevant phase or full scope is effectively complete, accepted, and backed by strong evidence. |

Do not score every activity equally. Some findings may matter more because they unblock the roadmap, expose a major risk, or prove that the assessment is producing useful decisions.

## Output Format

When Linda scores Tasty, she should write:

```md
Status: <Not started / Started / In progress / At risk / On track / Complete>
Score: <- or 1-100>
Active SOW phase: <Baseline Assessment / Deep Operating Assessment / Diagnosis And Recommendations>

Evidence:
- <memory-backed fact with source link>

Missing or weak evidence:
- <SOW activity or output not yet supported>

Rationale:
- <short judgment explaining why this score is fair>

Next:
- <smallest useful action or question>
```

## Re-Evaluation Prompt

Use this prompt when James asks Linda to refresh the score:

```md
Linda, refresh the Tasty score.

Read `dashboard/tasty/resources/sow/sow.md`, `dashboard/tasty/Score.md`, `dashboard/tasty/about.md`, `dashboard/tasty/tabs/home.md`, and every Markdown file under `dashboard/tasty/memory/`.

Treat `sow.md` as the scope authority and `dashboard/tasty/memory/` as the evidence layer.

If memory is missing or contains no evidence of project action, return `Status: Not started` and `Score: -`.

Otherwise:
1. Identify the active SOW phase from the evidence, not from calendar time alone.
2. List the strongest memory-backed evidence for completed activities and outputs.
3. List the most important missing or weak evidence.
4. Judge evidence quality before assigning a score.
5. Assign a rough score band and a specific score only if the evidence supports it.
6. Cite the source files used.
7. Write any new scoring rationale, decisions, or important discovered context to `dashboard/tasty/memory/YYYY-MM-DD/`.
```

## Related

- [[about|Tasty About]]
- [[home|Tasty Home]]
- [[sow|SOW]]
