import { sdk } from '../sdk'
import { envFile } from '../fileModels/envFile'
import { storeJson } from '../fileModels/store.json'
import { setDependencies } from '../dependencies'
import { i18n } from '../i18n'

const { InputSpec, Value, Variants } = sdk

// Local-inference backends are auto-wired to the registry packages' addresses.
const OLLAMA_BASE_URL = 'http://ollama.startos:11434/v1'
const VLLM_BASE_URL = 'http://vllm.startos:8000/v1'

// TODO(build): confirm Hermes' exact provider env-var names and config.yaml
// routing keys against the upstream config schema. The mapping below is the
// scaffold's best guess (OpenAI-compatible path for local + cloud-compatible).

const modelField = Value.text({
  name: i18n('Model'),
  description: i18n('The model identifier to use (e.g. the served model name)'),
  required: true,
  default: null,
})

const apiKeyField = (placeholder: string) =>
  Value.text({
    name: i18n('API Key'),
    description: i18n('API key for this provider'),
    required: true,
    default: null,
    masked: true,
    placeholder,
  })

const providerVariants = Variants.of({
  'openai-compatible': {
    name: i18n('OpenAI-Compatible'),
    spec: InputSpec.of({
      baseUrl: Value.text({
        name: i18n('Base URL'),
        description: i18n(
          'OpenAI-compatible API base URL, e.g. https://api.openai.com/v1',
        ),
        required: true,
        default: null,
        placeholder: 'https://api.openai.com/v1',
      }),
      apiKey: apiKeyField('sk-...'),
      model: modelField,
    }),
  },
  gemini: {
    name: i18n('Google Gemini'),
    spec: InputSpec.of({ apiKey: apiKeyField('...'), model: modelField }),
  },
  grok: {
    name: i18n('xAI Grok'),
    spec: InputSpec.of({ apiKey: apiKeyField('xai-...'), model: modelField }),
  },
  ollama: {
    name: i18n('Ollama (local)'),
    spec: InputSpec.of({ model: modelField }),
  },
  vllm: {
    name: i18n('vLLM (local)'),
    spec: InputSpec.of({ model: modelField }),
  },
})

const inputSpec = InputSpec.of({
  provider: Value.union({
    name: i18n('LLM Provider'),
    description: i18n(
      'Choose the model backend. Ollama and vLLM run locally on your server (added as a dependency); the rest are cloud providers requiring an API key.',
    ),
    default: 'ollama',
    variants: providerVariants,
  }),
})

export const configureProvider = sdk.Action.withInput(
  'configure-provider',

  async ({ effects }) => ({
    name: i18n('Configure Provider'),
    description: i18n(
      'Choose and configure the LLM backend Hermes uses (local Ollama/vLLM, or a cloud provider)',
    ),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  inputSpec,

  // TODO(build): pre-fill from current config once the routing shape is pinned.
  async ({ effects }) => null,

  async ({ effects, input }) => {
    const provider = input.provider as any
    const sel: string = provider.selection
    const val = provider.value ?? {}

    if (sel === 'ollama') {
      await storeJson.merge(effects, { backend: 'ollama' })
      await envFile.merge(effects, { OPENAI_BASE_URL: OLLAMA_BASE_URL })
    } else if (sel === 'vllm') {
      await storeJson.merge(effects, { backend: 'vllm' })
      // TODO(build): read vLLM's published API key from its `public` credentials
      // volume (see open-webui's vllmCredentials) and write it here.
      await envFile.merge(effects, { OPENAI_BASE_URL: VLLM_BASE_URL })
    } else {
      await storeJson.merge(effects, { backend: 'cloud' })
      if (sel === 'openai-compatible') {
        await envFile.merge(effects, {
          OPENAI_BASE_URL: val.baseUrl,
          OPENAI_API_KEY: val.apiKey,
        })
      } else if (sel === 'gemini') {
        await envFile.merge(effects, { GEMINI_API_KEY: val.apiKey })
      } else if (sel === 'grok') {
        await envFile.merge(effects, { XAI_API_KEY: val.apiKey })
      }
    }

    // TODO(build): write the selected model into Hermes' config.yaml provider
    // routing once that shape is pinned (configYaml.merge — loose passthrough
    // preserves the rest). The .env credentials above are enough to resolve a
    // provider for now.

    await setDependencies(effects)
    await effects.restart()
  },
)
