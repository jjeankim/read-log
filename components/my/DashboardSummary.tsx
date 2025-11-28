import { Card, CardContent } from "../ui/card";

interface DashboardSummaryProps {
  totalLogs: number;
  monthlyLogs: number;
  avgRating: number;
}

const DashboardSummary = ({
  totalLogs,
  monthlyLogs,
  avgRating,
}: DashboardSummaryProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-gray-500">총 기록 수</p>
          <p className="text-2xl font-semibold mt-1">{totalLogs}</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-gray-500">이번 달 기록 수</p>
          <p className="text-2xl font-semibold mt-1">{monthlyLogs}</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-gray-500">평균 평점</p>
          <p className="text-2xl font-semibold mt-1">{avgRating.toFixed(1)}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardSummary;
