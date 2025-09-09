import { LoginForm } from "@/components/login-form";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Link href={"/"} className="flex justify-center" >
          <Image width={100} height={100} src="/logo2.svg" alt="Read Log Logo" />
        </Link>
        <LoginForm />
      </div>
    </div>
  );
}
