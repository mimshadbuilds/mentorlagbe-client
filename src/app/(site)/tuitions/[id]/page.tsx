import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TuitionDetails from "@/components/tuitions/tuition-details";
import { getTuitionById } from "@/lib/actions/tuition-query";

/**
 * Details read from mentorlagbe-server per request (GET /tuitions/:id) — no
 * generateStaticParams so listings approved after a build appear immediately.
 * Identical fetches in metadata + page are deduplicated by React.
 */
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const tuition = await getTuitionById(id);

    if (!tuition) {
        return { title: "Tuition Not Found | MentorLagbe" };
    }

    return {
        title: `MentorLagbe | ${tuition.title}`,
        description: tuition.description,
    };
    }

export default async function TuitionDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const tuition = await getTuitionById(id);

    if (!tuition) notFound();

    return <TuitionDetails tuition={tuition} />;
}
