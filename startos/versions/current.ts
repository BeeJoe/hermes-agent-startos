import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2026.6.5:2',
  releaseNotes: {
    en_US:
      'Add Anthropic (Claude) provider, and show the OpenAI Codex completion action only while a login is pending.',
    es_ES:
      'Agrega el proveedor Anthropic (Claude) y muestra la accion de finalizacion de OpenAI Codex solo mientras hay un inicio de sesion pendiente.',
    de_DE:
      'Anthropic (Claude)-Anbieter hinzugefuegt; die OpenAI-Codex-Abschlussaktion erscheint nur bei ausstehender Anmeldung.',
    pl_PL:
      'Dodano dostawce Anthropic (Claude); akcja finalizacji OpenAI Codex pojawia sie tylko podczas oczekujacego logowania.',
    fr_FR:
      'Ajoute le fournisseur Anthropic (Claude) et affiche la finalisation OpenAI Codex uniquement pendant une connexion en attente.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
