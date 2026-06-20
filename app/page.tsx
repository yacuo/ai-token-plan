import site from "../site.config.json";
import SiteFooter from "./SiteFooter";

function GithubIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
      <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.08 1.85 1.24 1.85 1.24 1.07 1.84 2.82 1.31 3.51 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
    </svg>
  );
}

export default function Home() {
  const items = site.sections[0]?.items ?? [];
  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,#e0f2fe,transparent_34%),linear-gradient(180deg,#f8fafc_0%,#fff_42%,#f8fafc_100%)] text-slate-950">
      <header className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <nav className="flex flex-col gap-3 rounded-2xl border border-white/70 bg-white/80 px-4 py-3 shadow-sm backdrop-blur md:flex-row md:items-center md:justify-between">
          <a href="/" className="flex items-center gap-3 font-black tracking-tight">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-slate-950 text-sm text-white">TP</span>
            <span>{site.brand}</span>
          </a>
          <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-600">
            <a className="rounded-full px-3 py-2 hover:bg-slate-100" href="#plans">目录</a>
            <a className="rounded-full px-3 py-2 hover:bg-slate-100" href="#guides">专题</a>
            <a className="rounded-full px-3 py-2 hover:bg-slate-100" href="https://codingplan.pw/">Coding Plan</a>
            <a className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm" href={site.githubUrl}><GithubIcon /> GitHub</a>
          </div>
        </nav>
      </header>

      <section className="mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-8 lg:pb-16 lg:pt-12">
        <div className="rounded-xl border border-white/70 bg-white/75 p-6 shadow-xl shadow-slate-200/70 backdrop-blur sm:p-10 lg:p-12">
          <div className="mb-5 inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-semibold text-slate-600">本项目由：压错技术团队提供，静态博客 · Markdown 驱动</div>
          <h1 className="w-full text-3xl font-black leading-tight tracking-[-0.04em] sm:text-4xl lg:text-5xl">{site.title}</h1>
          <p className="mt-6 w-full text-base leading-8 text-slate-600 sm:text-lg lg:text-xl">{site.description}</p>
          <div className="mt-7 flex flex-wrap gap-2">
            {site.heroTags.map((tag) => <span key={tag} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 shadow-sm">{tag}</span>)}
          </div>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a className="rounded-xl bg-slate-950 px-5 py-3 text-center font-bold text-white shadow-lg shadow-slate-300 transition hover:-translate-y-0.5" href="#plans">浏览文章目录</a>
            <a className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 font-bold text-slate-900 shadow-sm transition hover:-translate-y-0.5" href={site.githubUrl}><GithubIcon /> 查看仓库来源</a>
          </div>
        </div>
      </section>

      <section id="plans" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div><h2 className="text-3xl font-black tracking-tight sm:text-4xl">快速对比</h2><p className="mt-2 max-w-2xl text-slate-600">点击卡片进入由仓库 Markdown 生成的站内文章页。</p></div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <article key={item.name} className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl">
              <div className="flex items-start justify-between gap-3"><h3 className="text-xl font-black tracking-tight">{item.name}</h3><span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500">{item.type}</span></div>
              <div className="mt-4 text-3xl font-black">{item.price}</div>
              <p className="mt-3 min-h-20 text-sm leading-6 text-slate-600">{item.summary}</p>
              <a className="mt-5 inline-flex rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white transition group-hover:bg-slate-800" href={item.url}>阅读文章 →</a>
            </article>
          ))}
        </div>
      </section>

      <section id="guides" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-3xl font-black tracking-tight">专题目录</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {site.guides.map((guide) => <a key={guide.url} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 font-bold transition hover:border-slate-300 hover:bg-white hover:shadow-sm" href={guide.url}>{guide.name}</a>)}
          </div>
          <p className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm leading-6 text-slate-600">本页面是仓库的 GitHub Pages 简易站。内容由仓库 Markdown 生成，适合快速浏览、收藏和 Fork。</p>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
