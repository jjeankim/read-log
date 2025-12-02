import { serverFetch } from "@/lib/api/server";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    const res = await serverFetch("/logs/stats/monthly");

    if (!res.ok) {
      return NextResponse.json(
        { message: "Failed to fetch monthly stats" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Monthly stats error:", err);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
