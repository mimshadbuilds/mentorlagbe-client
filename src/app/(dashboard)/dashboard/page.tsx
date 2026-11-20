import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import type { UserRole } from "@/components/layout/AuthUser";

export default async function DashboardIndexPage() {
  const session = await auth.api.getSession({ 
    headers: await headers() 
  });
  const role = (session?.user.role as UserRole | undefined) ?? null;

  redirect(role ? `/dashboard/${role}` : "/sign-in");
}
