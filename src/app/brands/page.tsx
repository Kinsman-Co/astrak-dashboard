import Link from "next/link";
import { astrakConfig } from "../../config/astrak";

export const metadata = { title: "Brands • Kinsman & Co Dashboard" };

export default function BrandsIndex() {
  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "1rem" }}>
      <h1 style={{ textAlign: "center", margin: "1rem 0" }}>Astrak Brands</h1>
      <ul style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        {astrakConfig.brands.map((b) => (
          <li key={b.id}>
            <Link
              href={`/brand/${b.id}`}
              style={{
                display: "block",
                padding: "12px 14px",
                borderRadius: 8,
                background: "#111827",
                color: "white",
                textDecoration: "none",
              }}
            >
              {b.name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
