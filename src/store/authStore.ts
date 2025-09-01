import { create } from "zustand";

interface User {
  id: number;
  email: string;
  name?: string;
}
interface AuthState {
  accessToken: string | null;
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export interface ErrorResponse {
  message: string;
  errors?: ValidationError[];
}

interface ValidationError {
  field: string;
  message: string;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  isLoggedIn: false,
  user: null,

  login: async (email, password) => {
   const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData: ErrorResponse = await response.json();
    throw errorData; 
  }

  const data = await response.json();

  set({
    accessToken: data.accessToken,
    isLoggedIn: true,
    user: data.user ?? null,
  });
  },

  logout: async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include", // refreshToken 쿠키 삭제
      });
    } catch (err) {
      console.error("로그아웃 오류:", err);
    } finally {
      set({ accessToken: null, isLoggedIn: false, user: null });
    }
  },
}));
