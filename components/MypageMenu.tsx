import { useAuthStore } from "@/lib/store/auth";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import Link from "next/link";

const MypageMenu = () => {
  const logout = useAuthStore((s) => s.logout);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer ">
        마이페이지
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-40">
        <DropdownMenuLabel>내 계정</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/profile">프로필</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/logs/me">내 기록</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/settings">설정</Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="text-red-500"
          onClick={() => logout()}
        >
          로그아웃
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MypageMenu;
