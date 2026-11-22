import { getClientToken } from "@/lib/core/session-client";
import type {
  ICheckoutSessionResponse,
  ICurrentProfile,
  IPaymentStatus,
  TProPlan,
} from "@/lib/types/payment";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

async function paymentFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const token = await getClientToken();

  if (!token) {
    throw new Error("Please sign in to continue.");
  }

  const res = await fetch(`${baseURL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...init?.headers,
    },
  });

  const text = await res.text();
  let data: Record<string, unknown> = {};

  try {
    data = JSON.parse(text);
  } catch {
    data = {};
  }

  if (!res.ok) {
    throw new Error(
      typeof data.message === "string"
        ? data.message
        : "The payment service is unavailable. Please try again."
    );
  }

  return data as T;
}

export const createCheckoutSession = (plan: TProPlan) =>
  paymentFetch<ICheckoutSessionResponse>("/payments/checkout", {
    method: "POST",
    body: JSON.stringify({ planId: plan }),
  });

export const startCheckout = async (plan: TProPlan) => {
  const session = await createCheckoutSession(plan);
  const checkoutUrl = session.checkoutUrl ?? session.url;

  if (!checkoutUrl) {
    throw new Error("Stripe did not return a checkout URL.");
  }

  window.location.assign(checkoutUrl);
};

export const getPaymentStatus = (sessionId: string) =>
  paymentFetch<IPaymentStatus>(
    `/payments/status?session_id=${encodeURIComponent(sessionId)}`
  );

export const getCurrentProfile = async () => {
  const data = await paymentFetch<{ user: ICurrentProfile }>("/users/me");

  return data.user;
};
