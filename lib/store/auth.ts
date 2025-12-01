import { create } from "zustand";
import { persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  id: number;
}

interface AuthState {
  userId: number | null;
  accessToken: string | null;
  isLoggedIn: boolean;
  setAccessToken: (token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      userId: null,
      accessToken: null,
      isLoggedIn:false,

      setAccessToken: (token) => {
        if (token) {
          const decoded = jwtDecode<TokenPayload>(token);
          set({
            accessToken: token,
            userId: decoded.id,
            isLoggedIn: true,
          });
        } else {
          set({ accessToken: null, userId: null });
        }
      },

      logout: () => set({ accessToken: null, userId: null,isLoggedIn:false }),
    }),
    { name: "auth-store" }
  )
);
