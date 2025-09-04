"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

interface Book {
  title: string;
  authors: string[];
  thumbnail: string;
  publisher: string;
}

export default function NewLogPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");

  const searchBooks = async () => {
    if (!query.trim()) return;

    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_BOOK_API_URL
      }?target=title&query=${encodeURIComponent(query)}`,
      {
        headers: {
          Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
        },
      }
    );

    const data = await res.json();
    setResults(data.documents ?? []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBook) return alert("책을 선택해주세요.");

    const newLog = {
      title: selectedBook.title,
      bookAuthor: selectedBook.authors.join(", "),
      image: selectedBook.thumbnail,
      publisher: selectedBook.publisher,
      rating,
      content,
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newLog),
    });

    if (res.ok) {
      alert("새 로그가 등록되었습니다!");
      window.location.href = "/logs";
    } else {
      alert("등록에 실패했습니다.");
    }
  };

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-6">새 로그 작성</h1>

      {/* 2컬럼 레이아웃 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 왼쪽: 책 검색 + 검색 결과 */}
        <div className="md:col-span-1 pr-4">
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="책 제목으로 검색"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  searchBooks();
                }
              }}
            />
            <Button type="button" onClick={searchBooks}>
              검색
            </Button>
          </div>

          {/* 검색 결과 리스트 */}
          <div className="flex flex-col gap-3 max-h-[600px] overflow-y-auto">
            {results.map((book, i) => (
              <div
                key={i}
                className={`flex gap-3 border p-2 rounded cursor-pointer hover:bg-gray-50 ${
                  selectedBook?.title === book.title ? "border-blue-500" : ""
                }`}
                onClick={() => setSelectedBook(book)}
              >
                {book.thumbnail && (
                  <Image
                    src={book.thumbnail}
                    width={40}
                    height={60}
                    alt={book.title}
                  />
                )}
                <div>
                  <p className="font-medium text-sm line-clamp-1">
                    {book.title}
                  </p>
                  <p className="text-xs text-gray-500 line-clamp-1">
                    {book.authors.join(", ")}
                  </p>
                  <p className="text-xs text-gray-400">{book.publisher}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 오른쪽: 선택된 책 상세 + 작성 폼 */}
        <div className="md:col-span-2">
          {selectedBook ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex gap-4">
                {selectedBook.thumbnail && (
                  <Image
                    src={selectedBook.thumbnail}
                    width={100}
                    height={140}
                    alt="selected book"
                  />
                )}
                <div>
                  <h2 className="text-lg font-semibold">
                    {selectedBook.title}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {selectedBook.authors.join(", ")}
                  </p>
                  <p className="text-sm">{selectedBook.publisher}</p>
                </div>
              </div>

              <Input
                type="number"
                placeholder="평점 (1~5)"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                min={1}
                max={5}
                required
              />

              <Textarea
                placeholder="독후감을 입력하세요"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />

              <Button type="submit">등록하기</Button>
            </form>
          ) : (
            <div className="text-gray-500 text-center mt-20">
              왼쪽에서 책을 검색하고 선택하세요 📚
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
