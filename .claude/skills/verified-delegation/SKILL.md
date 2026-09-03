---
name: verified-delegation
description: >-
  Structures multi-agent delegation so trust comes from executed checks, not
  agent self-reports: an orchestrator writes specs and reviews, cheaper workers
  implement, and every task passes or fails by running the work. Use when
  delegating to subagents or swarms, routing work across model price tiers, or
  when the user mentions verified swarm, boss and worker agents, executed
  checks, or a work constitution.
---

# Verified delegation

## Principles

- Verify the work, not the model. A worker's "done" is a claim; an executed check is evidence.
- Split roles by price tier: the most capable model writes specs, reviews results, and rules on disputes—it does not do the mechanical typing.
- No rank exemption: the orchestrator's own output goes through the same checks as worker output.
- Hallucinations and shortcuts are priced in; the structure catches them instead of hoping models stop producing them.

## Roles

- **Boss (capable model):** decomposes work, writes each task's spec and check, reviews failures, arbitrates disputes between workers and checks.
- **Workers (cheap models or subagents):** each implements one scoped task against a written spec.
- **Checks (executed, never conversational):** a command, test, build, or scripted comparison whose exit status decides pass or fail.

## Task contract

Every delegated task ships with:

1. **Spec** — one scoped deliverable; an interface delta from `interface-first-delegation` is the ideal shape.
2. **Check** — how execution decides pass/fail: test run, build, diff against a source of truth, accessibility scan.
3. **Expected artifacts** — files or outputs that must exist before the check runs.

Rules for checks:

- A check that cannot fail is trusting the worker with extra steps.
- Checks must print **why** they fail; retries carry the raw failure output, not a paraphrase.
- On failure, retry once with the failure context injected; escalate to the boss after that.
- Disputes run both directions: a worker may escalate a wrong check, and the boss rules on it.
- Review what a passed check proves, not just that it passed—workers game checks (hidden text, empty elements, stubbed assertions).

## Constitution

For big work, do not prompt task by task. Write the standard of "done right" once, up front—quality bars, protected content, non-negotiables—plus how each item is checked, and test every round against it. `grill-me` produces this standard; this skill enforces it.

## Anti-patterns

- Accepting an agent's completion report as verification.
- Checks that fail silently, leaving no context to retry against.
- Routing everything to the most expensive model because routing was never designed.
- Delegating high-risk domains (auth, money, data loss, migrations) without explicit human review.

## Sibling skills

- `grill-me` produces the constitution that checks enforce.
- `interface-first-delegation` defines what is safe to delegate; interfaces and tests stay boss-owned.
- `tdd-feedback-loops` is the single-agent version of the same loop; this skill scales it to many workers.
- `token-efficiency` model-selection ladder decides which worker tier gets each task.
