import React from "react";
import Link from "next/link";

/**
 * Brands index page.
 * Lists available brands and links to /brand/[id].
 * Configure brands via NEXT_PUBLIC_BRANDS="astrak,anotherbrand"
 */
export default async function BrandsPage() {
  const raw = process.env.NEXT_PUBLIC_BRANDS || "astrak";
  const brands = raw.split(",").map((s) => s.trim()).filter(Boolean);

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 20, marginBottom: 12 }}>Brands</h1>
      <div style={{ display: "grid", gap: 10 }}>
        {brands.map((id) => (
          <Link
            key={id}
            href={`/brand/${encodeURIComponent(id)}`}
            style={{
              display: "block",
              padding: "10px 12px",
              border: "1px solid #e5e7eb",
              borderRadius: 8,
              background: "#fff",
              textDecoration: "none",
              color: "#111827",
            }}
          >
            /brand/{id}
          </Link>
        ))}
      </div>
    </div>
  );
}
