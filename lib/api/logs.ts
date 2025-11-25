import { apiClient } from "../api";

export const fetchLogs = async (sort: "popular" | "recent" | "recommend") => {
  const res = await apiClient(`/logs?sort=${sort}`);
  if (!res.ok) return [];

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
