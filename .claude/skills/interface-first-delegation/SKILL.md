---
name: interface-first-delegation
description: >-
  Requires plans to name which modules change and how interfaces evolve; humans
  own strategic design, agents implement behind tests when risk allows. Use when
  writing PRDs or plans, delegating implementation, or when the user mentions
  interface-first design, gray-box modules, or specs-to-code entropy.
---

# Interface-first delegation

## Principles

- Humans own strategic design quality; agents handle tactical implementation when boundaries and feedback are clear.
- Invest in design every day—do not treat code as disposable black noise.
- Plans should name module/interface deltas precisely; avoid narrative filler (`token-efficiency` output awareness).

## Workflow

1. For non-trivial work, the plan or PRD must list:
   - Which modules change
   - How public interfaces evolve (add/change/remove)
   - What tests prove the interface contract
2. Treat deep modules as gray boxes when risk allows: own the interface and tests; delegate the interior.
3. When delegating to agents or subagents, give each task a spec plus an **executed check** that decides pass/fail—never accept the agent's own report (`verified-delegation`).
4. Never hand-wave high-risk domains (auth, money, data loss, security, migrations)—keep human review explicit.
5. Keep a module map visible during planning and implementation.
6. Put module and interface terms in the glossary (`ubiquitous-language`).

## Anti-pattern

Specs-to-code that **divests** from system design: iterating only on documents while the codebase decays.

## Rules

- Prefer the smallest useful artifact: an interface delta and failing contract test, not a sprawling plan.
- Implementation may proceed only after interface and verification intent are clear.
- Chain with `tdd-feedback-loops` so delegated interiors stay verified.

## Sibling skills

- Align on the design concept with `grill-me` before naming interfaces.
- Prefer deep boundaries from `deep-modules-architecture` as the units of delegation.
- Shared vocabulary from `ubiquitous-language` keeps plans and code aligned.
- Scale delegation to multiple workers with `verified-delegation`: spec + executed check per task.
