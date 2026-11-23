import type { Metadata } from "next";
import TutorOverview from "@/components/dashboard/tutor/tutor-overview";
import { getTutorApplications } from "@/lib/actions/application-query";
import { getCurrentProfileServer } from "@/lib/actions/payment-query";
import { getMyTuitions } from "@/lib/actions/tutor-query";

export const metadata: Metadata = {
  title: "Tutor Dashboard | MentorLagbe",
  description:
    "Review your tuition listings, student applicants, and account plan in the MentorLagbe tutor dashboard.",
};

export default async function TutorDashboardPage() {
  const [tuitions, applications, profile] = await Promise.all([
    getMyTuitions(),
    getTutorApplications(),
    getCurrentProfileServer(),
  ]);

  return (
    <TutorOverview
      tuitions={tuitions}
      applications={applications}
      plan={profile?.plan ?? "free"}
    />
  );
}
