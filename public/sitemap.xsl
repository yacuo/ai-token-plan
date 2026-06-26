<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  exclude-result-prefixes="sitemap">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html lang="zh-CN">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>XML 站点地图</title>
        <style>
          * { box-sizing: border-box; }
          body {
            margin: 0;
            padding: 2rem 1rem 3rem;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Microsoft YaHei", sans-serif;
            color: #111827;
            background: #f8fafc;
            line-height: 1.5;
          }
          .wrap { max-width: 1080px; margin: 0 auto; }
          .card {
            border: 1px solid #e5e7eb;
            border-radius: 18px;
            background: #fff;
            box-shadow: 0 18px 40px rgba(15, 23, 42, 0.08);
            overflow: hidden;
          }
          .head { padding: 1.5rem; border-bottom: 1px solid #e5e7eb; }
          h1 { margin: 0; font-size: 1.75rem; font-weight: 800; letter-spacing: -0.03em; }
          .intro { margin: 0.75rem 0 0; color: #64748b; font-size: 0.95rem; }
          .count { margin: 0.75rem 0 0; color: #475569; font-size: 0.9rem; }
          .table-scroll { width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch; }
          table { width: 100%; min-width: 760px; border-collapse: collapse; font-size: 0.9rem; }
          th, td { border-bottom: 1px solid #e5e7eb; padding: 0.85rem 1rem; text-align: left; vertical-align: middle; }
          th { background: #f1f5f9; color: #334155; font-weight: 700; }
          tr:hover td { background: #f8fafc; }
          a { color: #2563eb; font-weight: 650; text-decoration: none; }
          a:hover { text-decoration: underline; }
          .muted { color: #64748b; white-space: nowrap; }
          .badge { display: inline-flex; border-radius: 999px; background: #e0f2fe; color: #0369a1; padding: 0.2rem 0.55rem; font-size: 0.75rem; font-weight: 700; }
          @media (max-width: 640px) {
            body { padding: 1rem 0.75rem 2rem; }
            h1 { font-size: 1.35rem; }
            .head { padding: 1rem; }
            th, td { padding: 0.65rem 0.75rem; font-size: 0.82rem; }
          }
        </style>
      </head>
      <body>
        <div class="wrap">
          <div class="card">
            <div class="head">
              <h1>XML 站点地图</h1>
              <p class="intro">这是标准 XML sitemap。浏览器显示为可点击表格，搜索引擎读取原始 XML。</p>
              <xsl:choose>
                <xsl:when test="sitemap:sitemapindex">
                  <p class="count"><span class="badge">Sitemap Index</span> 子站点地图数量：<strong><xsl:value-of select="count(sitemap:sitemapindex/sitemap:sitemap)"/></strong></p>
                </xsl:when>
                <xsl:otherwise>
                  <p class="count"><span class="badge">URL Set</span> 页面 URL 数量：<strong><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></strong></p>
                </xsl:otherwise>
              </xsl:choose>
            </div>

            <xsl:choose>
              <xsl:when test="sitemap:sitemapindex">
                <div class="table-scroll">
                  <table>
                    <thead>
                      <tr>
                        <th>子站点地图</th>
                        <th>最后修改</th>
                      </tr>
                    </thead>
                    <tbody>
                      <xsl:for-each select="sitemap:sitemapindex/sitemap:sitemap">
                        <tr>
                          <td><a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a></td>
                          <td class="muted"><xsl:value-of select="sitemap:lastmod"/></td>
                        </tr>
                      </xsl:for-each>
                    </tbody>
                  </table>
                </div>
              </xsl:when>

              <xsl:otherwise>
                <div class="table-scroll">
                  <table>
                    <thead>
                      <tr>
                        <th>页面地址</th>
                        <th>最后修改</th>
                      </tr>
                    </thead>
                    <tbody>
                      <xsl:for-each select="sitemap:urlset/sitemap:url">
                        <tr>
                          <td><a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a></td>
                          <td class="muted"><xsl:value-of select="sitemap:lastmod"/></td>
                        </tr>
                      </xsl:for-each>
                    </tbody>
                  </table>
                </div>
              </xsl:otherwise>
            </xsl:choose>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
