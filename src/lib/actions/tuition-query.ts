const baseURL = process.env.NEXT_PUBLIC_API_URL;

export interface ITuition {
    _id: string;
    title: string;
    subject: string;
    classLevel: string;
    mode: "Online" | "Offline";
    location: string;
    monthlyFee: number;
    daysPerWeek: number;
    bannerImage: string;
    description: string;
    tutorName: string;
    tutorEmail: string;
    approvalStatus: "pending" | "approved" | "rejected";
    isActive: boolean;
    createdAt: string;
}


export const getTuitions = async (): Promise<ITuition[]> => {
    if (!baseURL) {
        throw new Error("NEXT_PUBLIC_API_URL is not configured.");
    }

    const res = await fetch(`${baseURL}/tuitions`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error(
            `Failed to fetch tuitions. Server responded with ${res.status}.`
        );
    }

    const data: unknown = await res.json();

    if (!Array.isArray(data)) {
        throw new Error("Invalid tuition data received from the server.");
    }

    return data as ITuition[];
};


export const getTuitionById = async (id: string): Promise<ITuition | null> => {
    if (!/^[0-9a-f]{24}$/i.test(id)) {
        return null;
    }

    try {
        const res = await fetch(`${baseURL}/tuitions/${id}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            return null;
        }

        return await res.json();
    } catch (error) {
        console.error("Error fetching tuition details:", error);
        return null;
    }
};
