---
name: ubiquitous-language
description: >-
  Maintains a project markdown glossary so humans, code, and the agent share
  one domain vocabulary. Use when terms drift across docs, prompts, and code;
  when grilling or planning needs aligned language; or when the user mentions
  ubiquitous language, domain glossary, or DDD vocabulary.
---

# Ubiquitous language

## Principles

- Shared terms reduce context waste and implementation drift.
- Prefer `@file` references and code search over pasted glossaries or rich docs.
- Name the smallest useful artifact: a current glossary table, not a novel.

## Workflow

1. Locate or create a project glossary (prefer `docs/glossary.md` or a path the project already uses).
2. Scan code, tests, docs, and rules for domain nouns/verbs and overloaded synonyms.
3. Maintain a markdown table:

| Term | Definition | Where used     | Synonyms to avoid |
| ---- | ---------- | -------------- | ----------------- |
| …    | …          | path or symbol | …                 |

4. Keep the glossary open during `grill-me` and planning so questions and plans use the same words.
5. After naming modules or interfaces, update terms so `deep-modules-architecture` and `interface-first-delegation` stay aligned.

## Rules

- One preferred term per concept; list banned synonyms explicitly.
- Refresh on drift: if the agent or user invents a new name mid-task, stop and reconcile.
- Extract terms from clean Markdown or search hits—never dump raw PDFs/Word into chat.

## Sibling skills

- After shared understanding from `grill-me`, keep this glossary visible.
- Module and interface names belong here before `interface-first-delegation` plans.
- Test and feedback language should match glossary terms in `tdd-feedback-loops`.
