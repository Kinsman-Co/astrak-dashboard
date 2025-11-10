type Insight = { metric: string; change: string; why: string; next: string };

export default function Insights({
  items,
  title = "Insights",
}: {
  items: Insight[];
  title?: string;
}) {
  if (!items || items.length === 0) return null;

  return (
    <section style={{ maxWidth: 1200, margin: "2rem auto 0", padding: "0 1rem" }}>
      <h2 style={{ marginBottom: "0.75rem", fontSize: 20 }}>{title}</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "12px",
        }}
      >
        {items.map((it, i) => (
          <div
            key={i}
            style={{
              background: "white",
              border: "1px solid #E5E7EB",
              borderRadius: 10,
              padding: "14px 16px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
          >
            <div style={{ fontWeight: 600, marginBottom: 6 }}>
              {it.metric} {it.change && <span style={{ opacity: 0.8 }}>({it.change})</span>}
            </div>
            <div style={{ marginBottom: 6 }}>
              <strong>Why:</strong> {it.why}
            </div>
            <div>
              <strong>Next step:</strong> {it.next}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
