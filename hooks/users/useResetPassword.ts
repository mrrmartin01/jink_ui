"use client";

import { useToast } from "@/hooks/use-toast";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useResetPasswordMutation } from "@/api/services/auth/authApiSlice";
import { useRouter } from "next/navigation";

export const useResetPassword = () => {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const { toast } = useToast();
  const router = useRouter();

  const handleResetPassword = async (tokenParam: string, password: string) => {
    try {
      const res = await resetPassword({ tokenParam, password }).unwrap();

      toast({
        title: "Success",
        description: `${res.message}`,
        variant: "success",
      });
        router.push("/auth/signin");
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
        title: "Reset password failed",
        description: message,
        variant: "error",
      });
    }
  };

  return { handleResetPassword, isLoading };
};
