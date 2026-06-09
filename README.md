<p align="center">
  <img src="icon.png" alt="Hermes Agent Logo" width="21%">
</p>

# Hermes Agent on StartOS

> **Upstream repo:** <https://github.com/NousResearch/hermes-agent>
> · **Upstream docs:** <https://hermes-agent.nousresearch.com/docs>
>
> This package runs the **official upstream `nousresearch/hermes-agent` image** — it does **not** fork Hermes. Anything not described here behaves as upstream Hermes does; the upstream documentation is accurate and fully applicable.

[Hermes Agent](https://hermes-agent.nousresearch.com) is an open-source (MIT) autonomous AI agent from [Nous Research](https://nousresearch.com). It chats, runs tools, browses the web, edits files, and connects to messaging platforms (Telegram, Discord, Signal, Slack, Matrix, and more). It improves the longer it runs — building reusable skills, storing preferences, and carrying memory across sessions.

StartOS supplies what Hermes would otherwise need a wrapper for — authenticated network access, configuration forms, health visibility, and lifecycle management — so this package runs the upstream `hermes dashboard` and `hermes gateway` binaries directly, with only a thin StartOS layer added on top (root CA, `start-cli`, managed skills, and a baseline knowledge bundle).

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Configuration Management](#configuration-management)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Actions (StartOS UI)](#actions-startos-ui)
- [Dependencies](#dependencies)
- [Backups and Restore](#backups-and-restore)
- [Health Checks](#health-checks)
- [Limitations and Differences](#limitations-and-differences)
- [What Is Unchanged from Upstream](#what-is-unchanged-from-upstream)
- [Contributing](#contributing)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

| Property      | Value                                                                 |
| ------------- | --------------------------------------------------------------------- |
| Base image    | `nousresearch/hermes-agent` (official upstream, pinned by digest)     |
| StartOS layer | StartOS root CA + `start-cli`, `git`/`jq`/`ripgrep`, managed skills, baseline knowledge bundle (see `Dockerfile`) |
| Architectures | x86_64, aarch64                                                       |

All containers share one subcontainer of the `main` volume. The runtime is composed in `startos/main.ts`:

| Component | Kind | Command | Purpose |
| --------- | ---- | ------- | ------- |
| `install-root-ca` | oneshot | (installs the StartOS root CA into the image trust store) | Lets `start-cli` and the agent reach the local box over HTTPS |
| `chown` | oneshot | `chown -R 1000:1000 /opt/data` | Hand the data dir to the `hermes` user (uid/gid 1000) |
| `dashboard` | daemon | `hermes dashboard --host 0.0.0.0 --port 9119 --no-open` | Web UI: chat, config, sessions/memory, skills, logs, analytics, cron |
| `gateway` | daemon | `hermes gateway run` (`API_SERVER_*` env enables the internal API on `:8642`) | Messaging-platform integrations |
| `bundle-refresh` | daemon | ETag'd `curl` loop (24h) against the support knowledge bundle | Keeps the `startos-support` knowledge current |

`dashboard` and `gateway` require both oneshots before they start.

---

## Volume and Data Layout

| Volume | Mount Point | Purpose |
| ------ | ----------- | ------- |
| `main` | `/opt/data` | Hermes data dir (`HERMES_HOME`) — config, sessions, memory, skills state |

**Key paths:**

- `/opt/data/config.yaml`, `/opt/data/.env` — Hermes' own config + credentials (see Configuration).
- `/opt/data/.startos/knowledge/bundle.json` — the refreshable support knowledge bundle (live copy).
- `/opt/startos/skills`, `/opt/startos/knowledge/bundle.json` — **image-owned** managed context (the `start-cli` and `startos-support` skills, plus the baseline bundle). Outside the data volume so it updates with package upgrades and the agent cannot edit it.

---

## Installation and First-Run Flow

1. Install raises a **root-equivalent capability** alert (see Limitations) — Hermes runs an LLM that can execute commands on your behalf.
2. On first start, the **Configure Provider** action is a critical task: Hermes cannot run until an LLM backend resolves.
3. Pick a backend in **Configure Provider** (a cloud OpenAI-compatible / Gemini / Grok provider, or local **Ollama** / **vLLM**). Selecting Ollama or vLLM adds it as a running dependency and wires the backend URL automatically.
4. The **LLM Provider** health check turns green once a provider resolves; open the **Web Dashboard** to chat.
5. *(Optional)* Run **Login to StartOS** to authenticate the bundled `start-cli` so the agent can administer this server.

---

## Configuration Management

Hermes is configured through its own files on the data volume, modeled as StartOS file models (`startos/fileModels/`) for two-way binding with the dashboard's own editor:

- `config.yaml` — provider routing, `skills.external_dirs`, messaging channels.
- `.env` — provider credentials (e.g. `OPENAI_API_KEY`).

These files are **authoritative and two-way bound**: both the StartOS actions and the dashboard write them, so changes **merge** rather than clobber — config is not re-pushed via env-var overrides on every restart. The **Configure Provider** action writes the chosen LLM backend (and records it so `setupDependencies` can flip the Ollama/vLLM dependency); everything else is managed in the dashboard.

`skills.external_dirs` in `config.yaml` points at the image-owned `/opt/startos/skills`, so the managed `start-cli` and `startos-support` skills load without the agent being able to edit them.

---

## Network Access and Interfaces

| Interface | ID | Port | Protocol | Type | Purpose |
| --------- | -- | ---- | -------- | ---- | ------- |
| Web Dashboard | `ui` | 9119 | HTTP | ui | In-browser chat + full management UI |

The `gateway` API (`:8642`) is **internal only** — it is not exported as a StartOS interface; messaging platforms reach the agent through their own webhooks/long-poll, configured in the dashboard.

**Access methods:**

- LAN IP with unique port
- `<hostname>.local` with unique port
- Tor `.onion` address
- Custom domains (if configured)

---

## Actions (StartOS UI)

| Action | Purpose |
| ------ | ------- |
| **Configure Provider** | Select the LLM backend (OpenAI-compatible, Gemini, Grok, or local Ollama/vLLM) and write it into `config.yaml`/`.env`. Toggles the Ollama/vLLM dependency. |
| **Login to StartOS** | Install the StartOS root CA and authenticate the bundled `start-cli` against this server (asks for the master password). **Grants the agent root-equivalent control** — gated behind a warning. |

---

## Dependencies

Both are declared `optional` in the manifest and flipped to **running** dependencies by `setupDependencies` based on the Configure Provider selection (`startos/dependencies.ts`). Cloud providers need no dependency.

| Dependency | Version range | When required |
| ---------- | ------------- | ------------- |
| `ollama` | `>=0.21.0:0` | Backend set to Ollama |
| `vllm` | `>=0.16.0:0.1` | Backend set to vLLM |

---

## Backups and Restore

**Included in backup:**

- `main` volume — all Hermes data (config, sessions, memory, skills state, live knowledge bundle).

**Restore behavior:** the volume is fully restored before the service starts; the image-owned skills/baseline bundle come from the image, not the backup.

---

## Health Checks

| Check | Method | Messages |
| ----- | ------ | -------- |
| Web Dashboard | `checkWebUrl` on `:9119` | Success: "The dashboard is ready" / Error: "The dashboard is not ready" |
| Messaging Gateway | `checkPortListening` on `:8642` | Success: "The messaging gateway is running" / Error: "The messaging gateway is not running" |
| LLM Provider | Runs Hermes' `resolve_runtime_provider()` in the venv | Success: "An LLM provider is configured" / Error: "No LLM provider configured — run the Configure Provider action" |
| Knowledge Bundle | `test -f` on the live bundle | Success: "The support knowledge bundle is present" / Error: "The support knowledge bundle is not present" |

---

## Limitations and Differences

1. **Root-equivalent capability.** After **Login to StartOS**, the agent's `start-cli` skill can run any server command (uninstall services, change config, etc.) with no built-in confirmation step. The install alert and task warning gate this — keep them intact. Do not install on a server holding important data or keys (e.g. LND/CLN).
2. **Cloud-provider privacy.** With a cloud backend, every prompt and its context leave the device. Use Ollama or vLLM to keep inference on-device.
3. **No web-terminal wrapper.** The Hermes dashboard's Chat tab is already the full TUI in the browser, so this package does not add the Node web-terminal / Host-rewrite proxy that the Umbrel build needs — the upstream binaries are exposed directly.
4. **MCP is a future upgrade.** Live StartOS tools over the Model Context Protocol are not wired yet; server administration is via the `start-cli` skill and support is via the `startos-support` docs-search skill over the bundle.
5. **Support-docs scope.** The bundled knowledge covers StartOS, StartTunnel, and registry packages — not the s9pk Packaging book or Bitcoin Guides.
6. **Open build-time confirmations.** A few image assumptions are still pending verification against the upstream image — see [TODO.md](./TODO.md).

---

## What Is Unchanged from Upstream

- The `dashboard` and `gateway` are the **upstream Hermes binaries**, run as-is.
- All Hermes features: in-browser chat, config editor, sessions/memory, skill system, analytics, cron, and the full set of messaging-platform integrations.
- Hermes' own `config.yaml` / `.env` schema and provider model.

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the doc map, build instructions, and development workflow, and [UPDATING.md](./UPDATING.md) for bumping the upstream version.

---

## Quick Reference for AI Consumers

```yaml
package_id: hermes-agent
image: nousresearch/hermes-agent (official upstream, not forked)
architectures:
  - x86_64
  - aarch64
volumes:
  main: /opt/data
interfaces:
  ui: 9119 # Web Dashboard (chat + management)
internal_ports:
  gateway_api: 8642 # not exported as an interface
image_owned_context:
  skills: /opt/startos/skills
  baseline_bundle: /opt/startos/knowledge/bundle.json
dependencies: # optional; flipped to running by Configure Provider
  ollama: ">=0.21.0:0"
  vllm: ">=0.16.0:0.1"
actions:
  - Configure Provider
  - Login to StartOS # grants root-equivalent control
health_checks:
  - Web Dashboard
  - Messaging Gateway
  - LLM Provider
  - Knowledge Bundle
```
