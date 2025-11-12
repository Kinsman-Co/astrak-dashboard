"use client";

import React, { useEffect, useMemo, useState } from "react";

export type Insight = {
  metric: string;
  change?: string;
  why: string;
  next: string;
  confidence?: string;
};

type MonthlyInsightsProps = {
  brandId: string;
  refreshKey?: string | number;
};

export default function MonthlyInsights({ brandId, refreshKey }: MonthlyInsightsProps) {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const apiUrl = useMemo(() => {
    // Matches your existing API route: /api/insights/:brand/monthly
    return `/api/insights/${encodeURIComponent(brandId)}/monthly`;
  }, [brandId]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setErr(null);

    fetch(apiUrl, { cache: "no-store" })
      .then(async (r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const data = await r.json();
        const list = Array.isArray(data) ? data : Array.isArray(data.insights) ? data.insights : [];
        const ts =
          (data.updatedAt as string) ||
          (data.receivedAt as string) ||
          (data.updated_at as string) ||
          null;

        if (!cancelled) {
          setInsights(list);
          setUpdatedAt(ts);
          setLoading(false);
        }
      })
      .catch((e) => {
        if (!cancelled) {
          setErr(e?.message || "Failed to load insights");
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [apiUrl, refreshKey]);

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
        Loading monthly insights…
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
        No monthly insights available yet.
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <h2 style={{ fontSize: 16, margin: 0 }}>Insights (Monthly)</h2>
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

      {insights.map((ins: Insight, idx: number) => (
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
