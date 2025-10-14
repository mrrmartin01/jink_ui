"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Image as ImageIcon } from "lucide-react";
import { IconTrash } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { CropDialog } from "./cropDialog";

type PictureDialogProps = {
  type: "profile" | "cover";
  me: boolean;
  userImage?: string | null;
  userDisplayName?: string;
  preview?: string;
  onFileSelect: (file: File, type: "profile" | "cover") => void;
  onDelete: () => Promise<void> | void;
  onSave: () => Promise<void> | void;
  isLoading: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function PictureDialog({
  type,
  me,
  userImage,
  userDisplayName,
  preview,
  onFileSelect,
  onDelete,
  onSave,
  isLoading,
  open,
  onOpenChange,
}: PictureDialogProps) {
  const [cropSrc, setCropSrc] = React.useState<string | null>(null);
  const aspect = type === "cover" ? 3 / 1 : 1; // Typical ratios for cover vs profile

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setCropSrc(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleCropSave = async (blob: Blob) => {
    const file =
      blob instanceof File
        ? blob
        : new File([blob], "cropped-image.png", {
            type: blob.type || "image/png",
          });
    onFileSelect(file, type);
    setCropSrc(null);
  };

  return (
    <>
      {cropSrc && (
        <CropDialog
          src={cropSrc}
          aspect={aspect}
          onSave={handleCropSave}
          onCancel={() => setCropSrc(null)}
        />
      )}

      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className={cn(
            type === "cover" ? "sm:max-w-[600px]" : "sm:max-w-[400px]",
          )}
        >
          <DialogHeader>
            <DialogTitle>
              {type === "cover" ? "Cover Image" : "Profile Picture"}
            </DialogTitle>
            <DialogDescription>
              {type === "cover"
                ? "View or update your cover photo."
                : "View or change your profile picture."}
            </DialogDescription>
          </DialogHeader>

          <div
            className={cn(
              "relative",
              type === "cover"
                ? "h-48 w-full"
                : "flex flex-col items-center gap-4",
            )}
          >
            {/* DELETE BUTTON */}
            {me && userImage && (
              <DialogClose asChild>
                <Button
                  className={cn(
                    "absolute right-2 top-2 z-10 h-10 w-10 rounded-full",
                    "bg-black/30 backdrop-blur-md transition-all hover:bg-black/40",
                    "flex items-center justify-center",
                    "border border-white/30 shadow-md hover:scale-105",
                  )}
                  onClick={() => onDelete()}
                >
                  <IconTrash className="m-auto h-5 w-5 text-red-500 drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]" />
                </Button>
              </DialogClose>
            )}

            {/* IMAGE PREVIEW */}
            {type === "cover" ? (
              <div className="relative h-48 w-full rounded-lg">
                {preview || userImage ? (
                  <Image
                    src={preview || userImage || ""}
                    alt="cover preview"
                    fill
                    className="absolute inset-0 h-full w-full rounded-lg object-cover"
                  />
                ) : (
                  <div className="h-full w-full rounded-lg bg-gradient-to-t from-blue-500 to-sky-50 dark:from-blue-700 dark:to-sky-200" />
                )}
                {me && (
                  <label
                    htmlFor={`cover-upload-${type}`}
                    className="absolute bottom-3 right-3 flex cursor-pointer items-center gap-2 rounded-md bg-black/60 px-3 py-1.5 text-sm text-white hover:bg-black/70"
                  >
                    <ImageIcon className="h-4 w-4" />
                    Change Cover
                    <Input
                      id={`cover-upload-${type}`}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                )}
              </div>
            ) : (
              <>
                <Avatar className="h-32 w-32 overflow-hidden">
                  <AvatarImage
                    src={preview || userImage || undefined}
                    alt={`picture of ${userDisplayName}`}
                  />
                  <AvatarFallback className="bg-blue-500 text-3xl font-bold text-gray-100 dark:bg-blue-600">
                    {userDisplayName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                {me && (
                  <label
                    htmlFor={`profile-upload-${type}`}
                    className="flex cursor-pointer items-center gap-2 rounded-md bg-black/60 px-3 py-1.5 text-sm text-white hover:bg-black/70"
                  >
                    <Camera className="h-4 w-4" />
                    Change Photo
                    <Input
                      id={`profile-upload-${type}`}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                )}
              </>
            )}
          </div>

          {/* FOOTER */}
          {me && (
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                disabled={isLoading}
                type="button"
                onClick={() => onSave()}
              >
                Save
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
