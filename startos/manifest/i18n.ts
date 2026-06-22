export const short = {
  en_US: 'Self-improving autonomous AI agent that runs on your own server',
  es_ES:
    'Agente de IA autónomo y automejorable que funciona en tu propio servidor',
  de_DE:
    'Selbstverbessernder autonomer KI-Agent, der auf Ihrem eigenen Server läuft',
  pl_PL:
    'Samodoskonalący się autonomiczny agent AI działający na twoim własnym serwerze',
  fr_FR:
    'Agent IA autonome et auto-améliorant qui fonctionne sur votre propre serveur',
}

export const long = {
  en_US:
    'Hermes Agent is an open-source autonomous AI agent from Nous Research. It chats, runs tools, browses the web, edits files, and connects to messaging platforms (Telegram, Discord, Signal, Slack, Matrix, and more). It improves the longer it runs — building reusable skills, storing preferences, and carrying memory across sessions. On StartOS it runs the official upstream image with a web dashboard (chat + management), an optional local LLM backend (Ollama, vLLM, or llama.cpp), and StartOS-aware skills for server administration and support.',
  es_ES:
    'Hermes Agent es un agente de IA autónomo y de código abierto de Nous Research. Chatea, ejecuta herramientas, navega por la web, edita archivos y se conecta a plataformas de mensajería (Telegram, Discord, Signal, Slack, Matrix y más). Mejora cuanto más tiempo se ejecuta: crea habilidades reutilizables, almacena preferencias y conserva la memoria entre sesiones. En StartOS ejecuta la imagen oficial upstream con un panel web (chat + administración), un backend de LLM local opcional (Ollama, vLLM o llama.cpp) y habilidades que conocen StartOS para la administración y el soporte del servidor.',
  de_DE:
    'Hermes Agent ist ein quelloffener autonomer KI-Agent von Nous Research. Er chattet, führt Tools aus, durchsucht das Web, bearbeitet Dateien und verbindet sich mit Messaging-Plattformen (Telegram, Discord, Signal, Slack, Matrix und mehr). Je länger er läuft, desto besser wird er – er baut wiederverwendbare Skills auf, speichert Präferenzen und behält das Gedächtnis über Sitzungen hinweg. Auf StartOS führt er das offizielle Upstream-Image mit einem Web-Dashboard (Chat + Verwaltung), einem optionalen lokalen LLM-Backend (Ollama, vLLM oder llama.cpp) und StartOS-bewussten Skills für Serververwaltung und Support aus.',
  pl_PL:
    'Hermes Agent to autonomiczny agent AI o otwartym kodzie źródłowym od Nous Research. Czatuje, uruchamia narzędzia, przegląda sieć, edytuje pliki i łączy się z platformami komunikacyjnymi (Telegram, Discord, Signal, Slack, Matrix i innymi). Im dłużej działa, tym lepszy się staje — buduje wielokrotnego użytku umiejętności, przechowuje preferencje i zachowuje pamięć między sesjami. Na StartOS uruchamia oficjalny obraz upstream z panelem webowym (czat + zarządzanie), opcjonalnym lokalnym backendem LLM (Ollama, vLLM lub llama.cpp) oraz umiejętnościami świadomymi StartOS do administrowania serwerem i wsparcia.',
  fr_FR:
    "Hermes Agent est un agent IA autonome et open-source de Nous Research. Il discute, exécute des outils, navigue sur le web, édite des fichiers et se connecte à des plateformes de messagerie (Telegram, Discord, Signal, Slack, Matrix, et plus). Il s'améliore au fur et à mesure qu'il fonctionne — en créant des compétences réutilisables, en stockant des préférences et en conservant la mémoire d'une session à l'autre. Sur StartOS, il exécute l'image upstream officielle avec un tableau de bord web (chat + gestion), un backend LLM local optionnel (Ollama, vLLM ou llama.cpp) et des compétences adaptées à StartOS pour l'administration et le support du serveur.",
}

export const installAlert = {
  en_US:
    'Use with caution. Hermes runs an LLM of your choosing that can execute commands on your behalf. Granting it start-cli access (the "Login to StartOS" action) gives it root-equivalent control of this server — it could run destructive commands or uninstall other services. Do NOT install on a server holding important data or keys (e.g. LND or CLN). When using a cloud LLM provider, your prompts and context leave the device.',
  es_ES:
    'Use con precaución. Hermes ejecuta un LLM de su elección que puede ejecutar comandos en su nombre. Concederle acceso a start-cli (la acción "Iniciar sesión en StartOS") le otorga control equivalente a root de este servidor: podría ejecutar comandos destructivos o desinstalar otros servicios. NO lo instale en un servidor que contenga datos o claves importantes (p. ej. LND o CLN). Al usar un proveedor de LLM en la nube, sus indicaciones y su contexto salen del dispositivo.',
  de_DE:
    'Mit Vorsicht verwenden. Hermes führt ein LLM Ihrer Wahl aus, das in Ihrem Namen Befehle ausführen kann. Wenn Sie ihm start-cli-Zugriff gewähren (die Aktion „Bei StartOS anmelden“), erhält es root-äquivalente Kontrolle über diesen Server – es könnte destruktive Befehle ausführen oder andere Dienste deinstallieren. Installieren Sie es NICHT auf einem Server mit wichtigen Daten oder Schlüsseln (z. B. LND oder CLN). Bei Verwendung eines Cloud-LLM-Anbieters verlassen Ihre Eingaben und Ihr Kontext das Gerät.',
  pl_PL:
    'Używaj z ostrożnością. Hermes uruchamia wybrany przez Ciebie LLM, który może wykonywać polecenia w Twoim imieniu. Przyznanie mu dostępu do start-cli (akcja „Zaloguj się do StartOS“) daje mu kontrolę równoważną root nad tym serwerem — może uruchamiać destrukcyjne polecenia lub odinstalowywać inne usługi. NIE instaluj na serwerze przechowującym ważne dane lub klucze (np. LND lub CLN). Podczas korzystania z chmurowego dostawcy LLM Twoje podpowiedzi i kontekst opuszczają urządzenie.',
  fr_FR:
    "À utiliser avec prudence. Hermes exécute un LLM de votre choix qui peut exécuter des commandes en votre nom. Lui accorder l'accès à start-cli (l'action « Se connecter à StartOS ») lui donne un contrôle équivalent à root sur ce serveur — il pourrait exécuter des commandes destructrices ou désinstaller d'autres services. N'installez PAS sur un serveur contenant des données ou des clés importantes (par ex. LND ou CLN). Lors de l'utilisation d'un fournisseur LLM cloud, vos instructions et votre contexte quittent l'appareil.",
}
