import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

type ViewMode = "weekly" | "monthly";
type Insight = { metric: string; change?: string; why: string; next: string; confidence?: string };

function keyFor(brand: string, view: ViewMode) {
  return `insights:${brand}:${view}`;
}

// GET /api/insights/astrak/monthly  -> { brand, view, updatedAt, insights: Insight[] }
export async function GET(
  _req: Request,
  { params }: { params: { brand: string; view: ViewMode } }
) {
  const { brand, view } = params;
  const record = (await kv.get(keyFor(brand, view))) as
    | { insights?: Insight[]; updatedAt?: string }
    | null;

  return NextResponse.json({
    brand,
    view,
    updatedAt: record?.updatedAt ?? null,
    insights: record?.insights ?? [],
  });
}

// POST /api/insights/astrak/monthly   body: { insights: Insight[] }
// Header: Authorization: Bearer <INSIGHTS_WRITE_TOKEN>
export async function POST(
  req: Request,
  { params }: { params: { brand: string; view: ViewMode } }
) {
  const auth = req.headers.get("authorization") || "";
  const token = process.env.INSIGHTS_WRITE_TOKEN;

  if (!token || !auth.startsWith("Bearer ") || auth.slice(7) !== token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { brand, view } = params;

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const insights = (payload as any)?.insights;
  if (!Array.isArray(insights)) {
    return NextResponse.json({ error: "Missing insights[]" }, { status: 400 });
  }

  const record = { insights, updatedAt: new Date().toISOString() };
  await kv.set(keyFor(brand, view), record);

  return NextResponse.json({ ok: true, ...record });
}
