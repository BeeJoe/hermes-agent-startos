# Contributing

Thanks for helping package Hermes Agent for StartOS.

## Documentation

Keep these in sync — when you change structure, conventions, build, or product context, update the relevant file in the **same** change:

- **`README.md`** — what this package is and what the user gets.
- **`ARCHITECTURE.md`** — how it's structured: daemons, config, contextualization, dependencies.
- **`CONTRIBUTING.md`** — this file: prerequisites, branch/commit/PR, build/test.
- **`CLAUDE.md`** — small; AI-developer operating rules and gotchas specific to this repo.

## Prerequisites

- [`start-cli`](https://docs.start9.com/latest/developer-guide/sdk/installing-the-sdk) on your `PATH`.
- Node.js + npm (for the TypeScript build).
- Docker (for the image build).

## Branch / commit / PR

- Default branch is **`master`**; CI (`build.yml`, `tagAndRelease.yml`) keys on it.
- Branch off `master`, open a PR back to `master`.
- Commits: lowercase imperative one-liners.

## Build / test

```sh
npm ci          # install
npm run check   # tsc --noEmit — must pass
make x86        # build the .s9pk for x86_64 (also: make arm)
make install    # install to the host in ~/.startos/config.yaml
```

## Versioning

The StartOS version mirrors the upstream Hermes calver with a StartOS revision suffix, e.g. upstream `v2026.5.16` → `2026.5.16:1`. Bump the pinned image (digest in `Dockerfile`), `HERMES_VERSION` in `startos/utils.ts`, and the version file under `startos/versions/` together, with release notes.
