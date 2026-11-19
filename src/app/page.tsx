import HeroSection from "@/components/home/hero";
import FeaturedTuitions from "@/components/home/featured-tuitions";
import HowItWorks from "@/components/home/how-it-works";
import PopularSubjects from "@/components/home/popular-subjects";
import PricingCards from "@/components/home/pricing";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedTuitions />
      <HowItWorks />
      <PopularSubjects />
      <PricingCards />
    </>
  );
}
