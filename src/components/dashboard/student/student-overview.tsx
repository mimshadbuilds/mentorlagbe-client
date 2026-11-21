import Link from "next/link";
import {
  ArrowRight,
  CircleCheck,
  GraduationCap,
  Hourglass,
  Layers,
} from "lucide-react";
import StatCard from "@/components/dashboard/shared/StatCard";
import { getApplicationStats, getApplications } from "@/lib/data/applications";

export default function StudentOverview() {
  const applications = getApplications();
  const { total, pending, accepted } = getApplicationStats(applications);

  return (
    <div className="flex flex-col gap-space-lg">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-manrope text-2xl font-bold tracking-tight text-primary sm:text-3xl">
            Student Overview
          </h1>
          <p className="mt-1 text-sm text-on-surface-variant">
            Track your tuition applications, responses, and plan at a glance.
          </p>
        </div>
        <Link
          href="/dashboard/student/my-applications"
          className="inline-flex items-center gap-1.5 self-start rounded-lg bg-secondary px-3.5 py-2 text-xs font-semibold text-on-secondary shadow-sm transition-all hover:bg-[#156057] sm:self-auto">
          View all applications
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-space-md sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Applied Tuitions"
          value={String(total)}
          footnote="Active Pipeline"
          footnoteClassName="text-outline"
          icon={Layers}
          iconChipClassName="bg-surface-container text-primary"
          progress={100}
        />
        <StatCard
          label="Pending Applications"
          value={String(pending)}
          footnote={`${Math.round((pending / total) * 100)}% of Total`}
          footnoteClassName="font-semibold text-on-tertiary-container"
          pill={{
            icon: Hourglass,
            text: "Under Review",
            className: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
          }}
          progress={Math.round((pending / total) * 100)}
          progressClassName="bg-on-tertiary-container"
        />
        <StatCard
          label="Accepted Applications"
          value={String(accepted)}
          footnote="Awaiting Contact"
          footnoteClassName="font-semibold text-secondary"
          valueClassName="text-secondary"
          pill={{
            icon: CircleCheck,
            text: "Verified Ready",
            className: "bg-secondary-container text-on-secondary-container",
          }}
          progress={Math.round((accepted / total) * 100)}
          progressClassName="bg-secondary"
        />
        <StatCard
          label="Current Plan"
          pill={{
            text: "Standard",
            className: "bg-surface-container text-primary",
          }}
        >
          <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="block text-base font-bold text-primary">
                Student Free
              </span>
              <span className="text-xs text-outline">$0/month</span>
            </div>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-1 rounded-lg bg-secondary px-space-sm py-1.5 text-xs font-semibold text-on-secondary shadow-sm transition-all hover:bg-[#156057]">
              Upgrade to Pro
              <span className="text-[11px] font-bold text-primary-foreground/80">
                ($10)
              </span>
            </Link>
          </div>
          <p className="mt-2 truncate text-xs text-outline">
            <GraduationCap className="mr-1 inline size-3.5" aria-hidden="true" />
            Priority tutor matchmaking &amp; verified badge
          </p>
        </StatCard>
      </div>
    </div>
  );
}
