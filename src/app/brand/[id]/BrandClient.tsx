"use client";

import React, { useEffect, useMemo, useState } from "react";
import Embed from "../../components/Embed";
import MonthlyInsights from "../../components/MonthlyInsights";

export type TabKey = "channels" | "funnel" | "seo" | "creative";
export type ViewMode = "weekly" | "monthly";

const TABS: TabKey[] = ["channels", "funnel", "seo", "creative"];
const MODES: ViewMode[] = ["weekly", "monthly"];

/** Map each tab+mode to a Looker Studio base embed URL (no query params). */
const REPORT_URLS: Record<TabKey, Partial<Record<ViewMode, string>>> = {
  channels: {
    weekly: process.env.NEXT_PUBLIC_LS_CHANNELS_WEEKLY_URL || "",
    monthly: process.env.NEXT_PUBLIC_LS_CHANNELS_MONTHLY_URL || "",
  },
  funnel: {
    weekly: process.env.NEXT_PUBLIC_LS_FUNNEL_WEEKLY_URL || "",
    monthly: process.env.NEXT_PUBLIC_LS_FUNNEL_MONTHLY_URL || "",
  },
  seo: {
    weekly: process.env.NEXT_PUBLIC_LS_SEO_WEEKLY_URL || "",
    monthly: process.env.NEXT_PUBLIC_LS_SEO_MONTHLY_URL || "",
  },
  creative: {
    weekly: process.env.NEXT_PUBLIC_LS_CREATIVE_WEEKLY_URL || "",
    monthly: process.env.NEXT_PUBLIC_LS_CREATIVE_MONTHLY_URL || "",
  },
};

export default function BrandClient({ id }: { id: string }) {
  const [tab, setTab] = useState<TabKey>("channels");
  const [mode, setMode] = useState<ViewMode>("monthly"); // default to Monthly for this task

  // Optional: deep-linking via ?tab=channels&mode=monthly
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const t = sp.get("tab") as TabKey | null;
    const m = sp.get("mode") as ViewMode | null;
    if (t && TABS.includes(t)) setTab(t);
    if (m && MODES.includes(m)) setMode(m);
  }, []);

  const reportUrl = useMemo(() => {
    const url = REPORT_URLS[tab]?.[mode] || "";
    return url;
  }, [tab, mode]);

  return (
    <div style={{ padding: 24 }}>
      <div style={{ textAlign: "center", marginBottom: 12, opacity: 0.8 }}>{id}</div>

      {/* Tab controls */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 8 }}>
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: "6px 10px",
              borderRadius: 8,
              border: "1px solid #e5e7eb",
              background: t === tab ? "#111827" : "#f3f4f6",
              color: t === tab ? "#fff" : "#111827",
              cursor: "pointer",
            }}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Mode controls */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 20 }}>
        {MODES.map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            style={{
              padding: "6px 10px",
              borderRadius: 8,
              border: "1px solid #e5e7eb",
              background: m === mode ? "#111827" : "#f3f4f6",
              color: m === mode ? "#fff" : "#111827",
              cursor: "pointer",
            }}
          >
            {m.charAt(0).toUpperCase() + m.slice(1)}
          </button>
        ))}
      </div>

      {/* Embedded Looker Studio report */}
      {reportUrl ? (
        <Embed
          src={reportUrl}
          title={`${tab} — ${mode}`}
          height={1000}
          params={{ brand: id, view: mode }}
        />
      ) : (
        <div
          style={{
            padding: "1rem",
            border: "1px solid #e5e7eb",
            borderRadius: 8,
            background: "#fff7ed",
            marginBottom: 12,
          }}
        >
          Missing embed URL for <strong>{tab}</strong> / <strong>{mode}</strong>. Set the corresponding{" "}
          <code>NEXT_PUBLIC_LS_*_URL</code> env var.
        </div>
      )}

      {/* Insights directly under the report, only for Channels + Monthly */}
      {tab === "channels" && mode === "monthly" && (
        <div style={{ marginTop: 16 }}>
          <MonthlyInsights brandId={id} />
        </div>
      )}
    </div>
  );
}
