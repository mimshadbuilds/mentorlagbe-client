"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  Check,
  Image as ImageIcon,
  MapPin,
  Send,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createTuition } from "@/lib/actions/tution";
import TuitionBannerUpload from "@/components/dashboard/tutor/tuition-banner-upload";
import {
  SUBJECT_OPTIONS,
  CLASS_LEVEL_OPTIONS,
  DAYS_OPTIONS,
} from "@/lib/constants/tuition-options";


const presets = [
  "/tuitions/tuition-7.jpg",
  "/tuitions/tuition-10.jpg",
  "/tuitions/tuition-16.jpg",
  "/tuitions/tuition-8.jpg",
];

const fieldClass =
  "h-10 rounded-lg border-surface-container bg-surface-container-low px-3 text-sm md:text-sm";

export default function PostTuitionForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("Physics");
  const [classLevel, setClassLevel] = useState("HSC 11-12");
  const [mode, setMode] = useState<"in-person" | "online">("in-person");
  const [location, setLocation] = useState("");
  const [days, setDays] = useState("3 days / week");
  const [fee, setFee] = useState("");
  const [description, setDescription] = useState("");
  const [banner, setBanner] = useState(presets[0]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (title.trim().length < 10) {
      toast.error("Title must be at least 10 characters.");
      return;
    }

    if (mode === "in-person" && !location.trim()) {
      toast.error("Location is required for an in-person tuition.");
      return;
    }

    const monthlyFee = Number(fee);
    const daysPerWeek = Number.parseInt(days, 10);

    if (!Number.isFinite(monthlyFee) || monthlyFee <= 0) {
      toast.error("Enter a valid monthly fee.");
      return;
    }

    if (!Number.isInteger(daysPerWeek) || daysPerWeek < 1 || daysPerWeek > 7) {
      toast.error("Select a valid number of days per week.");
      return;
    }

    if (description.trim().length < 20) {
      toast.error("Description must be at least 20 characters.");
      return;
    }

    try {
      setIsSubmitting(true);

      const payload = {
        title: title.trim(),
        subject,
        classLevel,
        mode: mode === "online" ? ("Online" as const) : ("Offline" as const),
        location: mode === "online" ? "" : location.trim(),
        monthlyFee,
        daysPerWeek,
        bannerImage: banner,
        description: description.trim(),
      };

      await createTuition(payload);

      toast.success("Tuition submitted for approval", {
        description: "An admin will review your listing shortly.",
      });

      router.push("/dashboard/tutor/my-tuitions");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong while submitting your tuition."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-space-lg">
      <div className="flex flex-col gap-3">
        <div>
          <div className="mb-space-xs flex items-center gap-space-sm text-xs">
            <span className="tracking-wider text-outline uppercase">
              Tuition Composer
            </span>
            <span
              className="size-1 rounded-full bg-outline-variant"
              aria-hidden="true"
            />
            <span className="rounded-full bg-secondary-container px-2.5 py-0.5 font-semibold text-on-secondary-container">
              NEW LISTING
            </span>
          </div>

          <h1 className="font-manrope text-2xl font-bold tracking-tight text-primary sm:text-3xl">
            Create New Tuition
          </h1>

          <p className="mt-1 text-sm text-on-surface-variant">
            Describe your batch, set the schedule, and publish for admin review.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-space-lg lg:grid-cols-12">
        <form onSubmit={handleSubmit} className="flex flex-col gap-space-lg lg:col-span-8">
          <div className="flex flex-col gap-4 rounded-xl bg-surface-container-lowest p-space-lg shadow-sm">
            <h2 className="text-sm font-bold text-primary">
              1. Core Subject &amp; Title
            </h2>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="tuitionTitle" className="text-xs">
                Tuition Circular Title <span className="text-destructive">*</span>
              </Label>

              <Input
                id="tuitionTitle"
                required
                minLength={10}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. HSC Physics 1st & 2nd Paper Concept & Mathematical Drill"
                className={fieldClass}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="subjectSelect" className="text-xs">
                  Academic Subject <span className="text-destructive">*</span>
                </Label>

                <select
                  id="subjectSelect"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className={fieldClass}>
                {SUBJECT_OPTIONS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="levelSelect" className="text-xs">
                  Class / Academic Level <span className="text-destructive">*</span>
                </Label>

                <select
                  id="levelSelect"
                  required
                  value={classLevel}
                  onChange={(e) => setClassLevel(e.target.value)}
                  className={fieldClass}>
                  {CLASS_LEVEL_OPTIONS.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-xl bg-surface-container-lowest p-space-lg shadow-sm">
            <h2 className="text-sm font-bold text-primary">
              2. Mode &amp; Logistics
            </h2>

            <fieldset>
              <legend className="mb-2 text-xs font-medium">
                Tuition Delivery Mode <span className="text-destructive">*</span>
              </legend>

              <div className="grid gap-3 sm:grid-cols-2">
                {(["in-person", "online"] as const).map((option) => (
                  <label
                    key={option}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-all",
                      mode === option
                        ? "border-secondary bg-secondary-container text-on-secondary-container"
                        : "border-surface-container bg-surface-container-lowest hover:border-secondary"
                    )}
                  >
                    <input
                      type="radio"
                      name="mode"
                      value={option}
                      checked={mode === option}
                      onChange={() => setMode(option)}
                      className="sr-only"
                    />

                    {option === "in-person" ? (
                      <MapPin className="size-5 shrink-0" aria-hidden="true" />
                    ) : (
                      <Users className="size-5 shrink-0" aria-hidden="true" />
                    )}

                    <span className="flex flex-col">
                      <span className="text-xs font-semibold">
                        {option === "in-person"
                          ? "In-Person Tuition"
                          : "Online Live Batch"}
                      </span>

                      <span className="text-[11px] opacity-80">
                        {option === "in-person"
                          ? "Home visit or tutor center batch"
                          : "Zoom / Meet interactive digital class"}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="locationInput" className="text-xs">
                  Location / Hub{" "}
                  {mode === "in-person" && (
                    <span className="text-destructive">*</span>
                  )}
                </Label>

                <Input
                  id="locationInput"
                  required={mode === "in-person"}
                  disabled={mode === "online"}
                  value={mode === "online" ? "Online" : location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Dhanmondi, Dhaka"
                  className={fieldClass}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="daysSelect" className="text-xs">
                  Days per Week <span className="text-destructive">*</span>
                </Label>

                <select
                  id="daysSelect"
                  required
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                  className={fieldClass}>
                  {DAYS_OPTIONS.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="feeInput" className="text-xs">
                  Monthly Honorarium (৳) <span className="text-destructive">*</span>
                </Label>

                <Input
                  id="feeInput"
                  type="number"
                  min={1}
                  required
                  value={fee}
                  onChange={(e) => setFee(e.target.value)}
                  placeholder="4500"
                  className={fieldClass}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-xl bg-surface-container-lowest p-space-lg shadow-sm">
            <h2 className="text-sm font-bold text-primary">
              3. Detailed Description &amp; Requirements
            </h2>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="descriptionInput" className="text-xs">
                Detailed Circular Description{" "}
                <span className="text-destructive">*</span>
              </Label>

              <Textarea
                id="descriptionInput"
                required
                minLength={20}
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Specify course structure, prerequisites, batch strength, weekly problem-solving routines..."
                className="resize-none rounded-lg border-surface-container bg-surface-container-low px-3 py-2.5 text-sm md:text-sm"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold text-outline uppercase">
              Choose a banner
            </span>

            <div className="flex flex-wrap gap-3">
              {presets.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setBanner(preset)}
                  aria-label={`Use preset ${preset}`}
                  aria-pressed={banner === preset}
                  className={cn(
                    "size-20 overflow-hidden rounded-lg border-2 transition-all",
                    banner === preset
                      ? "border-secondary"
                      : "border-transparent hover:border-outline-variant"
                  )}>
                  <span
                    className="block size-full bg-cover bg-center"
                    style={{ backgroundImage: `url('${preset}')` }}
                  />
                </button>
              ))}
            </div>

            <TuitionBannerUpload
              onBannerChange={setBanner}
              disabled={isSubmitting}
            />
          </div>

          <div className="flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/dashboard/tutor/my-tuitions")}
              disabled={isSubmitting}>
              Cancel
            </Button>

            <Button
              type="submit"
              variant="secondary"
              disabled={isSubmitting}>
              <Send className="size-4" aria-hidden="true" />
              {isSubmitting ? "Submitting..." : "Publish for Review"}
            </Button>
          </div>
        </form>

        <aside className="lg:col-span-4">
          <div className="flex flex-col gap-3 rounded-xl bg-surface-container-lowest p-space-lg shadow-sm lg:sticky lg:top-24">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-primary">
                Live Card Preview
              </h2>

              <span className="text-[11px] text-outline">
                Marketplace view
              </span>
            </div>

            <div
              className="h-36 w-full rounded-lg bg-cover bg-center"
              style={{ backgroundImage: `url('${banner}')` }}
              aria-label="Banner preview"
            />

            <div className="flex flex-wrap items-center gap-1.5">
              <span className="rounded-md bg-secondary-container px-2 py-0.5 text-xs font-semibold text-on-secondary-container">
                {subject}
              </span>

              <span className="rounded-md bg-surface-container px-2 py-0.5 text-xs text-on-surface">
                {classLevel}
              </span>
            </div>

            <h3 className="text-sm font-bold leading-snug text-primary">
              {title.trim() ||
                "HSC Physics 1st & 2nd Paper Concept & Mathematical Drill"}
            </h3>

            <p className="line-clamp-3 text-xs leading-relaxed text-on-surface-variant">
              {description.trim() ||
                "Your detailed description will appear here as you type."}
            </p>

            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-on-surface-variant">
              <span className="inline-flex items-center gap-1">
                <MapPin className="size-3.5" aria-hidden="true" />
                {mode === "online" ? "Online" : location || "Set a location"}
              </span>

              <span className="inline-flex items-center gap-1">
                <CalendarDays className="size-3.5" aria-hidden="true" />
                {days}
              </span>
            </div>

            <div className="flex items-baseline justify-between border-t border-surface-container pt-3">
              <span className="text-lg font-bold text-primary">
                ৳{Number(fee || 0).toLocaleString("en-US")}
                <span className="text-xs font-normal text-outline">
                  {" "}/ month
                </span>
              </span>

              <span className="inline-flex items-center gap-1 text-[11px] text-secondary">
                <Check className="size-3.5" aria-hidden="true" />
                Pending approval
              </span>
            </div>

            <p className="flex items-start gap-1.5 text-[11px] leading-relaxed text-outline">
              <ImageIcon
                className="mt-0.5 size-3.5 shrink-0"
                aria-hidden="true"
              />
              New posts are reviewed by an admin before appearing on Browse
              Tuitions.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
