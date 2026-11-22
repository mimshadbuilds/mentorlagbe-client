import { Suspense } from "react";
import type { Metadata } from "next";
import PaymentStatus from "@/components/payment/payment-status";

export const metadata: Metadata = {
  title: "Payment Cancelled | MentorLagbe",
};

type SearchParams = {
  searchParams: Promise<{ session_id?: string | string[]; plan?: string | string[] }>;
};

async function CancelDetails({ searchParams }: SearchParams) {
  const { session_id, plan } = await searchParams;

  return <PaymentStatus status="cancelled" plan={plan} sessionId={session_id} />;
}

export default function PaymentCancelPage(props: SearchParams) {
  return (
    <Suspense fallback={<PaymentStatus status="cancelled" />}>
      <CancelDetails {...props} />
    </Suspense>
  );
}
