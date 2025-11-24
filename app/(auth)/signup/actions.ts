"use server";

export async function signupAction(formData: FormData) {
  const email = formData.get("email");
  const name = formData.get("name");
  const password = formData.get("password");

  const res = await fetch(`${process.env.API_URL}/users/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, name, password }),
  });

  const data = await res.json()

  if(!res.ok) throw new Error(data.message || "회원가입 실패")

  return data
}
