"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, ChevronRight } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { ProBadge, RoleBadge, type UserRole } from "@/components/layout/AuthUser";
import { useProStatus } from "@/hooks/use-pro-status";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { dashboardNav, isActivePath } from "../../../app/types/config";

function activeLabel(pathname: string, role: UserRole | null): string {
  if(pathname.startsWith("/dashboard/profile")) return "Update Profile";

  if(role) {
    const item = dashboardNav[role].find((nav) => isActivePath(pathname, nav.href));
    if (item) return item.label;
  }
  return "Overview";
}

export default function DashboardHeader() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user ?? null;
  const role = user ? (user.role as UserRole) : null;
  const isPro = useProStatus(user?.id);

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-2 border-b border-border bg-surface/90 px-space-md shadow-[0_1px_8px_rgba(0,0,0,0.04)] backdrop-blur-xl sm:px-space-lg lg:px-space-xl">
      <SidebarTrigger className="-ml-1" />
      <Separator
        orientation="vertical"
        className="mr-1 data-vertical:h-4 data-vertical:self-auto"
      />

      <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-1.5 text-sm">
        <span className="hidden text-on-surface-variant sm:inline">Workspace</span>
        <ChevronRight
          className="hidden size-4 text-outline-variant sm:inline"
          aria-hidden="true"
        />
        <span className="truncate font-semibold text-primary-container">
          {activeLabel(pathname, role)}
        </span>
      </nav>

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <Link
          href="#"
          aria-label="Notifications"
          className="flex size-9 shrink-0 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container hover:text-primary-container"
        >
          <Bell className="size-[18px]" aria-hidden="true" />
        </Link>
        {user && role && (
          <>
            <div className="hidden items-center gap-1 sm:flex">
              {isPro && <ProBadge />}
              <RoleBadge role={role} />
            </div>
            <Avatar className="size-9 shrink-0 ring-2 ring-secondary/25">
              <AvatarImage
                src={user.image ?? undefined}
                alt={user.name ?? "User"}
                className="object-cover"
              />
              <AvatarFallback className="bg-secondary-container text-xs font-semibold text-secondary">
                {(user.name ?? "U").charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </>
        )}
      </div>
    </header>
  );
}
