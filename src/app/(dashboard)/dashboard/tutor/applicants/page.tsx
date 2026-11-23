import type { Metadata } from "next";
import Applicants from "@/components/dashboard/tutor/applicants";
import { getTutorApplications } from "@/lib/actions/application-query";

export const metadata: Metadata = {
  title: "Manage Applicants | MentorLagbe",
  description:
    "Review student applications and manage applicants for your tuition listings on MentorLagbe.",
};

/** docx line 105: accept/reject student applicants. */
export default async function ApplicantsPage() {
  const applicants = await getTutorApplications();

  return <Applicants applicants={applicants} />;
}
