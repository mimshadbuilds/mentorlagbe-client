import type { ReactNode } from "react";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import type { UserRole } from "@/components/layout/AuthUser";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";

export default async function DashboardChrome({ children }: { children: ReactNode }) {
  const session = await auth.api.getSession({ 
    headers: await headers() 
  });

  if (!session?.user) {
    redirect("/sign-in");
  }

  const role = (session.user.role as UserRole | undefined) ?? "student";
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value !== "false";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <DashboardSidebar
        user={{
          name: session.user.name,
          email: session.user.email,
          image: session.user.image ?? null,
          role,
        }}
      />
      <SidebarInset className="min-w-0">
        <DashboardHeader />
        <div className="flex min-w-0 flex-1 flex-col px-space-md py-space-md sm:px-space-lg sm:py-space-lg lg:px-space-xl lg:py-space-xl">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
