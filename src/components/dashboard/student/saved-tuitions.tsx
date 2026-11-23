"use client";

import Link from "next/link";
import { ArrowRight, Bookmark, Sparkles, Trash } from "lucide-react";
import { toast } from "sonner";
import TuitionsCard from "@/components/layout/TuitionsCard";
import { Button, buttonVariants } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client";
import { useProStatus } from "@/hooks/use-pro-status";
import { useSavedTuitions } from "@/hooks/use-saved-tuitions";
import {
  FREE_BOOKMARK_LIMIT,
  removeSavedTuition,
} from "@/lib/data/saved-tuitions";

export default function SavedTuitions() {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const isPro = useProStatus(userId);
  const saved = useSavedTuitions(userId);
  const atLimit = !isPro && saved.length >= FREE_BOOKMARK_LIMIT;

  const handleRemove = (title: string, tuitionId: string) => {
    if (!userId) return;
    removeSavedTuition(userId, tuitionId);
    toast.success("Removed from saved tuitions", {
      description: `"${title}" was removed from your list.`,
    });
  };

  return (
    <div className="flex flex-col gap-space-lg">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-manrope text-2xl font-bold tracking-tight text-primary sm:text-3xl">
            Saved Tuitions
          </h1>
          <p className="mt-1 text-sm text-on-surface-variant">
            Keep the tuitions you want to revisit in one place.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full bg-secondary-container px-2.5 py-1 font-semibold text-on-secondary-container">
            {saved.length} saved
          </span>
          <span className="rounded-full bg-surface-container px-2.5 py-1 font-medium text-on-surface-variant">
            {isPro ? "Unlimited with Pro" : `${saved.length} / ${FREE_BOOKMARK_LIMIT} free slots`}
          </span>
          <Link
            href="/tuitions"
            className={buttonVariants({
              variant: "secondary",
              className: "gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold",
            })}
          >
            Browse Tuitions
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-secondary-container bg-secondary-container/40 p-space-md">
        <div className="flex items-start gap-2">
          {isPro ? (
            <Sparkles className="mt-0.5 size-4 shrink-0 text-secondary" aria-hidden="true" />
          ) : (
            <Bookmark className="mt-0.5 size-4 shrink-0 text-secondary" aria-hidden="true" />
          )}
          <p className="text-xs leading-relaxed text-on-surface">
            <span className="font-semibold">{isPro ? "Pro Plan:" : "Free Plan:"}</span>{" "}
            {isPro
              ? "Unlimited bookmarks are active on your account."
              : `You can save up to ${FREE_BOOKMARK_LIMIT} tuitions. Upgrade to Pro for unlimited bookmarks.`}
          </p>
        </div>
        {!isPro && (
          <Link
            href="/pricing"
            className="inline-flex items-center gap-1 rounded-lg bg-secondary px-3 py-1.5 text-xs font-semibold text-on-secondary transition-colors hover:bg-[#156057]"
          >
            {atLimit ? "Upgrade to save more" : "View Pro plans"}
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        )}
      </div>

      {saved.length === 0 ? (
        <div className="flex min-h-[280px] flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-outline-variant bg-surface-container-lowest p-10 text-center">
          <Bookmark className="size-8 text-outline" aria-hidden="true" />
          <p className="text-sm font-semibold text-primary">No saved tuitions yet</p>
          <p className="max-w-sm text-xs text-on-surface-variant">
            Open a tuition details page and tap the bookmark icon to save it here.
          </p>
          <Link
            href="/tuitions"
            className={buttonVariants({
              variant: "secondary",
              className: "gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold",
            })}
          >
            Browse Tuitions
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {saved.map((tuition) => (
            <div key={tuition._id} className="flex flex-col gap-2">
              <TuitionsCard tuition={tuition} onlineIndicator="dot" />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleRemove(tuition.title, tuition._id)}
                className="w-full gap-1.5 text-xs font-semibold"
              >
                <Trash className="size-3.5" aria-hidden="true" />
                Remove from saved
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
