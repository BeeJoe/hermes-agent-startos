import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2026.6.19:1',
  releaseNotes: {
    en_US:
      'Packaging revision: the required local LLM dependency now tracks your live Hermes provider configuration (including changes made from the Hermes dashboard) instead of only the Configure Provider selection. Also adds Spanish, German, Polish, and French translations for the package listing, actions, configuration, and health checks.',
    es_ES:
      'Revisión de empaquetado: la dependencia de LLM local requerida ahora sigue la configuración de proveedor en vivo de Hermes (incluidos los cambios hechos desde el panel de Hermes) en lugar de solo la selección de Configurar proveedor. También añade traducciones al español, alemán, polaco y francés de la ficha del paquete, las acciones, la configuración y las comprobaciones de estado.',
    de_DE:
      'Packaging-Revision: Die erforderliche lokale LLM-Abhängigkeit folgt jetzt Ihrer aktiven Hermes-Anbieterkonfiguration (einschließlich im Hermes-Dashboard vorgenommener Änderungen) statt nur der Auswahl unter „Anbieter konfigurieren“. Fügt außerdem spanische, deutsche, polnische und französische Übersetzungen für den Paketeintrag, die Aktionen, die Konfiguration und die Zustandsprüfungen hinzu.',
    pl_PL:
      'Rewizja pakowania: wymagana lokalna zależność LLM śledzi teraz aktywną konfigurację dostawcy Hermes (w tym zmiany wprowadzone z panelu Hermes), a nie tylko wybór w akcji Konfiguruj dostawcę. Dodaje również tłumaczenia hiszpańskie, niemieckie, polskie i francuskie wpisu pakietu, akcji, konfiguracji i kontroli stanu.',
    fr_FR:
      'Révision de packaging : la dépendance LLM locale requise suit désormais votre configuration de fournisseur Hermes en direct (y compris les changements effectués depuis le tableau de bord Hermes) au lieu de seulement la sélection de Configurer le fournisseur. Ajoute également des traductions en espagnol, allemand, polonais et français pour la fiche du paquet, les actions, la configuration et les contrôles de santé.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
