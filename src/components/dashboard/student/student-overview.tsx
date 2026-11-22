"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CircleCheck,
  GraduationCap,
  Hourglass,
  Layers,
} from "lucide-react";
import { toast } from "sonner";
import StatCard from "@/components/dashboard/shared/StatCard";
import { startCheckout } from "@/lib/actions/payment";
import type { IApplication } from "@/lib/types/application";
import type { TUserPlan } from "@/lib/types/payment";

type StudentOverviewProps = {
  applications: IApplication[];
  plan: TUserPlan;
};

export default function StudentOverview({
  applications,
  plan,
}: StudentOverviewProps) {
  const [checkoutBusy, setCheckoutBusy] = useState(false);
  const total = applications.length;
  const pending = applications.filter((item) => item.status === "pending").length;
  const accepted = applications.filter((item) => item.status === "accepted").length;

  const handleUpgrade = async () => {
    if (checkoutBusy) return;
    setCheckoutBusy(true);

    try {
      await startCheckout("student_pro");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not start Stripe checkout."
      );
    } finally {
      setCheckoutBusy(false);
    }
  };

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
          footnote={`${total === 0 ? 0 : Math.round((pending / total) * 100)}% of Total`}
          footnoteClassName="font-semibold text-on-tertiary-container"
          pill={{
            icon: Hourglass,
            text: "Under Review",
            className: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
          }}
          progress={total === 0 ? 0 : Math.round((pending / total) * 100)}
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
          progress={total === 0 ? 0 : Math.round((accepted / total) * 100)}
          progressClassName="bg-secondary"
        />
        <StatCard
          label="Current Plan"
          pill={{
            text: plan === "pro" ? "Pro" : "Standard",
            className: "bg-surface-container text-primary",
          }}
        >
          <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="block text-base font-bold text-primary">
                {plan === "pro" ? "Student Pro" : "Student Free"}
              </span>
              <span className="text-xs text-outline">
                {plan === "pro" ? "Pro access active" : "$0/month"}
              </span>
            </div>
            {plan === "pro" ? (
              <Link
                href="/pricing"
                className="inline-flex items-center gap-1 rounded-lg bg-surface-container px-space-sm py-1.5 text-xs font-semibold text-primary"
              >
                View benefits
              </Link>
            ) : (
              <button
                type="button"
                disabled={checkoutBusy}
                onClick={handleUpgrade}
                className="inline-flex items-center gap-1 rounded-lg bg-secondary px-space-sm py-1.5 text-xs font-semibold text-on-secondary shadow-sm transition-all hover:bg-[#156057] disabled:opacity-50"
              >
                {checkoutBusy ? "Opening Stripe..." : "Upgrade to Pro"}
                <span className="text-[11px] font-bold text-primary-foreground/80">
                  ($10)
                </span>
              </button>
            )}
          </div>
          <p className="mt-2 truncate text-xs text-outline">
            <GraduationCap className="mr-1 inline size-3.5" aria-hidden="true" />
            {plan === "pro"
              ? "Priority booking is active on your account"
              : "Priority tutor matchmaking & verified badge"}
          </p>
        </StatCard>
      </div>
    </div>
  );
}
