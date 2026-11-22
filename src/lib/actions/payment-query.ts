import { getServerToken } from "@/lib/core/session";
import type { ICurrentProfile, IPaymentStatus } from "@/lib/types/payment";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

async function serverPaymentFetch<T>(path: string): Promise<T | null> {
  const token = await getServerToken();

  if (!token) return null;

  try {
    const res = await fetch(`${baseURL}${path}`, {
      cache: "no-store",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) return null;

    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export const getPaymentStatusServer = (sessionId: string) =>
  serverPaymentFetch<IPaymentStatus>(
    `/payments/status?session_id=${encodeURIComponent(sessionId)}`
  );

export const getCurrentProfileServer = async () => {
  const data = await serverPaymentFetch<{ user: ICurrentProfile }>("/users/me");

  return data?.user ?? null;
};
