"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface WeekData {
  weekday: string;
  count: number;
}

const weekMap: Record<string, string> = {
  Mon: "월요일",
  Tue: "화요일",
  Wed: "수요일",
  Thu: "목요일",
  Fri: "금요일",
  Sat: "토요일",
  Sun: "일요일",
};

const WeeklyPatternChart = ({ data }: { data: WeekData[] }) => {
  const translatedDate = data.map((item) => ({
    ...item,
    weekday: weekMap[item.weekday] || item.weekday,
  }));

  const mostReadDay =
    translatedDate.length > 0
      ? translatedDate.reduce((a, b) => (a.count > b.count ? a : b)).weekday
      : null;
  return (
    <div className="w-full h-64 bg-white p-4 border rounded-md shadow-sm">
      <h2 className="text-lg font-semibold mb-3">요일별 독서 패턴</h2>
      {mostReadDay && (
        <div className="mb-2 text-sm bg-indigo-50 text-indigo-700 px-3 py-1 rounded-md inline-block">
          📌 이번 년도 가장 많이 읽은 요일은 <b>{mostReadDay}</b> 입니다!
        </div>
      )}

      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data}>
          <XAxis dataKey="weekday" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#10B981" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyPatternChart;
