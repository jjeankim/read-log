"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-50 mt-10 border-t">
      <div className="max-w-7xl mx-auto px-4 py-10 text-sm text-gray-600">

        {/* 상단 링크 섹션 */}
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
          {/* 소개 */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Read Log</h3>
            <p className="text-gray-500 leading-relaxed text-sm">
              당신의 독서 기록을 더 가치 있게.  
              <br />책을 읽고, 공유하고, 성장하는 공간입니다.
            </p>
          </div>

          {/* 퀵 메뉴 */}
          <div className="flex gap-16">
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">서비스</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="hover:text-primary">독서기록</Link></li>
                <li><Link href="/" className="hover:text-primary">랭킹</Link></li>
                <li><Link href="/" className="hover:text-primary">커뮤니티</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-3">고객지원</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="hover:text-primary">문의하기</Link></li>
                <li><Link href="/" className="hover:text-primary">버그 제보</Link></li>
                <li><Link href="/" className="hover:text-primary">이용약관</Link></li>
                <li><Link href="/" className="hover:text-primary">개인정보 처리방침</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* 저작권 부분 */}
        <div className="border-t pt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Read Log. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
