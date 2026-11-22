import { getClientToken } from "@/lib/core/session-client";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export type ProRole = "tutor" | "student";

export const startCheckout = async (role: ProRole) => {
  const token = await getClientToken();

  if (!token) {
    throw new Error("Please sign in to upgrade to Pro.");
  }

  const res = await fetch(`${baseURL}/payments/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ plan: "pro", role }),
  });

  const text = await res.text();
  let data: { url?: string; message?: string } = {};

  try {
    data = JSON.parse(text);
  } catch {
    data = {};
  }

  if (!res.ok) {
    throw new Error(data.message || "Stripe checkout is not available yet.");
  }

  if (!data.url) {
    throw new Error("Stripe did not return a checkout URL.");
  }

  window.location.href = data.url;
};
