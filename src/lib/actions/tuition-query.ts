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
    try {
        const res = await fetch(`${baseURL}/tuitions`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch tuitions.");
        }

        return await res.json();
    } catch (error) {
        console.error("Error fetching tuitions:", error);
        return [];
    }
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
