FROM daytonaio/langchain-open-swe:0.1.0

USER root
ENV DEBIAN_FRONTEND=noninteractive

# Install system dependencies for Remotion, WebGL, and Headless Rendering
RUN apt-get update && apt-get install -y --no-install-recommends \
    bash ca-certificates curl jq ffmpeg \
    libnss3 libnspr4 libatk1.0-0 libatk-bridge2.0-0 libcups2 libdrm2 \
    libxkbcommon0 libxcomposite1 libxdamage1 libxfixes3 libxrandr2 \
    libgbm1 libasound2 libpangocairo-1.0-0 libxshmfence1 \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

USER daytona
WORKDIR /home/daytona

# Prepare project directory
COPY --chown=daytona:daytona . /home/daytona/project

WORKDIR /home/daytona/project

# Install dependencies and clean cache to keep image slim
RUN npm install --force && npm cache clean --force

# Create entrypoint script
USER root
RUN cat > /usr/local/bin/start-sandbox.sh <<'EOF'
#!/usr/bin/env bash
set -euo pipefail

HOME_DIR="/home/daytona"
PROJECT_DIR="$HOME_DIR/project"
mkdir -p /tmp

log() { echo "[$(date -Iseconds)] $*"; }

start_bg() {
  local name="$1"; shift
  local pid="/tmp/${name}.pid"
  local out="/tmp/${name}.log"

  if [[ -f "$pid" ]] && kill -0 "$(cat "$pid")" 2>/dev/null; then
    log "✅ $name already running (pid $(cat "$pid"))"
    return 0
  fi

  nohup setsid "$@" >"$out" 2>&1 < /dev/null &
  echo $! > "$pid"

  sleep 1
  if ! kill -0 "$(cat "$pid")" 2>/dev/null; then
    log "❌ $name exited immediately. Last log lines:"
    tail -n 50 "$out" || true
    return 1
  fi

  log "✅ $name started (pid $(cat "$pid")) log=$out"
}

log "▶ EntryPoint: Starting Video Sandbox services..."

# Ensure we are in the project directory
cd "$PROJECT_DIR"

# Reset git to ensure Agent can track changes clearly
rm -rf .git
git init >/dev/null 2>&1 || true

# Start Vite Dev Server on port 3001
# We use --host 0.0.0.0 to allow Daytona port forwarding
start_bg vite_dev npm run dev -- --port 3001 --host 0.0.0.0

log "🎉 Sandbox is ready. Preview available on port 3001."
exec "$@"
EOF

RUN chmod +x /usr/local/bin/start-sandbox.sh \
    && chown daytona:daytona /usr/local/bin/start-sandbox.sh

USER daytona
WORKDIR /home/daytona/project

# Ensure port 3001 is exposed for the frontend iframe
EXPOSE 3001

ENTRYPOINT ["/usr/local/bin/start-sandbox.sh"]
CMD ["sleep", "infinity"]
