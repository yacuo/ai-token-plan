#!/usr/bin/env bash
set -euo pipefail

command="${1:-preview}"
port="${PORT:-4171}"

case "$command" in
  install)
    npm install
    ;;
  build)
    npm run build
    ;;
  preview)
    npm install
    npm run build
    npm run preview -- -p "$port"
    ;;
  dev)
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
