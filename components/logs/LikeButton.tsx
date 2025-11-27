"use client";

import { Heart } from "lucide-react";
import { useState } from "react";
import { apiClient } from "@/lib/api";

interface Props {
  logId: number;
  initialLikes: number;
}

const LikeButton = ({ logId, initialLikes }: Props) => {
  const [liked, setLiked] = useState(initialLikes > 0);
  const [count, setCount] = useState<number>(initialLikes);

  const handleLike = async (e: React.MouseEvent) => {
    console.log("clicked")
    e.preventDefault();
    e.stopPropagation();
    const res = await apiClient(`/likes/${logId}`, { method: "POST" });

    if (!res.ok) return;

    const data = await res.json();
    if (data.liked) {
      setLiked(true);
      setCount((prev) => prev + 1);
    } else {
      setLiked(false);
      setCount((prev) => Math.max(prev - 1, 0));
    }
  };
  

  return (
    <button
      onClick={handleLike}
      className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer"
    >
      <Heart
        size={18}
        className={liked ? "text-red-500 fill-red-500" : "text-gray-400"}
      />
      {count}
    </button>
  );
};

export default LikeButton;
