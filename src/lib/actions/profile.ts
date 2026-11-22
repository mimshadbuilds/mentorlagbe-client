import { getClientToken } from "../core/session-client";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const getAuthHeaders = async () => {
    const token = await getClientToken();

    if (!token) {
        throw new Error("Your session has expired. Please sign in again.");
    }

    return {
        Authorization: `Bearer ${token}`,
    };
};

export const updateProfile = async (data: { phone: string; bio: string }) => {

    if (!baseURL) throw new Error("API URL is not configured.");

    const res = await fetch(`${baseURL}/users/me`, {
        method: "PATCH",
        headers: {
        ...(await getAuthHeaders()),
        "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
        throw new Error(result.message || "Could not update profile.");
    }

    return result;
};

export const uploadProfileImage = async (file: File) => {
    if (!baseURL) throw new Error("API URL is not configured.");

    const uploadData = new FormData();
        uploadData.append("image", file);

    const res = await fetch(`${baseURL}/upload/image`, {
        method: "POST",
        headers: await getAuthHeaders(),
        body: uploadData,
    });

    const result = await res.json();

    if (!res.ok) {
        throw new Error(result.message || "Image upload failed.");
    }

    if (!result.imageUrl) {
        throw new Error("The server did not return an image URL.");
    }

    return result;
};
