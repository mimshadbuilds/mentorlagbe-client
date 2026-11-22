"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Clock3,
  Folder,
  Info,
  Megaphone,
  Plus,
  Send,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import StatCard from "@/components/dashboard/shared/StatCard";
import { FREE_POST_LIMIT } from "@/lib/data/tutor";
import { startCheckout } from "@/lib/actions/payment";
import type { ITuition } from "@/lib/actions/tuition-query";
import type { IApplication } from "@/lib/types/application";
import type { TUserPlan } from "@/lib/types/payment";

type TutorOverviewProps = {
  tuitions: ITuition[];
  applications: IApplication[];
  plan: TUserPlan;
};

export default function TutorOverview({
  tuitions,
  applications,
  plan,
}: TutorOverviewProps) {
  const [checkoutBusy, setCheckoutBusy] = useState(false);
  const active = tuitions.filter((tuition) => tuition.isActive).length;
  const pending = applications.filter((item) => item.status === "pending").length;
  const accepted = applications.filter((item) => item.status === "accepted").length;
  const slotsLeft = Math.max(0, FREE_POST_LIMIT - tuitions.length);

  const handleUpgrade = async () => {
    if (checkoutBusy) return;
    setCheckoutBusy(true);

    try {
      await startCheckout("tutor_pro");
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
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-space-xs flex items-center gap-space-sm text-xs">
            <span className="tracking-wider text-outline uppercase">
              Tutor Workspace
            </span>
            <span className="size-1 rounded-full bg-outline-variant" aria-hidden="true" />
            <span className="inline-flex items-center gap-1 rounded-full bg-secondary-container px-2.5 py-0.5 font-semibold text-on-secondary-container">
              <span className="size-1.5 rounded-full bg-secondary" aria-hidden="true" />
              Active Session
            </span>
          </div>
          <h1 className="font-manrope text-2xl font-bold tracking-tight text-primary sm:text-3xl">
            Tutor Overview
          </h1>
          <p className="mt-1 text-sm text-on-surface-variant">
            Track your tuition circulars, manage incoming student applicants,
            and monitor post capacity.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/dashboard/tutor/applicants"
            className="inline-flex items-center gap-1.5 rounded-lg border border-secondary px-3.5 py-2 text-xs font-semibold text-secondary transition-all hover:bg-secondary-container"
          >
            <Users className="size-4" aria-hidden="true" />
            Manage Applicants
          </Link>
          <Link
            href="/dashboard/tutor/post-tuition"
            className="inline-flex items-center gap-1.5 rounded-lg bg-secondary px-3.5 py-2 text-xs font-semibold text-on-secondary shadow-sm transition-all hover:bg-[#156057]"
          >
            <Plus className="size-4" aria-hidden="true" />
            Post New Tuition
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-space-md sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Tuition Slots"
          value={String(tuitions.length)}
          footnote={plan === "pro" ? "Unlimited with Pro" : "/ 2 max"}
          footnoteClassName="text-outline"
          icon={Folder}
          iconChipClassName="bg-surface-container-low text-primary"
          pill={
            plan === "pro"
              ? { text: "Pro", className: "bg-tertiary-fixed text-on-tertiary-fixed-variant" }
              : slotsLeft === 0
                ? { text: "Limit Reached", className: "bg-destructive/10 text-destructive" }
                : { text: `${slotsLeft} slot left`, className: "bg-tertiary-fixed text-on-tertiary-fixed-variant" }
          }
          progress={plan === "pro" ? 100 : (tuitions.length / FREE_POST_LIMIT) * 100}
          progressClassName={slotsLeft === 0 && plan !== "pro" ? "bg-destructive" : "bg-secondary"}
        />
        <StatCard
          label="Active Circulars"
          value={String(active)}
          footnote="Listings Online"
          footnoteClassName="font-medium text-secondary"
          icon={Megaphone}
          iconChipClassName="bg-secondary-container text-on-secondary-container"
          pill={{
            text: "Live",
            className: "bg-secondary-container text-on-secondary-container",
          }}
        />
        <StatCard
          label="Total Applicants"
          value={String(applications.length)}
          footnote="Pending inquiries"
          footnoteClassName="text-outline"
          icon={Send}
          iconChipClassName="bg-surface-container text-primary"
          pill={{
            text: "Action Required",
            className: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
          }}
          progress={
            applications.length === 0 ? 0 : (pending / applications.length) * 100
          }
          progressClassName="bg-tertiary"
        />
        <StatCard
          label="Tier Status"
          className="bg-primary-container text-on-primary"
          pill={{
            text: plan === "pro" ? "Pro Active" : "Free ($0/mo)",
            className: "bg-surface-container-lowest/15 text-white",
          }}
        >
          <div className="mt-1">
            <span className="block text-base font-bold text-white">
              {plan === "pro" ? "Tutor Pro" : "Tutor Basic"}
            </span>
            {plan === "pro" ? (
              <Link
                href="/pricing"
                className="mt-2 inline-flex items-center gap-1.5 rounded bg-secondary-container/20 px-2.5 py-1 text-xs font-semibold text-white"
              >
                View Pro benefits
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            ) : (
              <button
                type="button"
                disabled={checkoutBusy}
                onClick={handleUpgrade}
                className="mt-2 inline-flex items-center gap-1.5 rounded bg-secondary px-2.5 py-1 text-xs font-semibold text-on-secondary shadow-sm transition-all hover:bg-[#156057] disabled:opacity-50"
              >
                {checkoutBusy ? "Opening Stripe..." : "Upgrade to PRO ($15)"}
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </button>
            )}
          </div>
        </StatCard>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-secondary-container bg-secondary-container/40 p-space-md">
        <div className="flex items-start gap-2">
          <Info className="mt-0.5 size-4 shrink-0 text-secondary" aria-hidden="true" />
          <p className="text-xs leading-relaxed text-on-surface">
            <span className="font-semibold">
              {plan === "pro" ? "Pro Plan:" : "Free Plan:"}
            </span>{" "}
            {plan === "pro"
              ? "Unlimited tuition posts and a verified educator badge are active."
              : `${tuitions.length} of ${FREE_POST_LIMIT} tuition posts used. Upgrade to Pro for unlimited posts and a verified badge.`}
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs text-secondary">
          <span className="inline-flex items-center gap-1">
            <Check className="size-3.5" aria-hidden="true" />
            {accepted} accepted
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock3 className="size-3.5" aria-hidden="true" />
            {pending} pending
          </span>
        </div>
      </div>
    </div>
  );
}
