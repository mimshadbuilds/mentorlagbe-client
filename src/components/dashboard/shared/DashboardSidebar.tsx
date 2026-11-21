"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ChevronsUpDown, House, LogOut, UserRound } from "lucide-react";
import { RoleBadge, signOut } from "@/components/layout/AuthUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { dashboardNav,isActivePath, profileNavItem, roleLabel, type IDashboardUser } from "../../../app/types/config";

export default function DashboardSidebar({ user }: { user: IDashboardUser }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isMobile, setOpenMobile } = useSidebar();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const navItems = dashboardNav[user.role];
  const closeMobile = () => setOpenMobile(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);

    try {
      if(await signOut()) {
        router.replace("/sign-in");
        router.refresh();
      }
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              tooltip="MentorLagbe"
              render={
                <Link
                  href={`/dashboard/${user.role}`}
                  onClick={closeMobile}
                />
              }>
              <Image
                src="/mentorlagbe-icon.png"
                alt="MentorLagbe"
                width={32}
                height={32}
                className="size-8 shrink-0"
              />
              <div className="grid flex-1 text-left leading-tight">
                <span className="truncate font-manrope text-base font-extrabold text-primary-container">
                  MentorLagbe
                </span>
                <span className="truncate text-xs text-sidebar-foreground/70">
                  {roleLabel[user.role]} Suite
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    tooltip={item.label}
                    isActive={isActivePath(pathname, item.href)}
                    render={<Link href={item.href} onClick={closeMobile} />}>
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <SidebarMenuButton
                    size="lg"
                    className="data-popup-open:bg-sidebar-accent data-popup-open:text-sidebar-accent-foreground"
                  />
                }>
                <Avatar className="rounded-lg after:rounded-lg">
                  <AvatarImage
                    src={user.image ?? undefined}
                    alt={user.name}
                    className="rounded-lg object-cover"
                  />
                  <AvatarFallback className="rounded-lg bg-secondary-container text-xs font-semibold text-secondary">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs text-sidebar-foreground/70">
                    {user.email}
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto" />
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="min-w-56"
                side={isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={4}>
                <div className="flex items-center justify-between gap-2 px-2 py-1.5">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-primary-container">
                      {user.name}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                  <RoleBadge role={user.role} />
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuItem
                    render={
                      <Link
                        href={profileNavItem.href}
                        onClick={closeMobile}
                      />
                    }>
                    <UserRound />
                    Update Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem render={<Link href="/" onClick={closeMobile} />}>
                    <House />
                    Back to Site
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  variant="destructive"
                  disabled={isSigningOut}
                  onClick={handleSignOut}
                  className="gap-2.5 font-medium">
                  <LogOut />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
