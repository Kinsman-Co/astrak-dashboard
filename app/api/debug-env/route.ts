import { NextResponse } from "next/server";

export async function GET() {
  const token = process.env.INSIGHTS_WRITE_TOKEN;
  return NextResponse.json({
    hasToken: !!token,
    tokenLength: token?.length || 0,
    nodeEnv: process.env.NODE_ENV,
    vercelEnv: process.env.VERCEL_ENV,
  });
}
