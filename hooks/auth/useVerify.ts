"use client";

import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useVerifyMutation } from "@/api/services/auth/authApiSlice";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { setAuth } from "@/api/features/auth/authSlice";
import { useAppDispatch } from "@/api/reduxHook";

const useVerify = () => {
  const dispatch = useAppDispatch()
  const [verify, { isLoading }] = useVerifyMutation();
  const { toast } = useToast();
  const router = useRouter();

  const handleVerify = async (data: { email: string; code: string }) => {
    try {
      const res = await verify(data).unwrap();

      dispatch(setAuth(res.user));
      
      toast({
        title: "Account created successfully!",
        variant: "success",
      });

      router.push(`/`);
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
        title: "Verification failed",
        description: message,
        variant: "error",
      });
    }
  };

  return { handleVerify, isLoading };
};

export default useVerify;