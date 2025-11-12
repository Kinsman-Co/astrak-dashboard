import { NextRequest, NextResponse } from "next/server";

// TEMP STORAGE (dev only). We'll swap this for Vercel KV/Blob later.
const memory: Record<string, any> = {};

type Period = "weekly" | "monthly";
type Insight = { metric: string; change: string; why: string; next: string };

function key(brand: string, period: Period) {
  return `${brand}:${period}`;
}

export async function GET(
  _req: NextRequest,
  { params }: { params: { brand: string; period: Period } }
) {
  const { brand, period } = params;
  const data = memory[key(brand, period)];
  return NextResponse.json({ items: Array.isArray(data) ? data : [] });
}

export async function POST(
  req: NextRequest,
  { params }: { params: { brand: string; period: Period } }
) {
  const auth = req.headers.get("authorization");
  const token = process.env.INSIGHTS_WRITE_TOKEN;

  if (!auth || !token || auth !== `Bearer ${token}`) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body = (await req.json()) as { items: Insight[] };
  if (!body || !Array.isArray(body.items)) {
    return new NextResponse("Bad Request", { status: 400 });
  }

  memory[key(params.brand, params.period)] = body.items;
  return NextResponse.json({ ok: true });
}
