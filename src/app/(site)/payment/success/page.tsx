import { Suspense } from "react";
import type { Metadata } from "next";
import PaymentStatus from "@/components/payment/payment-status";

export const metadata: Metadata = {
  title: "Payment Successful | MentorLagbe",
};

type SearchParams = {
  searchParams: Promise<{ session_id?: string | string[]; plan?: string | string[] }>;
};

async function SuccessDetails({ searchParams }: SearchParams) {
  const { session_id, plan } = await searchParams;

  return <PaymentStatus status="success" plan={plan} sessionId={session_id} />;
}

export default function PaymentSuccessPage(props: SearchParams) {
  return (
    <Suspense fallback={<PaymentStatus status="success" />}>
      <SuccessDetails {...props} />
    </Suspense>
  );
}
