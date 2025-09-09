import MainBanner from "@/components/main-banner";
import SectionLayout from "@/components/section-layout";
import { authFetch } from "@/lib/authFetch";
import Image from "next/image";
import Link from "next/link";

interface Log {
  id: number;
  bookAuthor: string;
  title: string;
  rating: number;
  image: string;
}

const getLogList = async () => {
  const res = await authFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/logs?limit=6&sortBy=createdAt&sort=desc`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) throw new Error("로그 목록을 불러오지 못했습니다.");
  return res.json();
};

const getTopRatedLogs = async () => {
  const res = await authFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/logs?sortBy=rating&sort=desc&limit=6`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("평점순 로그를 불러오지 못했습니다.");
  return res.json();
};

export default async function Page() {
  const [{ data: logs }, { data: topRatedLogs }] = await Promise.all([
    getLogList(),
    getTopRatedLogs(),
  ]);

  return (
    <main className="flex flex-col gap-14">
      <MainBanner />
      <SectionLayout title="⏰최신 로그">
        <div className="grid auto-rows-min gap-4 md:grid-cols-6">
          {logs.map((log: Log) => (
            <Link
              key={log.id}
              href={`/logs/${log.id}`}
              className="flex items-center justify-center"
            >
              <Image
                src={log.image || "/book-image.png"}
                width={185}
                height={270}
                alt="book-image"
              />
            </Link>
          ))}
        </div>
      </SectionLayout>
      <SectionLayout title="👍인기 로그">
        <div className="grid auto-rows-min gap-4 md:grid-cols-6">
          {topRatedLogs.map((log: Log) => (
            <Link
              key={log.id}
              href={`/logs/${log.id}`}
              className="flex items-center justify-center"
            >
              <Image
                src={log.image || "/book-image.png"}
                width={185}
                height={270}
                alt="book-image"
              />
            </Link>
          ))}
        </div>
      </SectionLayout>
    </main>
  );
}
