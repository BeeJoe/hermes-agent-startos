import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2026.6.19:2',
  releaseNotes: {
    en_US:
      "Adds a Revoke StartOS Access action that removes Hermes' stored start-cli authentication without uninstalling the service.",
    es_ES:
      'Agrega una acción Revocar acceso a StartOS que elimina la autenticación start-cli almacenada de Hermes sin desinstalar el servicio.',
    de_DE:
      'Fügt eine Aktion „StartOS-Zugriff widerrufen“ hinzu, die die gespeicherte start-cli-Authentifizierung von Hermes ohne Deinstallation des Dienstes entfernt.',
    pl_PL:
      'Dodaje akcję „Odwołaj dostęp do StartOS”, która usuwa zapisaną autoryzację start-cli Hermesa bez odinstalowywania usługi.',
    fr_FR:
      "Ajoute une action « Révoquer l'accès à StartOS » qui supprime l'authentification start-cli stockée de Hermes sans désinstaller le service.",
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
