import type { Metadata } from "next";
import StudentOverview from "@/components/dashboard/student/student-overview";
import { getStudentApplications } from "@/lib/actions/application-query";
import { getCurrentProfileServer } from "@/lib/actions/payment-query";

export const metadata: Metadata = {
  title: "Student Dashboard | MentorLagbe",
  description:
    "View your tuition applications, saved opportunities, and account plan in the MentorLagbe student dashboard.",
};

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
