import { getClientToken } from "@/lib/core/session-client";
import type {
  INewApplication,
  TApplicationStatus,
} from "@/lib/types/application";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

async function applicationRequest(
  method: "POST" | "PATCH" | "DELETE",
  path: string,
  body: object | undefined,
  fallback: string
) {
  const token = await getClientToken();

  if (!token) {
    throw new Error("Authentication required. Please sign in again.");
  }

  const res = await fetch(`${baseURL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  let data: { message?: string } = {};

  try {
    data = JSON.parse(text);
  } catch {
    data = {};
  }

  if (!res.ok) {
    throw new Error(data.message || fallback);
  }

  return data;
}

export const submitApplication = (payload: INewApplication) =>
  applicationRequest(
    "POST",
    "/applications",
    payload,
    "Failed to submit your application."
  );

export const setApplicationStatus = (
  id: string,
  status: Extract<TApplicationStatus, "accepted" | "rejected">
) =>
  applicationRequest(
    "PATCH",
    `/applications/${id}/status`,
    { status },
    "Failed to update the application."
  );

export const cancelApplication = (id: string) =>
  applicationRequest(
    "DELETE",
    `/applications/${id}`,
    undefined,
    "Failed to cancel the application."
  );
