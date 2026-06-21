import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2026.6.19:0',
  releaseNotes: {
    en_US:
      'Update the upstream Hermes Agent to v2026.6.19 (Hermes 0.17.0). The StartOS provider configuration, managed skills, and first-boot fixes are unchanged. Adds a Revoke StartOS Access action to remove stored start-cli authentication.',
    es_ES:
      'Actualiza el Hermes Agent upstream a v2026.6.19 (Hermes 0.17.0). La configuracion de proveedores de StartOS, las habilidades gestionadas y las correcciones del primer arranque no cambian. Agrega una accion Revoke StartOS Access para quitar la autenticacion start-cli almacenada.',
    de_DE:
      'Aktualisiert den Upstream-Hermes-Agent auf v2026.6.19 (Hermes 0.17.0). Die StartOS-Provider-Konfiguration, die verwalteten Skills und die Erststart-Korrekturen bleiben unveraendert. Fuegt eine Revoke StartOS Access-Aktion hinzu, um gespeicherte start-cli-Authentifizierung zu entfernen.',
    pl_PL:
      'Aktualizuje upstreamowego Hermes Agenta do v2026.6.19 (Hermes 0.17.0). Konfiguracja dostawcow StartOS, zarzadzane umiejetnosci i poprawki pierwszego uruchomienia pozostaja bez zmian. Dodaje akcje Revoke StartOS Access do usuwania zapisanej autoryzacji start-cli.',
    fr_FR:
      'Met a jour le Hermes Agent upstream vers v2026.6.19 (Hermes 0.17.0). La configuration des fournisseurs StartOS, les competences gerees et les corrections du premier demarrage restent inchangees. Ajoute une action Revoke StartOS Access pour supprimer l authentification start-cli stockee.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
