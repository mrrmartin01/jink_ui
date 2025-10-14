"use client";

import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "@/lib/image-utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface CropDialogProps {
  src: string;
  aspect: number;
  onSave: (blob: Blob) => void;
  onCancel: () => void;
}

export function CropDialog({ src, aspect, onSave, onCancel }: CropDialogProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<unknown>(null);

  const onCropComplete = useCallback((_: unknown, area: unknown) => {
    setCroppedAreaPixels(area);
  }, []);

  const handleSave = useCallback(async () => {
    const blob = await getCroppedImg(src, croppedAreaPixels);
    onSave(blob);
  }, [src, croppedAreaPixels, onSave]);

  return (
    <Dialog open onOpenChange={onCancel}>
      <DialogContent className="max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Adjust image</DialogTitle>
        </DialogHeader>

        <div className="relative w-full h-[400px] bg-black">
          <Cropper
            image={src}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            showGrid={false}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
