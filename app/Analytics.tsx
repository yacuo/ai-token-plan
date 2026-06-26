"use client";

import { useEffect } from "react";

export default function Analytics() {
  useEffect(() => {
    const ga = document.createElement("script");
    ga.async = true;
    ga.src = "https://www.googletagmanager.com/gtag/js?id=G-GCVD6ZK0T9";
    document.head.appendChild(ga);

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    }
    gtag("js", new Date());
    gtag("config", "G-GCVD6ZK0T9");

    const baidu = document.createElement("script");
    baidu.async = true;
    baidu.src = "https://hm.baidu.com/hm.js?8c5b252b5fcf95dc88ab585cb81cd5e0";
    document.head.appendChild(baidu);

    const clarity = document.createElement("script");
    clarity.async = true;
    clarity.src = "https://www.clarity.ms/tag/xa1tiyku2l";
    document.head.appendChild(clarity);
  }, []);

  return null;
}

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}
