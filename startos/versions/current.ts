import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2026.6.5:0',
  releaseNotes: {
    en_US: 'Initial StartOS packaging of Hermes Agent.',
    es_ES: 'Empaquetado inicial de Hermes Agent para StartOS.',
    de_DE: 'Erste StartOS-Paketierung von Hermes Agent.',
    pl_PL: 'Pierwsze spakowanie Hermes Agent dla StartOS.',
    fr_FR: 'Empaquetage initial de Hermes Agent pour StartOS.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
