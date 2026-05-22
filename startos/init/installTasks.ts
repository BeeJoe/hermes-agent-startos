import { configureProvider } from '../actions/configureProvider'
import { loginToOs } from '../actions/loginToOs'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

export const installTasks = sdk.setupOnInit(async (effects, kind) => {
  if (kind !== 'install') return

  // Choosing an LLM backend is required before Hermes is usable.
  await sdk.action.createOwnTask(effects, configureProvider, 'critical', {
    reason: i18n('Choose and configure an LLM backend so Hermes can run'),
  })

  // Optional: grant the agent server-administration access via start-cli.
  await sdk.action.createOwnTask(effects, loginToOs, 'optional', {
    reason: i18n(
      'Optionally authenticate start-cli so Hermes can administer this server',
    ),
  })
})
