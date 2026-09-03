---
name: token-efficiency
description: >-
  Cuts context waste while keeping signal: document ingestion, conversation
  hygiene, MCP audit, prompt SNR, .cursorignore, always-apply rules, and task
  scoping. Use when optimizing tokens, context window, prompt efficiency, MCP
  cost, rule audit, or coding-fundamentals child skills need lean context.
---

# Token efficiency

Cut waste. Keep signal. Every token costs money and context window space.

Use this as an operating constraint across the fundamentals skill family—not a substitute for those skills.

## 1. Document ingestion

- No raw PDFs/Word/rich files in chat. Convert to clean Markdown first.
- Large docs: extract the relevant section only. Never dump whole files.
- Use `@file` refs. Let the indexer handle it.

## 2. Conversation hygiene

- New chat per task. One topic, one thread.
- Past turn 12–15: start fresh; summarize prior work in 2–3 sentences.
- Batch related asks into one structured prompt.

## 3. MCP / plugin audit

Each MCP server injects tool schemas into every conversation. Idle servers are a silent tax.

**Monthly audit:** list enabled servers → count tools → disable unused or wrong-project servers → re-enable when needed.

**Compression option:** [mcp-compressor](https://github.com/atlassian-labs/mcp-compressor) wraps N tools into 2 (`get_tool_schema` + `invoke_tool`).

## 4. Model selection

- Deep reasoning, architecture, multi-file refactors: capable default model.
- Scoped edits, searches, shell: fast subagent when available.
- Formatting, rename, boilerplate: fast path or inline edit.

**Audition ladder** for cheap or unfamiliar models: untested → probation → proven.

- Audition on small, low-stakes tasks with a strong executed check (`verified-delegation`).
- Promote on evidence—first-try pass rate on your own tasks—not benchmarks or vibes.
- Route load-bearing work to proven models; keep a small slice of runs auditioning candidates.

## 5. Prompt signal-to-noise

Goal first. Constraints second. Context third. Lists over prose. `@file` over paste.

- Repetitive instructions → encode as rules/skills. Do not retype.
- Trust injected rules/skills. Do not restate them.
- Kill filler, hedging, and redundant politeness.

## 6. `.cursorignore`

Add `.cursorignore` at project root (gitignore syntax). Exclude build artifacts, locks, generated code, and heavy binaries so `@codebase` stays on real sources.

## 7. Always-apply rules audit

Keep `alwaysApply` only for truly universal standards. Prefer glob-scoped or description-triggered rules for file-type or stack-specific guidance.

## 8. Output token awareness

- Specify exact output format and length constraints.
- Request bullets, not prose, when that fits the task.
- Code gen: no narrating comments or redundant imports.

## 9. Task scoping

- Plan before coding when the path is unclear.
- Scope to a small file set; break big features; verify between steps.
- Wrong result? Revert and re-plan. Do not stack fix-on-fix.

## 10. Cache-friendly workflow

Keep rules/skills stable (they form the prompt prefix). Prefer stable guidance over frequent rewrites.

## Anti-patterns

- Paste entire files when few lines matter
- One chat all day (drift past turn 12)
- MCP servers enabled “just in case”
- Restate context already in rules/skills
- `alwaysApply` on file-type-specific rules
- No `.cursorignore` in a large monorepo
- Manual `@`-tag of many files when search finds two or three

## Fundamentals mappings

- **Prompt SNR** → dense questions in `grill-me`
- **Document ingestion** → glossary work in `ubiquitous-language`
- **Task scoping** → small steps in `tdd-feedback-loops`
- **Index hygiene** → module discovery in `deep-modules-architecture`
- **Output awareness** → precise interface deltas in `interface-first-delegation`
- **Model selection** → boss/worker routing in `verified-delegation`
