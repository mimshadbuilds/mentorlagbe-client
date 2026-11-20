import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TuitionDetails from "@/components/tuitions/tuition-details";
import { approvedTuitions } from "@/lib/data/tuitions";

export function generateStaticParams() {
    return approvedTuitions.map((tuition) => ({ id: tuition.id ?? "" }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const tuition = approvedTuitions.find((item) => item.id === id);

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
    const tuition = approvedTuitions.find((item) => item.id === id);

    if (!tuition) notFound();

    return <TuitionDetails tuition={tuition} />;
}
