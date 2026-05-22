export const short = {
  en_US: 'Self-improving autonomous AI agent that runs on your own server',
}

export const long = {
  en_US:
    'Hermes Agent is an open-source autonomous AI agent from Nous Research. It chats, runs tools, browses the web, edits files, and connects to messaging platforms (Telegram, Discord, Signal, Slack, Matrix, and more). It improves the longer it runs — building reusable skills, storing preferences, and carrying memory across sessions. On StartOS it runs the official upstream image with a web dashboard (chat + management), an optional local LLM backend (Ollama or vLLM), and StartOS-aware skills for server administration and support.',
}

export const installAlert = {
  en_US:
    'Use with caution. Hermes runs an LLM of your choosing that can execute commands on your behalf. Granting it start-cli access (the "Login to StartOS" action) gives it root-equivalent control of this server — it could run destructive commands or uninstall other services. Do NOT install on a server holding important data or keys (e.g. LND or CLN). When using a cloud LLM provider, your prompts and context leave the device.',
}
