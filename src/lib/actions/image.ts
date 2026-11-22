import { getClientToken } from "../core/session-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const uploadImage = async (file: File): Promise<string> => {
    const token = await getClientToken();

    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(`${API_URL}/upload/image`, {
        method: "POST",
        headers: {
        Authorization: `Bearer ${token}`,
        },
        body: formData,
    });

    const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Failed to upload image.");
        }

        if (!result.imageUrl) {
            throw new Error("Image URL was not returned by the server.");
        }

    return result.imageUrl;
};