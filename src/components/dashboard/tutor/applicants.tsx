"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  Check,
  Clock3,
  Info,
  Mail,
  Phone,
  RotateCcw,
  Search,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "cn";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { setApplicationStatus } from "@/lib/actions/application";
import { formatAppliedDate } from "@/lib/data/applications";
import type { IApplication, TApplicationStatus } from "@/lib/types/application";

type StatusFilter = "all" | TApplicationStatus;

const tabs: { key: StatusFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "accepted", label: "Accepted" },
  { key: "rejected", label: "Rejected" },
];

function initials(name: string) {
  const words = name.trim().split(/\s+/);
  return `${words[0]?.[0] ?? ""}${words[1]?.[0] ?? ""}`.toUpperCase();
}

function StatusPill({ status }: { status: TApplicationStatus }) {
  return (
    <Badge
      className={cn(
        "shrink-0 px-2.5 py-1 text-xs font-semibold",
        status === "pending" &&
          "bg-tertiary-fixed text-on-tertiary-fixed-variant hover:bg-tertiary-fixed",
        status === "accepted" &&
          "bg-secondary-container text-on-secondary-container hover:bg-secondary-container",
        status === "rejected" &&
          "bg-destructive/10 text-destructive hover:bg-destructive/10"
      )}
    >
      {status === "pending"
        ? "Pending Review"
        : status === "accepted"
          ? "Accepted"
          : "Rejected"}
    </Badge>
  );
}

export default function Applicants({ applicants }: { applicants: IApplication[] }) {
  const router = useRouter();
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [query, setQuery] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);

  const stats = {
    total: applicants.length,
    pending: applicants.filter((item) => item.status === "pending").length,
    accepted: applicants.filter((item) => item.status === "accepted").length,
    rejected: applicants.filter((item) => item.status === "rejected").length,
  };

  const visible = useMemo(
    () =>
      applicants.filter((applicant) =>
        (filter === "all" || applicant.status === filter) &&
        (query.trim() === "" ||
          `${applicant.studentName} ${applicant.studentEmail} ${applicant.tuitionTitle}`
            .toLowerCase()
            .includes(query.trim().toLowerCase()))
      ),
    [applicants, filter, query]
  );

  const decide = async (id: string, status: "accepted" | "rejected") => {
    if (busyId) return;
    setBusyId(id);

    try {
      await setApplicationStatus(id, status);
      toast.success(
        status === "accepted" ? "Application accepted" : "Application rejected",
        {
          description:
            status === "accepted"
              ? "The student can now see your contact details."
              : "The student has been notified of the decision.",
        }
      );
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update the application."
      );
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="flex flex-col gap-space-lg">
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="font-manrope text-2xl font-bold tracking-tight text-primary sm:text-3xl">
              Manage Applicants
            </h1>
            <p className="mt-1 text-sm text-on-surface-variant">
              Review student inquiries for your tuition posts and record your
              decision.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full bg-surface-container px-2.5 py-1 font-semibold text-on-surface">
              {stats.total} total
            </span>
            <span className="rounded-full bg-tertiary-fixed px-2.5 py-1 font-semibold text-on-tertiary-fixed-variant">
              {stats.pending} pending
            </span>
            <span className="rounded-full bg-secondary-container px-2.5 py-1 font-semibold text-on-secondary-container">
              {stats.accepted} accepted
            </span>
            <span className="rounded-full bg-destructive/10 px-2.5 py-1 font-semibold text-destructive">
              {stats.rejected} rejected
            </span>
          </div>
        </div>
        <div className="flex items-start gap-2 rounded-xl border border-secondary-container bg-secondary-container/40 p-space-md text-xs text-on-surface">
          <Info className="mt-0.5 size-4 shrink-0 text-secondary" aria-hidden="true" />
          <span>
            Guardian contact details are shared only after an application is
            accepted.
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3 rounded-xl bg-surface-container-lowest p-space-md shadow-sm md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-1.5">
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs transition-all",
                filter === key
                  ? "bg-secondary-container font-semibold text-on-secondary-container"
                  : "text-on-surface-variant hover:bg-surface-container"
              )}
            >
              {label} ({key === "all" ? stats.total : stats[key]})
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-full md:w-64">
            <Search
              className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-outline"
              aria-hidden="true"
            />
            <Input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search applicant or tuition..."
              className="h-9 rounded-lg border-surface-container bg-surface-container-low pl-9 text-sm md:text-sm"
            />
          </div>
          <button
            type="button"
            aria-label="Reset filters"
            title="Reset filters"
            onClick={() => {
              setFilter("all");
              setQuery("");
            }}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-container-low text-on-surface-variant transition-colors hover:bg-surface-container"
          >
            <RotateCcw className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {visible.length === 0 ? (
          <div className="rounded-xl border border-dashed border-outline-variant bg-surface-container-lowest p-10 text-center text-sm text-on-surface-variant">
            No applicants match this filter.
          </div>
        ) : (
          visible.map((applicant) => (
            <article
              key={applicant._id}
              className="flex flex-col gap-space-md rounded-xl bg-surface-container-lowest p-space-lg shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex items-start gap-space-md">
                  <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary-container text-sm font-bold text-primary shadow-sm">
                    {initials(applicant.studentName)}
                  </div>
                  <div className="flex min-w-0 flex-col">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-bold text-primary">
                        {applicant.studentName}
                      </span>
                      <span className="rounded-full bg-surface-container-high px-2 py-0.5 text-xs text-on-surface">
                        {applicant.subject}
                      </span>
                    </div>
                    <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-on-surface-variant">
                      <span className="inline-flex items-center gap-1">
                        <Mail className="size-3.5 text-secondary" aria-hidden="true" />
                        {applicant.studentEmail}
                      </span>
                      {applicant.studentPhone && (
                        <span className="inline-flex items-center gap-1">
                          <Phone className="size-3.5 text-secondary" aria-hidden="true" />
                          {applicant.studentPhone}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1">
                        <CalendarDays className="size-3.5" aria-hidden="true" />
                        Applied {formatAppliedDate(applicant.appliedAt)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-space-md lg:justify-end">
                  <div className="flex max-w-[260px] flex-col">
                    <span className="text-xs text-outline">Target Circular</span>
                    <span className="text-xs font-bold text-primary">
                      {applicant.tuitionTitle}
                    </span>
                  </div>
                  <span className="rounded-lg bg-surface-container-high px-3 py-1.5 text-sm font-bold text-primary">
                    ৳{applicant.monthlyFee.toLocaleString("en-US")}
                    <span className="text-xs font-normal text-outline">/mo</span>
                  </span>
                  <StatusPill status={applicant.status} />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-space-md rounded-lg bg-surface-container-low p-space-md lg:grid-cols-3">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold tracking-wider text-outline uppercase">
                    Preferred Schedule
                  </span>
                  <div className="mt-0.5 flex items-center gap-2">
                    <Clock3 className="size-4 text-secondary" aria-hidden="true" />
                    <span className="text-xs font-semibold text-on-surface">
                      {applicant.preferredSchedule}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-1 lg:col-span-2">
                  <span className="text-xs font-semibold tracking-wider text-outline uppercase">
                    Learning Note
                  </span>
                  <p className="rounded bg-surface-container-lowest p-2.5 text-xs leading-relaxed text-on-surface">
                    {applicant.studentNote || "No note provided."}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <span className="text-xs text-outline">
                  Reference: <span className="font-semibold text-primary">{applicant._id}</span>
                </span>
                {applicant.status === "pending" ? (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={busyId === applicant._id}
                      onClick={() => decide(applicant._id, "rejected")}
                      className="inline-flex items-center gap-1 rounded-lg px-4 py-2 text-xs font-semibold text-destructive transition-colors hover:bg-destructive/10 disabled:opacity-50"
                    >
                      <X className="size-4" aria-hidden="true" />
                      Reject
                    </button>
                    <button
                      type="button"
                      disabled={busyId === applicant._id}
                      onClick={() => decide(applicant._id, "accepted")}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-secondary px-5 py-2 text-xs font-semibold text-on-secondary shadow-sm transition-all hover:bg-[#156057] disabled:opacity-50"
                    >
                      <Check className="size-4" aria-hidden="true" />
                      Accept Application
                    </button>
                  </div>
                ) : (
                  <span className="text-xs text-on-surface-variant">
                    Decision recorded · {applicant.status}
                  </span>
                )}
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
