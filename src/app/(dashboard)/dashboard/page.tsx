import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import type { UserRole } from "@/components/layout/AuthUser";

export const metadata: Metadata = {
  title: "Dashboard | MentorLagbe",
  description:
    "Open your MentorLagbe dashboard to manage your account and tuition activity.",
};

export default async function DashboardIndexPage() {
  const session = await auth.api.getSession({ 
    headers: await headers() 
  });
  const role = (session?.user.role as UserRole | undefined) ?? null;

  redirect(role ? `/dashboard/${role}` : "/sign-in");
}
