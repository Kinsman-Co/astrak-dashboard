import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";

type Params = { params: { brand: string; view: string } };

const REQUIRED_TOKEN_ENV = "9fb73837248c6ad8714555b45b8ce95a25426131b02eaef6fbfe170ca00ad072";

/** Canonical KV key: insights:<brandLower>:<viewLower> */
function kvKey(brand: string, view: string) {
  const b = (brand || "").trim().toLowerCase();
  const v = (view || "").trim().toLowerCase();
  return `insights:${b}:${v}`;
}

export async function GET(_req: Request, { params }: Params) {
  const brand = params.brand ?? "";
  const view = params.view ?? "";

  if (!brand || !view) {
    return NextResponse.json(
      { insights: [], updatedAt: null, error: "Missing brand or view" },
      { status: 400 }
    );
  }

  try {
    const stored = await kv.get<{ insights: any[]; updatedAt?: string }>(
      kvKey(brand, view)
    );

    if (!stored) {
      return NextResponse.json({ insights: [], updatedAt: null });
    }

    const insights = Array.isArray(stored.insights) ? stored.insights : [];
    const updatedAt = stored.updatedAt ?? null;

    return NextResponse.json({ insights, updatedAt });
  } catch (err: any) {
    return NextResponse.json(
      { insights: [], updatedAt: null, error: err?.message || "Read failed" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request, { params }: Params) {
  const brand = params.brand ?? "";
  const view = params.view ?? "";

  if (!brand || !view) {
    return NextResponse.json({ error: "Missing brand or view" }, { status: 400 });
  }

  // Bearer token guard
  const required = process.env[REQUIRED_TOKEN_ENV];
  const authHeader = req.headers.get("authorization") || "";
  const token = authHeader.replace(/^Bearer\s+/i, "");

  if (!required || token !== required) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const insights = Array.isArray(body?.insights) ? body.insights : [];

    await kv.set(kvKey(brand, view), {
      insights,
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true, count: insights.length });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Write failed" },
      { status: 500 }
    );
  }
}
