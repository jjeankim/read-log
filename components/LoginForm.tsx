"use client"

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  // CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginAction } from "@/app/login/actions";


export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const router = useRouter()
  const [error, setError] = useState("")

  const handleForm = async (formData:FormData) => {
    setError("")

    try {
      const result = await loginAction(formData)
      console.log(result)
      router.push("/")
    } catch (error:unknown) {
      if( error instanceof Error) setError(error.message)
      else setError("알 수 없는 오류가 발생했습니다.")
    }
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="flex justify-center mb-4">
          <CardTitle>로그인</CardTitle>
          {/* <CardDescription>
            Enter your email below to login to your account
          </CardDescription> */}
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
                <Button type="submit" color="blue">
                  로그인
                </Button>
                {/* <Button variant="outline" type="button">
                  Login with Google
                </Button> */}
                <FieldDescription className="text-center">
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
