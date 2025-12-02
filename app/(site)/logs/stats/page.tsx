import MonthloyLogChart from "@/components/my/MonthloyLogChart";
import DashboardSummary from "@/components/my/DashboardSummary";
import WeeklyPatternChart from "@/components/my/WeeklyPatternChart";
import YearlyHeatmap from "@/components/my/YearlyHeatmap";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Page = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    redirect("/login");
  }
  const [monthlyRes, summaryRes, weeklyRes, heatmapRes] = await Promise.all([
    fetch(`${process.env.API_URL}/logs/stats/monthly`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    }),
    fetch(`${process.env.API_URL}/logs/stats/summary`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    }),
    fetch(`${process.env.API_URL}/logs/stats/weekly`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    }),
    fetch(`${process.env.API_URL}/logs/stats/heatmap`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    }),
  ]);

  const monthlyStats = await monthlyRes.json();
  const summary = await summaryRes.json();
  const weeklyStats = await weeklyRes.json();
  const heatmap = await heatmapRes.json();

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10">
      <h1 className="text-2xl font-bold">내 통계</h1>

      {/* 1) 요약 카드 */}
      {summary && (
        <DashboardSummary
          totalLogs={summary.totalLogs}
          monthlyLogs={summary.monthlyLogs}
          avgRating={summary.avgRating}
        />
      )}
      {/* 히트맵 */}
      <YearlyHeatmap data={heatmap} />

      {/* 월별 기록 수 */}
      <MonthloyLogChart data={monthlyStats} />

      {/* 요일별 패턴 */}
      <WeeklyPatternChart data={weeklyStats} />
    </div>
  );
};

export default Page;
