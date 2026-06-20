import { storeJson } from '../fileModels/store.json'
import { sdk } from '../sdk'

// The OpenAI Codex completion task is created on demand by Configure Provider
// when a device-code login is started, and it is critical (a critical task
// blocks the service from starting). Reconcile it on every init so a stale task
// can never linger — and take the service down — once the login is gone: after
// completion, after switching to another provider, or when an unfinished flow
// expires. The task is kept only while a valid login is actually pending.
export const reconcileCodexTask = sdk.setupOnInit(async (effects) => {
  const store = await storeJson.read().const(effects)
  const pending = store?.codexOAuth
  const valid = !!pending && Date.parse(pending.expiresAt) > Date.now()
  if (!valid) {
    await sdk.action.clearTask(effects, 'hermes-agent:complete-codex-oauth')
  }
})
