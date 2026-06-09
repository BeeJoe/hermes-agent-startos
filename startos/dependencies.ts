import { sdk } from './sdk'
import { storeJson } from './fileModels/store.json'

export const setDependencies = sdk.setupDependencies(async ({ effects }) => {
  const backend = await storeJson.read((s) => s.backend).once()

  if (backend === 'ollama') {
    return {
      ollama: {
        kind: 'running',
        versionRange: '>=0.21.0:0',
        healthChecks: ['primary'],
      },
    }
  }

  if (backend === 'vllm') {
    return {
      vllm: {
        kind: 'running',
        versionRange: '>=0.16.0:0.1',
        healthChecks: ['primary'],
      },
    }
  }

  if (backend === 'llama-cpp') {
    return {
      'llama-cpp': {
        kind: 'running',
        // Keyless release (the separate API key was dropped); Hermes connects
        // to the internal endpoint without auth.
        versionRange: '>=1.0.9544:0',
        healthChecks: ['primary'],
      },
    }
  }

  return {}
})
