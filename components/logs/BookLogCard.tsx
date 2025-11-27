"use client";

import Image from "next/image";
import Link from "next/link";
import LikeButton from "./LikeButton";

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

      <div className="flex justify-between">
        <LikeButton logId={id} initialLikes={likes} />

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
