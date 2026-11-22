import { Suspense } from "react";
import type { Metadata } from "next";
import PricingPlans from "@/components/pricing/pricing-plans";
import { getUserSession } from "@/lib/core/session";
import { getCurrentProfileServer } from "@/lib/actions/payment-query";
import type { TUserRole } from "@/lib/types/payment";

export const metadata: Metadata = {
  title: "Pricing & Pro Plans | MentorLagbe",
  description:
    "Compare free and Pro plans for tutors and students on MentorLagbe.",
};

async function PricingForUser() {
  const [session, profile] = await Promise.all([
    getUserSession(),
    getCurrentProfileServer(),
  ]);

  return (
    <PricingPlans
      signedIn={Boolean(session)}
      role={(session?.role as TUserRole) ?? null}
      plan={profile?.plan ?? "free"}
    />
  );
}

export default function PricingPage() {
  return (
    <div className="bg-surface">
      <Suspense
        fallback={<PricingPlans signedIn={false} role={null} plan="free" />}>
        <PricingForUser />
      </Suspense>
    </div>
  );
}
