import fs from "node:fs";
import path from "node:path";

export type TocItem = { id: string; text: string; level: 1 | 2 };
export type Article = {
  slug: string[];
  href: string;
  sourcePath: string;
  title: string;
  description: string;
  keywords: string;
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
        html.push("<tr>" + cells.map((cell) => `<td>${cell}</td>`).join("") + "</tr>");
        index += 1;
      }
      html.push("</tbody></table></div>");
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
    const match = /^(#{1,2})\s+(.+)$/.exec(line.trim());
    if (!match) return [];
    const text = match[2].replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1");
    return [{ id: slugify(text), text, level: match[1].length as 1 | 2 }];
  });
}

export function getArticles(): Article[] {
  return CONTENT_DIRS.flatMap((dir) => {
    const fullDir = path.join(root, dir);
    if (!fs.existsSync(fullDir)) return [];
    return fs.readdirSync(fullDir).filter((file) => file.endsWith(".md")).map((file) => {
      const raw = fs.readFileSync(path.join(fullDir, file), "utf8");
      const { data, body } = parseFrontmatter(raw);
      const fallbackTitle = body.match(/^#\s+(.+)$/m)?.[1] ?? file.replace(/\.md$/, "");
      const description = data.description || stripMarkdown(body).slice(0, 150);
      const keywords = data.keywords || "Token Plan,AI Token Plan,AI API 价格,大模型 API 价格";
      const tags = (data.tags || "").split(",").map((tag) => tag.trim()).filter(Boolean);
      const name = file.replace(/\.md$/, "");
      const slug = [name];
      return { slug, href: `/${name}/`, sourcePath: `${dir}/${file}`, title: data.title || fallbackTitle, description, keywords, tags, toc: getToc(body), body: markdownToHtml(body) };
    });
  });
}

export function getArticle(slug: string[]) {
  return getArticles().find((article) => article.slug.join("/") === slug.join("/"));
}
