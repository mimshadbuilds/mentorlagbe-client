"use client";

import { useRef, useState } from "react";
import { ImagePlus, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { uploadImage } from "@/lib/actions/image";

interface TuitionBannerUploadProps {
    onBannerChange: (imageUrl: string) => void;
    disabled?: boolean;
}

export default function TuitionBannerUpload({onBannerChange, disabled = false }: TuitionBannerUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleUpload = async (file?: File) => {
        if (!file) return;

    const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/gif",
        ];

        if (!allowedTypes.includes(file.type)) {
        toast.error("Only JPEG, PNG, WEBP, and GIF images are allowed.");
        return;
        }

        if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file.");
        return;
        }

        if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB.");
        return;
        }

        try {
        setIsUploading(true);

        const imageUrl = await uploadImage(file);

        onBannerChange(imageUrl);

        toast.success("Banner uploaded successfully.");
        } catch (error) {
        toast.error(
            error instanceof Error
            ? error.message
            : "Failed to upload banner image."
        );
        } finally {
        setIsUploading(false);

        if (inputRef.current) {
            inputRef.current.value = "";
        }
        }
    };


    return (
        <div className="flex flex-col gap-2">
            <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="hidden"
                disabled={disabled || isUploading}
                onChange={(e) => handleUpload(e.target.files?.[0])}
            />

        <Button
            type="button"
            variant="outline"
            disabled={disabled || isUploading}
            onClick={() => inputRef.current?.click()}
            className="w-fit">
            {isUploading ? (
            <>
                <LoaderCircle className="size-4 animate-spin" />
                Uploading banner...
            </>
            ) : (
            <>
                <ImagePlus className="size-4" />
                Upload custom banner
            </>
            )}
        </Button>

        <p className="text-xs text-on-surface-variant">
            Upload your own banner image (JPEG, PNG, WEBP, or GIF). Maximum size: 5MB.
        </p>
    </div>
    );
}