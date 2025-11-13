// app/brands/page.tsx
import Link from "next/link";

const BRANDS = [
  { id: "astrak", name: "Astrak" },
  // add more brands here as needed
];

export default function BrandsIndex() {
  return (
    <main style={{ maxWidth: 960, margin: "0 auto", padding: 24 }}>
      <h1 style={{ marginBottom: 16 }}>Brands</h1>
      <ul
        style={{
          display: "grid",
          gap: 12,
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          listStyle: "none",
          padding: 0,
          margin: 0,
        }}
      >
        {BRANDS.map((b) => (
          <li
            key={b.id}
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: 8,
              padding: 12,
              background: "#fff",
            }}
          >
            <div style={{ fontWeight: 600, marginBottom: 8 }}>{b.name}</div>
            <Link href={`/brand/${b.id}`} style={{ color: "#2563eb" }}>
              Open dashboard →
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
