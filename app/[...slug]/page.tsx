import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import site from "../../site.config.json";
import { getArticle, getArticles } from "../../lib/content";

type SiteItem = { name: string; url: string; detailUrl?: string };
const siteItems = site.sections.flatMap((section) => section.items) as SiteItem[];

function getDetailUrl(href: string) {
  return siteItems.find((item) => item.url === href)?.detailUrl;
}

function GithubIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
      <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.08 1.85 1.24 1.85 1.24 1.07 1.84 2.82 1.31 3.51 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
    </svg>
  );
}

export function generateStaticParams() {
  return getArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return { title: article.title, description: article.description, keywords: article.keywords };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const articles = getArticles();
  const index = articles.findIndex((item) => item.slug.join("/") === slug.join("/"));
  const article = articles[index];
  if (!article) notFound();

  const detailUrl = getDetailUrl(article.href);
  const prev = index > 0 ? articles[index - 1] : undefined;
  const next = index < articles.length - 1 ? articles[index + 1] : undefined;
  const categoryLabel = article.sourcePath.startsWith("vendors/") ? "厂商文章" : "专题文章";
  const editUrl = `${site.githubUrl}/edit/main/${article.sourcePath}`;

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#dbeafe,transparent_30%),linear-gradient(180deg,#f8fafc_0%,#fff_42%,#f8fafc_100%)] text-slate-950">
      <header className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <nav className="flex flex-col gap-3 rounded-2xl border border-white/70 bg-white/80 px-4 py-3 shadow-sm backdrop-blur md:flex-row md:items-center md:justify-between">
          <Link href="/" className="flex items-center gap-3 font-black tracking-tight"><span className="grid h-9 w-9 place-items-center rounded-xl bg-slate-950 text-sm text-white">TP</span>{site.brand}</Link>
          <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-600">
            <Link className="rounded-full px-3 py-2 hover:bg-slate-100" href="/">首页</Link>
            <a className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm" href={site.githubUrl}><GithubIcon /> GitHub</a>
          </div>
        </nav>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 pb-16 pt-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8">
        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70 sm:p-8 lg:p-10">
          <Link className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-bold text-slate-600 hover:bg-white" href="/">← 返回首页</Link>
          <div className="mt-6 flex flex-wrap gap-2">
            {article.tags.map((tag) => <span key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">{tag}</span>)}
          </div>
          <h1 className="mt-5 text-2xl font-black leading-tight tracking-[-0.035em] sm:text-4xl lg:text-4xl">{article.title}</h1>
          <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">{article.description}</p>
          <section className="mt-6 rounded-xl border border-blue-100 bg-blue-50/70 p-5">
            <h2 className="text-lg font-black text-slate-950">综合对比重点</h2>
            <p className="mt-2 text-sm leading-7 text-slate-700">本页不是单纯列价格，而是围绕 Token Plan、Coding Plan、价格对比、额度、额度重置、免费额度、优惠、官网入口、申请入口、Claude Code 平替和 Cursor 接入等搜索场景做综合整理。</p>
          </section>
          {detailUrl ? (
            <div className="mt-7 rounded-xl border border-slate-200 bg-gradient-to-br from-slate-950 to-slate-800 p-5 text-white shadow-lg sm:p-6">
              <div className="text-sm font-semibold text-slate-300">数据来源：TokenPlan 详情</div>
              <a className="mt-2 inline-flex break-all text-lg font-black underline decoration-white/40 underline-offset-4" href={detailUrl}>{detailUrl}</a>
            </div>
          ) : null}
          <div className="prose prose-slate mt-9 max-w-none" dangerouslySetInnerHTML={{ __html: article.body }} />
          <nav className="mt-12 grid gap-3 border-t border-slate-200 pt-6 sm:grid-cols-2">
            {prev ? <Link className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-white hover:shadow-sm" href={prev.href}><span className="block text-sm font-semibold text-slate-500">上一篇</span><strong>{prev.title}</strong></Link> : <div />}
            {next ? <Link className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-white hover:shadow-sm sm:text-right" href={next.href}><span className="block text-sm font-semibold text-slate-500">下一篇</span><strong>{next.title}</strong></Link> : <div />}
          </nav>
        </article>
        <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-xl border border-slate-200 bg-white/85 p-5 shadow-sm backdrop-blur">
            <div className="text-sm font-bold text-slate-500">文章来源</div>
            <div className="mt-3 grid gap-2">
              <a className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold" href={site.githubUrl}><GithubIcon /> GitHub 仓库</a>
              <a className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-900" href={editUrl}><GithubIcon /> 编辑此页</a>
            </div>
            <div className="mt-5 text-sm font-bold text-slate-500">当前分类</div>
            <div className="mt-2 rounded-xl bg-slate-100 px-3 py-2 text-sm font-bold text-slate-700">{categoryLabel}</div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white/85 p-5 shadow-sm backdrop-blur">
            <div className="text-sm font-bold text-slate-500">文章目录</div>
            <div className="mt-3 grid gap-2 text-sm">
              {article.toc.map((item) => (
                <a key={item.id} className={item.level === 1 ? "font-bold text-slate-900" : "pl-3 text-slate-600 hover:text-slate-950"} href={`#${item.id}`}>{item.text}</a>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
