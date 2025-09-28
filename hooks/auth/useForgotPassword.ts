"use client";

import { useToast } from "@/hooks/use-toast";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useForgotPasswordMutation } from "@/api/services/auth/authApiSlice";

export const useForgotPassword = () => {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const { toast } = useToast();

  const handleForgotPassword = async (email: string) => {
    try {
      const res = await forgotPassword({ email }).unwrap();

      toast({
        title: "Check your inbox",
        description: `${res.message}`,
        variant: "success",
      });
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
        title: "Forgot password failed",
        description: message,
        variant: "error",
      });
    }
  };

  return { handleForgotPassword, isLoading };
};
