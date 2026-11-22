"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { uploadImage } from "@/lib/actions/image";

interface IProfileImageUploadProps {
    name: string;
    image: string;
    onImageChange: (image: string) => void;
    disabled?: boolean;
}

export default function ProfileImageUpload({ name, image, onImageChange, disabled = false }: IProfileImageUploadProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        return () => {
        if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if(!file) return;

    const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/gif",
        ];

    if(!allowedTypes.includes(file.type)) {
        toast.error("Only JPEG, PNG, WEBP, and GIF images are allowed.");
        e.target.value = "";
        return;
        }

    if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be 5MB or less.");
        e.target.value = "";
        return;
    }

    setPreview(URL.createObjectURL(file));
    setUploading(true);

    try {
        const imageUrl = await uploadImage(file);        
        onImageChange(imageUrl);
        setPreview(null);
        toast.success("Profile picture uploaded successfully.");
    } catch (error) {
        setPreview(null);
        toast.error(
        error instanceof Error ? error.message : "Image upload failed."
        );
    } finally {
        setUploading(false);
        e.target.value = "";
    }
};

    const handleRemove = () => {
        setPreview(null);
        onImageChange("");

        if (fileInputRef.current) {
        fileInputRef.current.value = "";
        }
    };

    return (
        <div className="flex flex-col gap-3 sm:col-span-2">
        <div className="flex items-center gap-3">
            <Avatar className="size-16 ring-2 ring-secondary/25">
            <AvatarImage
                src={preview || image || undefined}
                alt={name}
                className="object-cover"
            />
            <AvatarFallback className="bg-secondary-container text-xl font-bold text-secondary">
                {name.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
            </Avatar>

            <div className="flex flex-col gap-1">
            <Label htmlFor="profile-image-file">Profile Picture</Label>
            <p className="text-xs text-on-surface-variant">
                Upload an image up to 5MB.
            </p>
            </div>
        </div>

        <Input
            ref={fileInputRef}
            id="profile-image-file"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            disabled={disabled || uploading}
        />

        {uploading && (
            <p className="text-xs text-secondary">Uploading image...</p>
        )}

        {image && (
            <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-fit"
            onClick={handleRemove}
            disabled={disabled || uploading}
            >
            Remove Picture
            </Button>
        )}
        </div>
    );
}
