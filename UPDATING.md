# Updating the upstream version

This package runs the **official upstream `nousresearch/hermes-agent` image** — it does not fork or rebuild Hermes. "Upstream" means that published image. The package also bakes in a `start-cli` binary, which tracks a separate StartOS release (see the bottom of this page).

## Determining the upstream version

- **Hermes** ([`NousResearch/hermes-agent`](https://github.com/NousResearch/hermes-agent)) — latest release tag:

  ```bash
  gh release view -R NousResearch/hermes-agent --json tagName -q .tagName
  ```

  Cross-check it has been published to Docker Hub:

  ```bash
  curl -fsSL "https://hub.docker.com/v2/repositories/nousresearch/hermes-agent/tags?page_size=20&ordering=last_updated" | jq -r '.results[].name'
  ```

  Then resolve the **multi-arch manifest-list digest** for the tag (this is what the `Dockerfile`'s `FROM` pins, not a per-arch digest):

  ```bash
  docker buildx imagetools inspect nousresearch/hermes-agent:<tag>
  ```

  The current pin lives in `Dockerfile` (`FROM nousresearch/hermes-agent:v<version>@sha256:<digest>`) and is mirrored as `HERMES_VERSION` in `startos/utils.ts`.

## Applying the bump

- **`Dockerfile`** — set `FROM nousresearch/hermes-agent:v<new version>@sha256:<new list digest>` and update the `# To bump:` comment to the new tag. Confirm the new image still satisfies the hardcoded assumptions in the rest of the `Dockerfile` (`/opt/hermes/.venv` on PATH, `HERMES_HOME=/opt/data`, root user, `/opt/hermes` workdir).
- **`startos/utils.ts`** — set `HERMES_VERSION` to `<new version>` (without the leading `v`).
- **`startos/versions/current.ts`** — edit in place: set `version` to `'<new version>:0'` (the `:N` revision resets to `0` on a new upstream version) and update `releaseNotes` (all locales). Leave `index.ts` and the `current` export untouched. Only spin off a historical version file when the bump carries an `up`/`down` migration.

## The baked `start-cli` (`STARTOS_VERSION`)

Separate from the Hermes image, the `Dockerfile` downloads a `start-cli` binary for the **Login to StartOS** skill, pinned by `STARTOS_VERSION` in `startos/utils.ts`. It tracks a [`Start9Labs/start-os`](https://github.com/Start9Labs/start-os) release, not Hermes:

```bash
gh release view -R Start9Labs/start-os --json tagName -q .tagName
```

Set `STARTOS_VERSION` to that tag without the leading `v` (the `Dockerfile` prepends `v` when building the download URL). The release must publish `start-cli_x86_64-linux` and `start-cli_aarch64-linux` assets, which the `$(uname -m)` download depends on.
