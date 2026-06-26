"use client";

import { useEffect, useState } from "react";

type TocItem = { id: string; text: string; level: 1 | 2 };

export default function TocNav({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    let ticking = false;
    const updateActive = () => {
      let currentId = items[0]?.id ?? "";
      for (const item of items) {
        const element = document.getElementById(item.id);
        if (element && element.getBoundingClientRect().top <= 120) currentId = item.id;
      }
      setActiveId((prev) => (prev === currentId ? prev : currentId));
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateActive);
    };
    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  return (
    <div className="mt-3 grid gap-1 border-l border-slate-200 pl-3 text-sm">
      {items.map((item) => {
        const active = item.id === activeId;
        return (
          <a
            key={item.id}
            className={active ? "-ml-[13px] border-l-2 border-blue-600 px-3 py-2 font-black text-blue-700" : "-ml-[13px] border-l-2 border-transparent px-3 py-2 font-semibold text-slate-500 hover:border-slate-300 hover:text-slate-900"}
            href={`#${item.id}`}
            onClick={() => setActiveId(item.id)}
          >
            {item.text}
          </a>
        );
      })}
    </div>
  );
}
