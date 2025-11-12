"use client";

import React, { useMemo } from "react";

type EmbedProps = {
  src: string;
  params?: Record<string, string | number | boolean | undefined>;
  title?: string;
  height?: number;
  borderless?: boolean;
};

export default function Embed({
  src,
  params,
  title = "Embedded report",
  height = 900,
  borderless = true,
}: EmbedProps) {
  const url = useMemo(() => {
    const u = new URL(src);
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null) u.searchParams.set(k, String(v));
      });
    }
    if (!u.searchParams.has("rm")) u.searchParams.set("rm", "minimal");
    if (!u.searchParams.has("wd")) u.searchParams.set("wd", "true");
    return u.toString();
  }, [src, params]);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "100%",
        border: borderless ? "none" : "1px solid #e5e7eb",
        borderRadius: 8,
        overflow: "hidden",
        background: "#fff",
      }}
    >
      <iframe
        title={title}
        src={url}
        style={{ width: "100%", height, border: "0", display: "block" }}
        allow="fullscreen"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
