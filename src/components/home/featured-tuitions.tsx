import Link from "next/link";
import { unstable_rethrow } from "next/navigation";
import { ArrowRight } from "lucide-react";
import TuitionsCard from "@/components/layout/TuitionsCard";
import { getTuitions } from "@/lib/actions/tuition-query";
import { ITuition } from "@/lib/actions/tuition-query";

export default async function FeaturedTuitions() {
    let tuitions: ITuition[];

    try {
        tuitions = await getTuitions();
    } catch (error) {
        unstable_rethrow(error);
        console.error("Featured tuitions request failed:", error);

        return (
            <section className="mx-auto max-w-7xl px-4 py-16 text-center">
                <h2 className="text-lg font-bold text-primary">
                    Unable to load featured tuitions
                </h2>
                <p className="mt-2 text-sm text-on-surface-variant">
                    Please try again later.
                </p>
            </section>
        );
    }

    const featuredTuitions = tuitions.slice(0, 6);

    return (
        <section className="bg-surface-container-lowest py-20">
            <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
                <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                <div>
                    <span className="text-[11px] leading-[14px] font-bold tracking-wider text-secondary uppercase">
                    Verified Enrollments
                    </span>
                    <h2 className="font-display mt-1 text-3xl font-bold text-primary-container">
                    Featured Tuitions
                    </h2>
                    <p className="mt-1 text-[13px] leading-5 text-on-surface-variant">
                    Explore active, admin-approved tuition opportunities from
                    tutors across Bangladesh.
                    </p>
                </div>

                <Link href="/tuitions"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary transition-colors hover:text-primary-container">
                    Explore all listings
                    <ArrowRight className="size-[18px]" />
                </Link>
                </div>

                {featuredTuitions.length > 0 ? (
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {featuredTuitions.map((tuition) => (
                        <TuitionsCard
                            key={tuition._id}
                            tuition={tuition}
                        />
                        ))}
                    </div>
                    ) : (
                    <div className="rounded-xl border border-surface-container bg-surface-container-low py-16 text-center">
                        <h3 className="font-display text-lg font-bold text-primary-container">
                        No featured tuitions available
                        </h3>
                        <p className="mt-2 text-sm text-on-surface-variant">
                        Approved tuition listings will appear here when tutors publish
                        their opportunities.
                        </p>
                        <Link
                        href="/tuitions"
                        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:text-primary-container">
                        Browse all tuitions
                        <ArrowRight className="size-4" />
                        </Link>
                    </div>
                    )}
                </div>
        </section>
    );
}
