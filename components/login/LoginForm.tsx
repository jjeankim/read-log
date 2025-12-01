"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { useAuthStore } from "@/lib/store/auth";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const setLoggedIn = useAuthStore((state) => state.setLoggedIn);

  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleForm = async (formData: FormData) => {
    setError("");

    startTransition(async () => {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        setError(data?.message ?? "로그인 실패");
        return;
      }

      const data = await response.json();

      if (data.success) {
        setLoggedIn(true);
        router.push("/");
      }
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="flex justify-center mb-4">
          <CardTitle className="text-(--foreground-strong)">로그인</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={handleForm}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">이메일</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">비밀번호</FieldLabel>
                </div>
                <Input id="password" name="password" type="password" required />
              </Field>

              {error && <p className="text-red-600">{error}</p>}
              <Field>
                <Button disabled={isPending} type="submit" color="blue">
                  로그인
                </Button>
                {error && <p>{error}</p>}
                <FieldDescription className="text-center text-xs">
                  아직 회원이 아니신가요? <a href="/signup">회원가입</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
