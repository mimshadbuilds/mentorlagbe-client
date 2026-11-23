import { Suspense } from "react";
import type { Metadata } from "next";
import PaymentStatus from "@/components/payment/payment-status";
import { getPaymentStatusServer } from "@/lib/actions/payment-query";

export const metadata: Metadata = {
  title: "Payment Successful | MentorLagbe",
  description:
    "Check the verification status of your MentorLagbe payment and subscription.",
};

type SearchParams = {
  searchParams: Promise<{ session_id?: string | string[] }>;
};

async function SuccessDetails({ searchParams }: SearchParams) {
  const { session_id } = await searchParams;
  const sessionId = Array.isArray(session_id) ? session_id[0] : session_id;

  if (!sessionId) {
    return (
      <PaymentStatus
        state="error"
        message="No Stripe session was provided. Return to your dashboard or review your plans — no plan changes were made."
      />
    );
  }

  const status = await getPaymentStatusServer(sessionId);

  if (!status) {
    return (
      <PaymentStatus
        state="error"
        sessionId={sessionId}
        message="We could not reach the payment service to verify this checkout. No plan changes were made — please retry."
      />
    );
  }

  const paymentStatus = (status.paymentStatus ?? status.status ?? "").toLowerCase();

  if (paymentStatus === "error") {
    return (
      <PaymentStatus
        state="error"
        sessionId={sessionId}
        message={status.message}
      />
    );
  }

  if (paymentStatus !== "paid") {
    return (
      <PaymentStatus
        state="processing"
        sessionId={sessionId}
        details={status}
        message="Stripe has not confirmed this payment yet. Wait a moment and check again — your plan will update automatically once the webhook arrives."
      />
    );
  }

  return (
    <PaymentStatus state="success" sessionId={sessionId} details={status} />
  );
}

export default function PaymentSuccessPage(props: SearchParams) {
  return (
    <Suspense
      fallback={
        <PaymentStatus
          state="processing"
          message="Checking your payment with the MentorLagbe server..."
        />
      }>
      <SuccessDetails {...props} />
    </Suspense>
  );
}
