import { SignupFormData } from "@/components/signup-form";
import { ErrorResponse } from "@/store/authStore";

export const signup = async (data: SignupFormData) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if(!response.ok) {
    const errorData:ErrorResponse = await response.json();
    throw errorData;
  }
};
