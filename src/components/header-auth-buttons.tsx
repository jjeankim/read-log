import Link from "next/link";

const HeaderAuthButtons = () => {
  return (
    <div className="flex items-center gap-4">
      <Link
        href="/login"
        className="px-3 py-1.5 text-sm font-medium border rounded-md hover:bg-muted transition"
      >
        로그인
      </Link>
      <Link
        href="/signup"
        className="px-3 py-1.5 text-sm font-medium text-white bg-secondary rounded-md hover:bg-secondary/80 transition"
      >
        회원가입
      </Link>
    </div>
  );
};

export default HeaderAuthButtons