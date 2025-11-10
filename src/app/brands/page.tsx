"use client";

import { useState } from "react";
import Embed from "./components/Embed";
import { astrakConfig } from "../config/astrak";

type ViewMode = "weekly" | "monthly";

export default function Home() {
  const [mode, setMode] = useState<ViewMode>("weekly");
  const url = astrakConfig.overview.kpiReports[mode];

  const isPlaceholder =
    !url || url.includes("REPLACE_") || url.endsWith("/REPLACE_ME");

  return (
    <main style={{ maxWidth: 1400, margin: "0 auto", padding: "1rem" }}>
      <h1 style={{ textAlign: "center", margin: "1rem 0" }}>
        {astrakConfig.overview.name}
      </h1>

      {/* Weekly / Monthly toggle */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          marginBottom: "1rem",
        }}
      >
        <button
          onClick={() => setMode("weekly")}
          style={{
            background: mode === "weekly" ? "#111827" : "#E5E7EB",
            color: mode === "weekly" ? "white" : "#111827",
            border: "none",
            borderRadius: "6px",
            padding: "0.5rem 1rem",
            cursor: "pointer",
          }}
        >
          Weekly
        </button>
        <button
          onClick={() => setMode("monthly")}
          style={{
            background: mode === "monthly" ? "#111827" : "#E5E7EB",
            color: mode === "monthly" ? "white" : "#111827",
            border: "none",
            borderRadius: "6px",
            padding: "0.5rem 1rem",
            cursor: "pointer",
          }}
        >
          Monthly
        </button>
      </div>

      {/* Embed or helpful message */}
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
            Add real embed URLs in <code>src/config/astrak.ts</code> for{" "}
            <code>{`overview.kpiReports.${mode}`}</code> to see the report here.
          </p>
        </div>
      ) : (
        <Embed src={url} title={`Overview (${mode})`} />
      )}
    </main>
  );
}
