---
title: "llmusage"
summary: "An open-source Rust CLI that tracks LLM token usage and costs across Claude Code, Cursor, Codex, Gemini CLI, and API providers — all in a single local SQLite database."
date: "Apr 17 2026"
tags:
- open-source
- rust
- cli
- llm
- ai
- developer-tools
draft: false
repoUrl: https://github.com/openrijal/llmusage
---

**llmusage** is a command-line tool that answers a simple question: *how much is my AI habit actually costing me?*

Every AI coding tool — Claude Code, Cursor, Codex, Gemini CLI — stores usage data in its own silo. llmusage pulls from all of them, deduplicates into a local SQLite database, and gives you a unified view of your token usage and spend.

## Key Features

- **One command sync** — `llmusage sync` auto-detects local tools and pulls usage data
- **Unified reporting** — `summary`, `daily`, `weekly`, `monthly` breakdowns by provider/model
- **8 sources supported** — Claude Code, Codex, Cursor, OpenCode, Gemini CLI, Anthropic API, OpenAI API, Ollama
- **Zero dependencies** — single static binary, no runtime needed
- **Privacy-first** — everything stays local in SQLite, nothing phones home
- **Export anywhere** — CSV and JSON output for dashboards or spreadsheets

## Install

```bash
# Quick install (no Rust toolchain needed)
curl -LsSf https://raw.githubusercontent.com/openrijal/llmusage/main/install.sh | sh

# Or via Homebrew
brew install openrijal/tap/llmusage

# Or via Cargo
cargo install llmusage
```

Built in Rust for single-binary distribution and fast parsing of months of session logs. MIT licensed.

<a href="https://github.com/openrijal/llmusage" target="_blank">View on GitHub &rarr;</a>
