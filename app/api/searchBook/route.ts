import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  const res = await fetch(
    `https://dapi.kakao.com/v3/search/book?query=${query}`,
    {
      headers: {
        Authorization: `KakaoAK ${process.env.KAKAO_REST_KEY}`,
      },
    }
  );

  const data = await res.json();
  return NextResponse.json(data);
}
