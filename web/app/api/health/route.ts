import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Liveness for load balancers and orchestrators. No secrets.
 */
export async function GET() {
  return NextResponse.json(
    {
      ok: true,
      service: "paladio-web",
      time: new Date().toISOString(),
    },
    {
      status: 200,
      headers: {
        "cache-control": "no-store",
      },
    }
  );
}
