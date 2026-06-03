---
aliases:
  - Dashboard
  - Dashboard Folder
  - Dashboard Specification
---

# Dashboard

This folder is the single source of truth for dashboard definitions.

The app renders dashboard content from this folder. The app should not define dashboard content under `app/`; `app/` is implementation only.

## Folder Structure

- [README.md](README.md)
- [common-spec.md](common-spec.md)
- [linda/dashboard.md](linda/dashboard.md)
- [linda/tabs/home.md](linda/tabs/home.md)
- [linda/tabs/summary.md](linda/tabs/summary.md)
- [linda/tabs/focus.md](linda/tabs/focus.md)
- [linda/tabs/calendar.md](linda/tabs/calendar.md)
- [linda/tabs/pending-decisions.md](linda/tabs/pending-decisions.md)
- [linda/tabs/run-log.md](linda/tabs/run-log.md)
- [linda/tabs/hygiene.md](linda/tabs/hygiene.md)

## Files

| File or folder | Purpose |
| --- | --- |
| `README.md` | Explains the dashboard folder and the one-source-of-truth rule. |
| [common-spec.md](common-spec.md) | Shared rules for all dashboards: folder shape, tab contract, actions, vectors, source links, and rebuild requirements. |
| [linda/dashboard.md](linda/dashboard.md) | Linda project dashboard index, source list, configurable inputs, and tab links. |
| [linda/tabs/](linda/tabs/home.md) | One file per Linda tab. Each tab declares status, sources, configurable inputs, current state, required behavior, and rebuild contract. |

## Rule

Define dashboard content here. Render it from `app/`.

When adding a project dashboard:

1. Create `dashboard/<project>/dashboard.md`.
2. Create `dashboard/<project>/tabs/`.
3. Add one Markdown file per tab the project may use.
4. Mark every tab as `Active` or `Inactive`.
5. Update the app's dashboard spec sync list if the local app should render that project.

## Related

- [Common Dashboard Spec](common-spec.md)
- [Linda Dashboard](linda/dashboard.md)
