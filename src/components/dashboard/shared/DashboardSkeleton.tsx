import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardSkeleton() {
  return (
    <div className="flex min-h-svh flex-col gap-6 px-space-md py-space-md sm:px-space-lg lg:px-space-xl lg:py-space-xl">
      <div className="flex flex-col gap-2 pt-4">
        <Skeleton className="h-8 w-64 max-w-full" />
        <Skeleton className="h-4 w-96 max-w-full" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-32 rounded-2xl" />
        ))}
      </div>
      <Skeleton className="min-h-64 flex-1 rounded-2xl" />
    </div>
  );
}
