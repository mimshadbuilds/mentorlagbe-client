import ApplicationsTable from "@/components/dashboard/student/applications-table";
import { getStudentApplications } from "@/lib/actions/application-query";

export default async function MyApplicationsPage() {
  const applications = await getStudentApplications();

  return <ApplicationsTable applications={applications} />;
}
