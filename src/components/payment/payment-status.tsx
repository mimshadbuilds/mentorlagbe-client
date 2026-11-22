import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  CircleCheck,
  CreditCard,
  Headset,
  Info,
  LockKeyhole,
  ReceiptText,
  ShieldCheck,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

type PaymentStatusProps = {
  status: "success" | "cancelled";
  plan?: string | string[];
  sessionId?: string | string[];
};

const first = (value?: string | string[]) =>
  Array.isArray(value) ? value[0] : value;

const planDetails = (value?: string | string[]) => {
  const plan = first(value);

  if (plan === "student") {
    return {
      name: "Student PRO Tier (Monthly)",
      amount: "$10.00 USD",
    };
  }

  if (plan === "tutor") {
    return {
      name: "Tutor PRO Tier (Monthly)",
      amount: "$15.00 USD",
    };
  }

  return {
    name: "MentorLagbe PRO Tier (Monthly)",
    amount: "$15.00 / $10.00 USD",
  };
};

const secondaryLink =
  "inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-on-surface-variant transition-colors hover:bg-surface-container hover:text-primary";

export default function PaymentStatus({
  status,
  plan,
  sessionId,
}: PaymentStatusProps) {
  const success = status === "success";
  const details = planDetails(plan);
  const reference = first(sessionId);

  const accent = success
    ? "h-1.5 w-full bg-gradient-to-r from-primary-container via-secondary to-secondary-container"
    : "h-1.5 w-full bg-gradient-to-r from-tertiary-fixed-dim via-secondary to-primary-container";

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-surface px-4 py-12">
      <div className="mb-space-lg inline-flex max-w-full items-center gap-2 rounded-full bg-secondary-container/40 px-3 py-1 text-xs font-semibold text-on-secondary-container shadow-sm">
        {success ? (
          <span className="size-2 shrink-0 animate-pulse rounded-full bg-secondary" />
        ) : (
          <ShieldCheck className="size-4 shrink-0 text-secondary" aria-hidden="true" />
        )}
        <span className="truncate">
          {success
            ? "Stripe 256-Bit TLS Secured Transaction"
            : "Stripe Secure Gateway · Session Terminated Safely"}
        </span>
      </div>

      <div className="w-full max-w-lg overflow-hidden rounded-xl bg-surface-container-lowest shadow-xl">
        <div className={accent} aria-hidden="true" />

        <div className="flex flex-col items-center p-space-lg sm:p-8">
          <div className="relative mb-space-lg flex items-center justify-center">
            {success ? (
              <>
                <span className="absolute size-20 animate-ping rounded-full bg-secondary-container/30 opacity-75" />
                <span className="absolute size-16 rounded-full bg-secondary-container/50" />
                <span className="relative flex size-12 items-center justify-center rounded-full bg-secondary text-on-secondary shadow-md">
                  <CircleCheck className="size-6" aria-hidden="true" />
                </span>
              </>
            ) : (
              <>
                <span className="flex size-20 items-center justify-center rounded-full bg-surface-container shadow-inner">
                  <span className="flex size-14 items-center justify-center rounded-full bg-tertiary-fixed/40 text-tertiary">
                    <CreditCard className="size-8" aria-hidden="true" />
                  </span>
                </span>
                <span className="absolute -right-1 -bottom-1 flex size-6 items-center justify-center rounded-full bg-primary text-on-primary shadow-md">
                  <Info className="size-3.5" aria-hidden="true" />
                </span>
              </>
            )}
          </div>

          <h1 className="text-center font-manrope text-2xl font-bold tracking-tight text-primary sm:text-3xl">
            {success ? "Payment Successful!" : "Payment Cancelled"}
          </h1>

          <p className="mt-space-xs max-w-sm text-center text-sm leading-relaxed text-on-surface-variant">
            {success
              ? "Your MentorLagbe Pro subscription is now active. A confirmation receipt has been sent to your email."
              : "Your Stripe checkout session was cancelled and no charges were made. Your account remains completely active on the Free Tier ($0/mo)."}
          </p>

          {success ? (
            <>
              <div className="mt-space-lg w-full rounded-lg bg-surface-container-low p-space-md shadow-sm">
                <div className="mb-space-sm flex items-center justify-between gap-2 border-b border-surface-container-high pb-space-sm">
                  <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-on-surface-variant uppercase">
                    <ReceiptText className="size-4 text-secondary" aria-hidden="true" />
                    Transaction Summary
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-secondary-container px-2.5 py-0.5 text-[11px] font-semibold text-on-secondary-container">
                    <span className="size-1.5 rounded-full bg-secondary" />
                    Paid &amp; Verified
                  </span>
                </div>
                <dl className="space-y-1 text-[13px]">
                  <div className="flex items-center justify-between gap-3 py-1">
                    <dt className="text-on-surface-variant">Subscribed Plan</dt>
                    <dd className="text-right font-bold text-primary">{details.name}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-3 py-1">
                    <dt className="text-on-surface-variant">Amount Paid</dt>
                    <dd className="font-bold text-secondary">{details.amount}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-3 py-1">
                    <dt className="text-on-surface-variant">Billing Cycle</dt>
                    <dd className="text-right text-on-surface">Renews monthly</dd>
                  </div>
                  <div className="flex items-center justify-between gap-3 pt-1">
                    <dt className="text-on-surface-variant">Transaction Ref</dt>
                    <dd className="max-w-[65%] break-all rounded bg-surface-container px-2 py-0.5 text-right font-mono text-[11px] text-on-surface-variant">
                      {reference ? `${reference} · Stripe` : "Awaiting Stripe confirmation"}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="mt-space-lg w-full rounded-lg border border-surface-container p-space-md">
                <h2 className="mb-space-sm flex items-center gap-2 text-xs font-bold tracking-wider text-primary uppercase">
                  <CircleCheck className="size-4 text-tertiary" aria-hidden="true" />
                  Pro Privileges Unlocked
                </h2>
                <ul className="space-y-2 text-[13px] text-on-surface">
                  {[
                    "Unlimited tuition posts or bookmarks with priority visibility",
                    "Official verified educator badge on your profile",
                    "Priority matching and applicant notifications",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-secondary-container">
                        <CircleCheck
                          className="size-3.5 text-secondary"
                          aria-hidden="true"
                        />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/dashboard"
                className={buttonVariants({
                  variant: "secondary",
                  className: "mt-space-lg w-full gap-2 rounded-lg py-3 text-sm font-bold",
                })}
              >
                Go to Dashboard
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <div className="mt-space-sm w-full">
                <Link href="/tuitions" className={secondaryLink}>
                  Browse Tuitions
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="mt-space-lg w-full space-y-space-md rounded-lg bg-surface-container-low p-space-md text-left">
                <div className="flex items-start gap-space-sm">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                    <CircleCheck className="size-4" aria-hidden="true" />
                  </span>
                  <div>
                    <h2 className="text-sm font-bold text-primary">
                      Active privileges maintained
                    </h2>
                    <p className="text-[13px] leading-relaxed text-on-surface-variant">
                      Your tuition posts, bookmarks, and application status remain
                      active and uninterrupted.
                    </p>
                  </div>
                </div>
                <div className="h-px w-full bg-surface-container-highest" />
                <div className="flex items-start justify-between gap-space-md">
                  <div className="flex items-start gap-space-sm">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-container/10 text-primary">
                      <Bookmark className="size-4" aria-hidden="true" />
                    </span>
                    <div>
                      <h2 className="text-sm font-bold text-primary">
                        Reserved subscription slot
                      </h2>
                      <p className="text-[13px] leading-relaxed text-on-surface-variant">
                        Your Pro plan selection is saved for next time.
                      </p>
                    </div>
                  </div>
                  <span className="shrink-0 rounded bg-surface-container-high px-2 py-0.5 text-[11px] text-on-surface-variant">
                    Draft Preserved
                  </span>
                </div>
              </div>

              <div className="mt-space-md w-full rounded-lg bg-surface-bright p-space-md text-left">
                <h2 className="mb-2 flex items-center gap-2 text-xs font-bold text-primary">
                  <Info className="size-4 text-outline" aria-hidden="true" />
                  Common checkout interruptions
                </h2>
                <ul className="list-disc space-y-1 pl-5 text-[13px] leading-relaxed text-on-surface-variant">
                  <li>You exited Stripe checkout before completing payment.</li>
                  <li>Your card required 2FA or 3D-Secure verification.</li>
                  <li>The checkout session expired after 30 minutes.</li>
                </ul>
              </div>

              <div className="mt-space-lg flex w-full flex-col gap-space-sm sm:flex-row">
                <Link
                  href="/pricing"
                  className={buttonVariants({
                    variant: "secondary",
                    className: "w-full gap-2 rounded-lg py-3 text-sm font-bold sm:flex-1",
                  })}
                >
                  Retry Checkout with Stripe
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/dashboard"
                  className={buttonVariants({
                    variant: "outline",
                    className: "w-full rounded-lg py-3 text-sm font-bold sm:w-auto",
                  })}
                >
                  Back to Dashboard
                </Link>
              </div>
              <div className="mt-space-md w-full text-center">
                <Link href="/tuitions" className={secondaryLink}>
                  <ArrowLeft className="size-4" aria-hidden="true" />
                  Return directly to your Dashboard
                </Link>
              </div>
            </>
          )}
        </div>

        <div className="bg-surface-container-low px-space-lg py-3 text-center text-[13px] text-on-surface-variant">
          {success ? (
            <p>
              Questions regarding this charge?{" "}
              <a
                href="mailto:billing@mentorlagbe.com"
                className="font-semibold text-secondary hover:underline"
              >
                billing@mentorlagbe.com
              </a>
            </p>
          ) : (
            <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
              <Headset className="size-4 text-outline" aria-hidden="true" />
              Having trouble with payment authorization?
              <a
                href="mailto:billing@mentorlagbe.com"
                className="font-semibold text-secondary hover:underline"
              >
                billing@mentorlagbe.com
              </a>
              <span className="hidden sm:inline">· Hotline: 16443 (9 AM – 9 PM)</span>
            </p>
          )}
        </div>
      </div>

      <p className="mt-space-md flex flex-wrap items-center justify-center gap-2 text-center text-xs text-on-surface-variant">
        <LockKeyhole className="size-3.5" aria-hidden="true" />
        {success ? "PCI-DSS Level 1 Compliant" : "256-Bit SSL Encrypted"}
        <span aria-hidden="true">•</span>
        {success
          ? "Auto-renewal can be modified anytime in Account Settings"
          : "MentorLagbe Guarantee"}
      </p>
    </div>
  );
}
