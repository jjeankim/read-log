import { serverFetch } from "@/lib/api/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: logId } = await context.params;

    const backendRes = await serverFetch(`/likes/${logId}`, {
      method: "POST",
    });

    if (!backendRes.ok) {
      return NextResponse.json(
        { message: "Failed to like" },
        { status: backendRes.status }
      );
    }
    const data = await backendRes.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
