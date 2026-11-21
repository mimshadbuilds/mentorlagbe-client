"use client";

import { useMemo, useState } from "react";
import {
  Archive,
  BadgeCheck,
  Ban,
  Calendar,
  CircleCheck,
  Clock3,
  Phone,
  RotateCcw,
  Search,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "cn";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  formatAppliedDate,
  getApplicationStats,
  getApplications,
  type ApplicationRow,
  type ApplicationStatus,
} from "@/lib/data/applications";

type StatusFilter = "all" | ApplicationStatus;

const statusTabs: { key: StatusFilter; label: string; countClassName?: string }[] = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending", countClassName: "text-on-tertiary-container" },
  { key: "accepted", label: "Accepted", countClassName: "text-secondary" },
  { key: "rejected", label: "Rejected", countClassName: "text-outline" },
];

function tutorInitials(name: string): string {
  const words = name.replace(/^(Dr\.|Engr\.|Md\.)\s*/, "").trim().split(/\s+/);
  return `${words[0]?.[0] ?? ""}${words[1]?.[0] ?? ""}`.toUpperCase();
}

/** Small metric card in the page header (design's "Quick Metric Cards"). */
function QuickMetric({
  icon: Icon,
  value,
  label,
  chipClassName,
}: {
  icon: typeof Archive;
  value: number;
  label: string;
  chipClassName: string;
}) {
  return (
    <div className="flex min-w-[130px] items-center gap-3 rounded-xl bg-surface-container-lowest px-4 py-3 shadow-sm">
      <span
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-lg",
          chipClassName
        )}>
        <Icon className="size-[22px]" aria-hidden="true" />
      </span>
      <div className="flex flex-col">
        <span className="text-lg leading-none font-bold text-primary">{value}</span>
        <span className="mt-1 text-xs text-outline">{label}</span>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: ApplicationStatus }) {
  if (status === "pending") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-tertiary-fixed px-3 py-1 text-xs font-semibold text-on-tertiary-fixed-variant">
        <span className="size-1.5 animate-pulse rounded-full bg-on-tertiary-container" />
        Pending Review
      </span>
    );
  }
  if (status === "accepted") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary-container px-3 py-1 text-xs font-bold text-on-secondary-container">
        <span className="size-1.5 rounded-full bg-secondary" />
        Accepted by Tutor
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive/10 px-3 py-1 text-xs font-semibold text-destructive">
      <Ban className="size-3" aria-hidden="true" />
      Declined by Tutor
    </span>
  );
}

/**
 * TODO(backend): data comes from the seeded client dataset — swap for
 * mentorlagbe-server /applications and a DELETE endpoint for cancellations.
 */
export default function ApplicationsTable() {
  const [applications, setApplications] = useState<ApplicationRow[]>(getApplications);
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [query, setQuery] = useState("");
  const [cancelTarget, setCancelTarget] = useState<ApplicationRow | null>(null);
  const [revealedContact, setRevealedContact] = useState<string[]>([]);

  const stats = getApplicationStats(applications);

  const filtered = useMemo(
    () =>
      applications.filter(
        (application) =>
          (filter === "all" || application.status === filter) &&
          (query.trim() === "" ||
            `${application.tuition.title} ${application.tuition.tutorName} ${application.tuition.subject}`
              .toLowerCase()
              .includes(query.trim().toLowerCase()))
      ),
    [applications, filter, query]
  );

  const resetFilters = () => {
    setFilter("all");
    setQuery("");
  };

  const handleConfirmCancel = () => {
    if (!cancelTarget) return;
    // TODO(backend): DELETE mentorlagbe-server /applications/:id
    setApplications((prev) => prev.filter((item) => item.id !== cancelTarget.id));
    toast.success("Application cancelled", {
      description: `Your inquiry for "${cancelTarget.tuition.title}" was withdrawn.`,
    });
    setCancelTarget(null);
  };

  return (
    <div className="flex flex-col gap-space-lg">
      <div className="flex flex-col justify-between gap-space-md lg:flex-row lg:items-center">
        <div>
          <div className="mb-space-xs flex items-center gap-space-sm text-xs">
            <span className="tracking-wider text-outline uppercase">
              Tuition Pipeline
            </span>
            <span className="size-1 rounded-full bg-outline-variant" aria-hidden="true" />
            <span className="rounded-full bg-secondary-container px-2.5 py-0.5 text-xs font-semibold tracking-wide text-on-secondary-container">
              {stats.total} TOTAL APPLICATIONS
            </span>
          </div>
          <h1 className="font-manrope text-2xl font-bold tracking-tight text-primary sm:text-3xl">
            My Tuition Applications
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-on-surface-variant">
            Track application states, review tutor responses, and cancel pending
            inquiries.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <QuickMetric
            icon={Clock3}
            value={stats.pending}
            label="Under Review"
            chipClassName="bg-surface-container text-primary"
          />
          <QuickMetric
            icon={CircleCheck}
            value={stats.accepted}
            label="Offers Ready"
            chipClassName="bg-secondary-container/40 text-secondary"
          />
          <QuickMetric
            icon={Archive}
            value={stats.rejected}
            label="Archived"
            chipClassName="bg-surface-container-high text-on-surface-variant"
          />
        </div>
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
                {tab.label}{" "}
                <span
                  className={cn(
                    "ml-1 font-semibold",
                    filter === tab.key ? "opacity-75" : tab.countClassName
                  )}>
                  ({tab.key === "all" ? stats.total : stats[tab.key as ApplicationStatus]})
                </span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-space-sm">
            <div className="relative w-full md:w-72">
              <Search
                className="absolute top-1/2 left-3 size-[18px] -translate-y-1/2 text-outline"
                aria-hidden="true"
              />
              <Input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search subject or tutor name..."
                className="h-9 rounded-lg border-0 bg-surface-container-low pl-9 text-sm md:text-sm"
              />
            </div>
            <button
              type="button"
              title="Reset Filters"
              aria-label="Reset filters"
              onClick={resetFilters}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-container-low text-on-surface-variant transition-colors hover:bg-surface-container">
              <RotateCcw className="size-[18px]" aria-hidden="true" />
            </button>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-surface-container-low hover:bg-surface-container-low">
              <TableHead className="px-space-lg py-3.5 text-xs font-semibold tracking-wider text-outline uppercase">
                Tuition Title &amp; Subject
              </TableHead>
              <TableHead className="px-space-md py-3.5 text-xs font-semibold tracking-wider text-outline uppercase">
                Assigned Mentor
              </TableHead>
              <TableHead className="px-space-md py-3.5 text-xs font-semibold tracking-wider text-outline uppercase">
                Monthly Fee
              </TableHead>
              <TableHead className="px-space-md py-3.5 text-xs font-semibold tracking-wider text-outline uppercase">
                Applied Date
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
                  No applications found
                  {query.trim() ? ` for "${query.trim()}"` : ""}.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((row) => {
                const isRejected = row.status === "rejected";
                const isAccepted = row.status === "accepted";
                const contactRevealed = revealedContact.includes(row.id);

                return (
                  <TableRow key={row.id} className="hover:bg-surface-container-low/60">
                    <TableCell className="px-space-lg py-4">
                      <div className="flex min-w-[220px] flex-col">
                        <span className="text-sm font-bold text-primary">
                          {row.tuition.title}
                        </span>
                        <div className="mt-0.5 flex items-center gap-1.5">
                          <span className="rounded bg-surface-container px-2 py-0.5 text-xs text-on-surface-variant">
                            {row.tuition.subject}
                          </span>
                          <span className="text-xs text-outline">
                            • {row.tuition.classLevel}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="px-space-md py-4">
                      <div className="flex min-w-[200px] items-center gap-3">
                        <span
                          className={cn(
                            "flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-bold shadow-xs",
                            isRejected
                              ? "bg-surface-container-highest text-outline"
                              : isAccepted
                                ? "bg-secondary-container text-on-secondary-container"
                                : "bg-primary-container text-primary"
                          )}>
                          {tutorInitials(row.tuition.tutorName)}
                        </span>
                        <div className="flex min-w-0 flex-col">
                          <div className="flex items-center gap-1">
                            <span
                              className={cn(
                                "text-xs font-bold",
                                isRejected ? "text-on-surface-variant" : "text-on-surface"
                              )}>
                              {row.tuition.tutorName}
                            </span>
                            {!isRejected && (
                              <BadgeCheck
                                className="size-[15px] shrink-0 text-secondary"
                                aria-hidden="true"
                              />
                            )}
                          </div>
                          <span className="truncate text-xs text-outline">
                            {row.tuition.tutorEmail}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="px-space-md py-4 whitespace-nowrap">
                      <span
                        className={cn(
                          "text-sm font-bold",
                          isRejected ? "text-outline" : "text-primary"
                        )}>
                        ৳{row.tuition.monthlyFee.toLocaleString("en-US")}
                      </span>
                      <span className="text-xs text-outline">/mo</span>
                    </TableCell>

                    <TableCell className="px-space-md py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-on-surface-variant">
                        <Calendar
                          className="size-[15px] text-outline"
                          aria-hidden="true"
                        />
                        <span>{formatAppliedDate(row.appliedAt)}</span>
                      </div>
                    </TableCell>

                    <TableCell className="px-space-md py-4 whitespace-nowrap">
                      <StatusBadge status={row.status} />
                    </TableCell>

                    <TableCell className="px-space-lg py-4 text-right whitespace-nowrap">
                      {row.status === "pending" ? (
                        <button
                          type="button"
                          onClick={() => setCancelTarget(row)}
                          className="rounded-lg bg-surface-container-high px-3 py-1.5 text-xs font-medium text-on-surface-variant transition-colors hover:bg-destructive/10 hover:text-destructive">
                          Cancel Application
                        </button>
                      ) : isAccepted ? (
                        contactRevealed ? (
                          <span className="text-xs font-semibold text-primary">
                            {row.tuition.tutorEmail}
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() =>
                              setRevealedContact((prev) => [...prev, row.id])
                            }
                            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground shadow-xs transition-all hover:bg-primary-container hover:text-primary">
                            <Phone className="size-[15px]" aria-hidden="true" />
                            View Tutor Contact
                          </button>
                        )
                      ) : (
                        <span className="inline-block cursor-default rounded-lg bg-surface-container px-3 py-1.5 text-xs text-outline">
                          Archived
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>

        <div className="flex flex-col items-center justify-between gap-space-sm bg-surface-container-lowest p-space-md sm:flex-row">
          <span className="text-xs text-outline">
            Showing 1 to {filtered.length} of {stats.total} applications
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled
              className="rounded-md bg-surface-container-low px-2.5 py-1 text-xs font-medium text-outline opacity-50">
              Prev
            </button>
            <button
              type="button"
              className="rounded-md bg-primary px-3 py-1 text-xs font-bold text-primary-foreground shadow-xs">
              1
            </button>
            <button
              type="button"
              disabled
              className="rounded-md bg-surface-container-low px-2.5 py-1 text-xs font-medium text-outline opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <AlertDialog
        open={cancelTarget !== null}
        onOpenChange={(open) => {
          if (!open) setCancelTarget(null);
        }}>
        <AlertDialogContent className="max-w-md">
          <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <Ban className="size-6" aria-hidden="true" />
          </div>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-manrope text-lg font-bold text-primary">
              Withdraw Tuition Inquiry?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you wish to cancel your inquiry for this tuition? This
              will revoke the pending notification to the tutor.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex flex-col gap-1 rounded-lg bg-surface-container-low p-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-outline">Application Reference:</span>
              <span className="font-bold text-primary">{cancelTarget?.id}</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="shrink-0 text-outline">Assigned Mentor:</span>
              <span className="truncate font-semibold text-on-surface">
                {cancelTarget?.tuition.tutorName}
              </span>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Application</AlertDialogCancel>
            <AlertDialogAction
              className="bg-error text-on-error hover:bg-error/90"
              onClick={handleConfirmCancel}>
              Yes, Cancel Inquiry
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
