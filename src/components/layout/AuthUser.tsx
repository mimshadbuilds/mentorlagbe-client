"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { ChevronDown, LayoutDashboard, LogOut, UserRound } from "lucide-react";

import { authClient, useSession } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type UserRole = "student" | "tutor" | "admin";

const roleLabel: Record<UserRole, string> = {
  student: "Student",
  tutor: "Tutor",
  admin: "Admin",
};

/** Pill badge used next to the brand (navbar) and inside the account menu. */
export function RoleBadge({ role }: { role: UserRole }) {
  return (
    <Badge className="shrink-0 bg-secondary-container font-semibold tracking-wide text-secondary uppercase hover:bg-secondary-container">
      {roleLabel[role]}
    </Badge>
  );
}

/** Shared sign-out used by the account menu and the mobile sheet. */
export async function signOut(): Promise<boolean> {
  try {
    const { error } = await authClient.signOut();
    if (error) {
      toast.error(error.message || "Sign out failed. Please try again.");
      return false;
    }
    toast.success("Signed out successfully.");
    return true;
  } catch {
    toast.error("Sign out failed. Please try again.");
    return false;
  }
}

const AuthUser = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const user = session?.user;

  // While the session resolves (SSR + hydration) render the signed-out state —
  // it is the common case and keeps the navbar stable without layout shift.
  if (!user) {
    return (
      <div className="flex items-center gap-1.5">
        <Button
          variant="ghost"
          size="sm"
          className="hidden sm:inline-flex"
          onClick={() => router.push("/sign-in")}
        >
          Sign In
        </Button>
        <Button
          size="sm"
          className="h-9 px-4"
          onClick={() => router.push("/sign-up")}
        >
          Sign Up
        </Button>
      </div>
    );
  }

  const role = user.role as UserRole;

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      if (await signOut()) {
        router.replace("/sign-in");
        router.refresh();
      }
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Account menu"
        className="flex items-center gap-1.5 rounded-full px-1.5 py-1 transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
      >
        <Avatar className="size-8 shrink-0 ring-2 ring-secondary/25">
          <AvatarImage
            src={user.image ?? undefined}
            alt={user.name ?? "User"}
            className="object-cover"
          />
          <AvatarFallback className="bg-secondary-container text-xs font-semibold text-secondary">
            {(user.name ?? "U").charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <span className="hidden max-w-32 truncate text-sm font-semibold text-foreground md:block">
          {user.name}
        </span>
        <ChevronDown className="size-4 text-muted-foreground" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={8} className="w-64 p-2">
        <div className="flex items-center justify-between gap-2 px-2 py-1.5">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-primary-container">
              {user.name}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {user.email}
            </p>
          </div>
          <RoleBadge role={role} />
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => router.push("/dashboard")}
          className="gap-2.5 px-2.5 py-2"
        >
          <LayoutDashboard className="text-muted-foreground" />
          Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push("/dashboard/profile")}
          className="gap-2.5 px-2.5 py-2"
        >
          <UserRound className="text-muted-foreground" />
          Update Profile
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="destructive"
          disabled={isSigningOut}
          onClick={handleSignOut}
          className="gap-2.5 px-2.5 py-2 font-medium"
        >
          <LogOut />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AuthUser;
