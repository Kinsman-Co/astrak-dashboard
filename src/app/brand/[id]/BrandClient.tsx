"use client";

import React, { useEffect, useMemo, useState } from "react";
import Embed from "../../components/Embed";

/* ---------------------------
   Inline Insights renderer
   --------------------------- */

type Insight = {
  metric: string;
  change?: string;
  why: string;
  next: string;
  confidence?: string;
};

function InsightsPanel({
  brandId,
  viewKey,
  title,
}: {
  brandId: string;       // e.g. "astrak"
  viewKey: string;       // e.g. "channels.monthly"
  title?: string;
}) {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("");

  const apiUrl = useMemo(() => {
    const b = (brandId || "").toLowerCase();
    const v = (viewKey || "").toLowerCase();
    return `/api/insights/${encodeURIComponent(b)}/${encodeURIComponent(v)}`;
  }, [brandId, viewKey]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setErr(null);
    setStatus("");

    (async () => {
      try {
        const r = await fetch(apiUrl, { cache: "no-store" });
        setStatus(`HTTP ${r.status}`);
        if (!r.ok) {
          const t = await r.text().catch(() => "");
          throw new Error(`HTTP ${r.status}${t ? ` — ${t}` : ""}`);
        }
        const data = await r.json();
        const list = Array.isArray(data?.insights) ? data.insights : [];
        const ts = (data?.updatedAt as string) || null;

        if (!cancelled) {
          setInsights(list);
          setUpdatedAt(ts);
          setLoading(false);
        }
      } catch (e: any) {
        if (!cancelled) {
          setErr(e?.message || "Failed to load insights");
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [apiUrl]);

  const DebugLine = (
    <div
      style={{
        marginBottom: 8,
        padding: "4px 8px",
        fontSize: 12,
        borderRadius: 6,
        border: "1px dashed #CBD5E1",
        background: "#F8FAFC",
        color: "#334155",
        wordBreak: "break-all",
      }}
    >
      Insights request → <strong>{apiUrl}</strong>
      {status ? ` • ${status}` : ""}{" "}
      {(!loading && !err) ? ` • count=${insights.length}` : ""}
    </div>
  );

  if (loading) {
    return (
      <div
        style={{
          padding: "1rem",
          background: "#F1F5F9",
          border: "1px solid #E2E8F0",
          borderRadius: 8,
          textAlign: "center",
        }}
      >
        {DebugLine}
        Loading insights…
      </div>
    );
  }

  if (err) {
    return (
      <div
        style={{
          padding: "1rem",
          background: "#FEF2F2",
          border: "1px solid #FCA5A5",
          borderRadius: 8,
        }}
      >
        {DebugLine}
        <strong>Couldn’t load insights.</strong>
        <div style={{ marginTop: 6, color: "#991B1B" }}>{err}</div>
      </div>
    );
  }

  if (!insights.length) {
    return (
      <div
        style={{
          padding: "1rem",
          background: "#FFFBEB",
          border: "1px solid #FDE68A",
          borderRadius: 8,
        }}
      >
        {DebugLine}
        No insights generated yet.
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gap: 12 }}>
      {DebugLine}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <h2 style={{ fontSize: 16, margin: 0 }}>{title || "Insights"}</h2>
        {updatedAt && (
          <span
            style={{
              fontSize: 12,
              padding: "2px 8px",
              borderRadius: 999,
              background: "#EEF2FF",
              border: "1px solid #C7D2FE",
            }}
          >
            Updated {new Date(updatedAt).toLocaleString()}
          </span>
        )}
      </div>

      {insights.map((ins, idx) => (
        <div
          key={idx}
          style={{
            border: "1px solid #E5E7EB",
            borderRadius: 12,
            padding: "1rem",
            background: "#FFFFFF",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
            <div style={{ fontWeight: 600 }}>{ins.metric}</div>
            <div style={{ opacity: 0.8 }}>{ins.change ?? ""}</div>
          </div>

          <div style={{ marginTop: 8 }}>
            <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5, opacity: 0.6 }}>
              Why
            </div>
            <div style={{ marginTop: 4 }}>{ins.why}</div>
          </div>

          <div style={{ marginTop: 10 }}>
            <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5, opacity: 0.6 }}>
              Next
            </div>
            <div style={{ marginTop: 4 }}>{ins.next}</div>
          </div>

          {ins.confidence && (
            <div
              style={{
                marginTop: 10,
                display: "inline-block",
                padding: "2px 8px",
                borderRadius: 999,
                background: "#EEF2FF",
                border: "1px solid #C7D2FE",
                fontSize: 12,
              }}
            >
              Confidence: {ins.confidence}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ---------------------------
   Brand client (tabs + embed)
   --------------------------- */

export type TabKey = "channels" | "funnel" | "seo" | "creative";
export type ViewMode = "weekly" | "monthly";

const TABS: TabKey[] = ["channels", "funnel", "seo", "creative"];
const MODES: ViewMode[] = ["weekly", "monthly"];

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
  const [mode, setMode] = useState<ViewMode>("monthly");

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const t = sp.get("tab") as TabKey | null;
    const m = sp.get("mode") as ViewMode | null;
    if (t && TABS.includes(t)) setTab(t);
    if (m && MODES.includes(m)) setMode(m);
  }, []);

  const reportUrl = useMemo(() => REPORT_URLS[tab]?.[mode] || "", [tab, mode]);
  const viewKey = `${tab}.${mode}`;

  return (
    <div style={{ padding: 24 }}>
      <div style={{ textAlign: "center", marginBottom: 12, opacity: 0.8 }}>{id}</div>

      {/* Tabs */}
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

      {/* Modes */}
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

      {/* Embed */}
      {reportUrl ? (
        <Embed
          src={reportUrl}
          title={`${tab} — ${mode}`}
          height={1000}
          params={{ brand: id, view: viewKey }}
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
          Add an embed URL for <strong>{tab}</strong> / <strong>{mode}</strong> (env:
          <code> NEXT_PUBLIC_LS_{tab.toUpperCase()}_{mode.toUpperCase()}_URL</code>).
        </div>
      )}

      {/* Insights (always mounted under the embed) */}
      <div style={{ marginTop: 16 }}>
        <InsightsPanel
          brandId={id}
          viewKey={viewKey}
          title={`${tab.charAt(0).toUpperCase() + tab.slice(1)} — ${mode[0].toUpperCase() + mode.slice(1)} Insights`}
        />
      </div>
    </div>
  );
}
