import type { Metadata } from "next";
import BrowseTuitions from "@/components/tuitions/browse-tuitions";
import { getTuitions } from "@/lib/actions/tuition-query";

export const metadata: Metadata = {
    title: "MentorLagbe | Browse Verified Tuitions",
    description:
        "Search and filter admin-approved tuition batches and 1-on-1 mentorship openings from verified tutors across Bangladesh.",
    };

export default async function TuitionsPage(props: PageProps<"/tuitions">) {
    // ?q= comes from the 404 page's recovery search box.
    const { q } = await props.searchParams;
    const tuitions = await getTuitions();
    return (
        <BrowseTuitions
            tuitions={tuitions}
            initialSearch={typeof q === "string" ? q : ""}
        />
    );
}
