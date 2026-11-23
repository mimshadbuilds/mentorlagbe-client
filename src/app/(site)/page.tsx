import { Suspense } from "react";
import type { Metadata } from "next";
import HeroSection from "@/components/home/hero";
import FeaturedTuitions from "@/components/home/featured-tuitions";
import HowItWorks from "@/components/home/how-it-works";
import PopularSubjects from "@/components/home/popular-subjects";
import Statistics from "@/components/home/statistics";
import PricingCards from "@/components/home/pricing";
import FinalCta from "@/components/home/final-cta";

export const metadata: Metadata = {
    title: "Find the Right Tutor | MentorLagbe",
    description:
        "Connect with trusted tutors and discover quality tuition opportunities across Bangladesh with MentorLagbe.",
};

export default function Home() {
    return (
        <>
          <HeroSection />
            <Suspense
                fallback={
                    <section className="bg-surface-container-lowest py-20">
                        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
                            <div className="h-9 w-56 animate-pulse rounded-lg bg-surface-container-low" />
                        </div>
                    </section>
                }>
                <FeaturedTuitions />
            </Suspense>
            <PopularSubjects />
            <HowItWorks />
            <Statistics />
            <PricingCards />
            <FinalCta />
        </>
    );
}
