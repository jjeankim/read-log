import { serverFetch } from "@/lib/api/server";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    const res = await serverFetch("/logs/stats/weekly");

    if (!res.ok) {
      return NextResponse.json(
        { message: "Failed to fetch weekly stats" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Weekly stats error:", err);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
