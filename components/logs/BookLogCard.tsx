"use client";
import { apiClient } from "@/lib/api";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface Props {
  id: number;
  thumbnail?: string;
  title: string;
  author: string;
  likes: number;
  comments: number;
}

const BookLogCard = ({
  id,
  thumbnail,
  title,
  author,
  likes,
  comments,
}: Props) => {
  const [likeCount, setLikeCount] = useState(likes);

  const handleClickLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const res = await apiClient(`/likes/${id}`, { method: "POST" });
    if (res.ok) setLikeCount((prev) => prev + 1);
  };
  return (
    <Link
      href={`/logs/${id}`}
      className="border rounded-lg p-4 shadow hover:shadow-md transition bg-white"
    >
      <div className="w-full h-40 relative mb-3 bg-gray-100 rounded overflow-hidden">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover"
            sizes="128px"
          />
        ) : (
          <Image
            src="/no-image.png"
            alt="No Image"
            fill
            className="object-cover"
            sizes="128px"
          />
        )}
      </div>

      <h3 className="font-semibold text-base line-clamp-1">{title}</h3>
      <p className="text-sm text-gray-600 mt-1">{author}</p>

      <div className="flex justify-between mt-3 text-xs text-gray-500">
        <button onClick={handleClickLike} className="cursor-pointer flex items-center gap-1">
          <Heart size={14} className={likeCount > 0 ? "text-red-500 fill-red-500" : "text-gray-500"}></Heart>
          {likeCount}
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            window.location.href = `/logs/${id}#comments`;
          }}
        >
          💬 {comments}
        </button>
      </div>
    </Link>
  );
};

export default BookLogCard;
