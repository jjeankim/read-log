import HeaderAuthButtons from "@/components/header-auth-buttons";
import HeaderNav from "@/components/header-nav";
import Image from "next/image";
import Link from "next/link";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* 헤더 */}
      <header className="sticky top-0 z-50 border-b bg-background">
        <div className="mx-auto flex items-center justify-between px-6 py-4 max-w-screen-xl">
          {/* 왼쪽: 로고 + 내비 */}
          <div className="flex items-center gap-6">
            <Link href="/">
              <Image
                src="/logo2.svg"
                alt="Read Log Logo"
                width={60}
                height={60}
                className="rounded-xl"
              />
            </Link>
            <HeaderNav />
          </div>

          {/* 오른쪽: 로그인/회원가입 */}
          <HeaderAuthButtons />
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="flex-1 flex flex-col py-6">
        <div className="mx-auto w-full max-w-screen-xl px-4 py-6">
          {children}
        </div>
      </main>
    </div>
  );
}
