import { getServerToken } from "@/lib/core/session";
import type { ITuition } from "./tuition-query";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export interface IAdminStats {
  totalUsers: number;
  totalTutors: number;
  pendingTuitions: number;
  approvedTuitions: number;
  totalRevenue: number;
}

export interface IAdminUser {
  _id: string;
  name: string;
  email: string;
  role: "student" | "tutor" | "admin";
  plan?: "free" | "pro";
  image?: string | null;
  createdAt: string;
}

export interface IAdminTransaction {
  _id: string;
  userName: string;
  userEmail: string;
  userRole: "student" | "tutor" | "admin";
  planName: string;
  amount: number;
  currency?: string;
  transactionId: string;
  paidAt: string;
  status?: string;
}

async function adminFetch(path: string): Promise<Response | null> {
  try {
    const token = await getServerToken();

    const headers: Record<string, string> = token
      ? { Authorization: `Bearer ${token}` }
      : {};

    const res = await fetch(`${baseURL}${path}`, {
      cache: "no-store",
      headers,
    });

      return res.ok ? res : null;
    } catch {
      return null;
    }
}

export const getAdminStats = async (): Promise<IAdminStats | null> => {
    const res = await adminFetch("/admin/stats");

    if (!res) return null;
    try {
      return (await res.json()) as IAdminStats;
    } catch {
      return null;
    }
};

export const getAdminUsers = async (): Promise<IAdminUser[]> => {
    const res = await adminFetch("/admin/users");
    if (!res) return [];
    try {
      const result = await res.json()
      return result as IAdminUser[];
    } catch {
      return [];
    }
};

export const getAdminTuitions = async (): Promise<ITuition[]> => {
    const res = await adminFetch("/admin/tuitions");
    if (!res) return [];
    try {
      const result = await res.json();
      return result as ITuition[];
    } catch {
      return [];
    }
};


export const getAdminTransactions = async (): Promise<IAdminTransaction[]> => {
    const res = await adminFetch("/admin/transactions");

    if (!res) return [];

    try {
        const result = await res.json();

        return (result as (Omit<IAdminTransaction, "status"> & {
            paymentStatus?: string;
        })[]).map((transaction) => ({
            ...transaction,
            status: transaction.paymentStatus,
        }));
    } catch {
        return [];
    }
};

