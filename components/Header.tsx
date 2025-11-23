"use client";

import Link from "next/link";
import SearchBar from "./SearchBar";

const Header = () => {
  return (
    <header className="w-full bg-white border-b">
      {/* 유틸리티 바 */}
      <div className="w-full border-b bg-gray-50 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-end gap-4 text-gray-600 px-4 py-2">
          <Link href={"/login"}>로그인</Link>
          <span>/</span>
          <Link href={"/signup"}>회원가입</Link>

          <span>|</span>
          <button>로그아웃</button>

          <span>|</span>
          <Link href={"/profile"}>마이페이지</Link>
        </div>
      </div>

      {/* 메인 헤더 */}
      <div className="w-full bg-[oklch(0.97_0.04_95)] border-b">
        <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
          {/* 왼쪽 영역 */}
          <div className="flex items-center gap-10">
            <Link href="/" className="text-2xl font-bold tracking-tight">
              Read Log
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
          <SearchBar />
        </div>
      </div>
      {/* 카테고리 바 */}
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
        </div>
      </div>
    </header>
  );
};

export default Header;
