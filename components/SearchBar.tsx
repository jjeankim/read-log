"use client";

import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SearchBar = () => {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()

  const handleSearch = () => {
    if (!keyword.trim()) return;
    router.push(`/search?query=${encodeURIComponent(keyword)}`);
  };

useEffect(() => {
  // 검색 페이지일 때: URL query → 검색어 세팅
  if (pathname === "/search") {
    const q = searchParams.get("query") || "";
    Promise.resolve().then(() => setKeyword(q));
  } 
  // 다른 페이지일 때: 검색어 초기화
  else {
    Promise.resolve().then(() => setKeyword(""));
  }
}, [pathname, searchParams]);



  return (
    <div className="relative w-48 max-w-xs bg-white rounded-full">
      <Input
        placeholder="책 제목 / 작가 검색"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        className="rounded-full pl-4 pr-10"
      />

      <button
        onClick={handleSearch}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
      >
        <Search size={18} />
      </button>
    </div>
  );
};

export default SearchBar;
