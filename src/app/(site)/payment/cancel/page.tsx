import type { Metadata } from "next";
import PaymentStatus from "@/components/payment/payment-status";

export const metadata: Metadata = {
  title: "Payment Cancelled | MentorLagbe",
  description:
    "Your MentorLagbe checkout was cancelled. You can return to pricing whenever you are ready.",
};

export default function PaymentCancelPage() {
  return <PaymentStatus state="cancelled" />;
}
