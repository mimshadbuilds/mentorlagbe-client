import { Suspense } from "react";
import type { Metadata } from "next";
import ModerationList from "@/components/dashboard/admin/moderation-list";
import { Skeleton } from "@/components/ui/skeleton";
import { getAdminTuitions } from "@/lib/actions/admin-query";

export const metadata: Metadata = {
  title: "Tuition Moderation | MentorLagbe",
  description:
    "Review and moderate tuition listings submitted to the MentorLagbe marketplace.",
};

export default function AdminTuitionsPage() {
  return (
    <Suspense fallback={<ModerationLoading />}>
      <AdminTuitionsContent />
    </Suspense>
  );
}

async function AdminTuitionsContent() {
  const tuitions = await getAdminTuitions();
  return <ModerationList tuitions={tuitions} />;
}

function ModerationLoading() {
  return (
    <div className="flex flex-col gap-space-lg">
      <div className="space-y-2">
        <Skeleton className="h-8 w-64 max-w-full" />
        <Skeleton className="h-4 w-96 max-w-full" />
      </div>
      <Skeleton className="min-h-96 rounded-2xl" />
    </div>
  );
}
