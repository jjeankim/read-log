import { useAuthStore } from "@/store/authStore";

export const authFetch = async (
  input: RequestInfo | URL,
  options: RequestInit = {}
): Promise<Response> => {
  const { accessToken, refresh, logout } = useAuthStore.getState();

  // 최초 요청
  let res = await fetch(input, {
    ...options,
    headers: {
      ...options.headers,
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    credentials: "include", // 캐시 옵션과 충돌 없음
  });

  // 401 → 토큰 갱신 후 재요청
  if (res.status === 401) {
    try {
      await refresh();
      const newToken = useAuthStore.getState().accessToken;

      res = await fetch(input, {
        ...options,
        headers: {
          ...options.headers,
          ...(newToken ? { Authorization: `Bearer ${newToken}` } : {}),
        },
        credentials: "include",
      });
    } catch (err) {
      logout();
      throw err;
    }
  }

  return res;
};
