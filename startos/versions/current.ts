import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2026.6.5:2',
  releaseNotes: {
    en_US: 'Add Anthropic (Claude) provider.',
    es_ES: 'Agrega el proveedor Anthropic (Claude).',
    de_DE: 'Anthropic (Claude)-Anbieter hinzugefuegt.',
    pl_PL: 'Dodano dostawce Anthropic (Claude).',
    fr_FR: 'Ajoute le fournisseur Anthropic (Claude).',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
