# Tasty Agent Rules

## Purpose

This file defines how agents should work in this project right now.

Scope is limited to the `Tasty` project under `dashboard/tasty/`.

This project is spec-first. Markdown is the product surface. Implementation is rebuilt from the spec only when James explicitly asks for a build or implementation update.

## Default Edit Mode

Unless James explicitly asks for implementation changes, edit specifications and documentation only.

Default behavior:

- Change `.md` files, agent docs, TOML agent instructions, and other specification files when James asks to change the project model.
- Do not change implementation code, application files, scripts, package files, generated files, database code, frontend code, backend code, or runtime behavior unless James specifically asks for code or application implementation changes.
- Do not wire a new spec into the app unless James explicitly asks to update the implementation.
- When in doubt, stop and ask whether James wants a spec-only change or an implementation change.

The path to implementation is: update the spec first, then rebuild from that spec only when James asks for it.

## No Invented UI

Every visible UI label, heading, timestamp label, explanatory sentence, section name, navigation item, card title, status label, and placement rule must be defined in a Markdown spec before it appears in production code.

Implementation code may render, parse, format, and arrange spec-backed content, but it must not invent product copy or visible dashboard concepts.

If a UI element is useful but not defined in Markdown, add or update the relevant `.md` spec first. If the right spec file is unclear, ask James before changing code.

## Tasty Sources

For Tasty work, read and write inside the Tasty project structure unless James says otherwise.

| Path | Role |
| --- | --- |
| `dashboard/tasty/about.md` | Project identity and dashboard context. |
| `dashboard/tasty/Score.md` | Linda's Tasty scoring method. |
| `dashboard/tasty/tabs/header.md` | Shared Tasty dashboard header specification. |
| `dashboard/tasty/tabs/` | Tasty dashboard tab specifications. |
| `dashboard/tasty/resources/` | Project inputs, including SOW and agreement files. |
| `dashboard/tasty/resources/sow/sow.md` | Main source of truth for Tasty scope. |
| `dashboard/tasty/memory/` | Tasty project memory and evidence of what happened. |
| `dashboard/tasty/todo/` | Tasty questions, missing inputs, and follow-ups. |

Do not invent live project state, GitHub configuration, owners, dates, scores, or completed work. If the source is missing, say it is missing.

## Agent Authority

Linda is the only named agent for Tasty right now.

Linda is the decision-maker for Tasty project interpretation, scoring judgment, memory classification, and dashboard-ready recommendations unless James overrides her.

Linda's current authority is defined by:

- `agent-documentation/profiles/linda/README.md`
- `.codex/agents/linda.toml`
- `dashboard/tasty/Score.md`
- `dashboard/tasty/tabs/home.md`

When James explicitly asks Linda to sync Markdown specs into the UI or production code, Linda may use the `spec-to-code-sync` skill.

Do not introduce other agents, rosters, schedules, workflows, or approval rules into this file unless James explicitly asks for them.

## Linda Memory Rules

For Tasty, Linda reads and writes project memory in:

- `dashboard/tasty/memory/`

A Tasty memory is a Markdown record that captures one or more of these:

- an action taken
- a decision made
- a commitment or owner named
- new information discovered
- an interview, document review, observation, analysis, or workshop completed
- a finding, risk, friction point, dependency, or blocker identified
- an output drafted, reviewed, accepted, or delivered
- a material change in project direction, scope, timing, or confidence
- a question James answered that changes what Linda should believe about the project

Chat-only claims are not Tasty memory until written into `dashboard/tasty/memory/` or another explicit project source.

## Scoring Rule

Tasty scoring is governed by `dashboard/tasty/Score.md`.

Linda must use `dashboard/tasty/resources/sow/sow.md` as the main scope source and `dashboard/tasty/memory/` as the evidence layer.

If `dashboard/tasty/memory/` is missing, empty, or contains no evidence of project action, Linda should report:

```md
Status: Not started
Score: -
```

Do not convert `Not started` into `0/100`.

## Validation

After documentation changes:

- Check that important Tasty links still point to existing files.
- Keep `dashboard/tasty/Score.md`, `dashboard/tasty/tabs/home.md`, Linda's README, and Linda's TOML consistent when scoring or memory rules change.
- Do not run app builds or change app code unless James explicitly asks for implementation work.
