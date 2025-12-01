import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: logId } = await context.params;
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    console.log("logId:", logId);
    console.log("token:", token);
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    console.log(`${process.env.API_URL}/likes/${logId}`);

    const backendRes = await fetch(
      `${process.env.API_URL}/likes/${logId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!backendRes.ok) {
      return NextResponse.json(
        {
          message: "Failed to like",
        },
        { status: backendRes.status }
      );
    }
    const data = await backendRes.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Server error",
      },
      { status: 500 }
    );
  }
}
