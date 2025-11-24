// "use client";

// import { useState } from "react";
// import { Button } from "../ui/button";
// import { Input } from "../ui/input";
// import { Label } from "../ui/label";
// import { Switch } from "../ui/switch";
// import { Textarea } from "../ui/textarea";
// import BookSearchModal from "./BookSearchModal";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import Image from "next/image";

// const WriteForm = () => {
//   const [title, setTitle] = useState("");
//   const [author, setAuthor] = useState("");
//   const [thumbnail, setThumbnail] = useState("");
//   const [readDate, setReadDate] = useState("");
//   const [rating, setRating] = useState(5);
//   const [isPublic, setIsPublic] = useState(true);
//   const [isDone, setIsDone] = useState(true);
//   const [content, setContent] = useState("");

//   const [isSearchOpen, setIsSearchOpen] = useState(false);

//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const payload = {
//       title,
//       author,
//       thumbnail,
//       readDate,
//       rating,
//       isPublic,
//       isDone,
//       content,
//     };

//     const res = await fetch(`${process.env.API_URL}/logs`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       credentials: "include",
//       body: JSON.stringify(payload),
//     });

//     if (!res.ok) router.push("/");
//     else toast("등록 실패");
//   };
//   return (
//     <>
//       <form className="space-y-6" onSubmit={handleSubmit}>
//         {/* 책 검색 */}
//         <div className="flex justify-between items-end">
//           <Label className="text-base font-semibold">책 정보</Label>
//           <Button
//             type="button"
//             variant={"outline"}
//             onClick={() => {
//               setIsSearchOpen(true);
//             }}
//           >
//             책 검색하기
//           </Button>
//         </div>

//         <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
//           <div>
//             <Label>제목</Label>
//             <Input
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <Label>작가</Label>
//             <Input
//               value={author}
//               onChange={(e) => setAuthor(e.target.value)}
//               required
//             />
//           </div>
//         </div>

//         {/* 썸네일 */}
//         <div>
//           <Label>썸네일 URL</Label>
//           <Input
//             value={thumbnail}
//             onChange={(e) => setThumbnail(e.target.value)}
//             placeholder="https://..."
//           />
//           {thumbnail && (
//             <div className="mt-3 w-24 h-36 relative border rounded overflow-hidden bg-gray-50">
//               <Image
//                 src={thumbnail}
//                 alt="thumbnail-preview"
//                 fill
//                 className="object-contain"
//               />
//             </div>
//           )}
//         </div>

//         {/* 날짜와 평점 */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div>
//             <Label>읽은 날짜</Label>
//             <Input
//               type="date"
//               value={readDate}
//               onChange={(e) => setReadDate(e.target.value)}
//             />
//           </div>

//           <div>
//             <Label>평점 (1~5)</Label>
//             <Input
//               type="number"
//               min={1}
//               max={5}
//               value={rating}
//               onChange={(e) => setRating(Number(e.target.value))}
//             />
//           </div>

//           <div className="flex items-center gap-3">
//             <Label>공개</Label>
//             <Switch checked={isPublic} onCheckedChange={setIsPublic} />
//           </div>
//           <div className="flex items-center gap-3">
//             <Label>독서 완료</Label>
//             <Switch checked={isDone} onCheckedChange={setIsDone} />
//           </div>
//         </div>
//         {/* 본문 */}
//         <div>
//           <Label>독서 기록</Label>
//           <Textarea
//             rows={8}
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             placeholder="책에 대한 생각을 자유롭게 기록하세요"
//             required
//             className="resize-none"
//           />
//         </div>

//         <Button type="submit" className="hover:opacity-70" size="lg">
//           등록하기
//         </Button>
//       </form>
//       <BookSearchModal
//         open={isSearchOpen}
//         onOpenChange={setIsSearchOpen}
//         onSelect={(book) => {
//           setTitle(book.title);
//           setAuthor(book.authors[0]);
//           setThumbnail(book.thumbnail || "");
//         }}
//       />
//     </>
//   );
// };

// export default WriteForm;

"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";
import BookSearchModal from "./BookSearchModal";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import { apiClient } from "@/lib/api";

const WriteForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [readDate, setReadDate] = useState("");
  const [rating, setRating] = useState(5);
  const [isPublic, setIsPublic] = useState(true);
  const [isDone, setIsDone] = useState(true);
  const [content, setContent] = useState("");

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const router = useRouter();

  const isValid =
    title.trim() &&
    author.trim() &&
    readDate.trim() &&
    rating >= 1 &&
    rating <= 5 &&
    content.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      title,
      author,
      thumbnail,
      readDate,
      rating,
      isPublic,
      isDone,
      content,
    };

    const res = await apiClient(`/logs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) router.push("/");
    else toast("등록 실패");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 카드 형태: 이미지 + 폼 */}
        <div className="flex flex-col md:flex-row gap-8 md:items-center border rounded-md p-6">
          {/* 왼쪽: 큰 썸네일 */}
          <div className="md:w-1/3 flex justify-center">
            <div className="w-48 h-64 md:w-56 md:h-80 relative rounded-lg overflow-hidden border  bg-gray-50 shadow-sm">
              {thumbnail ? (
                <Image
                  src={thumbnail}
                  alt="thumbnail-preview"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 192px, 224px"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                  No Image
                </div>
              )}
            </div>
          </div>

          {/* 오른쪽: 입력 폼 */}
          <div className="md:w-2/3 space-y-6">
            <div className="flex justify-between items-center">
              <Label className="text-xl font-semibold">책 정보</Label>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsSearchOpen(true)}
              >
                책 검색하기
              </Button>
            </div>

            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              <div>
                <Label className="mb-2">제목</Label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label className="mb-2">작가</Label>
                <Input
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* <div>
              <Label>썸네일 URL</Label>
              <Input
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                placeholder="https://..."
              />
            </div> */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="mb-2">읽은 날짜</Label>
                <Input
                  type="date"
                  value={readDate}
                  onChange={(e) => setReadDate(e.target.value)}
                />
              </div>

              <div>
                <Label className="mb-2">평점 (1~5)</Label>
                <Input
                  type="number"
                  min={1}
                  max={5}
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                />
              </div>

              <div className="flex items-center gap-3">
                <Label>공개</Label>
                <Switch checked={isPublic} onCheckedChange={setIsPublic} />
              </div>

              <div className="flex items-center gap-3">
                <Label>독서 완료</Label>
                <Switch checked={isDone} onCheckedChange={setIsDone} />
              </div>
            </div>

            <div>
              <Label className="mb-2">독서 기록</Label>
              <Textarea
                rows={8}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="책에 대한 생각을 자유롭게 기록하세요"
                required
                className="resize-none"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full md:w-auto cursor-pointer disabled:cursor-not-allowed disabled:pointer-events-auto"
              disabled={!isValid}
            >
              등록하기
            </Button>
          </div>
        </div>
      </form>

      <BookSearchModal
        open={isSearchOpen}
        onOpenChange={setIsSearchOpen}
        onSelect={(book) => {
          setTitle(book.title);
          setAuthor(book.authors[0]);
          setThumbnail(book.thumbnail || "");
        }}
      />
    </>
  );
};

export default WriteForm;
