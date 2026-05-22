# Architecture

This package wraps the **official `nousresearch/hermes-agent` image** with a thin StartOS layer. Nothing about Hermes itself is forked — we add the StartOS root CA, `start-cli`, managed skills, and a baseline knowledge bundle, then drive the upstream `hermes dashboard` and `hermes gateway` processes as StartOS daemons.

## Why so little wrapper code

The Umbrel build of Hermes ships a Node web-terminal, an anti-CSWSH token, a Host-rewrite proxy, a setup-wizard detector, and update/restart blocks — all to compensate for things Umbrel lacks. StartOS provides them natively (authenticated interfaces, config forms, health checks, lifecycle), so this package drops all of that and runs the upstream binaries directly. The Hermes **dashboard** already includes in-browser chat (the Chat tab is the full TUI), so no terminal wrapper is needed.

## Containers / daemons

Two daemons share the `main` volume (mounted at `/opt/data`, Hermes' data dir):

| Daemon | Command | Purpose | Ready check |
|--------|---------|---------|-------------|
| `dashboard` | `hermes dashboard --host 0.0.0.0` | Web UI: chat, config, logs, analytics, cron | `checkWebUrl` on the dashboard port |
| `gateway` | `hermes gateway run` | Messaging-platform integrations; internal API on `:8642` | `checkWebUrl` on `:8642` |

Plus a standalone **`provider-configured`** health check that runs Hermes' own `resolve_runtime_provider()` — green once an LLM provider resolves, otherwise it points the user at the Configure Provider action.

## Configuration

Hermes is configured through two files on the data volume, modeled as StartOS file models for 2-way binding with the dashboard's own editor:

- `config.yaml` — provider routing, `skills.external_dirs`, messaging channels, (future) `mcp_servers`.
- `.env` — provider credentials (e.g. `OPENAI_API_KEY`).

The **Configure Provider** action writes the LLM backend (and toggles the Ollama/vLLM dependency); everything else is managed in the dashboard.

## Contextualization (StartOS awareness)

Two image-owned skills under `skills.external_dirs`:

- **`start-cli`** — server administration. The `Login to StartOS` action authenticates `start-cli` against the local box (master password → `start-cli auth login`, after installing the StartOS root CA). Grants root-equivalent control — gated behind a critical task and a warning.
- **`startos-support`** — end-user support. A `docs-search` script queries the Start9 documentation **knowledge bundle** published by `support-server` (full page text + known issues + registry package info). The baseline `bundle.json` is baked into the image and replaced by a periodic background refresh (ETag'd HTTP fetch — no live crawling, no per-query web fetch).

> **Future:** when the StartOS MCP server ships, add `Grant/Revoke Access` agent-plugin actions (`createAgentSession` → write `mcp_servers.startos` into `config.yaml`) so Hermes gets live StartOS tools. Designed for, not built yet.

## Dependencies

`setupDependencies` conditionally requires `ollama` and/or `vllm` from the registry based on the Configure Provider selection, wiring the backend base URL automatically (vLLM's API key is read from its `public` credentials volume). Cloud providers need no dependency.

## Known gaps

- The `support-server` knowledge bundle currently indexes only the StartOS and StartTunnel books (plus packages/upstream) — **not** the Packaging book or Bitcoin Guides. Fine for the support+admin scope of this package; revisit if scope expands.
- Dashboard `Host`-header handling when bound to `0.0.0.0` needs build-time confirmation (allowed-hosts flag vs. proxy).
