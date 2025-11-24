"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";

interface BookItem {
  title: string;
  authors: string[];
  thumbnail?: string;
  publisher: string;
}

interface BookSearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (book: BookItem) => void;
}

const BookSearchModal = ({
  open,
  onOpenChange,
  onSelect,
}: BookSearchModalProps) => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<BookItem[]>([]);

  const searchBook = async () => {
    const res = await fetch(`/api/searchBook?query=${query}`);
    const data = await res.json();
    setBooks(data.documents);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        onOpenChange(open);
        if (!open) {
          setQuery("");
          setBooks([]);
        }
      }}
    >
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>책 검색</DialogTitle>
          <DialogDescription>
            책 제목 또는 저자를 입력해 검색하세요.
          </DialogDescription>
        </DialogHeader>

        {/* <div className="flex gap-2">
          <Input
            placeholder="검색어 입력"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button onClick={searchBook}>검색</Button>
        </div> */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            searchBook();
          }}
          className="flex gap-2"
        >
          <Input
            placeholder="검색어 입력"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button type="submit">검색</Button>
        </form>

        <div className="mt-4 max-h-80 overflow-y-auto space-y-3">
          {books.map((book, idx) => (
            <div
              key={idx}
              className="flex gap-3 p-3 border rounded cursor-pointer hover:bg-gray-50 "
              onClick={() => {
                onSelect(book);
                onOpenChange(false);
                setQuery("");
              }}
            >
              <Image
                width={40}
                height={58}
                src={book.thumbnail || "/no-image.png"}
                alt="thumbnail"
                className="object-cover rounded w-10 h-[58px]"
              />
              <div className="flex flex-col">
                <span className="font-semibold">{book.title}</span>
                <span className="text-sm text-gray-600">
                  {book.authors.join(", ")}
                </span>
                <span className="text-xs text-gray-500">{book.publisher}</span>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookSearchModal;
