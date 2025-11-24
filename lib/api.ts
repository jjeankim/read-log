import { useAuthStore } from "./store/auth";

export async function apiClient(url: string, options: RequestInit = {}) {
  const token = useAuthStore.getState().accessToken;

  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
    credentials: "include", // Refresh Token 쿠키 포함
  });
}
