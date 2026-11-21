import type { LucideIcon } from "lucide-react";
import {
  Banknote,
  Bookmark,
  ClipboardList,
  FilePen,
  FileText,
  LayoutGrid,
  Send,
  UserRound,
  UserSearch,
  Users,
} from "lucide-react";
import type { UserRole } from "@/components/layout/AuthUser";

export interface IDashboardUser {
  name: string;
  email: string;
  image: string | null;
  role: UserRole;
}

export interface IDashboardNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const roleLabel: Record<UserRole, string> = {
  student: "Student",
  tutor: "Tutor",
  admin: "Admin",
};

export const dashboardNav: Record<UserRole, IDashboardNavItem[]> = {
  student: [
    { label: "Overview", href: "/dashboard/student", icon: LayoutGrid },
    { label: "My Applications", href: "/dashboard/student/my-applications", icon: Send },
    { label: "Saved Tuitions", href: "/dashboard/student/saved-tuitions", icon: Bookmark },
  ],
  tutor: [
    { label: "Overview", href: "/dashboard/tutor", icon: LayoutGrid },
    { label: "Post Tuition", href: "/dashboard/tutor/post-tuition", icon: FilePen },
    { label: "My Tuitions", href: "/dashboard/tutor/my-tuitions", icon: FileText },
    { label: "Applicants", href: "/dashboard/tutor/applicants", icon: UserSearch },
  ],
  admin: [
    { label: "Overview", href: "/dashboard/admin", icon: LayoutGrid },
    { label: "Users", href: "/dashboard/admin/users", icon: Users },
    { label: "Tuitions", href: "/dashboard/admin/tuitions", icon: ClipboardList },
    { label: "Transactions", href: "/dashboard/admin/transactions", icon: Banknote },
  ],
};

export const profileNavItem: IDashboardNavItem = {
  label: "Update Profile",
  href: "/dashboard/profile",
  icon: UserRound,
};

export function isActivePath(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}
