"use client";

import Link from "next/link";
import SearchBar from "./SearchBar";
import Image from "next/image";
import { useAuthStore } from "@/lib/store/auth";
import { useRouter } from "next/navigation";
import MypageMenu from "./MypageMenu";

const Header = () => {
  const router = useRouter();
  const userId = useAuthStore(s => s.userId)
  const logout = useAuthStore((s) => s.logout);
  const handleClickLogout = () => {
    logout();
    router.push("/");
  };
  return (
    <header className="w-full bg-white border-b">
      {/* 유틸리티 바 */}
      <div className="w-full border-b bg-gray-50 text-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-end gap-4 text-gray-600 px-4 py-2">
          {/* 로그인 여부에 따라 UI 분기 */}
          {userId ? (
            <>
              <button onClick={handleClickLogout} className="cursor-pointer">
                로그아웃
              </button>
              <span>|</span>
              <MypageMenu />
            </>
          ) : (
            <>
              <Link href={"/login"}>로그인</Link>
              <span>/</span>
              <Link href={"/signup"}>회원가입</Link>
            </>
          )}
        </div>
      </div>

      {/* 메인 헤더 */}
      <div className="w-full bg-[oklch(0.97_0.04_95)] border-b">
        <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
          {/* 왼쪽 영역 */}
          <div className="flex items-center gap-10">
            <Link href="/" className="text-2xl font-bold tracking-tight">
              <Image
                src={"/logo2.png"}
                width={60}
                height={60}
                alt="Read Log"
                className="rounded-lg"
              />
            </Link>

            <nav className="hidden md:flex gap-8 text-sm font-medium">
              <Link href="/" className="hover:text-primary">
                독서기록
              </Link>
              <Link href="/" className="hover:text-primary">
                커뮤니티
              </Link>
              <Link href="/" className="hover:text-primary">
                랭킹
              </Link>
            </nav>
          </div>

          {/* 검색 */}
          <div className="flex items-center gap-4">
            <SearchBar />
            <Link
              href="/logs/write"
              className="px-4 py-2 text-sm font-medium rounded-md bg-primary text-white hover:bg-primary/80 transition"
            >
              + 기록하기
            </Link>
          </div>
        </div>
      </div>
      {/* 카테고리 바
      <div className="border-t">
        <div className="max-w-7xl mx-auto flex overflow-x-auto gap-6 px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
          <Link href={"/"} className="hover:text-primary">
            소설
          </Link>
          <span className="text-gray-300">|</span>
          <Link href={"/"} className="hover:text-primary">
            에세이
          </Link>
          <span className="text-gray-300">|</span>
          <Link href={"/"} className="hover:text-primary">
            자기 계발
          </Link>
          <span className="text-gray-300">|</span>
          <Link href={"/"} className="hover:text-primary">
            IT/기술
          </Link>
          <span className="text-gray-300">|</span>
          <Link href={"/"} className="hover:text-primary">
            취미
          </Link>
          <span className="text-gray-300">|</span>
          <Link href={"/"} className="hover:text-primary">
            아동
          </Link>
          <span className="text-gray-300">|</span>
          <Link href={"/"} className="hover:text-primary">
            경영 경제
          </Link>
        </div> */}
      {/* </div> */}
    </header>
  );
};

export default Header;
