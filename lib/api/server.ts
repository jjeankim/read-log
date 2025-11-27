export const serverFetch = async (url: string, options: RequestInit = {}) => {
  const base = process.env.API_URL; // 서버용 환경변수

  const res = await fetch(`${base}${url}`, {
    ...options,
    credentials: "include",
    cache: "no-store",
  });

  return res;
};
