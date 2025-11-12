"use client";

import React, { useMemo } from "react";

type EmbedProps = {
  /** Base Looker Studio URL (no query params). Put in env and pass down. */
  src: string;
  /** Optional query params to append to the embed url (e.g. brand, view mode). */
  params?: Record<string, string | number | boolean | undefined>;
  /** Accessible title for the iframe. */
  title?: string;
  /** Height in pixels; component is responsive to width. */
  height?: number;
  /** If true, removes the border. */
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
    // Recommended Looker Studio flags for embedding
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
        style={{
          width: "100%",
          height,
          border: "0",
          display: "block",
        }}
        allow="fullscreen"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
