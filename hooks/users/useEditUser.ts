"use client";

import { useToast } from "@/hooks/use-toast";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useEditUserMutation } from "@/api/services/auth/authApiSlice";
import type { EditUser } from "@/types/editUser";

const useEditUser = () => {
  const [editUser, { isLoading }] = useEditUserMutation();
  const { toast } = useToast();

  const handleEditUser = async (data: EditUser) => {
    try {
      const res = await editUser(data).unwrap();

      toast({
        title: "Profile Updated",
        description:
          res.message ?? "Your profile has been updated successfully.",
        variant: "success",
      });

      return { success: true, message: res.message };
    } catch (err: unknown) {
      let message = "Please try again later.";
      let suggestion: string | null = null;

      if (typeof err === "object" && err !== null) {
        const error = err as FetchBaseQueryError & {
          data?: { message?: string; suggestion?: string };
        };

        if (error.data) {
          if (error.data.message) message = error.data.message;
          if (error.data.suggestion) suggestion = error.data.suggestion;
        }
      }

      if (suggestion) {
        return { success: false, message, suggestion };
      }

      toast({
        title: "Profile update failed",
        description: message,
        variant: "error",
      });

      return { success: false, message };
    }
  };

  return { handleEditUser, isLoading };
};

export default useEditUser;