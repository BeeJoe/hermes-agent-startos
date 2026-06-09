# TODO

Open build-time questions to confirm against the upstream image before this package
is built and shipped (all currently assumed in code, see `startos/utils.ts`):

- **Dashboard listen port / flag** — confirm the `hermes dashboard` default (or required flag)
  listen port. Assumed `9119` (`dashboardPort`). Umbrel proxied the upstream dashboard at
  `127.0.0.1:9119`.
- **Dashboard `Host`-header handling** — confirm the dashboard accepts requests when bound to
  `0.0.0.0` behind the StartOS `ui` interface (allowed-hosts flag vs. a proxy).
- **Knowledge bundle URL** — confirm the canonical `support-server` bundle endpoint. Assumed
  `https://start9.me/_api/knowledge/bundle` (`BUNDLE_URL`).
