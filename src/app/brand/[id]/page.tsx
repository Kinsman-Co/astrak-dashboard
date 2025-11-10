"use client";

import { useMemo, useState } from "react";
import { astrakConfig, type TabKey, type ViewMode } from "../../../config/astrak";
import Embed from "../../components/Embed";

const TABS: TabKey[] = ["channels", "funnel", "seo", "creative"];

export default function BrandPage({ params }: { params: { id: string } }) {
  const brand = useMemo(
    () => astrakConfig.brands.find((b) => b.id === params.id),
    [params.id]
  );

  const [tab, setTab] = useState<TabKey>("channels");
  const [mode, setMode] = useState<ViewMode>("weekly");

  if (!brand) {
    return (
      <main style={{ maxWidth: 900, margin: "0 auto", padding: "1rem" }}>
        <h1>Brand not found</h1>
        <p>Check the URL or update <code>src/config/astrak.ts</code> brand IDs.</p>
      </main>
    );
  }

  const url = brand.reports[tab][mode];
  const isPlaceholder = !url || url.includes("REPLACE_") || url.endsWith("/REPLACE_ME");

  return (
    <main style={{ maxWidth: 1400, margin: "0 auto", padding: "1rem" }}>
      <h1 style={{ textAlign: "center", margin: "1rem 0" }}>{brand.name}</h1>

      {/* Tabs */}
      <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: 12 }}>
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              background: tab === t ? "#111827" : "#E5E7EB",
              color: tab === t ? "white" : "#111827",
              border: "none",
              borderRadius: 6,
              padding: "6px 12px",
              cursor: "pointer",
              textTransform: "capitalize",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Weekly / Monthly */}
      <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: 16 }}>
        {(["weekly", "monthly"] as ViewMode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            style={{
              background: mode === m ? "#111827" : "#E5E7EB",
              color: mode === m ? "white" : "#111827",
              border: "none",
              borderRadius: 6,
              padding: "6px 12px",
              cursor: "pointer",
              textTransform: "capitalize",
            }}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Embed or hint */}
      {isPlaceholder ? (
        <div
          style={{
            background: "#FFF8DB",
            border: "1px solid #FACC15",
            padding: "1rem",
            borderRadius: 8,
            textAlign: "center",
          }}
        >
          <p>
            Add an embed URL for <code>{`${brand.id}.reports.${tab}.${mode}`}</code> in{" "}
            <code>src/config/astrak.ts</code>.
          </p>
        </div>
      ) : (
        <Embed src={url} title={`${brand.name} • ${tab} (${mode})`} />
      )}
    </main>
  );
}
