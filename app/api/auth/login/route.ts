import { NextRequest, NextResponse } from "next/server";

// AccessToken 쿠키 저장용 route
export async function POST (req: NextRequest){
  try {
    const body = await req.json();

    const backendRes = await fetch(process.env.API_URL + "/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      credentials: "include",
    });

    if (!backendRes.ok) {
      return new NextResponse("Login failed", { status: backendRes.status });
    }

    const data = await backendRes.json();
    const accessToken = data.accessToken;

    const response = NextResponse.json({ success: true });

    response.cookies.set({
      name: "accessToken",
      value: accessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60, //1시간
    });

    return response;
  } catch (error) {
    console.error("로그인 오류:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};


