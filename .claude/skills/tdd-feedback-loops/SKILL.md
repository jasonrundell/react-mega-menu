---
name: tdd-feedback-loops
description: >-
  Keep changes small and verified: failing test → pass → refactor. Feedback
  frequency is the speed limit. Use for features, refactors, bug fixes, or
  when tempted to land large unverified diffs.
---

# TDD & feedback loops

Principles: outrun your headlights; bad code is more expensive with AI because speed amplifies entropy.

## Default loop

1. **Scope** one behavior or interface delta (see **interface-first-delegation**).
2. **Red** — failing test or observable check (Jest for units; Playwright for UI when behavior is visual).
3. **Green** — minimal implementation.
4. **Refactor** — only while green; prefer module boundaries (**deep-modules-architecture**).

Expand scope only when the last step is green (types, lint, tests).

## Test design (decide explicitly)

- **Unit**: pure logic (`lib/billing/entitlements`, `lib/tasks-schema`) — no mocks.
- **Module interface**: storage managers, API guards — mock IO at the boundary.
- **Component**: React Testing Library — user-visible testids; mock hooks/storage as needed.
- **E2E**: Playwright for cross-route flows. `tests/app/` runs signed in against a local Supabase stack on **8800** (the config builds and starts the app itself); `tests/marketing/` runs against the marketing dev server on **3100**.

Do not add tests that only assert implementation details.

## SpokenLeaf commands

| Command                                 | Use                                         |
| --------------------------------------- | ------------------------------------------- |
| `npm test -- --testPathPattern=<suite>` | Fast subset                                 |
| `npm run test:ci`                       | Prettier + Jest CI                          |
| `npm run test:e2e:app`                  | App E2E, signed in (needs `supabase start`) |
| `npm run test:e2e:marketing`            | Marketing E2E                               |

## Anti-patterns

- Landing 500+ line component changes without slice tests.
- Ignoring failing suites in `jest.config.js` instead of fixing or deleting stale tests.
- Skipping browser visibility for layout/regression UI work when tools are available.

## Chain to sibling skills

- Testable structure → **deep-modules-architecture**.
- Plans name what to test → **interface-first-delegation**.
- Domain terms in test names → **ubiquitous-language**.
