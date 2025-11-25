import { apiClient } from "../api";

// 최신 로그 조회
export const fetchRecentLogs = async () => {
  const res = await fetch(`${process.env.API_URL}/logs`, {
    cache: "no-cache",
  });
  if (!res.ok) throw new Error("Failed to fetch logs");
  return res.json();
};

// 검색
export const fetchSearchLogs = async (keyword: string) => {
  const res = await apiClient(
    `/logs/search?query=${encodeURIComponent(keyword)}`
  );
  if (!res.ok) return [];

  return res.json();
};
