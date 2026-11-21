import Link from "next/link";
import {
  ArrowRight,
  Banknote,
  ClipboardList,
  GraduationCap,
  Hourglass,
  Users,
} from "lucide-react";
import StatCard from "@/components/dashboard/shared/StatCard";
import type { IAdminStats } from "@/lib/actions/admin-query";

export default function AdminOverview({ stats }: { stats: IAdminStats | null }) {
  const totalUsers = stats?.totalUsers ?? 0;
  const totalTutors = stats?.totalTutors ?? 0;
  const pending = stats?.pendingTuitions ?? 0;
  const approved = stats?.approvedTuitions ?? 0;
  const revenue = stats?.totalRevenue ?? 0;

  return (
    <div className="flex flex-col gap-space-lg">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-manrope text-2xl font-bold tracking-tight text-primary sm:text-3xl">
            Admin Overview
          </h1>
          <p className="mt-1 text-sm text-on-surface-variant">
            Platform statistics — users, tutors, tuition moderation, and Stripe revenue.
          </p>
        </div>
        <Link
          href="/dashboard/admin/tuitions"
          className="inline-flex items-center gap-1.5 self-start rounded-lg bg-secondary px-3.5 py-2 text-xs font-semibold text-on-secondary shadow-sm transition-all hover:bg-[#156057] sm:self-auto">
          Review pending tuitions
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-space-md sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Users"
          value={String(totalUsers)}
          footnote="Registered accounts"
          footnoteClassName="text-outline"
          icon={Users}
          iconChipClassName="bg-primary-container text-primary"
        />
        <StatCard
          label="Total Tutors"
          value={String(totalTutors)}
          footnote="Platform educators"
          footnoteClassName="text-outline"
          icon={GraduationCap}
          iconChipClassName="bg-secondary-container text-secondary"
        />
        <StatCard
          label="Pending vs. Approved Tuitions"
          value={`${pending} / ${approved}`}
          footnote="Pending / Approved"
          footnoteClassName="text-outline"
          pill={{
            icon: Hourglass,
            text: "Needs review",
            className: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
          }}
        />
        <StatCard
          label="Total Stripe Revenue"
          value={`$${revenue.toLocaleString("en-US")}`}
          footnote="Subscription payments"
          footnoteClassName="text-outline"
          icon={Banknote}
          iconChipClassName="bg-secondary-container text-secondary"
        />
      </div>

      <div className="flex items-center gap-3 rounded-xl bg-surface-container-lowest p-space-lg text-sm text-on-surface-variant shadow-sm">
        <ClipboardList className="size-5 shrink-0 text-secondary" aria-hidden="true" />
        <span>
          Only approved and active listings appear on the public{" "}
          <Link href="/tuitions" className="font-semibold text-secondary hover:underline">
            Browse Tuitions
          </Link>{" "}
          page.
        </span>
      </div>
    </div>
  );
}
