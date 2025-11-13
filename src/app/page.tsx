// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{
        maxWidth: 960,
        margin: "0 auto",
        padding: 24,
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>
        Astrak Performance Dashboard
      </h1>
      <p style={{ marginBottom: 24, color: "#4b5563" }}>
        Choose a brand to view its Looker Studio dashboards and n8n-powered
        insights.
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          maxWidth: 400,
        }}
      >
        <Link
          href="/brands"
          style={{
            padding: "10px 14px",
            borderRadius: 8,
            border: "1px solid #e5e7eb",
            background: "#f9fafb",
            textDecoration: "none",
          }}
        >
          → View brands
        </Link>
        <Link
          href="/brand/astrak"
          style={{
            padding: "10px 14px",
            borderRadius: 8,
            border: "1px solid #e5e7eb",
            background: "#f9fafb",
            textDecoration: "none",
          }}
        >
          → Go straight to Astrak brand dashboard
        </Link>
      </div>
    </main>
  );
}
