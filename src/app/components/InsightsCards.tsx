"use client";
import React from "react";

export type Insight = {
  metric: string;
  change?: string;
  why: string;
  next: string;
  confidence?: "low" | "medium" | "high" | string;
};

function ConfidenceBadge({ level }: { level?: string }) {
  const cls =
    level === "high"
      ? "bg-emerald-100 text-emerald-800 border-emerald-200"
      : level === "medium"
      ? "bg-amber-100 text-amber-800 border-amber-200"
      : "bg-slate-100 text-slate-700 border-slate-200";
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs ${cls}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60" />
      {level ?? "n/a"}
    </span>
  );
}

export default function InsightsCards({
  items,
  title = "Insights",
}: {
  items: Insight[];
  title?: string;
}) {
  return (
    <section className="mx-auto w-full max-w-[1200px]">
      <div className="mb-3 flex items-end justify-between">
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      </div>

      {!items || items.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-6 text-slate-600">
          No insights yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {items.map((i, idx) => (
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
