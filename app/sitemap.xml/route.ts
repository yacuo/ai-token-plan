import site from "../../site.config.json";
import { getArticles } from "../../lib/content";

export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function getBaseUrl(): string {
  return process.env.SITE_URL || site.siteUrl;
}

function toUrl(path: string): string {
  return new URL(path, getBaseUrl()).toString();
}

export async function GET() {
  const articles = getArticles();
  const urls = [
    { loc: toUrl("/"), lastmod: "2026-06-19" },
    ...articles.map((article) => ({ loc: toUrl(article.href), lastmod: article.date || undefined })),
  ];

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    `  <!-- ${escapeXml(site.brand)} sitemap: ${urls.length} URLs -->`,
    ...urls.map((item) => [
      '  <url>',
      `    <loc>${escapeXml(item.loc)}</loc>`,
      item.lastmod ? `    <lastmod>${escapeXml(item.lastmod)}</lastmod>` : null,
      '  </url>',
    ].filter(Boolean).join("\n")),
    '</urlset>',
    '',
  ].join("\n");

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
