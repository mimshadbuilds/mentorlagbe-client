import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function FinalCta() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0e2034] py-12 text-white">
      <div className="pointer-events-none absolute top-1/2 right-[-10%] z-0 h-[550px] w-[550px] -translate-y-1/2 rounded-full bg-[#152e47]/60" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="max-w-2xl text-left">
          <span className="mb-5 inline-block rounded-full border border-[#059669]/40 bg-[#064e3b]/50 px-3 py-1 text-xs font-bold tracking-wider text-[#14b8a6] uppercase">
            Join the Network
          </span>

          <h2 className="font-display mb-4 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
            Find the right tuition or share your subject expertise.
          </h2>

          <p className="mb-8 text-sm leading-relaxed text-slate-300 sm:text-base">
            Whether you are preparing for critical board examinations or
            looking to start your next tuition batch, MentorLagbe provides a
            focused marketplace for quality education.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Button
              render={<Link href="/tuitions" />}
              className="h-auto rounded-lg bg-[#0e7464] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#0b5c4f]"
            >
              Find Tuitions Now
            </Button>
            <Button
              render={<Link href="/sign-up" />}
              variant="outline"
              className="h-auto rounded-lg border-slate-600/40 bg-[#24364c] px-6 py-3 text-sm font-semibold text-slate-100 shadow-sm hover:bg-[#2e435e] hover:text-slate-100 dark:border-slate-600/40 dark:bg-[#24364c] dark:hover:bg-[#2e435e]"
            >
              Register as Tutor
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
