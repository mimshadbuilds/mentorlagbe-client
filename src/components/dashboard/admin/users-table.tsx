"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { toast } from "sonner";
import { cn } from "cn";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { setUserRole } from "@/lib/actions/admin";
import type { IAdminUser } from "@/lib/actions/admin-query";

type Role = IAdminUser["role"];
type TRoleFilter = "all" | Role;

const roleTabs: { key: TRoleFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "student", label: "Students" },
  { key: "tutor", label: "Tutors" },
  { key: "admin", label: "Admins" },
];

const roles: Role[] = ["student", "tutor", "admin"];

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function UsersTable({ users }: { users: IAdminUser[] }) {
  const router = useRouter();
  const [filter, setFilter] = useState<TRoleFilter>("all");
  const [query, setQuery] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);

  const counts = {
    all: users.length,
    student: users.filter((user) => user.role === "student").length,
    tutor: users.filter((user) => user.role === "tutor").length,
    admin: users.filter((user) => user.role === "admin").length,
  };

  const filtered = useMemo(() =>
      users.filter((user) =>
          (filter === "all" || user.role === filter) &&
          (query.trim() === "" ||
            `${user.name} ${user.email}`.toLowerCase().includes(query.trim().toLowerCase()))
      ),
    [users, filter, query]
  );

  const handleRoleChange = async (user: IAdminUser, role: Role) => {
    if (role === user.role) return;

    setBusyId(user._id);

    try {
      await setUserRole(user._id, role);
      
      toast.success(`Role updated to ${role}`);
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update user role.");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="flex flex-col gap-space-lg">
      <div>
        <h1 className="font-manrope text-2xl font-bold tracking-tight text-primary sm:text-3xl">
          User Management
        </h1>
        <p className="mt-1 text-sm text-on-surface-variant">
          All registered users and their assigned roles.
        </p>
      </div>

      <div className="flex flex-col overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm">
        <div className="flex flex-col justify-between gap-space-md p-space-lg md:flex-row md:items-center">
          <div className="flex max-w-full items-center gap-1.5 self-start overflow-x-auto rounded-lg bg-surface-container-low p-1 md:self-auto">
            {roleTabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setFilter(tab.key)}
                className={cn(
                  "rounded px-3.5 py-1.5 text-xs whitespace-nowrap transition-all",
                  filter === tab.key
                    ? "bg-surface-container-lowest font-semibold text-primary shadow-xs"
                    : "text-on-surface-variant hover:text-primary"
                )}>
                {tab.label} <span className="ml-1 font-semibold opacity-75">({counts[tab.key]})</span>
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-72">
            <Search
              className="absolute top-1/2 left-3 size-[18px] -translate-y-1/2 text-outline"
              aria-hidden="true"
            />
            <Input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name or email..."
              aria-label="Search users"
              className="h-9 rounded-lg border-0 bg-surface-container-low pl-9 text-sm"
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-surface-container-low hover:bg-surface-container-low">
              <TableHead className="px-space-lg py-3.5 text-xs font-semibold tracking-wider text-outline uppercase">
                User
              </TableHead>
              <TableHead className="px-space-md py-3.5 text-xs font-semibold tracking-wider text-outline uppercase">
                Email
              </TableHead>
              <TableHead className="px-space-md py-3.5 text-xs font-semibold tracking-wider text-outline uppercase">
                Assigned Role
              </TableHead>
              <TableHead className="px-space-md py-3.5 text-xs font-semibold tracking-wider text-outline uppercase">
                Plan
              </TableHead>
              <TableHead className="px-space-lg py-3.5 text-xs font-semibold tracking-wider text-outline uppercase">
                Registered
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-10 text-center text-sm text-on-surface-variant">
                  No users found{query.trim() ? ` for "${query.trim()}"` : ""}.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((user) => (
                <TableRow key={user._id} className="hover:bg-surface-container-low/60">
                  <TableCell className="px-space-lg py-4">
                    <div className="flex min-w-[180px] items-center gap-3">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-container text-xs font-bold text-primary">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                      <span className="text-sm font-bold text-primary">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="px-space-md py-4 text-xs text-on-surface-variant">
                    {user.email}
                  </TableCell>
                  <TableCell className="px-space-md py-4">
                    <select
                      aria-label={`Role for ${user.name}`}
                      value={user.role}
                      disabled={busyId === user._id}
                      onChange={(event) => handleRoleChange(user, event.target.value as Role)}
                      className="h-9 cursor-pointer rounded-lg border-0 bg-surface-container-low px-2.5 text-xs font-semibold text-on-surface focus:outline-none disabled:opacity-50">
                      {roles.map((role) => (
                        <option key={role} value={role}>
                          {role.charAt(0).toUpperCase() + role.slice(1)}
                        </option>
                      ))}
                    </select>
                  </TableCell>
                  <TableCell className="px-space-md py-4 text-xs font-medium text-on-surface-variant">
                    {(user.plan ?? "free").toUpperCase()}
                  </TableCell>
                  <TableCell className="px-space-lg py-4 text-xs text-on-surface-variant">
                    {formatDate(user.createdAt)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <div className="bg-surface-container-lowest p-space-md text-xs text-outline">
          Showing 1 to {filtered.length} of {users.length} users
        </div>
      </div>
    </div>
  );
}
