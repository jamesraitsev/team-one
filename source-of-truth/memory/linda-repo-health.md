---
aliases:
  - Linda Repo Health Memory
  - Repo Health Memory
---

# Linda Repo Health Memory

## Before You Edit This File

Frame of mind: This is Linda's memory. Keep it short, score-focused, and useful for comparing today with the prior run.

Ask yourself before changing it:
- What was the last score and why did it move?
  Prompt: State score, previous score, delta, and the one reason the movement matters.
- What must James look at next?
  Prompt: Keep only findings that change what James should do today.
- What should Linda carry forward?
  Prompt: Preserve unresolved must-look items until they are fixed, rejected, or converted into a decision record.

Cross-check [[agents/profiles/linda/README|Linda]], [[repo-health-audit|Repo Health Audit]], and [[source-of-truth/decisions/index|Decision Index]].

## Current Summary

| Field | Value |
| --- | --- |
| Latest score | 72 |
| Previous score | Missing |
| Delta | First baseline |
| Last run date | 2026-06-02 |
| Weakest area | Live-vs-future boundary and utilization |
| Next recommended audit | 2026-06-03 daily morning |

## Score History

| Date | Score | Previous score | Delta | Weakest area | Top must-look item |
| --- | --- | --- | --- | --- | --- |
| 2026-06-02 | 72 | Missing | First baseline | Live-vs-future boundary and utilization | Split active-now source-of-truth/GitHub behavior from planned future capacity |

## 2026-06-02

James, repo health is 72/100.
Yesterday: Missing. Delta: First real baseline.

Scope note: `app/` excluded from this audit.

Must look:
1. `source-of-truth/files-and-folders.md` still lists future folders as approved durable locations even though only `agent-status/`, `decisions/`, `ideas/`, and `memory/` exist today. This makes the repo feel more live than it is.
2. `source-of-truth/github.md` says GitHub Issues are the executable backlog, but the configuration remains placeholder-only. Agents correctly mention file-first fallback elsewhere, so the canonical GitHub contract needs to catch up.
3. `lookherefirst.md` is strong sequencing, but the repo still has more system surface than operating surface. The next gain is reducing what must be run first, not adding more docs.
4. The agent system is structurally coherent now. Linda and the other agents live consistently under `agents/profiles/`, but the system needs a v1 activation order before daily runs become meaningful.
5. Link health is mostly acceptable, but examples/templates create unresolved wiki-link noise. This will make future automated checks complain unless placeholders are marked or excluded.

One-day work:
- Fix live-vs-future authority first: update the operating-model overview, source-of-truth folder contract, and GitHub contract so all three say the same thing.

Challenge:
- Are you building the smallest operating loop you will actually use tomorrow, or a complete operating system you admire but do not run?

## Carried-Forward Must-Look Items

- Split active-now folders from approved future folders.
- Mark GitHub as file-first operational and GitHub-ready until real repo/auth/issue configuration exists.
- Define the first daily operating loop before adding more agents, tabs, or records.

## Linda Report Template

```md
## YYYY-MM-DD

James, repo health is <score>/100.
Yesterday: <previous score or Missing>. Delta: <up/down/flat>.

Must look:
1. <file or area> - <why it matters>

One-day work:
- <smallest useful cleanup plan>

Challenge:
- <one uncomfortable question>
```

## Related

- [[agents/profiles/linda/README|Linda]]
- [[repo-health-audit|Repo Health Audit]]
- [[source-of-truth/files-and-folders|Files And Folders]]
