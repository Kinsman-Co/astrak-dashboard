"use client";
import { useState } from "react";
import Embed from "../components/Embed";

export default function AdsPage() {
  const [view, setView] = useState("paid");

  const reports = {
    market:
      "https://lookerstudio.google.com/embed/reporting/b8c62838-0008-4c3c-b464-fb38ce6c452f/page/p_6xmclhf1td",
    paid: "https://lookerstudio.google.com/embed/reporting/b8c62838-0008-4c3c-b464-fb38ce6c452f/page/p_b9qkt7wmmd",
    meta: "https://lookerstudio.google.com/embed/reporting/b8c62838-0008-4c3c-b464-fb38ce6c452f/page/p_s20tsv7wqd",
  };

  return (
    <main style={{ marginTop: "1rem" }}>
      <h1 style={{ textAlign: "center", margin: "1rem 0" }}>Ads Performance</h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          marginBottom: "1.5rem",
        }}
      >
        <button
          onClick={() => setView("market")}
          style={{
            background: view === "market" ? "#111827" : "#E5E7EB",
            color: view === "market" ? "white" : "#111827",
            border: "none",
            borderRadius: "6px",
            padding: "0.5rem 1rem",
            cursor: "pointer",
          }}
        >
          Spend by Market
        </button>
        <button
          onClick={() => setView("paid")}
          style={{
            background: view === "paid" ? "#111827" : "#E5E7EB",
            color: view === "paid" ? "white" : "#111827",
            border: "none",
            borderRadius: "6px",
            padding: "0.5rem 1rem",
            cursor: "pointer",
          }}
        >
          Paid Performance
        </button>
        <button
          onClick={() => setView("meta")}
          style={{
            background: view === "meta" ? "#111827" : "#E5E7EB",
            color: view === "meta" ? "white" : "#111827",
            border: "none",
            borderRadius: "6px",
            padding: "0.5rem 1rem",
            cursor: "pointer",
          }}
        >
          Meta Performance
        </button>
      </div>

      <Embed src={reports[view]} title="Ads Report" height={900} />
    </main>
  );
}
