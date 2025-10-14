"use client";

import { useRouter } from "next/navigation";
import { useSignupMutation } from "@/api/services/auth/authApiSlice";
import { useToast } from "@/hooks/use-toast";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const useSignup = () => {
  const [signup, { isLoading }] = useSignupMutation();
  const { toast } = useToast();
  const router = useRouter();

  const handleSignup = async (data: {
    email: string;
    password: string;
    userName: string;
    displayName: string;
    firstName?: string;
    lastName?: string;
  }) => {
    try {
      const res =  await signup(data).unwrap();

      toast({
        title: "Account created!",
        description: "Please verify your email to continue.",
        variant: "success",
      });

    router.push(`/auth/${encodeURIComponent(data.email)}/verify?expires=${encodeURIComponent(res.codeTimer)}`);
    } catch (err: unknown) {
      let message = "Please try again later.";

      if (typeof err === "object" && err !== null) {
        const error = err as FetchBaseQueryError & {
          data?: { message?: string };
        };

        if (
          "data" in error &&
          typeof error.data === "object" &&
          error.data !== null &&
          "message" in error.data
        ) {
          message = String(error.data.message);
        }
      }
      toast({
        title: "Signup failed",
        description: message,
        variant: "error",
      });
    }
  };

  return { handleSignup, isLoading };
};

export default useSignup;