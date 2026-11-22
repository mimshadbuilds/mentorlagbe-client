import { getServerToken } from "@/lib/core/session";
import type { IApplication } from "@/lib/types/application";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

async function getApplications(path: string): Promise<IApplication[]> {
  const token = await getServerToken();

  if (!token) return [];

  try {
    const res = await fetch(`${baseURL}${path}`, {
      cache: "no-store",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) return [];

    const data: unknown = await res.json();

    return Array.isArray(data) ? (data as IApplication[]) : [];
  } catch {
    return [];
  }
}

export const getTutorApplications = () => getApplications("/applications/tutor");

export const getStudentApplications = () =>
  getApplications("/applications/student");
