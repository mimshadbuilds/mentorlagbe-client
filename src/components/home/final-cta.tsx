import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function FinalCta() {
  return (
    <section className="w-full py-12">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 rounded-2xl bg-primary p-8 text-on-primary shadow-xl sm:p-12 md:flex-row">
          <div className="max-w-2xl space-y-2">
            <span className="text-[11px] font-bold tracking-wider text-secondary uppercase">
              Join the Network
            </span>
            <h2 className="font-display text-2xl font-bold leading-tight tracking-tight sm:text-[2rem] sm:leading-10">
              Find the right tuition or share your subject expertise.
            </h2>
            <p className="text-sm leading-relaxed text-on-primary-container">
              Whether you are preparing for critical board examinations or
              looking to start your next tuition batch, MentorLagbe provides a
              focused marketplace for quality education.
            </p>
          </div>

          <div className="flex w-full shrink-0 flex-col gap-4 sm:flex-row md:w-auto">
            <Button
              render={<Link href="/tuitions" />}
              className="h-auto w-full gap-2 rounded-lg bg-secondary px-6 py-3 text-sm font-semibold text-on-secondary shadow-sm hover:bg-secondary/90 sm:w-auto">
              Find Tuitions Now
            </Button>
            <Button
              render={<Link href="/sign-up" />}
              className="h-auto w-full rounded-lg border-0 bg-white px-6 py-3 text-sm font-semibold text-[#142b46] shadow-sm hover:bg-white/90 sm:w-auto">
              Register as Tutor
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
