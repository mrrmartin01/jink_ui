"use client";

import {
  usePostProfilePictureMutation,
  useDeleteProfilePictureMutation,
  usePostCoverPictureMutation,
  useDeleteCoverPictureMutation,
} from "@/api/services/auth/authApiSlice";
import { useToast } from "@/hooks/use-toast";

export default function usePictureManager() {
  const { toast } = useToast();

  const [uploadProfile, { isLoading: uploadingProfile }] =
    usePostProfilePictureMutation();
  const [deleteProfile, { isLoading: deletingProfile }] =
    useDeleteProfilePictureMutation();
  const [uploadCover, { isLoading: uploadingCover }] =
    usePostCoverPictureMutation();
  const [deleteCover, { isLoading: deletingCover }] =
    useDeleteCoverPictureMutation();

  const handleUpload = async (file: File, type: "profile" | "cover") => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      if (type === "profile") {
        await uploadProfile(formData).unwrap();
      } else {
        await uploadCover(formData).unwrap();
      }

      toast({
        title: `${type === "profile" ? "Profile" : "Cover"} picture updated`,
        variant: "success",
      });
    } catch (err) {
      console.error("Upload error:", err);
      toast({
        title: "Upload failed",
        description: "Please try again later.",
        variant: "error",
      });
    }
  };

  const handleDelete = async (type: "profile" | "cover") => {
    try {
      if (type === "profile") {
        await deleteProfile({}).unwrap();
      } else {
        await deleteCover({}).unwrap();
      }

      toast({
        title: `${type === "profile" ? "Profile" : "Cover"} picture removed`,
        variant: "success",
      });
    } catch (err) {
      console.error("Delete error:", err);
      toast({
        title: "Delete failed",
        description: "Please try again later.",
        variant: "error",
      });
    }
  };

  return {
    handleUpload,
    handleDelete,
    isLoading:
      uploadingProfile || deletingProfile || uploadingCover || deletingCover,
  };
}
