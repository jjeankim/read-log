import CommentsSection from "@/components/comments/CommentsSection";
import LikeButton from "@/components/logs/LikeButton";
import StarRating from "@/components/logs/StarRating";
import { serverFetch } from "@/lib/api/server";

import Image from "next/image";

interface Props {
  params: { id: string };
}

const page = async ({ params }: Props) => {
  const { id } = await params;
  const logId = Number(id);

  // 상세 데이터 직접 fetch
  const res = await serverFetch(`/logs/${logId}`);
  if (!res.ok) {
    console.error("Failed to fetch log detail", res.status);
    throw new Error("Failed to fetch log detail");
  }

  const log = await res.json();

  return (
    <div className="min-h-screen py-10 px-4 md:px-6 rounded-lg">
      <div className="max-w-7xl mx-auto bg-[#fdfdf7] rounded-3xl shadow-xl border border-[#e3e3df] px-6 py-8 md:px-10 md:py-10 lg:px-12 lg:py-12">
        <div className="text-primary text-center tracking-[0.35em]  md:text-2xl mb-10 md:mb-12">
          READING JOURNAL
        </div>

        {/* 상단 레이아웃: 표지 + 정보 */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-10 lg:gap-12">
          {/* 왼쪽: 책 표지 */}
          <div className="flex justify-center md:block">
            <div className="w-44 h-64 md:w-48 md:h-72 lg:w-56 lg:h-80 relative shadow-lg rounded-lg overflow-hidden border border-[#e2e2dd] bg-white">
              <Image
                src={log.thumbnail || "/no-image.png"}
                alt={log.title}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* 오른쪽: 책 정보 영역 */}
          <div className="flex-1 flex flex-col gap-4 md:gap-5 text-[13px] md:text-sm text-gray-800">
            <div className="mb-10">
              <div className="text-[10px] md:text-xs text-gray-500 tracking-[0.2em] text-left">
                TITLE
              </div>

              <div className="text-xl md:text-2xl lg:text-[26px] font-bold leading-snug text-center mt-2">
                {log.title}
              </div>
            </div>

            {/* AUTHOR */}
            <div className="space-y-1">
              <div className="text-[10px] md:text-xs text-gray-500 tracking-[0.2em]">
                AUTHOR
              </div>
              <div className="text-base md:text-lg">{log.author}</div>
            </div>

            {/* 날짜 + 평점 + 좋아요 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mt-2">
              <div className="space-y-1">
                <div className="text-[10px] md:text-xs text-gray-500 tracking-[0.2em]">
                  READ DATE
                </div>
                <div>{log.readDate?.slice(0, 10) || "-"}</div>
              </div>

              <div className="space-y-1">
                <div className="text-[10px] md:text-xs text-gray-500 tracking-[0.2em]">
                  RATING
                </div>
                <StarRating rating={log.rating} />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <div className="text-[10px] md:text-xs text-gray-500 tracking-[0.2em]">
                  LIKE
                </div>
                <LikeButton
                  logId={logId}
                  initialLikes={log._count?.likes ?? 0}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 구분선 */}
        <div className="mt-10 md:mt-12 border-t border-dashed border-gray-300 pt-8 md:pt-10" />

        {/* SUMMARY 영역 */}
        <section className="space-y-4 md:space-y-5">
          <div className="inline-flex items-center px-2 py-1 border-b-2 border-gray-400">
            <span className="tracking-[0.2em] text-xs md:text-sm text-gray-700">
              SUMMARY
            </span>
          </div>

          <div className="whitespace-pre-line leading-relaxed md:leading-[1.8] text-[14px] md:text-[15px] text-gray-800">
            {log.content}
          </div>
        </section>

        {/* COMMENTS SECTION */}
        <section className="mt-14 md:mt-16 space-y-5" id="comments">
          <div className="inline-flex items-center px-2 py-1 border-b-2 border-gray-400">
            <span className="tracking-[0.2em] text-xs md:text-sm text-gray-700">
              COMMENTS
            </span>
          </div>

          {/* 댓글 컴포넌트 */}
          <CommentsSection logId={logId} initialComments={log.comments} />
        </section>
      </div>
    </div>
  );
};

export default page;
