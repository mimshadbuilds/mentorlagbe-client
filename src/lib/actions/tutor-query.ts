import { getServerToken } from "@/lib/core/session";
import type { ITuition } from "./tuition-query";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const getMyTuitions = async (): Promise<ITuition[]> => {
    const token = await getServerToken();

    if (!token) return [];

    try {
        const res = await fetch(`${baseURL}/tuitions/my`, {
            cache: "no-store",
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) return [];

        const data: unknown = await res.json();

        return Array.isArray(data) ? (data as ITuition[]) : [];
    } catch {
        return [];
    }
};
