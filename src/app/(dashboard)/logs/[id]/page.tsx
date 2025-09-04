import { authFetch } from "@/lib/authFetch";
import Image from "next/image";

interface LogPageProps {
  params: { id: string };
}

const getLog = async (logId: string) => {
  const res = await authFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/logs/${logId}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) throw new Error("로그 상세를 불러오지 못했습니다.");
  return res.json();
};

export default async function LogPage({ params }: LogPageProps) {
  const { data: log } = await getLog(params.id);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-2">{log.title}</h1>
      <p className="text-gray-600 mb-4">{log.bookAuthor}</p>
      <p className="text-sm text-gray-400 mb-4">평점: {log.rating}</p>

      <Image
        src={log.image || "/book-image.png"}
        width={150}
        height={200}
        alt="book-image"
        className="mb-4"
      />

      <div className="whitespace-pre-wrap">{log.content}</div>
    </div>
  );
}
