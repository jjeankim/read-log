import { fetchRecentLogs } from "@/lib/api/logs";
import Image from "next/image";
import Link from "next/link";

interface Logs {
  id: number;
  thumbnail?: string;
  title: string;
  author: string;
  _count: {
    likes: number;
    comments: number;
  };
}
const RecentLogs = async () => {
  const logs: Logs[] = await fetchRecentLogs();

  const sliceLog = logs.slice(0, 4);
  return (
    <section>
      <div className="flex justify-between">
        <h2 className="text-xl font-bold mb-6">최신 독서 기록</h2>
        <Link href={"/logs"} className="text-sm hover:underline">
          더 보기 &gt;
        </Link>
      </div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {sliceLog.map((log) => (
          <Link
            href={`/logs/${log.id}`}
            key={log.id}
            className="border rounded-lg p-4 shadow hover:shadow-md transition bg-white"
          >
            <div className="w-full h-40 relative mb-3 bg-gray-100 rounded">
              {log.thumbnail ? (
                <Image
                  src={"/no-image.png"}
                  alt={log.title}
                  fill
                  className="object-cover rounded"
                />
              ) : (
                <div className="flex justify-center items-center h-full text-gray-400">
                  No Image
                </div>
              )}
            </div>

            <h3 className="font-semibold text-base line-clamp-2">
              {log.title}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{log.author}</p>
            <div className="flex justify-between mt-3 text-xs text-gray-500">
              <span>{log._count?.likes || 0}</span>
              <span>{log._count?.comments || 0}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RecentLogs;
