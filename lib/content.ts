import fs from "node:fs";
import path from "node:path";

export type TocItem = { id: string; text: string; level: 1 | 2 | 3 };
export type Article = {
  slug: string[];
  href: string;
  sourcePath: string;
  title: string;
  description: string;
  keywords: string;
  date: string;
  tags: string[];
  toc: TocItem[];
  body: string;
};

const CONTENT_DIRS = ["vendors", "guides"];
const root = process.cwd();

function parseFrontmatter(raw: string) {
  if (!raw.startsWith("---")) return { data: {}, body: raw } as { data: Record<string, string>; body: string };
  const end = raw.indexOf("\n---", 3);
  if (end === -1) return { data: {}, body: raw } as { data: Record<string, string>; body: string };
  const block = raw.slice(3, end).trim();
  const body = raw.slice(end + 4).trim();
  const data: Record<string, string> = {};
  for (const line of block.split("\n")) {
    const index = line.indexOf(":");
    if (index === -1) continue;
    data[line.slice(0, index).trim()] = line.slice(index + 1).trim().replace(/^"|"$/g, "");
  }
  return { data, body };
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[`*_[\]()]/g, "").replace(/\s+/g, "-").replace(/[^\w\u4e00-\u9fa5-]/g, "");
}

function inlineMarkdown(text: string) {
  return text
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/`([^`]+)`/g, "<code>$1</code>");
}

function stripMarkdown(markdown: string) {
  return markdown
    .replace(/^#\s+/gm, "")
    .replace(/^##\s+/gm, "")
    .replace(/^[-*]\s+/gm, "")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .trim();
}

function isTableSeparator(line: string) {
  return /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(line.trim());
}

function parseTableRow(line: string) {
  return line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((cell) => inlineMarkdown(cell.trim()));
}

function markdownToHtml(markdown: string) {
  const lines = markdown.split("\n");
  const html: string[] = [];
  let listOpen = false;
  let index = 0;

  while (index < lines.length) {
    const trimmed = lines[index].trim();
    if (!trimmed) {
      if (listOpen) { html.push("</ul>"); listOpen = false; }
      index += 1;
      continue;
    }

    if (trimmed.includes("|") && lines[index + 1] && isTableSeparator(lines[index + 1])) {
      if (listOpen) { html.push("</ul>"); listOpen = false; }
      const headers = parseTableRow(trimmed);
      html.push('<div class="table-wrap"><table><thead><tr>');
      html.push(headers.map((cell) => `<th>${cell}</th>`).join(""));
      html.push("</tr></thead><tbody>");
      index += 2;
      while (index < lines.length && lines[index].trim().includes("|")) {
        const cells = parseTableRow(lines[index]);
        html.push("<tr>" + cells.map((cell, cellIndex) => `<td data-label="${headers[cellIndex] || ""}">${cell}</td>`).join("") + "</tr>");
        index += 1;
      }
      html.push("</tbody></table></div>");
      continue;
    }

    if (trimmed === "数据来源：TokenPlan 详情" && /^\[https?:\/\/.+\]\(https?:\/\/.+\)$/.test(lines[index + 2]?.trim() || "")) {
      if (listOpen) { html.push("</ul>"); listOpen = false; }
      html.push(`<div class="source-card"><div>${inlineMarkdown(trimmed)}</div><div>${inlineMarkdown(lines[index + 2].trim())}</div></div>`);
      index += 3;
      continue;
    }

    if (trimmed.startsWith("> 可视化页面：")) {
      if (listOpen) { html.push("</ul>"); listOpen = false; }
      const link = trimmed.slice("> 可视化页面：".length).trim();
      html.push(`<div class="visual-page-card"><div>可视化页面：</div><div>${inlineMarkdown(link)}</div></div>`);
      index += 1;
      continue;
    }

    if (trimmed.startsWith("### ")) {
      if (listOpen) { html.push("</ul>"); listOpen = false; }
      const text = trimmed.slice(4);
      html.push(`<h3 id="${slugify(text)}">${inlineMarkdown(text)}</h3>`);
      index += 1;
      continue;
    }

    if (trimmed.startsWith("## ")) {
      if (listOpen) { html.push("</ul>"); listOpen = false; }
      const text = trimmed.slice(3);
      html.push(`<h2 id="${slugify(text)}">${inlineMarkdown(text)}</h2>`);
      index += 1;
      continue;
    }

    if (trimmed.startsWith("# ")) {
      if (listOpen) { html.push("</ul>"); listOpen = false; }
      const text = trimmed.slice(2);
      html.push(`<h1 id="${slugify(text)}">${inlineMarkdown(text)}</h1>`);
      index += 1;
      continue;
    }

    if (trimmed.startsWith("- ")) {
      if (!listOpen) { html.push("<ul>"); listOpen = true; }
      html.push(`<li>${inlineMarkdown(trimmed.slice(2))}</li>`);
      index += 1;
      continue;
    }

    if (listOpen) { html.push("</ul>"); listOpen = false; }
    html.push(`<p>${inlineMarkdown(trimmed)}</p>`);
    index += 1;
  }

  if (listOpen) html.push("</ul>");
  return html.join("\n");
}

function getToc(markdown: string): TocItem[] {
  return markdown.split("\n").flatMap((line) => {
    const match = /^(#{2,3})\s+(.+)$/.exec(line.trim());
    if (!match) return [];
    const text = match[2].replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1");
    return [{ id: slugify(text), text, level: match[1].length as 2 | 3 }];
  });
}

function createSeo(title: string, body: string, isVendor: boolean) {
  if (!isVendor) {
    return {
      title,
      description: stripMarkdown(body).slice(0, 150),
      keywords: "Token Plan,Coding Plan,AI Token Plan,AI API 价格,大模型 API 价格,额度,官网入口",
    };
  }
  const brand = title.replace(/\s*(Token Plan|Token API|API|Plan)$/i, "").trim();
  const isApi = /API/i.test(title);
  const seoTitle = isApi
    ? `${brand} API 优惠、价格对比 ｜ Token Plan、Coding Plan 申请入口 - TokenPlan`
    : `${brand} Token Plan 优惠、价格对比 ｜ Coding Plan 官网入口 - TokenPlan`;
  const description = isApi
    ? `${brand} API、Token Plan、Coding Plan 综合对比，覆盖价格、额度、用量、限速、免费额度、优惠、官网入口与 API key 申请，适合比较 ${brand} 怎么样、值不值得，以及 Claude Code、Cursor 接入配置。`
    : `${brand} Token Plan、Coding Plan 综合对比，覆盖价格、额度、额度重置、免费额度、优惠和官网入口，适合比较 ${brand} 怎么样、值不值得，以及 Claude Code 平替、Cursor 接入等使用场景。`;
  const keywords = isApi
    ? `Token Plan,Coding Plan,${brand} API,${brand} API 价格,${brand} API 对比,${brand} API 优惠,API key 申请,接入 Claude Code,Claude Code 平替,${brand} 怎么样,用量,限速,免费额度,额度,官网入口,Claude Code,Cursor,Codex`
    : `Token Plan,Coding Plan,${brand},${brand} 价格,${brand} 对比,${brand} 优惠,Claude Code 平替,${brand} 怎么样,额度,额度重置,免费额度,官网入口,Claude Code,Cursor,Codex`;
  return { title: seoTitle, description, keywords };
}

export function getArticles(): Article[] {
  return CONTENT_DIRS.flatMap((dir) => {
    const fullDir = path.join(root, dir);
    if (!fs.existsSync(fullDir)) return [];
    return fs.readdirSync(fullDir).filter((file) => file.endsWith(".md")).map((file) => {
      const raw = fs.readFileSync(path.join(fullDir, file), "utf8");
      const { data, body } = parseFrontmatter(raw);
      const fallbackTitle = body.match(/^#\s+(.+)$/m)?.[1] ?? file.replace(/\.md$/, "");
      const seo = createSeo(data.title || fallbackTitle, body, dir === "vendors");
      const tags = (data.tags || "").split(",").map((tag) => tag.trim()).filter(Boolean);
      const name = file.replace(/\.md$/, "");
      const slug = [name];
      return { slug, href: `/${name}/`, sourcePath: `${dir}/${file}`, title: seo.title, description: seo.description, keywords: seo.keywords, date: data.date || "", tags, toc: getToc(body), body: markdownToHtml(body) };
    });
  });
}

export function getArticle(slug: string[]) {
  return getArticles().find((article) => article.slug.join("/") === slug.join("/"));
}
