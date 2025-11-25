import BookLogListSection from "@/components/logs/BookLogListSection";
import { fetchSearchLogs } from "@/lib/api/logs";

const page = async (props: { searchParams: Promise<{ query?: string }> }) => {
  const { query } = await props.searchParams; // ✔ Promise 해제
  const keyword = query?.trim() ?? "";

  if (!keyword.trim()) {
    return (
      <div className="max-w-7xl mx-auto py-20 text-center text-gray-500">
        검색어를 입력해주세요.
      </div>
    );
  }

  const results = await fetchSearchLogs(keyword)
  console.log(results)

  return (
    <div className="max-w-7xl mx-auto py-10 space-y-10">
      <h1 className="text-2xl font-semibold">
        🔍 &ldquo;{keyword}&rdquo; 검색 결과
      </h1>

      <BookLogListSection title="검색 결과" logs={results} />
    </div>
  );
};

export default page;
