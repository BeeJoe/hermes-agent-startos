import { installRootCA } from './actions/loginToOs'
import { configYaml } from './fileModels/configYaml'
import { i18n } from './i18n'
import { sdk } from './sdk'
import {
  BUNDLE_URL,
  bundlePath,
  dashboardPort,
  dataDir,
  gatewayApiPort,
  mainMounts,
} from './utils'

// Probe Hermes' own provider resolver — exit 0 iff a usable LLM provider is
// configured (it raises otherwise). Run with the venv python so hermes_cli is
// importable; it reads config.yaml via HERMES_HOME plus the .env we load here.
const PROVIDER_PROBE = `from dotenv import load_dotenv
from hermes_cli.runtime_provider import resolve_runtime_provider
load_dotenv("${dataDir}/.env")
resolve_runtime_provider()
`

export const main = sdk.setupMain(async ({ effects }) => {
  console.info(i18n('Starting Hermes Agent!'))

  // Re-run main when the managed skills wiring changes.
  await configYaml.read((c) => c.skills?.external_dirs).const(effects)

  const sub = await sdk.SubContainer.of(
    effects,
    { imageId: 'hermes-agent' },
    mainMounts(),
    'hermes-sub',
  )

  const env = {
    HOME: dataDir,
    NODE_EXTRA_CA_CERTS: '/etc/ssl/certs/ca-certificates.crt',
  }

  const etagPath = `${dataDir}/.startos/knowledge/bundle.etag`
  const tmpPath = `${bundlePath}.tmp`

  return (
    sdk.Daemons.of(effects)
      .addOneshot('install-root-ca', {
        subcontainer: sub,
        exec: {
          fn: async (subcontainer) => {
            await installRootCA(effects, subcontainer)
            return null
          },
        },
        requires: [],
      })
      .addOneshot('chown', {
        subcontainer: sub,
        exec: { command: ['chown', '-R', '1000:1000', dataDir] },
        requires: [],
      })
      .addDaemon('dashboard', {
        subcontainer: sub,
        exec: {
          // `--insecure` because StartOS authenticates the `ui` interface itself:
          // on a non-loopback bind the dashboard's own OAuth gate otherwise fails
          // closed (no provider registered). The dashboard injects its session
          // token into the served SPA, so the proxied browser authenticates
          // automatically; a 0.0.0.0 bind accepts any Host header (no allowed-hosts
          // flag needed). Mirrors upstream's own container command.
          command: [
            'hermes',
            'dashboard',
            '--host',
            '0.0.0.0',
            '--port',
            dashboardPort.toString(),
            '--no-open',
            '--insecure',
          ],
          env,
        },
        ready: {
          display: i18n('Web Dashboard'),
          gracePeriod: 60_000,
          fn: () =>
            sdk.healthCheck.checkWebUrl(
              effects,
              `http://hermes-agent.startos:${dashboardPort}`,
              {
                successMessage: i18n('The dashboard is ready'),
                errorMessage: i18n('The dashboard is not ready'),
              },
            ),
        },
        requires: ['install-root-ca', 'chown'],
      })
      .addDaemon('gateway', {
        subcontainer: sub,
        exec: {
          command: ['hermes', 'gateway', 'run'],
          env: {
            ...env,
            API_SERVER_ENABLED: 'true',
            API_SERVER_HOST: '0.0.0.0',
            API_SERVER_PORT: gatewayApiPort.toString(),
          },
        },
        ready: {
          display: i18n('Messaging Gateway'),
          gracePeriod: 60_000,
          fn: () =>
            sdk.healthCheck.checkPortListening(effects, gatewayApiPort, {
              successMessage: i18n('The messaging gateway is running'),
              errorMessage: i18n('The messaging gateway is not running'),
            }),
        },
        requires: ['install-root-ca', 'chown'],
      })
      // Surfaces onboarding state: green once an LLM provider resolves, otherwise
      // points the user at the Configure Provider action.
      .addHealthCheck('provider-configured', {
        ready: {
          display: i18n('LLM Provider'),
          gracePeriod: 30_000,
          fn: () =>
            sdk.healthCheck.runHealthScript(
              ['/opt/hermes/.venv/bin/python3', '-c', PROVIDER_PROBE],
              sub,
              {
                errorMessage: i18n(
                  'No LLM provider configured — run the Configure Provider action',
                ),
                message: () => i18n('An LLM provider is configured'),
              },
            ),
        },
        requires: [],
      })
      // Background refresh of the support knowledge bundle (ETag'd HTTP GET).
      .addDaemon('bundle-refresh', {
        subcontainer: sub,
        exec: {
          command: [
            'sh',
            '-c',
            `while true; do ` +
              `curl -fsS --etag-compare "${etagPath}" --etag-save "${etagPath}" -o "${tmpPath}" "${BUNDLE_URL}" ` +
              `&& [ -s "${tmpPath}" ] && mv "${tmpPath}" "${bundlePath}"; ` +
              `sleep 86400; done`,
          ],
          env,
        },
        ready: {
          display: i18n('Knowledge Bundle'),
          gracePeriod: 30_000,
          fn: () =>
            sdk.healthCheck.runHealthScript(['test', '-f', bundlePath], sub, {
              errorMessage: i18n('The support knowledge bundle is not present'),
              message: () => i18n('The support knowledge bundle is present'),
            }),
        },
        requires: [],
      })
  )
})
