import { getClientToken } from "@/lib/core/session-client";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

async function adminPatch(path: string, body: object, fallback: string) {
  const token = await getClientToken();

  if (!token) {
    throw new Error("Authentication required. Please sign in again.");
  }

  const res = await fetch(`${baseURL}${path}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || fallback);
  }

  return data;
}

export const setTuitionApproval = (id: string, approvalStatus: "approved" | "rejected") =>
  adminPatch(`/admin/tuitions/${id}/approval`, { approvalStatus }, "Failed to update tuition status.");

export const setUserRole = (id: string, role: "student" | "tutor" | "admin") =>
  adminPatch(`/admin/users/${id}/role`, { role }, "Failed to update user role.");
