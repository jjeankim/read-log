"use client";

import { useAuthStore } from "@/lib/store/auth";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";


const FABButton = () => {
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const handleClick = () => {
    if (isLoggedIn) {
      router.push("/logs/write");
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="group">
      <button
        onClick={handleClick}
        className="fixed bottom-6 right-6 bg-primary text-white w-14 h-14 
        rounded-full flex items-center justify-center text-3xl 
        shadow-xl hover:opacity-80 transition"
      >
        <Plus size={28} />
      </button>

      <span className="absolute bottom-22 right-6 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
        기록 작성
      </span>
    </div>
  );
};

export default FABButton;
