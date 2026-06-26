"use client";

import Script from "next/script";
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

    const clarity = document.createElement("script");
    clarity.async = true;
    clarity.src = "https://www.clarity.ms/tag/xa1tiyku2l";
    document.head.appendChild(clarity);
  }, []);

  return (
    <Script id="baidu-analytics" strategy="afterInteractive">
      {`
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?8c5b252b5fcf95dc88ab585cb81cd5e0";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();
      `}
    </Script>
  );
}

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}
