---
name: coding-fundamentals
description: >-
  Distills software-fundamentals-for-AI-coding principles (design concept before
  assets, ubiquitous language, feedback loops/TDD, deep modules, interface-first
  design, token-efficient context use) and orchestrates creating a coherent
  family of child Agent Skills that embody them. Use when the user wants to build
  or refresh skills aligned with sustainable AI-assisted development, combat
  specs-to-code entropy, reduce context waste, or explicitly references the
  v4F1gFy-hqg transcript or “fundamentals matter more” AI coding philosophy.
---

# Coding fundamentals

## Source

Principles distilled from the AI-assisted coding talk captured in [YouTube: Software Fundamentals Matter More Than Ever (v4F1gFy-hqg)](https://www.youtube.com/watch?v=v4F1gFy-hqg). A full auto-caption transcript is optional local material; do not assume `v4F1gFy-hqg-transcript.md` exists in this repo.

The `verified-delegation` child skill additionally draws on the verified-swarm orchestration pattern from Nate B. Jones, ["How to Trust AI Agents: Verify the Work, Not the Model"](https://natesnewsletter.substack.com/p/trust-ai-agents) ([video: suY66oTDn0s](https://www.youtube.com/watch?v=suY66oTDn0s)).

## Thesis (carry into every child skill)

- **Good codebases matter more than ever.** AI performs far better on code that is easy to understand and change; a hard-to-change codebase wastes AI’s upside.
- **Bad code is more expensive with AI.** If the codebase is hard to change, the team cannot use AI’s speed safely; it only accelerates entropy.
- **“Code is cheap” is wrong here.** Iterating only on specs while ignoring implementation tends toward **software entropy** (each local change decays whole-system design). You get worse code each “compile” cycle, not better.
- **Complexity** (after Ousterhout): anything about system structure that makes the system hard to understand or modify. If you cannot change code without causing bugs, the codebase is failing you and the model.
- **Human = strategic; AI = tactical.** You own sustained design quality; the model owns many localized edits—provided boundaries, language, and feedback loops are right.
- **Context is design surface.** Token efficiency is not prompt-shortening for its own sake; it keeps the model’s attention on the design concept, domain language, module boundaries, tests, and interface decisions that make AI-assisted work reliable.

When authoring child skills, encode the above as non-negotiable context (short reminders in `description` or an opening “Principles” section).

---

## Orchestration: when the user asks for “this stack”

1. **Confirm scope** with the user: personal (`~/.claude/skills/`) vs project (`.claude/skills/`), and which child skills they already have.
2. **Read** Cursor’s create-skill guidance (`create-skill` skill): frontmatter, description rules, concise body, progressive disclosure, ≤500 lines for `SKILL.md`.
3. **Read** the shipped `token-efficiency` skill: carry only the minimum reusable rules into each child skill; do not duplicate the whole skill.
4. **Create or update child skills in the order below.** Each new skill gets its own directory `skill-name/SKILL.md`. Do not bundle unrelated workflows into one giant skill—match **one primary principle** per skill so descriptions stay discoverable.
5. **Cross-link:** In each child skill’s body, mention the sibling skills by **name** (“After shared understanding, open the ubiquitous-language skill…”) so the agent can chain workflows.
6. **Verify:** Third-person description with WHAT + WHEN; triggers include domain terms from that skill; no Windows backslash paths.

---

## Token efficiency integration

Use token efficiency as an operating constraint across the skill family, not as another child skill.

Every child skill should:

- Prefer `@file` references, search, and targeted reads over pasted file contents or raw documents.
- Keep the goal first, constraints second, context third; use lists when the work is naturally checklist-shaped.
- Use progressive disclosure: short `SKILL.md`, optional `reference.md` only for detailed examples or background.
- Name the smallest useful artifact: glossary, decision ledger, failing test, module map, or interface delta—not a sprawling plan.
- Treat repeated instructions as skill/rule material instead of retyping them into prompts.

Apply these mappings from the shipped `token-efficiency` skill:

- **Prompt signal-to-noise** supports `grill-me`: ask dense, dependency-aware questions and summarize decisions, not every conversational turn.
- **Document ingestion** supports `ubiquitous-language`: extract terms from clean Markdown or code search, not pasted rich files.
- **Task scoping** supports `tdd-feedback-loops`: keep work small enough that feedback stays cheap and frequent.
- **`.cursorignore` and context hygiene** support `deep-modules-architecture`: reduce index noise so module discovery finds real boundaries.
- **Output token awareness** supports `interface-first-delegation`: plans should name module/interface deltas precisely and avoid narrative filler.
- **Model selection** supports `verified-delegation`: route mechanical work to cheap proven models and reserve the capable model for specs, review, and dispute rulings.

---

## Child skill catalog (build in this order)

### 1. `grill-me` — shared design concept before plans or PRDs

**Idea:** _The Design of Design_ (Brooks): the **design concept** is the shared, evolving idea of what you are building—not a file. You and the model must align on that _before_ producing plan artifacts.

**Verbatim core prompt to embed** in the child `SKILL.md` (from the talk):

> Interview me relentlessly about every aspect of this plan until we reach a shared understanding. Walk down each branch of the design tree resolving dependencies between decisions one by one.

**Child skill must instruct the agent to:**

- Treat prompting as requirements gathering: no one fully knows what they want at the start, so the first job is to discover and sharpen intent.
- Prefer adversarial/elicitation mode over rushing a plan document.
- Branch the design tree explicitly; resolve dependent decisions in order.
- Only after saturation, summarize into a PRD, tickets, or executable plan—as **outputs of** alignment, not substitutes for it.

**Anti-pattern to call out:** Plan mode that “really wants to create an asset” before shared understanding.

---

### 2. `ubiquitous-language` — one glossary for people, code, and the model

**Idea:** Domain-Driven Design’s **ubiquitous language**: one consistent vocabulary across experts, codebase, and prompts.

**Child skill must instruct the agent to:**

- Maintain a project markdown glossary (tables: term, definition, where used in code, synonyms to avoid).
- Refresh it by scanning the codebase for domain terms and drift.
- Keep it **open during** grilling and planning so the model reasons with shorter, aligned terms (reduces vague verbosity and implementation drift).

---

### 3. `tdd-feedback-loops` — feedback rate = speed limit

**Ideas:** _The Pragmatic Programmer_—**outrunning your headlights**; types, tests, and (for front-end) **browser visibility** as fast feedback.

**Child skill must instruct the agent to:**

- Default to **small steps**: failing test → pass → refactor; do not land large unverified blobs.
- Enforce “speed limit = feedback frequency”: expand scope only when the last step is green (types/tests/tooling).
- Make test-design decisions explicit before writing broad tests: unit size, what to mock, and which behaviors matter are dependent choices.
- For UI work, require tools that let the model observe the running app when applicable.

**Bridge to architecture:** Note that **testable codebases** and **good structure** tighten the loop—point to the deep-modules skill.

---

### 4. `deep-modules-architecture` — structure for humans and models

**Idea:** Ousterhout (_A Philosophy of Software Design_): prefer **deep modules**—rich behavior behind **simple interfaces**—over many **shallow** pieces with wide, entangled surfaces.

**Child skill must instruct the agent to:**

- When improving layout, cluster related logic behind a narrow API; hide incomplete ideas inside the module.
- Explain why: shallow graphs exhaust context and exploration time; deep boundaries make behavior legible at a glance.
- Prefer tests at **module interfaces** once boundaries exist.

---

### 5. `interface-first-delegation` — you design the interface; delegate the interior

**Ideas:** Beck—invest in design **every day**; intentional module map in written plans.

**Child skill must instruct the agent to:**

- For non-trivial work, PRDs/plans must name **which modules** change and **how interfaces** evolve—not only user stories.
- Treat deep modules as **gray boxes** when appropriate: own the interface and tests; implementation can be delegated when risk allows (never hand-wave **high-risk** domains).
- Keep a module map visible during planning and implementation; module names and interface terms belong in the ubiquitous-language glossary.

**Anti-pattern:** Specs-to-code that **divests** from system design—treating code as disposable black noise.

---

### 6. `verified-delegation` — trust executed checks, not agent reports

**Idea:** Verified-swarm orchestration (Nate B. Jones): a capable "boss" model writes specs and reviews; cheap workers implement; every task ships with an **executed check** that decides pass/fail. No rank exemption—the boss's own output is checked too.

**Child skill must instruct the agent to:**

- Attach a spec, an executed check, and expected artifacts to every delegated task; never accept a worker's own completion report.
- Route work by price tier: the expensive model decides and reviews, cheap models type.
- Make checks print why they fail; retry once with raw failure context, then escalate to the boss.
- Enforce a written **constitution** (produced by `grill-me`) on every round instead of prompting task by task.
- Audition unfamiliar models on low-stakes checked tasks before trusting them with load-bearing work (`token-efficiency` audition ladder).

**Anti-pattern:** A check that cannot fail—that is trusting the worker with extra steps.

---

## Minimal orchestration checklist

Copy for the agent when spinning up the family:

```text
Fundamentals skill stack:
- [ ] token-efficiency constraints applied across all child skills
- [ ] grill-me — design concept first (Brooks)
- [ ] ubiquitous-language — DDD glossary, kept current
- [ ] tdd-feedback-loops — small steps; feedback = speed limit
- [ ] deep-modules-architecture — simple outsides, rich insides (Ousterhout)
- [ ] interface-first-delegation — plans name modules + interface deltas (Beck)
- [ ] verified-delegation — executed checks decide pass/fail, not agent reports
```

Use these folder names or equivalent; keep each skill’s YAML `name` field identical to its directory name.

---

## Optional reading list (for `reference.md` in any child skill)

Use progressive disclosure—only add if the user wants depth:

- John Ousterhout — _A Philosophy of Software Design_ (complexity, deep modules)
- Andrew Hunt, David Thomas — _The Pragmatic Programmer_ (entropy, feedback, “outrunning your headlights”)
- Frederick P. Brooks Jr. — _The Design of Design_ (design concept, design tree)
- Eric Evans — _Domain-Driven Design_ (ubiquitous language)
- Kent Beck — _Extreme Programming Explained_ (daily design investment)

---

## What this orchestrator is not

- It is **not** a replacement for `create-skill`: always follow Cursor skill format and token discipline when writing each `SKILL.md`.
- It does **not** prescribe a single tool (e.g. one vendor’s “plan mode”): it prescribes **behaviors** and **artifacts** that survived contact with entropy and shallow structure.
