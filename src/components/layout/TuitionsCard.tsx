import Image from "next/image";
import Link from "next/link";
import { MapPin, Video } from "lucide-react";
import { cn } from "cn";
import { Button } from "@/components/ui/button";

export interface ITuition  {
  _id?: string;
  title: string;
  subject: string;
  classLevel: string;
  mode: "Online" | "Offline";
  location?: string;
  monthlyFee: number;
  tutorName: string;
  bannerImage: string;
};

interface ITuitionsCardProps {
  tuition: ITuition;
  onlineIndicator?: "camera" | "dot";
};

export default function TuitionsCard({ tuition, onlineIndicator = "camera" }: ITuitionsCardProps) {
  const detailsHref = tuition._id ? `/tuitions/${tuition._id}` : "#";
  const inPerson = tuition.mode === "Offline";

  return (
    <article className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-surface-container bg-surface-container-lowest shadow-sm transition-all hover:border-secondary/40 hover:shadow-md">
      <div>
        <div className="relative h-48 overflow-hidden bg-surface-container-low">
          <Image
            src={tuition.bannerImage}
            alt={`Instructor ${tuition.tutorName} teaching ${tuition.subject}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-200 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="rounded-full bg-surface-container-lowest px-2.5 py-1 text-[11px] leading-[14px] font-semibold text-primary-container">
              {tuition.subject}
            </span>
            <span className="rounded-full bg-surface-container-lowest px-2.5 py-1 text-[11px] leading-[14px] font-semibold text-primary-container">
              {tuition.classLevel}
            </span>
          </div>
        </div>

        <div className="p-5">
          <div className={cn(
              "mb-2 flex items-center gap-1.5 text-[11px] leading-[14px] font-medium",
              inPerson ? "text-primary-container" : "text-secondary"
            )}>
            {inPerson ? (
              <MapPin className="size-4 text-secondary" />
            ) : onlineIndicator === "dot" ? (
              <span className="size-2 shrink-0 rounded-full bg-secondary" />
            ) : (
              <Video className="size-4" />
            )}
            <span>
              {inPerson
                ? `In-Person • ${tuition.location}`
                : "Online Live Batch"}
            </span>
          </div>

          <h3 className="font-display mb-2 line-clamp-2 text-lg leading-snug font-bold text-primary-container">
            {tuition.title}
          </h3>

          <p className="mb-4 flex items-center gap-2 text-[11px] leading-[14px] font-medium text-on-surface-variant">
            <span>
              Instructor:{" "}
              <span className="font-semibold text-primary-container">
                {tuition.tutorName}
              </span>
            </span>
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-surface-container px-5 pt-3 pb-5">
        <div>
          <span className="block text-[11px] leading-[14px] tracking-wider text-on-surface-variant uppercase">
            Monthly Fee
          </span>
          <span className="font-display text-lg leading-7 font-extrabold text-primary-container">
            ৳{tuition.monthlyFee.toLocaleString("en-US")}
            <span className="text-[11px] leading-[14px] font-normal text-on-surface-variant">
              /month
            </span>
          </span>
        </div>

        <Button
          render={<Link href={detailsHref} />}
          className="h-auto rounded-lg bg-secondary px-4 py-2 text-[11px] leading-[14px] font-semibold text-on-secondary shadow-sm hover:bg-[#156057]">
          View Details
        </Button>
      </div>
    </article>
  );
}
