"use client";
import { useReVerifyMutation } from "@/api/services/auth/authApiSlice";
import { useToast } from "@/hooks/use-toast";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useRouter } from "next/navigation";

const useReVerify = () => {
  const [reVerify, { isLoading }] = useReVerifyMutation();
    const router = useRouter();
  const { toast } = useToast();

  const handleReVerify = async (data: { email: string }) => {
    try {
     const res =  await reVerify(data).unwrap();
      toast({
        title: "Verification email resent",
        description: "Check your inbox for a new code.",
      });
      router.replace(`/auth/${encodeURIComponent(data.email)}/verify?expires=${encodeURIComponent(res.codeTimer)}`);
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

  return { handleReVerify, retryLoading: isLoading };
};

export default useReVerify;
