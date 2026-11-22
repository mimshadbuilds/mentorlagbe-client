import type { Metadata } from "next";
import PricingPlans from "@/components/pricing/pricing-plans";

export const metadata: Metadata = {
  title: "Pricing & Pro Plans | MentorLagbe",
  description:
    "Compare free and Pro plans for tutors and students on MentorLagbe.",
};

export default function PricingPage() {
  return (
    <div className="bg-surface">
      <PricingPlans />
    </div>
  );
}
