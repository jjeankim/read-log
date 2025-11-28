"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/store/auth";
import MonthloyLogChart from "@/components/my/MonthloyLogChart";
import DashboardSummary from "@/components/my/DashboardSummary";
import WeeklyPatternChart from "@/components/my/WeeklyPatternChart";
import YearlyHeatmap from "@/components/my/YearlyHeatmap";

interface SummaryType {
  totalLogs: number;
  monthlyLogs: number;
  avgRating: number;
}

const Page = () => {
  const accessToken = useAuthStore((s) => s.accessToken);
  const [monthlyStats, setMonthlyStats] = useState([]);
  const [weeklyStats, setWeeklyStats] = useState([]);
  const [summary, setSummary] = useState<SummaryType | null>(null);
  const [heatmap, setHeatmap] = useState([]);

  useEffect(() => {
    if (!accessToken) {
      // console.log("🚫 accessToken 없어서 API 요청 안 보냄");
      return;
    }
    const fetchAll = async () => {
      const headers = { Authorization: `Bearer ${accessToken}` };

      // 1) 월별 통계
      const res1 = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/logs/stats/monthly`,
        { headers }
      );
      const monthly = await res1.json();
      setMonthlyStats(monthly);

      // 2) 요약 KPI
      const res2 = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/logs/stats/summary`,
        { headers }
      );
      const summaryData = await res2.json();
      setSummary(summaryData);

      // 3) 요일별 패턴
      const res3 = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/logs/stats/weekly`,
        { headers }
      );
      const weekly = await res3.json();
      setWeeklyStats(weekly);

      // 4) 히트맵
      const res4 = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/logs/stats/heatmap`,
        { headers }
      );
      const heatmapData = await res4.json();
      setHeatmap(heatmapData);
    };

    fetchAll();
  }, [accessToken]);

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
