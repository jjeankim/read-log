// 최신 로그 조회
export const fetchRecentLogs = async () => {
  const res = await fetch(`${process.env.API_URL}/logs`, {
    cache: "no-cache",
  });
  if (!res.ok) throw new Error("Failed to fetch logs");
  return res.json();
};
