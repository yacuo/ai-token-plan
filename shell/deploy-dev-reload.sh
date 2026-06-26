#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
project_dir="$(cd "$script_dir/.." && pwd)"
cd "$project_dir"

command="${1:-preview}"
port="${PORT:-4171}"
site_url="${SITE_URL:-http://localhost:${port}/}"
run_dir="$project_dir/.run"
pid_file="$run_dir/site-${command}.pid"
log_file="$run_dir/site-${command}.log"

mkdir -p "$run_dir"

stop_pid() {
  local pid="$1"
  [[ -z "$pid" ]] && return 0
  kill -0 "$pid" >/dev/null 2>&1 || return 0
  kill "$pid" || true
  for _ in {1..30}; do
    kill -0 "$pid" >/dev/null 2>&1 || return 0
    sleep 0.2
  done
  kill -9 "$pid" >/dev/null 2>&1 || true
}

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

stop_previous() {
  if [[ -f "$pid_file" ]]; then
    local pid
    pid="$(<"$pid_file")"
    stop_pid "$pid"
    rm -f "$pid_file"
  fi
}

start_background() {
  local target_command="$1"
  stop_previous
  kill_port "$port"
  nohup bash -lc "$target_command" >> "$log_file" 2>&1 &
  local pid=$!
  echo "$pid" > "$pid_file"
  sleep 2
  echo ""
  echo "[信息] ========== 后台服务已启动 =========="
  echo "本机：      http://localhost:${port}"
  echo "pid：       ${pid}"
  echo "日志：      ${log_file}"
  echo "停止：      kill \$(cat \"${pid_file}\")"
  echo "========================================"
}

case "$command" in
  install)
    npm install
    ;;
  build)
    SITE_URL="$site_url" npm run build
    ;;
  preview)
    npm install
    SITE_URL="$site_url" npm run build
    start_background "cd '$project_dir' && SITE_URL='$site_url' npm run preview -- -p '$port'"
    ;;
  dev)
    npm install
    start_background "cd '$project_dir' && SITE_URL='$site_url' npx next dev -p '$port'"
    ;;
  deploy)
    npm install
    SITE_URL="$site_url" npm run build
    echo "Static export generated in ./out. Configure GitHub Pages or CDN to deploy this directory."
    ;;
  *)
    echo "Usage: ./shell/deploy-dev-reload.sh [install|build|preview|dev|deploy]"
    exit 1
    ;;
esac
