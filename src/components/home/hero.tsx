import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, School, Search } from "lucide-react";
import { Button } from "@/components/ui/button";


export default function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-surface-container pt-12 pb-20 lg:pt-16 lg:pb-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="flex flex-col items-start lg:col-span-7">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-surface-container px-3 py-1 text-[11px] leading-[14px] font-semibold tracking-wide text-primary-container uppercase">
              <span className="size-2 rounded-full bg-secondary" />
              Tutoring Marketplace in Bangladesh
            </div>
            <h1 className="font-display mb-6 text-4xl leading-[1.15] font-extrabold tracking-tight text-primary-container sm:text-5xl lg:text-[3.25rem]">
              Connect with dedicated subject tutors across Bangladesh.
            </h1>
            <p className="mb-8 max-w-xl text-[15px] leading-relaxed text-on-surface-variant">
              A structured marketplace for small tuition batches and
              personalized 1-on-1 mentorship across NCTB (Bangla &amp;
              English Version), Cambridge O/A-Levels, and Edexcel curricula.
            </p>

            <div className="mb-8 w-full rounded-2xl border border-surface-container bg-surface-container-lowest p-3 shadow-xl lg:p-3.5">
              <div className="grid grid-cols-1 items-center gap-2.5 sm:grid-cols-12">
                <div className="rounded-xl border border-transparent bg-surface-container-low px-3 py-2 transition-all focus-within:border-secondary focus-within:bg-surface-container-lowest focus-within:ring-2 focus-within:ring-secondary/50 sm:col-span-4">
                  <label
                    htmlFor="hero-subject"
                    className="mb-0.5 block text-[11px] leading-[14px] font-bold tracking-wider text-on-surface-variant uppercase">
                    Subject / Topic
                  </label>
                  <input
                    id="hero-subject"
                    type="text"
                    placeholder="e.g. Higher Math, Physics"
                    className="w-full bg-transparent text-[13px] font-medium text-primary-container placeholder:text-on-surface-variant/60 focus:outline-none"
                  />
                </div>

                <div className="rounded-xl border border-transparent bg-surface-container-low px-3 py-2 transition-all focus-within:border-secondary focus-within:bg-surface-container-lowest focus-within:ring-2 focus-within:ring-secondary/50 sm:col-span-3">
                  <label
                    htmlFor="hero-curriculum"
                    className="mb-0.5 block text-[11px] leading-[14px] font-bold tracking-wider text-on-surface-variant uppercase">
                    Curriculum / Class
                  </label>
                  <select
                    id="hero-curriculum"
                    className="w-full cursor-pointer bg-transparent text-[13px] font-medium text-primary-container focus:outline-none">
                    <option value="">Any Level</option>
                    <option value="ssc">Class 9-10 (SSC)</option>
                    <option value="hsc">Class 11-12 (HSC)</option>
                    <option value="alevel">Cambridge / Edexcel</option>
                  </select>
                </div>

                <div className="rounded-xl border border-transparent bg-surface-container-low px-3 py-2 transition-all focus-within:border-secondary focus-within:bg-surface-container-lowest focus-within:ring-2 focus-within:ring-secondary/50 sm:col-span-3">
                  <label
                    htmlFor="hero-mode"
                    className="mb-0.5 block text-[11px] leading-[14px] font-bold tracking-wider text-on-surface-variant uppercase">
                    Mode / Area
                  </label>
                  <select
                    id="hero-mode"
                    className="w-full cursor-pointer bg-transparent text-[13px] font-medium text-primary-container focus:outline-none">
                    <option value="">All Modes</option>
                    <option value="online">Online Interactive</option>
                    <option value="dhanmondi">In-Person - Dhanmondi</option>
                    <option value="uttara">In-Person - Uttara</option>
                    <option value="mirpur">In-Person - Mirpur</option>
                    <option value="banani">In-Person - Banani / Gulshan</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <Button
                    type="button"
                    variant="secondary"
                    className="h-12 w-full gap-1.5 rounded-xl font-semibold shadow-md">
                    <Search className="size-[18px]" />
                    Search
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                render={<Link href="/tuitions" />}
                className="h-auto gap-2 rounded-xl px-6 py-3 font-semibold shadow-sm">
                Browse Tuitions
                <ArrowRight />
              </Button>
              <Button
                variant="outline"
                render={<Link href="/sign-up" />}
                className="h-auto gap-2 rounded-xl px-6 py-3 font-semibold text-primary-container">
                <School className="text-secondary" />
                Become a Tutor
              </Button>
            </div>
          </div>

          <div className="relative lg:col-span-5">
            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl border border-secondary/20 bg-secondary-container/40 -z-10" />
              <div className="rounded-3xl border border-surface-container bg-surface-container-lowest p-3 shadow-xl">
                <div className="relative h-96 overflow-hidden rounded-2xl bg-surface-container-low">
                  <Image
                    src="/hero-mentor.jpg"
                    alt="Experienced instructor mentoring mathematics students"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                  <div className="absolute right-4 bottom-4 left-4 rounded-2xl bg-primary-container/95 p-3">
                    <span className="mb-1 inline-block rounded-full bg-secondary px-2.5 py-0.5 text-[11px] leading-[14px] font-semibold text-on-secondary">
                      Mathematics Mentor
                    </span>
                    <h2 className="font-display text-lg font-bold text-on-primary-container">
                      Engr. Tanvir Ahmed
                    </h2>
                    <p className="text-[11px] leading-[14px] text-on-primary-container/80">
                      BUET EEE - Specializing in HSC Calculus &amp; Mechanics
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-8 -left-6 max-w-[270px] rounded-2xl border border-surface-container bg-surface-container-lowest p-4 shadow-xl sm:-left-10">
                <div className="mb-2 flex items-center justify-between text-[11px] leading-[14px]">
                  <span className="flex items-center gap-1 font-bold text-secondary">
                    <span className="size-1.5 animate-pulse rounded-full bg-secondary" />
                    Online Batch
                  </span>
                  <span className="font-medium text-on-surface-variant">
                    HSC 2026
                  </span>
                </div>
                <h3 className="font-display mb-3 text-sm font-bold leading-snug text-primary-container">
                  Higher Math P1: Calculus &amp; Coordinate Geometry
                </h3>
                <div className="flex items-baseline justify-between border-t border-surface-container pt-2">
                  <span className="text-[11px] leading-[14px] text-on-surface-variant">
                    Monthly Fee
                  </span>
                  <span className="font-display text-base font-extrabold text-primary-container">
                    ৳4,500
                    <span className="text-[11px] font-normal text-on-surface-variant">
                      /mo
                    </span>
                  </span>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 flex items-center gap-2 rounded-xl border border-surface-container bg-surface-container-lowest px-3.5 py-2 shadow-lg">
                <BadgeCheck className="size-5 text-secondary" />
                <div>
                  <div className="text-[11px] leading-none font-bold tracking-wider text-on-surface-variant uppercase">
                    Curricula
                  </div>
                  <div className="text-xs font-bold text-primary-container">
                    NCTB &amp; CAIE
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
