import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2026.6.5:2',
  releaseNotes: {
    en_US:
      'Add the Anthropic (Claude) provider and pick the model from a per-provider dropdown (or enter a custom id). Fix a first-boot crash where the gateway could not read its hooks directory. Show the OpenAI Codex completion action only while a login is pending.',
    es_ES:
      'Agrega el proveedor Anthropic (Claude) y elige el modelo desde un menu desplegable por proveedor (o introduce un id personalizado). Corrige un fallo en el primer arranque en el que la puerta de enlace no podia leer su directorio hooks. Muestra la accion de finalizacion de OpenAI Codex solo mientras hay un inicio de sesion pendiente.',
    de_DE:
      'Anthropic (Claude)-Anbieter hinzugefuegt; das Modell wird ueber ein Dropdown pro Anbieter gewaehlt (oder eine eigene ID eingegeben). Behebt einen Absturz beim ersten Start, bei dem das Gateway sein hooks-Verzeichnis nicht lesen konnte. Die OpenAI-Codex-Abschlussaktion erscheint nur bei ausstehender Anmeldung.',
    pl_PL:
      'Dodano dostawce Anthropic (Claude) i wybor modelu z listy rozwijanej dla kazdego dostawcy (lub wpisanie wlasnego id). Naprawiono awarie przy pierwszym uruchomieniu, gdy brama nie mogla odczytac swojego katalogu hooks. Akcja finalizacji OpenAI Codex pojawia sie tylko podczas oczekujacego logowania.',
    fr_FR:
      'Ajoute le fournisseur Anthropic (Claude) et permet de choisir le modele dans un menu deroulant par fournisseur (ou de saisir un id personnalise). Corrige un plantage au premier demarrage ou la passerelle ne pouvait pas lire son repertoire hooks. Affiche la finalisation OpenAI Codex uniquement pendant une connexion en attente.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
