import StudentOverview from "@/components/dashboard/student/student-overview";
import { getStudentApplications } from "@/lib/actions/application-query";
import { getCurrentProfileServer } from "@/lib/actions/payment-query";

export default async function StudentDashboardPage() {
  const [applications, profile] = await Promise.all([
    getStudentApplications(),
    getCurrentProfileServer(),
  ]);

  return (
    <StudentOverview
      applications={applications}
      plan={profile?.plan ?? "free"}
    />
  );
}
