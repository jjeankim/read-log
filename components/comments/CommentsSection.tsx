"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { apiClient } from "@/lib/api";
import { useAuthStore } from "@/lib/store/auth";

interface Comment {
  id: number;
  content: string;
  user: { id: number; name: string };
  createdAt: string;
}

interface CommentsSectionProps {
  logId: number;
  initialComments: Comment[];
}
const CommentsSection = ({ logId, initialComments }: CommentsSectionProps) => {
  const [comments, setComments] = useState(initialComments);
  const [text, setText] = useState("");
  const [edittingId, setEdittingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  const currentUserID = useAuthStore.getState().userId;

  // 댓글 작성
  const handleSubmit = async () => {
    if (!text.trim()) return;

    const res = await apiClient(`/comments/log/${logId}`, {
      method: "POST",
      body: JSON.stringify({ content: text }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      const newComment = await res.json();
      setComments([newComment, ...comments]);
      setText("");
    }
  };

  // 댓글 수정
  const handleEdit = async (id: number) => {
    if (!editText.trim()) return;

    const res = await apiClient(`/comments/${id}`, {
      method: "PUT",
      body: JSON.stringify({ content: editText }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      const updated = await res.json();
      setComments(
        comments.map((comment) =>
          comment.id === id ? { ...comment, content: updated.content } : comment
        )
      );
      setEdittingId(null);
    }
  };

  // 댓글 삭제
  const handleDelete = async (id: number) => {
    const res = await apiClient(`/comments/${id}`, { method: "DELETE" });

    if (res.ok) {
      setComments(comments.filter((comment) => comment.id !== id));
    }
  };
  return (
    <div className="space-y-6">
      <div className="flex gap-3 items-center">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 p-3 border rounded-md bg-white resize-none"
          rows={1}
          placeholder="댓글을 입력하세요..."
        />
        <Button
          type="button"
          className="p-5 cursor-pointer"
          onClick={handleSubmit}
        >
          등록
        </Button>
      </div>

      {/* 댓글 리스트 */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="p-4 bg-white rounded-md border shadow-sm"
          >
            <div className="text-sm font-semibold ">{comment.user?.name}</div>

            {/* 수정 모드 */}
            {edittingId === comment.id ? (
              <>
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="w-full p-2 border rounded bg-white mt-2"
                />
                <div className="flex gap-2 mt-2">
                  <Button size="sm" onClick={() => handleEdit(comment.id)}>
                    저장
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEdittingId(null)}
                  >
                    취소
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="mt-1 text-gray-700 whitespace-pre-line">
                  {comment.content}
                </div>

                {/* 본인 댓글이면 수정/삭제 표시 */}
                {currentUserID === comment.user.id && (
                  <div className="flex gap-3 mt-2 text-xs">
                    <button
                      className="text-blue-600"
                      onClick={() => {
                        setEdittingId(comment.id);
                        setEditText(comment.content);
                      }}
                    >
                      수정
                    </button>
                    <button
                      className="text-red-600"
                      onClick={() => handleDelete(comment.id)}
                    >
                      삭제
                    </button>
                  </div>
                )}
              </>
            )}
            <div className="text-[11px] text-gray-400 mt-2">
              {comment.createdAt.slice(0, 16).replace("T", " ")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsSection;
