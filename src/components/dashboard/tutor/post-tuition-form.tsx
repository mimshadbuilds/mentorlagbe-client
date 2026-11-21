"use client";

import { useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  Check,
  Image as ImageIcon,
  Info,
  MapPin,
  Send,
  Upload,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DEMO_TUTOR, FREE_POST_LIMIT, getOwnedTuitions } from "@/lib/data/tutor";
import { addTutorTuition, tutorStore } from "@/lib/data/tutor-store";
import type { TuitionRecord } from "@/lib/data/tuitions";

const subjects = [
  "Physics",
  "Higher Math",
  "Chemistry",
  "Biology",
  "English",
  "ICT",
  "General Science",
];
const levels = [
  "HSC 11-12",
  "SSC 9-10",
  "O-Level",
  "A-Level",
  "Admission Prep",
];
const daysOptions = ["2 days / week", "3 days / week", "4 days / week", "5 days / week"];
const presets = [
  "/tuitions/tuition-7.jpg",
  "/tuitions/tuition-10.jpg",
  "/tuitions/tuition-16.jpg",
];

const fieldClass =
  "h-10 rounded-lg border-surface-container bg-surface-container-low px-3 text-sm md:text-sm";

export default function PostTuitionForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("Physics");
  const [classLevel, setClassLevel] = useState("HSC 11-12");
  const [mode, setMode] = useState<"in-person" | "online">("in-person");
  const [location, setLocation] = useState("");
  const [days, setDays] = useState("3 days / week");
  const [fee, setFee] = useState("");
  const [description, setDescription] = useState("");
  const [banner, setBanner] = useState(presets[0]);
  const [fileName, setFileName] = useState("");
  const ownedCount = useSyncExternalStore(
    tutorStore.subscribe,
    () => tutorStore.getSnapshot().length,
    () => getOwnedTuitions().length
  );
  const quotaReached = ownedCount >= FREE_POST_LIMIT;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (quotaReached) {
      toast.error("Free plan limit reached", {
        description: "Upgrade to Pro to publish more than 2 tuitions.",
      });
      return;
    }
    if (title.trim().length < 10) {
      toast.error("Title must be at least 10 characters.");
      return;
    }
    if (mode === "in-person" && !location.trim()) {
      toast.error("Location is required for an in-person tuition.");
      return;
    }
    const monthlyFee = Number(fee);
    if (!Number.isFinite(monthlyFee) || monthlyFee <= 0) {
      toast.error("Enter a valid monthly fee.");
      return;
    }
    if (description.trim().length < 20) {
      toast.error("Description must be at least 20 characters.");
      return;
    }

    const profile = getOwnedTuitions()[0];
    const tuition: TuitionRecord = {
      id: `local-${Date.now()}`,
      title: title.trim(),
      subject,
      classLevel,
      mode,
      location: mode === "in-person" ? location.trim() : undefined,
      monthlyFee,
      tutorName: DEMO_TUTOR.name,
      tutorAffiliation: profile.tutorAffiliation,
      verifiedSeal: profile.verifiedSeal,
      modeDetail: mode === "online" ? "Live Interactive Sessions" : undefined,
      image: banner,
      approvalStatus: "pending",
      isActive: true,
      postedAt: new Date().toISOString().slice(0, 10),
      description: description.trim(),
      daysPerWeek: days,
      tutorEmail: DEMO_TUTOR.email,
      tutorProfile: profile.tutorProfile,
    };

    // TODO(backend): POST mentorlagbe-server /tuitions with the ImgBB banner URL.
    addTutorTuition(tuition);
    toast.success("Tuition submitted for approval", {
      description: "An admin will review your listing shortly.",
    });
    router.push("/dashboard/tutor/my-tuitions");
  };

  return (
    <div className="flex flex-col gap-space-lg">
      <div className="flex flex-col gap-3">
        <div>
          <div className="mb-space-xs flex items-center gap-space-sm text-xs">
            <span className="tracking-wider text-outline uppercase">
              Tuition Composer
            </span>
            <span className="size-1 rounded-full bg-outline-variant" aria-hidden="true" />
            <span className="rounded-full bg-secondary-container px-2.5 py-0.5 font-semibold text-on-secondary-container">
              {ownedCount}/{FREE_POST_LIMIT} SLOTS USED
            </span>
          </div>
          <h1 className="font-manrope text-2xl font-bold tracking-tight text-primary sm:text-3xl">
            Create New Tuition Circular
          </h1>
          <p className="mt-1 text-sm text-on-surface-variant">
            Describe your batch, set the schedule, and publish for admin review.
          </p>
        </div>
        {quotaReached && (
          <div className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/5 p-space-md text-xs text-on-surface">
            <Info className="mt-0.5 size-4 shrink-0 text-destructive" aria-hidden="true" />
            <span>
              <span className="font-semibold">Free plan limit utilized.</span> You
              have published {ownedCount} tuitions.{" "}
              <button
                type="button"
                onClick={() =>
                  toast.info(" Stripe upgrade arrives in a later phase.", {
                    description: "Pro tutors can post unlimited tuitions.",
                  })
                }
                className="font-semibold text-secondary underline underline-offset-2"
              >
                Upgrade to Pro
              </button>{" "}
              to publish more.
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-space-lg lg:grid-cols-12">
        <form onSubmit={handleSubmit} className="flex flex-col gap-space-lg lg:col-span-8">
          <div className="flex flex-col gap-4 rounded-xl bg-surface-container-lowest p-space-lg shadow-sm">
            <h2 className="text-sm font-bold text-primary">1. Core Subject &amp; Title</h2>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="tuitionTitle" className="text-xs">
                Tuition Circular Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="tuitionTitle"
                required
                minLength={10}
                value={title}
                onChange={(event) => setTitle(event.target.value)}
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
                  onChange={(event) => setSubject(event.target.value)}
                  className={fieldClass}>
                  {subjects.map((item) => <option key={item}>{item}</option>)}
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
                  onChange={(event) => setClassLevel(event.target.value)}
                  className={fieldClass}>
                  {levels.map((item) => <option key={item}>{item}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-xl bg-surface-container-lowest p-space-lg shadow-sm">
            <h2 className="text-sm font-bold text-primary">2. Mode &amp; Logistics</h2>
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
                    )}>
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
                        {option === "in-person" ? "In-Person Tuition" : "Online Live Batch"}
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
                  Location / Hub <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="locationInput"
                  required={mode === "in-person"}
                  disabled={mode === "online"}
                  value={mode === "online" ? "Online" : location}
                  onChange={(event) => setLocation(event.target.value)}
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
                  onChange={(event) => setDays(event.target.value)}
                  className={fieldClass}>
                  {daysOptions.map((item) => <option key={item}>{item}</option>)}
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
                  onChange={(event) => setFee(event.target.value)}
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
                Detailed Circular Description <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="descriptionInput"
                required
                minLength={20}
                rows={5}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Specify course structure, prerequisites, batch strength, weekly problem-solving routines..."
                className="resize-none rounded-lg border-surface-container bg-surface-container-low px-3 py-2.5 text-sm md:text-sm"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-xl bg-surface-container-lowest p-space-lg shadow-sm">
            <h2 className="text-sm font-bold text-primary">4. Banner Image</h2>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <label className="flex min-h-24 cursor-pointer flex-1 flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-outline-variant bg-surface-container-low p-4 text-center transition-colors hover:border-secondary">
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) {
                      // TODO(backend): upload to ImgBB and store the returned URL.
                      setBanner(URL.createObjectURL(file));
                      setFileName(file.name);
                    }
                  }}
                />
                <Upload className="size-5 text-secondary" aria-hidden="true" />
                <span className="text-xs font-semibold text-on-surface">
                  {fileName || "Upload a banner image"}
                </span>
                <span className="text-[11px] text-outline">
                  PNG or JPG · uploaded to ImgBB on publish
                </span>
              </label>
              <div className="flex flex-col gap-1.5">
                <span className="text-[11px] font-semibold text-outline uppercase">
                  Or choose a preset
                </span>
                <div className="flex gap-2">
                  {presets.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => {
                        setBanner(preset);
                        setFileName("");
                      }}
                      aria-label={`Use preset ${preset}`}
                      className={cn(
                        "size-14 overflow-hidden rounded-lg border-2 transition-all",
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
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/dashboard/tutor/my-tuitions")}>
              Cancel
            </Button>
            <Button type="submit" variant="secondary" disabled={quotaReached}>
              <Send className="size-4" aria-hidden="true" />
              Publish for Review
            </Button>
          </div>
        </form>

        <aside className="lg:col-span-4">
          <div className="flex flex-col gap-3 rounded-xl bg-surface-container-lowest p-space-lg shadow-sm lg:sticky lg:top-24">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-primary">Live Card Preview</h2>
              <span className="text-[11px] text-outline">Marketplace view</span>
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
              {title.trim() || "HSC Physics 1st & 2nd Paper Concept & Mathematical Drill"}
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
                <span className="text-xs font-normal text-outline"> / month</span>
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] text-secondary">
                <Check className="size-3.5" aria-hidden="true" />
                Pending approval
              </span>
            </div>
            <p className="flex items-start gap-1.5 text-[11px] leading-relaxed text-outline">
              <ImageIcon className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
              New posts are reviewed by an admin before appearing on Browse
              Tuitions.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
