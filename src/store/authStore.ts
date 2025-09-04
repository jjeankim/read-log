import { authFetch } from "@/lib/authFetch";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: number;
  email: string;
  name?: string;
}

interface AuthState {
  accessToken: string | null;
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

export interface ErrorResponse {
  message: string;
  errors?: ValidationError[];
}

interface ValidationError {
  field: string;
  message: string;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      user: null,
      isLoggedIn: false,

      login: async (email: string, password: string) => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ email, password }),
          }
        );

        if (!res.ok) throw await res.json();

        const data = await res.json();

        set({
          accessToken: data.accessToken,
          user: data.user,
          isLoggedIn: true,
        });
        // zustand 메모리에 잘 들어갔는지 확인
        console.log(
          "zustand accessToken:",
          useAuthStore.getState().accessToken
        );
      },

      refresh: async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          {
            method: "POST",
            credentials: "include",
          }
        );

        if (!res.ok) throw new Error("토큰 갱신 실패");

        const data = await res.json();
        set({
          accessToken: data.accessToken,
          user: data.user,
          isLoggedIn: true,
        });
      },
      logout: async () => {
        try {
          await authFetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
            method: "POST",
            credentials: "include",
          });
        } finally {
          set({ accessToken: null, user: null, isLoggedIn: false });
        }
      },
    }),
    {
      name: "auth",
      partialize: (state) => ({ user: state.user }), // user만 저장
    }
  )
);
