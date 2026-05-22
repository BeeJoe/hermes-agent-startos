export const DEFAULT_LANG = 'en_US'

const dict = {
  'API Key': 0,
  'API key for this provider': 1,
  'An LLM provider is configured': 2,
  'Authenticate start-cli so Hermes can administer this StartOS server': 3,
  'Base URL': 4,
  'Choose and configure an LLM backend so Hermes can run': 5,
  'Choose and configure the LLM backend Hermes uses (local Ollama/vLLM, or a cloud provider)': 6,
  'Choose the model backend. Ollama and vLLM run locally on your server (added as a dependency); the rest are cloud providers requiring an API key.': 7,
  'Configure Provider': 8,
  'Enter master password': 9,
  'Google Gemini': 10,
  'Knowledge Bundle': 11,
  'LLM Provider': 12,
  'Login Successful': 13,
  'Login to StartOS': 14,
  'Messaging Gateway': 15,
  'Model': 16,
  'No LLM provider configured — run the Configure Provider action': 17,
  'No host configured. The host URL is set automatically from the OS IP address.': 18,
  'Ollama (local)': 19,
  'OpenAI-Compatible': 20,
  'OpenAI-compatible API base URL, e.g. https://api.openai.com/v1': 21,
  'Optionally authenticate start-cli so Hermes can administer this server': 22,
  'StartOS Master Password': 23,
  'Starting Hermes Agent!': 24,
  'The Hermes dashboard: in-browser chat plus configuration, sessions, skills, logs, analytics, and cron scheduling': 25,
  'The dashboard is not ready': 26,
  'The dashboard is ready': 27,
  'The messaging gateway is not running': 28,
  'The messaging gateway is running': 29,
  'The model identifier to use (e.g. the served model name)': 30,
  'The support knowledge bundle is not present': 31,
  'The support knowledge bundle is present': 32,
  'This grants Hermes root-equivalent control of your StartOS server through start-cli. Only do this on a server designated for development or experimentation.': 33,
  'Web Dashboard': 34,
  'Your StartOS server master password': 35,
  'start-cli is now authenticated with your StartOS server.': 36,
  'vLLM (local)': 37,
  'xAI Grok': 38,
} as const

/**
 * Plumbing. DO NOT EDIT.
 */
export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
