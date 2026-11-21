import { getClientToken } from "@/lib/core/session-client";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export interface ICreateTuitionPayload {
    title: string;
    subject: string;
    classLevel: string;
    mode: "Online" | "Offline";
    location: string;
    monthlyFee: number;
    daysPerWeek: number;
    bannerImage: string;
    description: string;
}

export interface ITuitionResponse {
    success: boolean;
    message: string;
    insertedId?: string;
}

export const createTuition = async ( payload: ICreateTuitionPayload ): Promise<ITuitionResponse> => {
    const token = await getClientToken();

    if (!token) {
        throw new Error("Authentication required. Please sign in again.");
    }

const res = await fetch(`${baseURL}/tuitions`, {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
});
    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Failed to create tuition.");
    }

    return data;
};
