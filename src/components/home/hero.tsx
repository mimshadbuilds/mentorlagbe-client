import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, School, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="w-full border-b border-surface-container py-10 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col items-start gap-6 lg:col-span-7">
            <div className="inline-flex items-center gap-2 self-start rounded-full bg-surface-container px-3 py-1 text-[11px] leading-[14px] font-semibold tracking-wide text-primary-container uppercase">
              <span className="size-2 rounded-full bg-secondary" />
              Tutoring Marketplace in Bangladesh
            </div>

            <h1 className="font-display text-4xl leading-[1.15] font-extrabold tracking-tight text-primary-container sm:text-5xl lg:text-[3.25rem]">
              Connect with dedicated subject tutors across Bangladesh.
            </h1>

            <p className="max-w-2xl text-[15px] leading-relaxed text-on-surface-variant">
              A structured marketplace for small tuition batches and
              personalized 1-on-1 mentorship across NCTB (Bangla &amp;
              English Version), Cambridge O/A-Levels, and Edexcel curricula.
            </p>

            <div className="w-full rounded-xl border border-surface-container bg-surface-container-lowest p-3 shadow-md sm:p-4">
              <div className="grid grid-cols-1 items-center gap-2.5 sm:grid-cols-12">
                <div className="rounded-lg bg-surface-container-low px-3 py-2 transition-all focus-within:bg-surface-container-lowest focus-within:ring-2 focus-within:ring-secondary/50 sm:col-span-4">
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

                <div className="rounded-lg bg-surface-container-low px-3 py-2 transition-all focus-within:bg-surface-container-lowest focus-within:ring-2 focus-within:ring-secondary/50 sm:col-span-3">
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

                <div className="rounded-lg bg-surface-container-low px-3 py-2 transition-all focus-within:bg-surface-container-lowest focus-within:ring-2 focus-within:ring-secondary/50 sm:col-span-3">
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
                    className="h-12 w-full gap-1.5 rounded-lg font-semibold shadow-sm">
                    <Search className="size-[18px]" />
                    Search
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                render={<Link href="/tuitions" />}
                className="h-auto gap-2 rounded-lg px-6 py-3 font-semibold shadow-sm">
                Browse Tuitions
                <ArrowRight className="size-[18px]" />
              </Button>
              <Button
                variant="outline"
                render={<Link href="/sign-up" />}
                className="h-auto gap-2 rounded-lg px-6 py-3 font-semibold text-primary-container">
                <School className="size-5 text-secondary" />
                Become a Tutor
              </Button>
            </div>
          </div>

          <div className="relative lg:col-span-5">
            <div className="overflow-hidden rounded-2xl bg-surface-container-lowest p-2 shadow-lg">
              <div className="relative h-[320px] overflow-hidden rounded-xl bg-surface-container-low sm:h-[380px] lg:h-[420px]">
                <Image
                  src="/hero.png"
                  alt="Experienced instructor mentoring mathematics students"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                  priority
                />

                <div className="absolute top-3 z-0 left-3 max-w-[52%] rounded-xl bg-surface-container-lowest/95 px-3 py-2 shadow-md backdrop-blur-md">
                  <span className="text-[10px] font-bold tracking-wide text-secondary uppercase sm:text-[11px]">
                    Mathematics Mentor
                  </span>
                  <h2 className="font-display mt-0.5 text-xs font-bold text-primary-container sm:text-sm">
                    Mst. Shahnaz Begum
                  </h2>
                  <p className="mt-0.5 text-[10px] leading-snug text-on-surface-variant sm:text-[11px]">
                    BUET EEE - Specializing in HSC Calculus &amp; Mechanics
                  </p>
                </div>

                <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-surface-container-lowest/95 px-2.5 py-1.5 shadow-md backdrop-blur-md">
                  <BadgeCheck className="size-3.5 shrink-0 text-secondary sm:size-4" aria-hidden="true" />
                  <span className="text-[10px] font-bold tracking-tight text-primary-container sm:text-[11px]">
                    NCTB &amp; CAIE
                  </span>
                </div>

                <div className="absolute right-3 bottom-3 left-3 rounded-xl bg-surface-container-lowest/95 p-3 shadow-xl backdrop-blur-md sm:p-4">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-container px-2.5 py-0.5 text-[11px] leading-[14px] font-semibold text-primary-container">
                      <span className="size-1.5 rounded-full bg-secondary" />
                      Online Batch
                    </span>
                    <span className="text-[11px] leading-[14px] font-medium text-on-surface-variant">
                      HSC 2026
                    </span>
                  </div>
                  <p className="font-display mt-2 text-sm font-bold text-primary-container sm:text-base">
                    Higher Math P1: Calculus &amp; Coordinate Geometry
                  </p>
                  <div className="mt-3 flex items-center justify-between rounded-lg bg-surface-container-low px-3 py-2">
                    <span className="text-[11px] leading-[14px] text-on-surface-variant">
                      Monthly Fee
                    </span>
                    <span className="font-display text-base font-extrabold text-secondary sm:text-lg">
                      ৳4,500
                      <span className="text-[11px] font-normal text-on-surface-variant">
                        /mo
                      </span>
                    </span>
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
