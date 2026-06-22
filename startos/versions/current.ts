import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2026.6.19:0',
  releaseNotes: {
    en_US:
      'Initial StartOS release of Hermes Agent, wrapping upstream Hermes v2026.6.19 (0.17.0).',
    es_ES:
      'Versión inicial de Hermes Agent para StartOS, basada en Hermes upstream v2026.6.19 (0.17.0).',
    de_DE:
      'Erste StartOS-Veröffentlichung von Hermes Agent, basierend auf Upstream-Hermes v2026.6.19 (0.17.0).',
    pl_PL:
      'Pierwsze wydanie Hermes Agent dla StartOS, oparte na upstreamowym Hermes v2026.6.19 (0.17.0).',
    fr_FR:
      'Première version de Hermes Agent pour StartOS, basée sur Hermes upstream v2026.6.19 (0.17.0).',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
