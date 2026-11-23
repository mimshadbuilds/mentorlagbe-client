import type { Metadata } from "next";
import ApplicationsTable from "@/components/dashboard/student/applications-table";
import { getStudentApplications } from "@/lib/actions/application-query";

export const metadata: Metadata = {
  title: "My Applications | MentorLagbe",
  description:
    "Track and manage your applications to tuition opportunities on MentorLagbe.",
};

export default async function MyApplicationsPage() {
  const applications = await getStudentApplications();

  return <ApplicationsTable applications={applications} />;
}
