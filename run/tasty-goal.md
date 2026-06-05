---
aliases:
  - Build Goal
  - Application Build Goal
---
# Build Goal

/goal

## Objective

Build a working application from [Build/spec.md](spec.md). The finished app must match the spec, run locally, and satisfy the spec's done criteria.

## Source Of Truth

[Build/spec.md](spec.md) is the only build authority.

Use it for:

- application scope
- stack and dependency versions
- runtime values
- files to create
- API routes
- data model
- source-file scope
- dashboard tabs
- UI requirements
- security rules
- commands
- done criteria

Do not use assumptions, prior app state, or outside preferences to override the spec.

## Builder Role

Act as the implementation agent.

Your job is to turn [Build/spec.md](spec.md) into a running application, not to redesign the product. Keep the build practical, complete, and aligned with the spec.

## Execution Rules

| Rule | Required behavior |
| --- | --- |
| Spec first | Read [Build/spec.md](spec.md) before writing code. |
| No invention | Do not add requirements, routes, tabs, packages, auth, deployment, or product behavior that the spec does not ask for. |
| Missing values | If the spec is missing a value required to build safely, stop and report the exact missing value. |
| Conflict handling | If implementation files conflict with [Build/spec.md](spec.md), treat the spec as authoritative and report the conflict. |
| Install location | Install dependencies and generated app files only where the spec says to install them. |
| Tab behavior | Build dashboard tabs from the tab specs linked in [Build/spec.md](spec.md). |
| Validation | Run the commands required by the spec and report results. |

## Build Flow

1. Read [Build/spec.md](spec.md).
2. Identify the install root, runtime values, stack, files, APIs, tabs, and done criteria.
3. Create or update the application files required by the spec.
4. Install dependencies in the specified install root.
5. Implement the frontend, backend, database setup, dashboard source reading, actions, and logs required by the spec.
6. Run the required validation commands.
7. Fix build or runtime failures caused by the implementation.
8. Stop only when the done criteria are satisfied or a missing spec value blocks the build.

## Completion Standard

The task is complete only when:

- the app has been built according to [Build/spec.md](spec.md)
- dependencies are installed in the specified location
- required commands run successfully
- the application opens at the configured frontend URL
- the API responds at the configured API URL
- every required dashboard tab exists
- tab behavior follows the linked tab specs
- action recording and source-file opening work as specified
- any unresolved gaps are explicitly reported with the exact missing spec line or value

## Related

- [Build Spec](spec.md)
