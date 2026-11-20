"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  Bookmark,
  Calendar,
  Check,
  ChevronLeft,
  Clock,
  Languages,
  MapPin,
  Share2,
  Star,
  User,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "cn";
import type { TuitionRecord } from "@/lib/data/tuitions";
import ApplyTuitionDialog from "./apply-tuition-dialog";

function DetailField({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-on-surface-variant">{label}</span>
      <span
        className={cn(
          "font-medium",
          accent ? "text-secondary" : "text-primary-container"
        )}>
        {value}
      </span>
    </div>
  );
}

export default function TuitionDetails({ tuition }: { tuition: TuitionRecord }) {
  const [saved, setSaved] = useState(false);

  const inPerson = tuition.mode === "in-person";
  const initial = tuition.tutorName.replace(/^(Dr\.|Engr\.|Md\.)\s*/, "").charAt(0);
  const postedOn = new Date(`${tuition.postedAt}T00:00:00`).toLocaleDateString(
    "en-US",
    { month: "short", day: "numeric", year: "numeric" }
  );

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    } catch {
      toast.error("Could not copy the link");
    }
  };

  const handleSave = () => {
    setSaved((prev) => {
      toast.success(prev ? "Removed from saved tuitions" : "Saved to your list");
      return !prev;
    });
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-space-lg lg:px-12">
      <div className="mb-6">
        <Link
          href="/tuitions"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-on-surface-variant transition-colors hover:text-secondary">
          <ChevronLeft className="size-4" aria-hidden="true" />
          <span>Back to All Tuitions</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        <div className="flex flex-col gap-6 lg:col-span-8">
          <div className="relative h-[360px] w-full overflow-hidden rounded-2xl bg-surface-container shadow-sm sm:h-[420px]">
            <Image
              src={tuition.image}
              alt={`${tuition.subject} tuition session`}
              fill
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/10" />
            <div className="absolute top-4 left-4 z-10">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium tracking-wide text-white shadow-sm">
                {inPerson ? (
                  <MapPin className="size-[15px] text-teal-400" aria-hidden="true" />
                ) : (
                  <Languages className="size-[15px] text-teal-400" aria-hidden="true" />
                )}
                {inPerson ? "In-Person Session" : "Online Session"}
              </span>
            </div>
            <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
              <button
                type="button"
                aria-label="Share"
                onClick={handleShare}
                className="flex size-9 cursor-pointer items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-sm transition-all hover:bg-white"
              >
                <Share2 className="size-[18px]" aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Save Bookmark"
                onClick={handleSave}
                className="flex size-9 cursor-pointer items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-sm transition-all hover:bg-white"
              >
                <Bookmark
                  className={cn("size-[18px]", saved && "fill-current")}
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-2xl border border-surface-container-high/60 bg-surface-container-lowest p-6 shadow-sm sm:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-secondary-container px-3 py-1 text-xs font-semibold tracking-wide text-secondary">
                {tuition.subject}
              </span>
              <span className="rounded-md bg-surface-container px-3 py-1 text-xs font-medium text-on-surface">
                {tuition.classLevel}
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-secondary-container px-3 py-1 text-xs font-semibold text-secondary">
                <BadgeCheck className="size-3.5" aria-hidden="true" />
                Verified Tuition
              </span>
            </div>

            <h1 className="text-2xl leading-snug font-bold tracking-tight text-primary-container sm:text-3xl">
              {tuition.title}
            </h1>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-sm text-on-surface-variant">
              <div className="inline-flex items-center gap-1.5">
                <User className="size-[17px] text-outline" aria-hidden="true" />
                <span>
                  Mentor:{" "}
                  <strong className="font-semibold text-on-surface">
                    {tuition.tutorName}
                  </strong>
                </span>
              </div>
              <div className="inline-flex items-center gap-1.5">
                <Calendar className="size-[17px] text-outline" aria-hidden="true" />
                <span>
                  Schedule:{" "}
                  <strong className="font-medium text-on-surface">
                    {tuition.daysPerWeek}
                  </strong>
                </span>
              </div>
              <div className="inline-flex items-center gap-1.5">
                <Clock className="size-[17px] text-outline" aria-hidden="true" />
                <span>Posted: {postedOn}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 rounded-2xl border border-surface-container-high/60 bg-surface-container-lowest p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-bold text-primary-container">
              About This Tuition
            </h2>
            <p className="text-sm leading-relaxed text-on-surface-variant">
              {tuition.description}
            </p>
          </div>

          <div className="flex flex-col gap-6 rounded-2xl border border-surface-container-high/60 bg-surface-container-lowest p-6 shadow-sm sm:p-8">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-bold text-primary-container">
                  Student Reviews &amp; Feedback
                </h2>
                <p className="mt-0.5 text-xs text-on-surface-variant">
                  Real experiences from accepted tuition attendees.
                </p>
              </div>
              <div className="flex items-center gap-2 text-right">
                <span className="text-2xl leading-none font-bold text-primary-container">
                  0.0
                </span>
                <div className="flex flex-col items-start">
                  <div className="flex text-sm text-outline-variant">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} className="size-4" aria-hidden="true" />
                    ))}
                  </div>
                  <span className="text-[11px] text-on-surface-variant">
                    0 reviews
                  </span>
                </div>
              </div>
            </div>
            <div className="border-t border-dashed border-surface-container py-6 text-center">
              <p className="text-xs text-on-surface-variant">
                No reviews yet. Accepted students will be able to share feedback
                after their classes.
              </p>
            </div>
          </div>
        </div>

        <div className="sticky top-24 flex flex-col gap-6 lg:col-span-4">
          <div className="flex flex-col gap-6 rounded-2xl border border-surface-container-high/60 bg-surface-container-lowest p-6 shadow-sm sm:p-7">
            <div className="flex flex-col gap-1 rounded-xl border border-surface-container bg-surface-container-low p-5">
              <span className="text-[11px] font-semibold tracking-wider text-on-surface-variant uppercase">
                Monthly Tuition Fee
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-extrabold text-primary-container">
                  ৳{tuition.monthlyFee.toLocaleString("en-US")}
                </span>
                <span className="text-sm font-normal text-on-surface-variant">
                  / month
                </span>
              </div>
            </div>

            <div className="flex flex-col divide-y divide-surface-container text-sm">
              <DetailField label="Subject" value={tuition.subject} />
              <DetailField label="Class Level" value={tuition.classLevel} />
              <DetailField
                label="Delivery Mode"
                value={inPerson ? "In-Person" : "Online"}
                accent
              />
              <DetailField
                label="Location"
                value={tuition.location ?? "Online"}
              />
              <DetailField label="Weekly Classes" value={tuition.daysPerWeek} />
              <div className="flex items-center justify-between py-3">
                <span className="text-on-surface-variant">Status</span>
                <span className="rounded-full bg-secondary-container px-2.5 py-0.5 text-xs font-semibold text-secondary">
                  Approved
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 pt-1">
              <span className="text-[11px] font-semibold tracking-wider text-on-surface-variant uppercase">
                Tuition Mentor
              </span>
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary font-bold text-base text-on-secondary shadow-sm">
                  {initial}
                </div>
                <div className="flex min-w-0 flex-col">
                  <span className="truncate text-sm font-bold text-primary-container">
                    {tuition.tutorName}
                  </span>
                  <span className="truncate text-xs text-on-surface-variant">
                    {tuition.tutorEmail}
                  </span>
                </div>
              </div>
            </div>

            <ApplyTuitionDialog tuition={tuition} />
          </div>

          <div className="flex flex-col gap-5 rounded-2xl border border-surface-container-high/60 bg-surface-container-lowest p-6 shadow-sm sm:p-7">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold tracking-wider text-on-surface-variant uppercase">
                About the Tutor
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-secondary-container px-2.5 py-0.5 text-xs font-semibold text-secondary">
                <BadgeCheck className="size-3.5" aria-hidden="true" />
                Verified Mentor
              </span>
            </div>
            <div className="flex items-start gap-3.5">
              <div className="relative shrink-0">
                <div className="flex size-14 items-center justify-center rounded-full bg-secondary font-bold text-xl text-on-secondary shadow-sm">
                  {initial}
                </div>
                <span className="absolute -right-1 -bottom-1 flex items-center justify-center rounded-full bg-secondary p-0.5 text-white ring-2 ring-white">
                  <Check className="size-3" aria-hidden="true" />
                </span>
              </div>
              <div className="flex min-w-0 flex-col">
                <h3 className="truncate text-base font-bold text-primary-container">
                  {tuition.tutorName}
                </h3>
                <p className="text-xs leading-snug font-medium text-on-surface">
                  {tuition.tutorProfile.title}
                </p>
                <p className="mt-0.5 truncate text-xs text-on-surface-variant">
                  {tuition.tutorProfile.institution}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 rounded-xl border border-surface-container bg-surface-container-low px-3 py-3 text-center">
              <div className="flex flex-col">
                <div className="flex items-center justify-center gap-0.5 text-xs font-bold text-primary-container">
                  <span>{tuition.tutorProfile.rating}</span>
                  <Star
                    className="size-[13px] fill-tertiary text-tertiary"
                    aria-hidden="true"
                  />
                </div>
                <span className="text-[11px] text-on-surface-variant">
                  {tuition.tutorProfile.reviewCount} Reviews
                </span>
              </div>
              <div className="flex flex-col border-x border-surface-container">
                <span className="text-xs font-bold text-primary-container">
                  {tuition.tutorProfile.experience}
                </span>
                <span className="text-[11px] text-on-surface-variant">
                  Experience
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-primary-container">
                  {tuition.tutorProfile.mentored}
                </span>
                <span className="text-[11px] text-on-surface-variant">
                  Mentored
                </span>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-on-surface-variant">
              {tuition.tutorProfile.bio}
            </p>
            <Link
              href="#"
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-surface-container px-4 py-2.5 text-xs font-semibold text-secondary transition-all hover:border-secondary hover:bg-secondary-container"
            >
              <span>View Full Profile</span>
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
