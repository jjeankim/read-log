import { create } from "zustand";
import { persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  id: number;
}

interface AuthState {
  userId: number | null;
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      userId: null,
      accessToken: null,

      setAccessToken: (token) => {
        if (token) {
          const decoded = jwtDecode<TokenPayload>(token);
          set({
            accessToken: token,
            userId: decoded.id,
          });
        } else {
          set({ accessToken: null, userId: null });
        }
      },

      logout: () => set({ accessToken: null, userId: null }),
    }),
    { name: "auth-store" }
  )
);
