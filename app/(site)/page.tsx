import HeroSection from "@/components/home/HeroSection";
import BookLogListSection from "@/components/logs/BookLogListSection";
import { fetchRecentLogs } from "@/lib/api/logs";

const Page = async () => {
  const logs = await fetchRecentLogs();

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto space-y-16">
        <HeroSection />

        <BookLogListSection
          title="인기 독서 기록"
          moreHref="/popular"
          logs={logs}
        />
        <BookLogListSection
          title="최신 독서 기록"
          moreHref="/logs"
          logs={logs}
        />
        <BookLogListSection
          title="추천 독서 기록"
          moreHref="/recommend"
          logs={logs}
        />
      </div>
    </div>
  );
};

export default Page;
