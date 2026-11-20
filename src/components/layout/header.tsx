"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useTheme } from "next-themes";
import {
  LayoutDashboard,
  LogOut,
  Menu,
  Moon,
  Search,
  Sun,
  UserRound,
} from "lucide-react";
import { cn } from "cn";
import { useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import AuthUser, { RoleBadge, signOut, type UserRole } from "./AuthUser";

const baseNavLinks = [
  { label: "Home", href: "/" },
  { label: "Browse Tuitions", href: "/tuitions" },
  { label: "Pricing", href: "/pricing" },
];

const dashboardLink = { label: "Dashboard", href: "/dashboard" };

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}>
      {isDark ? <Moon className="size-4" /> : <Sun className="size-4" />}
    </Button>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  const user = session?.user ?? null;
  const role = user ? (user.role as UserRole) : null;

  const navLinks = user ? [...baseNavLinks, dashboardLink] : baseNavLinks;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const handleSignOut = async () => {
    setMenuOpen(false);
    if (await signOut()) {
      router.replace("/sign-in");
      router.refresh();
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-2.5">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/mentorlagbe-icon.png"
              alt=""
              width={40}
              height={40}
              className="size-9 object-contain"
              priority
            />
            <span className="font-display text-xl font-bold tracking-tight text-primary-container">
              MentorLagbe
            </span>
          </Link>
          {user && role ? (
            <span className="hidden sm:block">
              <RoleBadge role={role} />
            </span>
          ) : (
            <span className="hidden rounded-full bg-secondary-container px-2 py-0.5 text-[10px] font-semibold text-on-secondary-container sm:block">
              EdTech
            </span>
          )}
        </div>

        <nav className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center lg:flex">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex h-16 items-center px-3 text-sm font-medium transition-colors",
                  active
                    ? "font-semibold text-primary-container"
                    : "text-muted-foreground hover:text-secondary"
                )}>
                <span
                  className={cn(
                    "flex items-center border-b-2 pb-1",
                    active ? "border-primary" : "border-transparent"
                  )}>
                  {link.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Search tuitions"
            render={<Link href="/tuitions" />}>
            <Search />
          </Button>
          <ThemeToggle />

          <span className="ml-1">
            <AuthUser />
          </span>

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="lg:hidden"
                  aria-label="Open menu"
                />
              }>
              <Menu />
            </SheetTrigger>
            <SheetContent side="right" className="gap-0 p-0">
              <SheetHeader className="border-b border-border">
                <SheetTitle className="flex items-center gap-2 text-base">
                  <Image
                    src="/mentorlagbe-icon.png"
                    alt=""
                    width={36}
                    height={36}
                    className="size-8 object-contain"
                  />
                  <span className="font-display font-bold text-primary-container">
                    MentorLagbe
                  </span>
                </SheetTitle>
              </SheetHeader>

              <nav className="flex flex-col gap-1 px-3 py-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive(link.href)
                        ? "bg-secondary-container text-secondary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}>
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-auto flex flex-col gap-2 border-t border-border p-4">
                {user && role ? (
                  <>
                    <div className="flex items-center gap-3 pb-1">
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
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-primary-container">
                          {user.name}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                      <RoleBadge role={role} />
                    </div>
                    <Button
                      variant="outline"
                      className="justify-start gap-2.5"
                      onClick={() => {
                        setMenuOpen(false);
                        router.push("/dashboard");
                      }}>
                      <LayoutDashboard />
                      Dashboard
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start gap-2.5"
                      onClick={() => {
                        setMenuOpen(false);
                        router.push("/dashboard/profile");
                      }}>
                      <UserRound />
                      Update Profile
                    </Button>
                    <Button
                      variant="ghost"
                      className="justify-start gap-2.5 text-destructive hover:text-destructive"
                      onClick={handleSignOut}>
                      <LogOut />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setMenuOpen(false);
                        router.push("/sign-in");
                      }}
                    >
                      Sign In
                    </Button>
                    <Button
                      onClick={() => {
                        setMenuOpen(false);
                        router.push("/sign-up");
                      }}>
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
