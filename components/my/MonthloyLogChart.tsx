"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface MonthData {
  month: string;
  count: number;
}

const MonthloyLogChart = ({ data }: {data:MonthData[]}) => {
  return (
    <div className="w-full h-64 bg-white p-4 border rounded-md shadow-sm">
      <h2 className="text-lg font-semibold mb-3">월별 기록 수</h2>

      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data}>
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
          <Tooltip />
          <Bar dataKey="count" fill="#4F46E5" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthloyLogChart;
