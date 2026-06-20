"use client";

import { useEffect, useState } from "react";

type TocItem = { id: string; text: string; level: 1 | 2 };

export default function TocNav({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const onScroll = () => {
      let currentId = items[0]?.id ?? "";
      for (const item of items) {
        const element = document.getElementById(item.id);
        if (element && element.getBoundingClientRect().top <= 120) currentId = item.id;
      }
      setActiveId(currentId);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  return (
    <div className="mt-3 grid gap-2 text-sm">
      {items.map((item) => {
        const active = item.id === activeId;
        return (
          <a
            key={item.id}
            className={active ? "rounded-lg bg-slate-950 px-3 py-2 font-bold text-white shadow-sm" : "rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-950"}
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
