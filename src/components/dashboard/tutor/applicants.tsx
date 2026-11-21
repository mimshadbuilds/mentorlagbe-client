"use client";

import { useMemo, useState } from "react";
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
import { formatAppliedDate } from "@/lib/data/applications";
import {
  getApplicantStats,
  tutorApplicants,
  type ApplicantStatus,
  type TutorApplicant,
} from "@/lib/data/tutor";
import { tuitionRecords } from "@/lib/data/tuitions";

type StatusFilter = "all" | ApplicantStatus;

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

function StatusPill({ status }: { status: ApplicantStatus }) {
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

export default function Applicants() {
  const [applicants, setApplicants] = useState<TutorApplicant[]>(tutorApplicants);
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [query, setQuery] = useState("");
  const stats = getApplicantStats(applicants);

  const visible = useMemo(
    () =>
      applicants.filter((applicant) => {
        const tuition = tuitionRecords.find((item) => item.id === applicant.tuitionId);
        return (
          (filter === "all" || applicant.status === filter) &&
          (query.trim() === "" ||
            `${applicant.name} ${applicant.email} ${tuition?.title ?? ""}`
              .toLowerCase()
              .includes(query.trim().toLowerCase()))
        );
      }),
    [applicants, filter, query]
  );

  const decide = (id: string, status: "accepted" | "rejected") => {
    // TODO(backend): PATCH mentorlagbe-server /applications/:id
    setApplicants((prev) =>
      prev.map((applicant) =>
        applicant.id === id ? { ...applicant, status } : applicant
      )
    );
    toast.success(
      status === "accepted" ? "Application accepted" : "Application rejected",
      {
        description:
          status === "accepted"
            ? "The student can now see your contact details."
            : "The student has been notified of the decision.",
      }
    );
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
          visible.map((applicant) => {
            const tuition = tuitionRecords.find(
              (item) => item.id === applicant.tuitionId
            );

            return (
              <article
                key={applicant.id}
                className="flex flex-col gap-space-md rounded-xl bg-surface-container-lowest p-space-lg shadow-sm transition-all hover:shadow-md"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex items-start gap-space-md">
                    <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary-container text-sm font-bold text-primary shadow-sm">
                      {initials(applicant.name)}
                    </div>
                    <div className="flex min-w-0 flex-col">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-bold text-primary">
                          {applicant.name}
                        </span>
                        <span className="rounded-full bg-surface-container-high px-2 py-0.5 text-xs text-on-surface">
                          {applicant.institution}
                        </span>
                        <span className="rounded-full bg-surface-container px-2 py-0.5 text-xs text-outline">
                          {applicant.classLevel}
                        </span>
                      </div>
                      <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-on-surface-variant">
                        <span className="inline-flex items-center gap-1">
                          <Mail className="size-3.5 text-secondary" aria-hidden="true" />
                          {applicant.email}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Phone className="size-3.5 text-secondary" aria-hidden="true" />
                          {applicant.phone}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <CalendarDays className="size-3.5" aria-hidden="true" />
                          Applied {formatAppliedDate(applicant.appliedAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-space-md lg:justify-end">
                    <div className="flex flex-col lg:items-end">
                      <span className="text-xs text-outline">Target Circular</span>
                      <span className="text-xs font-bold text-primary">
                        {tuition?.title ?? "Tuition"}
                      </span>
                    </div>
                    <span className="rounded-lg bg-surface-container-high px-3 py-1.5 text-sm font-bold text-primary">
                      ৳{tuition?.monthlyFee.toLocaleString("en-US") ?? "—"}
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
                        {applicant.schedule}
                      </span>
                    </div>
                    <span className="text-[11px] text-secondary">
                      Mode: {tuition?.mode === "online" ? "Online" : `In-Person (${tuition?.location})`}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 lg:col-span-2">
                    <span className="text-xs font-semibold tracking-wider text-outline uppercase">
                      Learning Note
                    </span>
                    <p className="rounded bg-surface-container-lowest p-2.5 text-xs leading-relaxed text-on-surface">
                      {applicant.note}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <span className="text-xs text-outline">
                    Reference: <span className="font-semibold text-primary">{applicant.id}</span>
                  </span>
                  {applicant.status === "pending" ? (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => decide(applicant.id, "rejected")}
                        className="inline-flex items-center gap-1 rounded-lg px-4 py-2 text-xs font-semibold text-destructive transition-colors hover:bg-destructive/10"
                      >
                        <X className="size-4" aria-hidden="true" />
                        Reject
                      </button>
                      <button
                        type="button"
                        onClick={() => decide(applicant.id, "accepted")}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-secondary px-5 py-2 text-xs font-semibold text-on-secondary shadow-sm transition-all hover:bg-[#156057]"
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
            );
          })
        )}
      </div>
    </div>
  );
}
