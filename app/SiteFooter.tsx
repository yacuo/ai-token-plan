import site from "../site.config.json";

export default function SiteFooter() {
  return (
    <footer className="mx-auto max-w-7xl px-4 pb-8 pt-4 sm:px-6 lg:px-8">
      <div className="rounded-xl border border-slate-200 bg-white/85 p-6 text-sm text-slate-600 shadow-sm backdrop-blur sm:p-8">
        <div className="grid gap-6 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="text-base font-black text-slate-950">{site.brand}</div>
            <p className="mt-2 leading-7">本项目由压错技术团队提供，用于整理 Token Plan、Coding Plan、价格对比、额度、优惠、官网入口和申请入口等公开信息。</p>
          </div>
          <div>
            <div className="font-black text-slate-950">数据来源</div>
            <a className="mt-2 block break-all font-semibold text-slate-700 hover:text-slate-950" href={site.primaryUrl}>{site.primaryUrl}</a>
            <a className="mt-2 block break-all font-semibold text-slate-700 hover:text-slate-950" href={site.githubUrl}>GitHub 仓库</a>
          </div>
          <div>
            <div className="font-black text-slate-950">站点说明</div>
            <p className="mt-2 leading-7">静态博客 · Markdown 驱动。价格、额度和权益可能变化，请以数据来源和官方页面为准。</p>
            <a className="mt-3 inline-flex font-bold text-slate-900 underline decoration-slate-300 underline-offset-4 hover:text-slate-700" href="/sitemap.xml">站长地图</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
