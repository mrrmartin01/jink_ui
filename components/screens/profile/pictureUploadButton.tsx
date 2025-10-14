"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Image as ImageIcon } from "lucide-react";

export function PictureUploadButton({
  id,
  label,
  iconType = "profile",
  onChange,
}: {
  id: string;
  label: string;
  iconType?: "profile" | "cover";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const Icon = iconType === "profile" ? Camera : ImageIcon;

  return (
    <Label
      htmlFor={id}
      className="flex cursor-pointer items-center gap-2 rounded-md bg-black/60 px-3 py-1.5 text-sm text-white hover:bg-black/70"
    >
      <Icon className="h-4 w-4" />
      {label}
      <Input id={id} type="file" accept="image/*" className="hidden" onChange={onChange} />
    </Label>
  );
}
