"use client";

import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/api/services/auth/authApiSlice";
import { useToast } from "@/hooks/use-toast";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const useLogin = () => {
  const [login, { isLoading }] = useLoginMutation();
  const { toast } = useToast();
  const router = useRouter();

  const handleLogin = async (identifier: string, password: string) => {
    try {
      await login({ identifier, password }).unwrap();

      toast({
        title: "Welcome back!",
        description: "You are now logged in.",
        variant: "success",
      });

      router.push("/home");
    } catch (err: unknown) {
      let message = "Please try again later.";

      if (typeof err === "object" && err !== null) {
        const error = err as FetchBaseQueryError & {
          data?: { detail?: string };
        };

        if (
          "data" in error &&
          typeof error.data === "object" &&
          error.data !== null &&
          "detail" in error.data
        ) {
          message = String(error.data.detail);
        }
      }

      toast({
        title: "Login failed",
        description: message,
        variant: "error",
      });
    }
  };

  return { handleLogin, isLoading };
};
