"use client";

import Heatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

interface HeatmapData {
  date: string;
  count: number;
}
const YearlyHeatmap = ({ data }: { data: HeatmapData[] }) => {
  const today = new Date();

  return (
    <div className="bg-white p-4 border rounded-md shadow-sm">
      <h2 className="text-lg font-semibold mb-4">연간 독서 히트맵</h2>

      <Heatmap
        startDate={new Date(today.getFullYear(), 0, 1)}
        endDate={today}
        values={data}
        classForValue={(value) => {
          if (!value || value.count === 0) return "color-empty";
          if (value.count < 2) return "color-github-1";
          if (value.count < 4) return "color-github-2";
          if (value.count < 6) return "color-github-3";
          return "color-github-4";
        }}
      />
    </div>
  );
};

export default YearlyHeatmap;
