"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CircleCheck,
  CreditCard,
  LockKeyhole,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { Button, buttonVariants } from "@/components/ui/button";
import { startCheckout, type ProRole } from "@/lib/actions/payment";

const plans: {
  role: ProRole;
  audience: string;
  description: string;
  price: string;
  freeFeatures: string[];
  proFeatures: string[];
}[] = [
  {
    role: "tutor",
    audience: "Tutor Plans",
    description: "Post tuition batches and manage your applicants.",
    price: "$15",
    freeFeatures: [
      "Up to 2 tuition posts",
      "Applicant inbox and status updates",
      "Basic profile and search visibility",
      "Standard admin review queue",
    ],
    proFeatures: [
      "Unlimited tuition posts",
      "Verified educator gold badge",
      "Priority listing in search results",
      "Priority applicant notifications",
    ],
  },
  {
    role: "student",
    audience: "Student Plans",
    description: "Find the right mentor and book with confidence.",
    price: "$10",
    freeFeatures: [
      "Up to 5 tuition bookmarks",
      "Apply to approved tuition posts",
      "Search and subject filters",
      "Application status tracking",
    ],
    proFeatures: [
      "Unlimited tuition bookmarks",
      "Priority booking on popular batches",
      "Early access to new listings",
      "Priority support",
    ],
  },
];

export default function PricingPlans() {
  const [busyRole, setBusyRole] = useState<ProRole | null>(null);

  const handleCheckout = async (role: ProRole) => {
    if (busyRole) return;
    setBusyRole(role);

    try {
      await startCheckout(role);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Could not start Stripe checkout."
      );
    } finally {
      setBusyRole(null);
    }
  };

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-space-lg px-4 py-12 md:px-6 md:py-16 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <span className="mb-2 block text-[11px] font-bold tracking-wider text-secondary uppercase">
          Plans &amp; Pricing
        </span>
        <h1 className="font-manrope text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
          Simple pricing for tutors and students
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-on-surface-variant">
          Start free, then upgrade to Pro to unlock unlimited posts or bookmarks,
          a verified badge, and priority matching. Payments are processed securely
          by Stripe.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {plans.map((plan) => (
          <section
            key={plan.role}
            className="flex flex-col gap-space-md rounded-2xl border border-surface-container bg-surface-container-lowest p-space-lg shadow-sm"
          >
            <div className="flex items-start gap-space-sm">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary-container text-secondary">
                {plan.role === "tutor" ? (
                  <CreditCard className="size-5" aria-hidden="true" />
                ) : (
                  <Sparkles className="size-5" aria-hidden="true" />
                )}
              </div>
              <div>
                <h2 className="font-manrope text-xl font-bold text-primary">
                  {plan.audience}
                </h2>
                <p className="text-[13px] text-on-surface-variant">
                  {plan.description}
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex h-full flex-col justify-between rounded-xl border border-surface-container bg-surface p-space-md">
                <div>
                  <div className="mb-3 flex items-baseline gap-1">
                    <span className="font-manrope text-3xl font-extrabold text-primary">
                      $0
                    </span>
                    <span className="text-xs text-on-surface-variant">
                      /month
                    </span>
                  </div>
                  <span className="mb-4 inline-block rounded-full bg-surface-container px-2.5 py-0.5 text-[11px] font-semibold text-on-surface-variant">
                    Free forever
                  </span>
                  <ul className="space-y-3">
                    {plan.freeFeatures.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-[13px] leading-5 text-on-surface-variant"
                      >
                        <CircleCheck
                          className="mt-0.5 size-4 shrink-0 text-secondary"
                          aria-hidden="true"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  href="/sign-up"
                  className={buttonVariants({
                    variant: "outline",
                    className: "mt-6 w-full rounded-xl py-3 text-xs font-bold",
                  })}
                >
                  Get Started Free
                </Link>
              </div>

              <div className="relative flex h-full flex-col justify-between rounded-xl border-2 border-secondary bg-surface-container-lowest p-space-md shadow-md">
                <span className="absolute -top-3 right-4 inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-[10px] font-bold tracking-wider text-on-secondary uppercase">
                  <Sparkles className="size-3" aria-hidden="true" />
                  Recommended
                </span>
                <div>
                  <div className="mb-3 flex items-baseline gap-1">
                    <span className="font-manrope text-3xl font-extrabold text-secondary">
                      {plan.price}
                    </span>
                    <span className="text-xs text-on-surface-variant">
                      /month
                    </span>
                  </div>
                  <span className="mb-4 inline-block rounded-full bg-tertiary-fixed px-2.5 py-0.5 text-[11px] font-bold text-on-tertiary-fixed-variant">
                    PRO plan
                  </span>
                  <ul className="space-y-3">
                    {plan.proFeatures.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-[13px] leading-5 text-on-surface-variant"
                      >
                        <CircleCheck
                          className="mt-0.5 size-4 shrink-0 text-secondary"
                          aria-hidden="true"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button
                  type="button"
                  variant="secondary"
                  disabled={busyRole !== null}
                  onClick={() => handleCheckout(plan.role)}
                  className="mt-6 w-full gap-2 rounded-xl py-3 text-xs font-bold"
                >
                  Subscribe with Stripe
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </section>
        ))}
      </div>

      <p className="flex items-center justify-center gap-2 text-center text-xs text-on-surface-variant">
        <LockKeyhole className="size-4 text-secondary" aria-hidden="true" />
        256-bit SSL encrypted checkout · PCI-DSS Level 1 compliant
      </p>
    </div>
  );
}
