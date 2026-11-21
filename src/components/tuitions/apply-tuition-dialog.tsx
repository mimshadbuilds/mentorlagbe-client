"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Send } from "lucide-react";
import { toast } from "sonner";
import { useSession } from "@/lib/auth-client";
import type { UserRole } from "@/components/layout/AuthUser";
import type { ITuition } from "@/lib/actions/tuition-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const scheduleOptions = [
  { value: "flexible", label: "Flexible / Discuss with Tutor" },
  { value: "weekdays", label: "Weekday Evenings" },
  { value: "weekends", label: "Weekend Mornings" },
];

const applyButtonClasses =
  "h-auto w-full rounded-xl px-4 py-3 font-semibold shadow-sm hover:bg-[#156057]";

export default function ApplyTuitionDialog({ tuition }: { tuition: ITuition }) {
  const { data: session } = useSession();
  const user = session?.user ?? null;
  const role = user ? (user.role as UserRole) : null;

  const [open, setOpen] = useState(false);
  const [applied, setApplied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [phone, setPhone] = useState("");
  const [schedule, setSchedule] = useState("flexible");
  const [notes, setNotes] = useState("");


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (applied) return;

    setSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 600));

    setSubmitting(false);
    setApplied(true);
    setOpen(false);
    
    toast.success("Application submitted!", {
      description: "The tutor will review it shortly.",
    });
  };

  if (applied) {
    return (
      <>
        <button
          type="button"
          disabled
          className="w-full cursor-not-allowed rounded-xl bg-surface-container px-4 py-3 text-center text-sm font-semibold text-on-surface-variant shadow-sm">
          Application Submitted
        </button>
        <p className="-mt-3 text-center text-xs text-on-surface-variant">
          Your application is pending tutor review.
        </p>
      </>
    );
  }

  if (role === "tutor" || role === "admin") {
    return (
      <>
        <button
          type="button"
          disabled
          className="w-full cursor-not-allowed rounded-xl bg-surface-container px-4 py-3 text-center text-sm font-semibold text-on-surface-variant shadow-sm opacity-70">
          Apply Now
        </button>
        <p className="-mt-3 text-center text-xs text-on-surface-variant">
          Only students can apply for tuitions.
        </p>
      </>
    );
  }

  if (role !== "student") {
    return (
      <>
        <Button
          render={<Link href="/sign-in" />}
          variant="secondary"
          className={applyButtonClasses}>
          Apply Now
        </Button>
        <p className="-mt-3 text-center text-xs text-on-surface-variant">
          Sign in with a student account to apply.
        </p>
      </>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="secondary" className={applyButtonClasses} /> }>
        Apply Now
      </DialogTrigger>

      <DialogContent className="gap-5 rounded-2xl border border-surface-container bg-surface-container-lowest p-6 sm:max-w-lg sm:p-7">
        <DialogHeader className="gap-1 pr-6">
          <DialogTitle className="text-xl leading-snug font-bold text-primary-container">
            Apply for Tuition
          </DialogTitle>
          <DialogDescription className="text-xs text-on-surface-variant">
            Send your application details directly to {tuition.tutorName}.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="apply-tuition" className="text-xs text-on-surface">
              Tuition
            </Label>
            <Input
              id="apply-tuition"
              type="text"
              readOnly
              value={`${tuition.title} (${tuition.subject} — ${tuition.classLevel})`}
              className="h-auto cursor-default rounded-lg border-surface-container bg-surface-container-low px-3.5 py-2.5 text-xs text-on-surface-variant md:text-xs"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="apply-phone" className="text-xs text-on-surface">
              <span>
                Contact Phone Number <span className="text-destructive">*</span>
              </span>
            </Label>
            <Input
              id="apply-phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+880-17XX-XXXXXX"
              className="h-auto rounded-lg border-surface-container bg-surface-container-lowest px-3.5 py-2.5 text-xs text-on-surface md:text-xs"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="apply-schedule" className="text-xs text-on-surface">
              Preferred Schedule
            </Label>
            <div className="relative">
              <select
                id="apply-schedule"
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)}
                className="w-full cursor-pointer appearance-none rounded-lg border border-surface-container bg-surface-container-lowest px-3.5 py-2.5 pr-8 text-xs text-on-surface transition-all focus:border-ring focus:ring-3 focus:ring-ring/50 focus:outline-none">
                {scheduleOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 right-2.5 size-[18px] -translate-y-1/2 text-on-surface-variant"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="apply-notes" className="text-xs text-on-surface">
              Notes for the Mentor (Optional)
            </Label>
            <Textarea
              id="apply-notes"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Share your current syllabus, target exam, specific chapters needing assistance..."
              className="resize-none rounded-lg border-surface-container bg-surface-container-lowest px-3.5 py-2.5 text-xs text-on-surface md:text-xs"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3">
            <DialogClose
              render={
                <Button
                  type="button"
                  variant="outline"
                  className="px-4 text-xs font-semibold"
                />
              }>
              Cancel
            </DialogClose>
            <Button
              type="submit"
              variant="secondary"
              disabled={submitting}
              className="px-4 text-xs font-semibold shadow-sm hover:bg-[#156057]">
              <Send className="size-[15px]" aria-hidden="true" />
              {submitting ? "Submitting..." : "Confirm Application"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
