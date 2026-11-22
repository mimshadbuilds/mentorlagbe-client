import TutorOverview from "@/components/dashboard/tutor/tutor-overview";
import { getTutorApplications } from "@/lib/actions/application-query";
import { getCurrentProfileServer } from "@/lib/actions/payment-query";
import { getMyTuitions } from "@/lib/actions/tutor-query";

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
