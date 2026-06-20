# 静态站运行与部署

本项目内置一个用于可视化浏览 Token Plan 内容的静态站。

## 技术栈

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Zod
- `output: export` 纯静态导出

## 文件说明

- 配置文件：`site.config.json`
- 首页入口：`app/page.tsx`
- 文章页入口：`app/[...slug]/page.tsx`
- 内容解析：`lib/content.ts`
- 本地脚本：`scripts/site.sh`

## 本地运行

进入项目根目录后执行：

```bash
./scripts/site.sh
```

脚本也支持从任意目录执行，会自动切到项目根目录。开源文档不要写本机绝对路径。

默认端口：

```txt
4171
```

指定端口：

```bash
PORT=4171 ./scripts/site.sh preview
```

## 常用命令

```bash
./scripts/site.sh install
./scripts/site.sh build
./scripts/site.sh preview
./scripts/site.sh dev
./scripts/site.sh deploy
```

`preview` 和 `dev` 会先清理当前端口上的旧进程，再重新安装依赖、重新构建并启动。

## Cloudflare Pages 部署

推荐配置：

```txt
Build command: npm run build
Output directory: out
Branch: main
```

生产域名：

```txt
https://tokenplan.pw
```
