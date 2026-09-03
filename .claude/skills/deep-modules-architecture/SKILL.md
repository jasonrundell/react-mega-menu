---
name: deep-modules-architecture
description: >-
  Prefers deep modules—rich behavior behind simple interfaces—over shallow
  webs of tiny entangled pieces. Use when restructuring code, reviewing
  boundaries, reducing complexity, or when the user mentions deep modules,
  Ousterhout, shallow modules, or module maps.
---

# Deep modules architecture

## Principles

- Complexity is anything about structure that makes the system hard to understand or change.
- Deep modules hide meaningful behavior behind a narrow API; shallow graphs exhaust context and exploration time.
- Prefer `@file` references and a short module map over dumping whole directories into chat.
- Reduce index noise (`.cursorignore`) so discovery finds real boundaries.

## Workflow

1. Sketch or update a lean module map: name, responsibility, public interface, dependents.
2. When improving layout, cluster related logic behind a narrow API; hide incomplete ideas inside the module.
3. Prefer fewer deep boundaries over many chatty files with wide surfaces.
4. Once a boundary exists, prefer tests at the module interface (`tdd-feedback-loops`).
5. Record module names in the project glossary (`ubiquitous-language`).

## Rules

- Do not split for aesthetics if splitting creates shallow fragments that force chase-the-dependency work.
- Do not merge unrelated concerns just to reduce file count.
- Explain structural changes in terms of understandability and change cost, not fashion.

## Sibling skills

- Design concept first via `grill-me` before large structural moves.
- Plans that name interface deltas use `interface-first-delegation`.
- Feedback stays cheap when modules are deep and testable.
