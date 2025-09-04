"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

export function AuthInitializer() {
  const refresh = useAuthStore((state) => state.refresh);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const initAuth = async () => {
      try {
        await refresh(); // 새로고침 시 accessToken 재발급
      } catch (err) {
        console.warn("토큰 갱신 실패 → 로그아웃 처리", err);
        logout();
      }
    };
    initAuth();
  }, [refresh, logout]);

  return null; // UI는 없음
}
