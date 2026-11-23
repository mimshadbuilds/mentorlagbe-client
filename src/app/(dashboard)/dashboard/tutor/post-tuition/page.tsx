import type { Metadata } from "next";
import PostTuitionForm from "@/components/dashboard/tutor/post-tuition-form";

export const metadata: Metadata = {
  title: "Post a Tuition | MentorLagbe",
  description:
    "Create a tuition listing and connect with students looking for a tutor on MentorLagbe.",
};

export default function PostTuitionPage() {
  return <PostTuitionForm />;
}
