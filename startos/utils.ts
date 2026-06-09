import { sdk } from './sdk'

// Hermes dashboard (web UI + in-browser chat). Bound as the StartOS `ui` interface.
// TODO(build): confirm the dashboard's default/flagged listen port (Umbrel proxied
// the upstream dashboard at 127.0.0.1:9119).
export const dashboardPort = 9119

// Hermes gateway API server (messaging integrations). Internal only.
export const gatewayApiPort = 8642

// Hermes data dir on the volume — matches the upstream image (HOME=/opt/data, uid 1000).
export const dataDir = '/opt/data'

// Image-owned managed context (skills + baseline knowledge bundle). Lives outside
// the data volume so the agent cannot edit it and it updates with package upgrades.
export const skillsDir = '/opt/startos/skills'
export const baselineBundlePath = '/opt/startos/knowledge/bundle.json'
// Where the (refreshable) live bundle is kept on the data volume.
export const bundlePath = `${dataDir}/.startos/knowledge/bundle.json`

// Upstream Hermes version this package wraps (mirror of the pinned image tag).
export const HERMES_VERSION = '2026.6.5'

// StartOS release whose start-cli binary the image installs (see UPDATING.md).
export const STARTOS_VERSION = '0.4.0-beta.9'

// support-server's published knowledge bundle (full doc text + known issues +
// registry package info). Periodically re-fetched in the background.
// TODO(build): confirm the canonical bundle URL.
export const BUNDLE_URL = 'https://start9.me/_api/knowledge/bundle'

export function mainMounts() {
  return sdk.Mounts.of().mountVolume({
    volumeId: 'main',
    subpath: null,
    mountpoint: dataDir,
    readonly: false,
  })
}
