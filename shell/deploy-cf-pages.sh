#!/usr/bin/env bash
# 手动部署 ai-token-plan 到 Cloudflare Pages。
# 用法：
#   ./shell/deploy-cf-pages.sh              # 构建并部署
#   ./shell/deploy-cf-pages.sh --skip-build # 跳过构建，直接部署已有 out/
#
# 首次使用前先执行：npx wrangler login

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

PROJECT="ai-token-plan"
OUT_DIR="$ROOT/out"
SITE_URL="${SITE_URL:-https://tokenplan.pw/}"
SKIP_BUILD=false

for arg in "$@"; do
  case "$arg" in
    --skip-build) SKIP_BUILD=true ;;
    *)
      echo "未知参数：$arg" >&2
      echo "用法：./shell/deploy-cf-pages.sh [--skip-build]" >&2
      exit 1
      ;;
  esac
done

if ! command -v npx >/dev/null 2>&1; then
  echo "Error: npx is required. Please install Node.js/npm first." >&2
  exit 1
fi

echo "=== 手动部署 Cloudflare Pages ==="
echo "说明：这个脚本只在你手动执行时部署，不会因为 git push 自动上线。"
echo ""

echo "--- ai-token-plan -> Cloudflare Pages project: $PROJECT ---"

if [[ "$SKIP_BUILD" == false ]]; then
  echo ">>> SITE_URL=$SITE_URL npm run build"
  SITE_URL="$SITE_URL" npm run build
fi

if [[ ! -d "$OUT_DIR" ]]; then
  echo "Error: out/ not found. Run without --skip-build first." >&2
  exit 1
fi

echo ">>> npx wrangler pages deploy out --project-name=$PROJECT --branch=main"
npx wrangler pages deploy out --project-name="$PROJECT" --branch=main

echo ""
echo "=== ai-token-plan Cloudflare Pages 部署完成 ==="
echo "检查地址："
echo "  https://ai-token-plan.pages.dev/"
echo "  https://tokenplan.pw/"
