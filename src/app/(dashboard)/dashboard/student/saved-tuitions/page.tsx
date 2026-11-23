import type { Metadata } from "next";
import SavedTuitions from "@/components/dashboard/student/saved-tuitions";

export const metadata: Metadata = {
  title: "Saved Tuitions | MentorLagbe",
  description:
    "View the tuition opportunities you have saved to revisit on MentorLagbe.",
};

export default function SavedTuitionsPage() {
  return <SavedTuitions />;
}
