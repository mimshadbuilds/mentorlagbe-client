import Applicants from "@/components/dashboard/tutor/applicants";
import { getTutorApplications } from "@/lib/actions/application-query";

/** docx line 105: accept/reject student applicants. */
export default async function ApplicantsPage() {
  const applicants = await getTutorApplications();

  return <Applicants applicants={applicants} />;
}
