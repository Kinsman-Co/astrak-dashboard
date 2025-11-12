// src/app/components/Insights.tsx
import React from "react";
import { headers } from "next/headers";

type ViewMode = "weekly" | "monthly";
type Insight = {
  metric: string;
  change?: string;
  why: string;
  next: string;
  confidence?: "low" | "medium" | "high" | string;
};

async function getInsights(brand: string, view: ViewMode) {
  const h = await headers();
  const host = h.get("host") ?? "";
  const protocol = host.includes("localhost") ? "http" : "https";
  const base = `${protocol}://${host}`;

  const res = await fetch(`${base}/api/insights/${brand}/${view}`, {
    cache: "no-store",
  });

  if (!res.ok) return { updatedAt: null, insights: [] as Insight[] };
  return res.json() as Promise<{ updatedAt: string | null; insights: Insight[] }>;
}

function ConfidenceBadge({ level }: { level?: string }) {
  const color =
    level === "high" ? "bg-emerald-100 text-emerald-800 border-emerald-200" :
    level === "medium" ? "bg-amber-100 text-amber-800 border-amber-200" :
    "bg-slate-100 text-slate-700 border-slate-200";
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs ${color}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60" />
      {level ?? "n/a"}
    </span>
  );
}

export default async function Insights({
  brand,
  view,
  title = "Insights",
}: {
  brand: string;
  view: ViewMode;
  title?: string;
}) {
  const { insights, updatedAt } = await getInsights(brand, view);

  return (
    <section className="mx-auto w-full max-w-[1200px]">
      <div className="mb-3 flex items-end justify-between">
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        <div className="text-xs text-slate-500">
          {updatedAt ? `Updated ${new Date(updatedAt).toLocaleString()}` : "No updates yet"}
        </div>
      </div>

      {(!insights || insights.length === 0) ? (
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-6 text-slate-600">
          No insights yet. When your n8n job runs, AI notes will appear here.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {insights.map((i, idx) => (
            <article
              key={idx}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_0_rgba(15,23,42,0.04)]"
            >
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-sm font-medium text-slate-900">{i.metric}</h3>
                <ConfidenceBadge level={i.confidence} />
              </div>
              {i.change ? (
                <p className="text-sm text-slate-600">
                  <span className="font-medium text-slate-900">Change:</span> {i.change}
                </p>
              ) : null}
              <p className="mt-2 text-sm text-slate-700">
                <span className="font-medium text-slate-900">Why:</span> {i.why}
              </p>
              <p className="mt-2 text-sm text-slate-700">
                <span className="font-medium text-slate-900">Next:</span> {i.next}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
