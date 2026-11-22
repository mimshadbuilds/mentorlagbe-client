import type { Metadata } from "next";
import PaymentStatus from "@/components/payment/payment-status";

export const metadata: Metadata = {
  title: "Payment Cancelled | MentorLagbe",
};

export default function PaymentCancelPage() {
  return <PaymentStatus state="cancelled" />;
}
