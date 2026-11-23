import type { Metadata } from "next";
import MyTuitions from "@/components/dashboard/tutor/my-tuitions";
import { getTutorApplications } from "@/lib/actions/application-query";
import { getMyTuitions } from "@/lib/actions/tutor-query";

export const metadata: Metadata = {
  title: "My Tuitions | MentorLagbe",
  description:
    "Manage your tuition listings, check application activity, and update listing status on MentorLagbe.",
};

/** docx line 104: CRUD + Active/Closed toggle for the tutor's tuitions. */
export default async function MyTuitionsPage() {
  const [tuitions, applications] = await Promise.all([
    getMyTuitions(),
    getTutorApplications(),
  ]);

  return <MyTuitions tuitions={tuitions} applications={applications} />;
}
