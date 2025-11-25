import Link from "next/link";
import BookLogCard from "./BookLogCard";

interface BookLogData {
  id: number;
  title: string;
  author: string;
  thumbnail?: string;
  _count: {
    likes: number;
    comments: number;
  };
}

interface Props {
  title: string;
  moreHref?: string;
  logs: BookLogData[];
  limit?: number; // 4개 or n개 제한
}

const BookLogListSection = ({ title, moreHref, logs, limit = 4 }: Props) => {
  const sliced = logs.slice(0, limit);

  return (
    <section className="mt-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">{title}</h2>
        {moreHref && (
          <Link href={moreHref} className="text-sm hover:underline">
            더 보기 &gt;
          </Link>
        )}
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {sliced.map((log) => (
          <BookLogCard
            key={log.id}
            id={log.id}
            title={log.title}
            author={log.author}
            thumbnail={log.thumbnail}
            likes={log._count.likes}
            comments={log._count.comments}
          />
        ))}
      </div>
    </section>
  );
};

export default BookLogListSection;
