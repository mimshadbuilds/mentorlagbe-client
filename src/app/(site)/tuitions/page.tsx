import type { Metadata } from "next";
import BrowseTuitions from "@/components/tuitions/browse-tuitions";

export const metadata: Metadata = {
    title: "MentorLagbe | Browse Verified Tuitions",
    description:
        "Search and filter admin-approved tuition batches and 1-on-1 mentorship openings from verified tutors across Bangladesh.",
    };

    export default function TuitionsPage() {
    return <BrowseTuitions />;
}
