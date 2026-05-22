See `CONTRIBUTING.md` for the doc map, build, and workflow.

# Operating rules — gotchas specific to this repo

- **Don't fork Hermes.** This package runs the official `nousresearch/hermes-agent` image. The `dashboard` and `gateway` are upstream binaries; we only add the StartOS root CA, `start-cli`, skills, and the knowledge bundle. If you find yourself reimplementing Hermes behavior, stop — wire StartOS around it instead.
- **The Hermes dashboard already has chat.** Its Chat tab is the full TUI in the browser. Do not add a web-terminal wrapper (that's an Umbrel-only crutch); expose the dashboard `ui` interface and let it serve chat + management.
- **Config lives in Hermes' own files, 2-way bound.** `config.yaml` + `.env` on the data volume are authoritative. Our actions and the dashboard both write them — merge, don't clobber. Don't push config via env-var overrides on every restart.
- **Skills and the bundle are image-owned, under `/opt/startos`.** They update with package upgrades and live outside `/opt/data` so the agent can't edit managed instructions. `skills.external_dirs` in `config.yaml` points at them.
- **MCP is a future upgrade, not present.** Server admin is via the `start-cli` skill; support is via the docs-search skill over the bundle. Don't wire `mcp_servers.startos` until the StartOS MCP server actually ships.
- **`start-cli` auth = root-equivalent.** The Login action grants the agent full server control. Keep the install alert and the task warning intact.
