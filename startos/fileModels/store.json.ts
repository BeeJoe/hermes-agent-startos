import { FileHelper, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

/**
 * Package-owned state (not Hermes config). Tracks which LLM backend the user
 * picked in Configure Provider, so dependencies.ts knows whether to require
 * ollama / vllm. Kept separate from config.yaml to avoid polluting Hermes' own
 * file.
 */
const shape = z.looseObject({
  backend: z.enum(['cloud', 'ollama', 'vllm']).catch('cloud'),
})

export const storeJson = FileHelper.json(
  { base: sdk.volumes.main, subpath: '.startos/store.json' },
  shape,
)
