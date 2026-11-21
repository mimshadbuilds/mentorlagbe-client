"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Ban, CircleCheck, Search } from "lucide-react";
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
import { setTuitionApproval } from "@/lib/actions/admin";
import type { ITuition } from "@/lib/actions/tuition-query";

type TApproval = ITuition["approvalStatus"];
type StatusFilter = "all" | TApproval;

const statusTabs: { key: StatusFilter; label: string }[] = [
  { key: "pending", label: "Pending" },
  { key: "approved", label: "Approved" },
  { key: "rejected", label: "Rejected" },
  { key: "all", label: "All" },
];

function StatusBadge({ status }: { status: TApproval }) {
  const className = status === "approved"
      ? "bg-secondary-container text-on-secondary-container"
      : status === "rejected"
        ? "bg-destructive/10 text-destructive"
        : "bg-tertiary-fixed text-on-tertiary-fixed-variant";
  const label = status.charAt(0).toUpperCase() + status.slice(1);
  return (
    <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-semibold", className)}>
      {label}
    </span>
  );
}

export default function ModerationList({ tuitions }: { tuitions: ITuition[] }) {
  const router = useRouter();
  const [filter, setFilter] = useState<StatusFilter>("pending");
  const [query, setQuery] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);

  const counts = {
    all: tuitions.length,
    pending: tuitions.filter((item) => item.approvalStatus === "pending").length,
    approved: tuitions.filter((item) => item.approvalStatus === "approved").length,
    rejected: tuitions.filter((item) => item.approvalStatus === "rejected").length,
  };

  const filtered = useMemo(() =>
      tuitions.filter(
        (item) =>
          (filter === "all" || item.approvalStatus === filter) &&
          (query.trim() === "" ||
            `${item.title} ${item.tutorName} ${item.subject}`
              .toLowerCase().includes(query.trim().toLowerCase()))
      ),
    [tuitions, filter, query]
  );

  const handleApproval = async (tuition: ITuition, approvalStatus: "approved" | "rejected") => {
    setBusyId(tuition._id);

    try {
      await setTuitionApproval(tuition._id, approvalStatus);

      toast.success(`Tuition ${approvalStatus}`);
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update tuition status.");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="flex flex-col gap-space-lg">
      <div>
        <h1 className="font-manrope text-2xl font-bold tracking-tight text-primary sm:text-3xl">
          Tuition Listing Moderation
        </h1>
        <p className="mt-1 text-sm text-on-surface-variant">
          Review and approve or reject every tuition post submitted by tutors.
        </p>
      </div>

      <div className="flex flex-col overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm">
        <div className="flex flex-col justify-between gap-space-md p-space-lg md:flex-row md:items-center">
          <div className="flex max-w-full items-center gap-1.5 self-start overflow-x-auto rounded-lg bg-surface-container-low p-1 md:self-auto">
            {statusTabs.map((tab) => (
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
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search title, tutor, or subject..."
              aria-label="Search tuitions"
              className="h-9 rounded-lg border-0 bg-surface-container-low pl-9 text-sm"
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-surface-container-low hover:bg-surface-container-low">
              <TableHead className="px-space-lg py-3.5 text-xs font-semibold tracking-wider text-outline uppercase">
                Tuition
              </TableHead>
              <TableHead className="px-space-md py-3.5 text-xs font-semibold tracking-wider text-outline uppercase">
                Tutor
              </TableHead>
              <TableHead className="px-space-md py-3.5 text-xs font-semibold tracking-wider text-outline uppercase">
                Fee / Mode
              </TableHead>
              <TableHead className="px-space-md py-3.5 text-xs font-semibold tracking-wider text-outline uppercase">
                Submitted
              </TableHead>
              <TableHead className="px-space-md py-3.5 text-xs font-semibold tracking-wider text-outline uppercase">
                Status
              </TableHead>
              <TableHead className="px-space-lg py-3.5 text-right text-xs font-semibold tracking-wider text-outline uppercase">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center text-sm text-on-surface-variant">
                  No tuition posts found{query.trim() ? ` for "${query.trim()}"` : ""}.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((tuition) => (
                <TableRow key={tuition._id} className="hover:bg-surface-container-low/60">
                  <TableCell className="px-space-lg py-4">
                    <div className="flex min-w-[220px] flex-col">
                      <span className="text-sm font-bold text-primary">{tuition.title}</span>
                      <span className="text-xs text-on-surface-variant">
                        {tuition.subject} • {tuition.classLevel}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-space-md py-4">
                    <div className="flex min-w-[160px] flex-col">
                      <span className="text-xs font-bold text-primary">{tuition.tutorName}</span>
                      <span className="text-xs text-outline">{tuition.tutorEmail}</span>
                    </div>
                  </TableCell>
                  <TableCell className="px-space-md py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-primary">
                        ৳{tuition.monthlyFee.toLocaleString("en-US")}
                        <span className="text-xs font-normal text-outline">/mo</span>
                      </span>
                      <span className="text-xs text-on-surface-variant">
                        {tuition.mode === "Online" ? "Online" : `In-Person • ${tuition.location}`}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-space-md py-4 text-xs text-on-surface-variant">
                    {new Date(tuition.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="px-space-md py-4">
                    <StatusBadge status={tuition.approvalStatus} />
                  </TableCell>
                  <TableCell className="px-space-lg py-4">
                    <div className="flex items-center justify-end gap-1.5">
                      {tuition.approvalStatus !== "approved" && (
                        <button
                          type="button"
                          disabled={busyId === tuition._id}
                          onClick={() => handleApproval(tuition, "approved")}
                          className="inline-flex items-center gap-1 rounded-lg bg-secondary px-2.5 py-1.5 text-xs font-semibold text-on-secondary shadow-sm transition-colors hover:bg-[#156057] disabled:opacity-50">
                          <CircleCheck className="size-3.5" aria-hidden="true" />
                          Approve
                        </button>
                      )}
                      {tuition.approvalStatus !== "rejected" && (
                        <button
                          type="button"
                          disabled={busyId === tuition._id}
                          onClick={() => handleApproval(tuition, "rejected")}
                          className="inline-flex items-center gap-1 rounded-lg bg-surface-container-high px-2.5 py-1.5 text-xs font-medium text-on-surface-variant transition-colors hover:bg-destructive/10 hover:text-destructive disabled:opacity-50">
                          <Ban className="size-3.5" aria-hidden="true" />
                          Reject
                        </button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <div className="flex flex-col items-center justify-between gap-space-sm p-space-md text-xs text-outline sm:flex-row">
          <span>
            Showing 1 to {filtered.length} of {tuitions.length} posts
          </span>
          <span>{counts.pending} awaiting review</span>
        </div>
      </div>
    </div>
  );
}
