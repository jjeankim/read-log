import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isLoggedIn: boolean;
  userId: number | null;
  setLoggedIn: (loggedIn: boolean) => void;
  setUserId: (id: number) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      userId: null,
      setLoggedIn: (loggedIn) =>
        set({
          isLoggedIn: loggedIn,
        }),
      setUserId: (id) =>
        set({
          userId: id,
        }),

      logout: () => set({ userId: null, isLoggedIn: false }),
    }),
    { name: "auth" }
  )
);
