import { cookies } from "next/headers";

export const serverFetch = async (path: string, options: RequestInit = {}) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  return fetch(`${process.env.API_URL}${path}`, {
    ...options,
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(options.headers || {}),
    },
  });
};
