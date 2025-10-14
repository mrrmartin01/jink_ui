"use client";

import { useState } from "react";
// import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@/types/user";
import { PictureDialog } from "./pictureDialog";
import { usePictureManager } from "@/hooks/users";

const formSchema = z.object({
  profileImage: z.any().optional(),
  coverImage: z.any().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function ViewPictures({ user, me }: { user: User; me: boolean }) {
  const { handleUpload, handleDelete, isLoading } = usePictureManager();
  const form = useForm<FormValues>({ resolver: zodResolver(formSchema) });
  const [preview, setPreview] = useState<{ profile?: string; cover?: string }>({});
  const [openCover, setOpenCover] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  const handleFileSelect = (file: File, type: "profile" | "cover") => {
    form.setValue(type === "profile" ? "profileImage" : "coverImage", file);
    setPreview((prev) => ({ ...prev, [type]: URL.createObjectURL(file) }));
  };

  const onSubmit = async (data: FormValues) => {
    if (data.profileImage) await handleUpload(data.profileImage, "profile");
    if (data.coverImage) await handleUpload(data.coverImage, "cover");
  };

  return (
    <div className="relative">
      {/* ✅ COVER IMAGE TRIGGER */}
      <div
        className={`h-48 cursor-pointer sm:h-64 ${
          user.coverImageUrl
            ? "bg-cover bg-center"
            : "bg-gradient-to-t from-blue-500 to-sky-50 dark:from-blue-700 dark:to-sky-200"
        }`}
        style={
          user.coverImageUrl
            ? { backgroundImage: `url(${user.coverImageUrl})` }
            : {}
        }
        onClick={() => setOpenCover(true)}
      />

      <PictureDialog
        type="cover"
        me={me}
        userImage={user.coverImageUrl}
        preview={preview.cover}
        onFileSelect={(file) => handleFileSelect(file, "cover")}
        onDelete={() => handleDelete("cover")}
        onSave={form.handleSubmit(onSubmit)}
        isLoading={isLoading}
        open={openCover}
        onOpenChange={setOpenCover}
      />

      {/* ✅ PROFILE IMAGE TRIGGER */}
      <div className="absolute -bottom-16 left-4 sm:left-6">
        <div
          className="group cursor-pointer"
          onClick={() => setOpenProfile(true)}
        >
          <Avatar className="h-24 w-24 overflow-hidden rounded-full border-4 dark:border-gray-950 sm:h-32 sm:w-32">
            <AvatarImage
              src={user.profileImageUrl}
              alt={`picture of ${user.displayName}`}
            />
            <AvatarFallback className="bg-blue-500 text-2xl font-bold text-gray-100 dark:bg-blue-600">
              {user.displayName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>

        <PictureDialog
          type="profile"
          me={me}
          userImage={user.profileImageUrl}
          userDisplayName={user.displayName}
          preview={preview.profile}
          onFileSelect={(file) => handleFileSelect(file, "profile")}
          onDelete={() => handleDelete("profile")}
          onSave={form.handleSubmit(onSubmit)}
          isLoading={isLoading}
          open={openProfile}
          onOpenChange={setOpenProfile}
        />
      </div>
    </div>
  );
}
