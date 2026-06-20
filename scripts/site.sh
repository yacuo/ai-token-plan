#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
project_dir="$(cd "$script_dir/.." && pwd)"
cd "$project_dir"

command="${1:-preview}"
port="${PORT:-4171}"

kill_port() {
  local port="$1"
  local pids
  pids="$(lsof -ti tcp:"$port" || true)"
  if [[ -n "$pids" ]]; then
    echo "Stopping existing process on port $port: $pids"
    kill $pids || true
    sleep 1
  fi
}

case "$command" in
  install)
    npm install
    ;;
  build)
    npm run build
    ;;
  preview)
    kill_port "$port"
    npm install
    npm run build
    npm run preview -- -p "$port"
    ;;
  dev)
    kill_port "$port"
    npm install
    npm run build
    npm run dev -- -p "$port"
    ;;
  deploy)
    npm install
    npm run build
    echo "Static export generated in ./out. Configure GitHub Pages or CDN to deploy this directory."
    ;;
  *)
    echo "Usage: ./scripts/site.sh [install|build|preview|dev|deploy]"
    exit 1
    ;;
esac
