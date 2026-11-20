import HeroSection from "@/components/home/hero";
import FeaturedTuitions from "@/components/home/featured-tuitions";
import HowItWorks from "@/components/home/how-it-works";
import PopularSubjects from "@/components/home/popular-subjects";
import Statistics from "@/components/home/statistics";
import PricingCards from "@/components/home/pricing";
import FinalCta from "@/components/home/final-cta";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedTuitions />
      <HowItWorks />
      <PopularSubjects />
      <Statistics />
      <PricingCards />
      <FinalCta />
    </>
  );
}
