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

export const getPaymentStatusServer = async (
  sessionId: string
): Promise<IPaymentStatus | null> => {
  const token = await getServerToken();

  if (!token) return null;

  try {
    const res = await fetch(
      `${baseURL}/payments/status?session_id=${encodeURIComponent(sessionId)}`,
      {
        cache: "no-store",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return {
        paymentStatus: "error",
        message:
          typeof data.message === "string"
            ? data.message
            : "Payment status could not be verified.",
      };
    }

    return data as IPaymentStatus;
  } catch {
    return null;
  }
};

export const getCurrentProfileServer = async () => {
  const data = await serverPaymentFetch<{ user: ICurrentProfile }>("/users/me");

  return data?.user ?? null;
};
