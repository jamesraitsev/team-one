---
aliases:
  - Tech
  - Dashboard Build Prompt
  - Dashboard Tech Spec
---
# Dashboard Build Prompt

## Configuration

| Variable | Default | Purpose |
| --- | --- | --- |
| `INSTALL_ROOT` | `./app` | Folder where the dashboard app, package files, dependencies, build output, server code, frontend code, and local runtime files should be installed. |

## Build Goal

Build a local full-stack dashboard app in `INSTALL_ROOT`.

The app helps the repo operator review repo health, inspect source Markdown, accept/deny/delay work, and preserve a durable action history.

The first screen must be the dashboard itself. Do not build a landing page.

## Stack

| Layer | Tech | Version |
| --- | --- | --- |
| Frontend | React | `^19.2.7` |
| Build tool | Vite | `^8.0.16` |
| React plugin | `@vitejs/plugin-react` | `^6.0.2` |
| Styling | Tailwind CSS | `^3.4.17` |
| CSS processing | PostCSS | `^8.5.15` |
| CSS prefixing | Autoprefixer | `^10.5.0` |
| API server | Express | `^5.2.1` |
| Database | PostgreSQL | `postgres:16-alpine` |
| DB client | `pg` | `^8.21.0` |
| Data fetching | TanStack React Query | `^5.100.14` |
| Calendar UI | FullCalendar | `^6.1.20` |
| Charts | Recharts | `^3.8.1` |
| Icons | Lucide React | `^1.17.0` |
| Date handling | date-fns | `^4.4.0` |
| Environment loading | dotenv | `^17.4.2` |
| Dev process runner | concurrently | `^10.0.1` |
| API reload | nodemon | `^3.1.14` |
| CORS | cors | `^2.8.6` |
| Class names | clsx | `^2.1.1` |
| Tailwind helper | tailwind-merge | `^3.6.0` |
| Variant helper | class-variance-authority | `^0.7.1` |

Install dependencies into `INSTALL_ROOT`, not the repo root unless `INSTALL_ROOT` is explicitly set to the repo root.

## Runtime Values

| Setting | Value |
| --- | --- |
| Frontend URL | `http://localhost:5555` |
| Frontend host | `0.0.0.0` |
| Frontend port | `5555` |
| API URL | `http://localhost:5556` |
| API port | `5556` |
| API proxy path | `/api` |
| Database URL | `postgres://cto:cto@localhost:55432/cto_dashboard` |
| Postgres host port | `55432` |
| Postgres container port | `5432` |
| Decision log folder | `app/decision-log/YYYY-MM-DD/` |
| Decision log timezone | `America/Denver` |

## Files To Create In `INSTALL_ROOT`

| Path | Purpose |
| --- | --- |
| `package.json` | Package name, scripts, and dependencies. |
| `package-lock.json` | Locked dependency versions after install. |
| `.env.example` | Local environment variables. |
| `docker-compose.yml` | Local Postgres service. |
| `vite.config.js` | Vite config, React plugin, frontend port, and `/api` proxy. |
| `tailwind.config.js` | Tailwind content paths and dashboard theme. |
| `postcss.config.js` | Tailwind/PostCSS setup. |
| `index.html` | Vite HTML entry. |
| `src/main.jsx` | React app bootstrap. |
| `src/App.jsx` | Dashboard UI. |
| `src/index.css` | Tailwind imports and global styles. |
| `server/index.js` | Express API entry. |
| `server/db.js` | Postgres connection pool. |
| `server/seed.js` | Migration and seed setup. |
| `server/dashboardStore.js` | Dashboard spec sync, action rows, snapshots, and snapshot comparison. |
| `server/repoAudit.js` | Markdown reading, repo audit parsing, link health, and dashboard payload assembly. |
| `server/decisionLog.js` | Markdown action-log writer. |
| `scripts/bounce.py` | Local reset/start helper. |

## API

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/api/health` | Basic API health check. |
| `GET` | `/api/dashboard` | Build the dashboard payload from Markdown audits, actions, synced specs, and snapshots. |
| `GET` | `/api/dashboard/history` | Return recent dashboard snapshot metadata. |
| `GET` | `/api/file?path=...` | Open an allowed Markdown file from the repo. |
| `POST` | `/api/actions` | Record a dashboard action in Postgres and write a Markdown decision log. |

## Data

| Table | Purpose |
| --- | --- |
| `dashboard_specs` | Synced dashboard spec Markdown and content hashes. |
| `dashboard_actions` | Accepted, denied, and delayed dashboard actions. |
| `dashboard_snapshots` | Daily dashboard payload snapshots. |
| `projects`, `agents`, `priorities`, `calendar_items`, `decisions` | Seed scaffolding only unless wired into a future dashboard. |

## Source Scope

Read Markdown from the repo root, which is the parent folder of `INSTALL_ROOT`.

Only open or audit `.md` files.

Exclude these folders from source reads:

| Folder |
| --- |
| `.git` |
| `app` |
| `node_modules` |
| `artifacts` |
| `review later` |

## Tabs

Use `dashboard/tasty/tabs/header.md` as the source of truth for the Tasty tab list, tab order, shared header, and top navigation.

Do not hard-code the active tab list from implementation code. The application should derive the visible Tasty tabs from the required tab order in `dashboard/tasty/tabs/header.md`, then use each linked tab spec as that tab's content contract.

## UI Requirements

- Use a dashboard UI as the first screen.
- Use tabs from `dashboard/tasty/tabs/header.md`.
- Use Lucide icons in tab and action buttons.
- Use FullCalendar for Focus and Calendar views.
- Use Recharts for score, audit, and hygiene visuals where useful.
- Use React Query for data loading and action mutations.
- Open Markdown source files in an in-app drawer.
- After an accept, deny, or delay action, write the action and refresh dashboard data.

## Security

- No authentication is required for local-only operation.
- Do not add hosted or multi-user behavior unless explicitly requested.
- Restrict file reads to Markdown files inside the repo and outside excluded folders.
- Do not commit real secrets.
- Keep CORS explicit for local API usage.

## Commands

Run from `INSTALL_ROOT`.

| Command | Purpose |
| --- | --- |
| `npm run db:up` | Start local Postgres. |
| `npm run dev` | Run API and frontend together. |
| `npm run bounce` | Reset/start local dashboard helper. |
| `npm run build` | Build frontend assets. |
| `npm run preview` | Preview production frontend build. |
| `npm run db:down` | Stop local Postgres. |

## Done Criteria

- Dependencies are installed under `INSTALL_ROOT`.
- `npm run build` succeeds from `INSTALL_ROOT`.
- The app opens at `http://localhost:5555`.
- The API responds at `http://localhost:5556/api/health`.
- The dashboard renders all seven tabs.
- Each tab follows the linked tab spec.
- Source-file links open Markdown in the file drawer.
- Accept, deny, and delay actions write to Postgres and Markdown logs.
