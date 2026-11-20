import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Suspense } from "react";
import DashboardChrome from "@/components/dashboard/shared/dashboard-chrome";
import DashboardSkeleton from "@/components/dashboard/shared/DashboardSkeleton";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: "Dashboard | MentorLagbe",
  description:
    "Manage your tuitions, applications, and account on MentorLagbe.",
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <TooltipProvider>
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardChrome>{children}</DashboardChrome>
      </Suspense>
    </TooltipProvider>
  );
}
