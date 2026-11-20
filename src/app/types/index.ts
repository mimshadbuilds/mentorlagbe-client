export interface ITuition {
    title: string;
    tutor: string;
    subject: string;
    classLevel: string;
    mode: "online" | "offline" | "both";
    location?: string;
    monthlyFee: number;
    daysPerWeek: number;
    description: string;
    banner?: string;

    status: "pending" | "approved" | "rejected";
    isActive: boolean;

    createdAt: Date;
    updatedAt: Date;
}