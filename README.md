# Hermes Agent for StartOS

[Hermes Agent](https://hermes-agent.nousresearch.com) is an open-source (MIT) autonomous AI agent from [Nous Research](https://nousresearch.com). It chats, runs tools, browses the web, edits files, and connects to messaging platforms (Telegram, Discord, Signal, Slack, Matrix, and more). It gets better the longer it runs — building reusable skills, storing preferences, and carrying memory across sessions.

This package runs the **official upstream Hermes image** on StartOS — it does not fork Hermes. StartOS supplies what Hermes would otherwise need a wrapper for: authenticated network access, configuration forms, health visibility, and lifecycle management.

## What you get

- **Web dashboard** (Tor + LAN, behind StartOS auth) — full in-browser chat (the Hermes TUI), config editor, session/memory browser, skill toggles, logs, token/cost analytics, and cron scheduling.
- **Messaging gateway** — connect Telegram, Discord, and other platforms to talk to the same agent anywhere.
- **Configure Provider action** — pick your LLM backend (OpenAI-compatible, Gemini, Grok, or local **Ollama** / **vLLM**) from a StartOS form. No terminal wizard.
- **Local inference, optionally** — enable Ollama or vLLM as a StartOS dependency and the backend URL is wired automatically. No cloud API key required.
- **StartOS-aware** — ships a `start-cli` skill so the agent can administer your server, and a `startos-support` skill backed by the Start9 documentation knowledge bundle (refreshed in the background).

## ⚠️ Install with care

Hermes runs an LLM that can execute commands on your behalf. Granting it `start-cli` access (the "Login to StartOS" action) gives it root-equivalent control of your server. Do **not** install on a server holding important data or keys (e.g. LND/CLN). Treat it as a development/experimentation tool.

## Documentation

See [docs.start9.com](https://docs.start9.com). For development, build, and contribution details, see [`CONTRIBUTING.md`](./CONTRIBUTING.md).
