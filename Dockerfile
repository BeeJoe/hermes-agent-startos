# Hermes Agent on StartOS
# Layers the StartOS root CA, start-cli, and managed skills/knowledge on top of
# the official upstream image. We do NOT fork Hermes — the dashboard and gateway
# are the upstream binaries; StartOS provides auth, config forms, and lifecycle.
#
# To bump: docker buildx imagetools inspect nousresearch/hermes-agent:v2026.5.16
FROM nousresearch/hermes-agent:v2026.5.16@sha256:b6e41c155d6bfce5ad83c5d0fec670086db8a43250e4511c9474134be5482d33

ARG STARTOS_VERSION

USER root

# Tooling: ca-certificates for the StartOS root CA (installed at runtime via the
# Login action / oneshot), git+jq+ripgrep for the support docs-search skill.
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    curl \
    git \
    jq \
    ripgrep \
    && rm -rf /var/lib/apt/lists/*

# start-cli — the StartOS server-administration CLI the agent drives (see
# skills/start-cli). Authenticated at runtime by the "Login to StartOS" action.
RUN curl -fsSL "https://github.com/Start9Labs/start-os/releases/download/v${STARTOS_VERSION}/start-cli_$(uname -m)-linux" -o /usr/local/bin/start-cli \
    && chmod +x /usr/local/bin/start-cli

# Keep the hermes venv on PATH for every shell the agent's terminal tool spawns.
ENV PATH="/opt/hermes/.venv/bin:${PATH}"
RUN echo 'export PATH="/opt/hermes/.venv/bin:$PATH"' > /etc/profile.d/hermes-venv.sh && \
    ln -sf /opt/hermes/.venv/bin/hermes /usr/local/bin/hermes

# Managed context — image-owned so it updates with normal package upgrades and
# the agent cannot edit it. Skills are wired into config.yaml via skills.external_dirs
# at init; the support bundle is the baseline that the background refresh replaces.
COPY skills /opt/startos/skills
COPY knowledge/bundle.json /opt/startos/knowledge/bundle.json

# Match StartOS's app UID/GID (1000) using the base image's hermes user, same as
# the upstream gateway entrypoint expects when it drops privileges.
RUN groupmod -o -g 1000 hermes 2>/dev/null || true && \
    usermod -u 1000 -g 1000 -d /opt/data -s /bin/bash hermes 2>/dev/null || true

# Dashboard (web UI / chat) and gateway API. StartOS binds the dashboard as the
# `ui` interface; the gateway API stays internal.
EXPOSE 9119
EXPOSE 8642
