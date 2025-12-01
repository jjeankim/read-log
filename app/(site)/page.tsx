import FABButton from "@/components/home/FABButton";
import HeroSection from "@/components/home/HeroSection";
import BookLogListSection from "@/components/logs/BookLogListSection";
import { fetchLogs } from "@/lib/api/logs";


const Page = async () => {
  const [popularLogs, recentLogs, recommendLogs] = await Promise.all([
    fetchLogs("popular"),
    fetchLogs("recent"),
    fetchLogs("recommend"),
  ]);

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto space-y-16">
        <HeroSection />

        <BookLogListSection
          title="인기 독서 기록"
          moreHref="/popular"
          logs={popularLogs}
        />
        <BookLogListSection
          title="최신 독서 기록"
          moreHref="/logs"
          logs={recentLogs}
        />
        <BookLogListSection
          title="추천 독서 기록"
          moreHref="/recommend"
          logs={recommendLogs}
        />
      </div>
      {/* <div className="group">
        <Link
          href="/logs/write"
          className="fixed bottom-6 right-6 bg-primary text-white w-14 h-14 
        rounded-full flex items-center justify-center text-3xl 
        shadow-xl hover:opacity-80 transition"
        >
          <Plus size={28} />
        </Link>
        <span className="absolute bottom-22 right-6 bg-(--foreground-strong) text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
          기록 작성
        </span>
      </div> */}
      <FABButton/>
    </div>
  );
};

export default Page;
