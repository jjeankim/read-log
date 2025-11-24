import { LoginForm } from "@/components/login/LoginForm";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Link href={"/"}>
          <Image className="mx-auto mb-6 rounded-xl" width={100} height={60} src="/logo2.png" alt="Read Log" />
        </Link>
        <LoginForm />
      </div>
    </div>
  );
};

export default page;
