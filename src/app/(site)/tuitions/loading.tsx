/**
 * Segment-level loading state for /tuitions and /tuitions/[id].
 *
 * With Cache Components (Next 16) the uncached mentorlagbe-server fetch can't
 * be prerendered — this file wraps the segment's pages in <Suspense> so the
 * static shell ships instantly and listings stream in per request.
 * Fallback must stay deterministic (no Date.now/Math.random).
 */
export default function TuitionsLoading() {
  return (
    <div className="flex flex-col" aria-busy="true" aria-label="Loading tuitions">
      {/* Header band skeleton */}
      <section className="w-full bg-surface-container-low py-space-lg shadow-[0_1px_8px_rgba(20,43,70,0.03)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-space-md px-6 lg:px-12">
          <div className="flex flex-col gap-space-sm md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-2">
              <div className="h-3 w-48 animate-pulse rounded bg-surface-container" />
              <div className="h-8 w-72 animate-pulse rounded bg-surface-container" />
              <div className="h-4 w-96 max-w-full animate-pulse rounded bg-surface-container" />
            </div>
            <div className="h-10 w-44 animate-pulse rounded-lg bg-surface-container" />
          </div>

          {/* Filter bar skeleton */}
          <div className="flex flex-col gap-space-sm rounded-xl bg-surface-container-lowest p-space-md shadow-sm">
            <div className="grid grid-cols-1 items-center gap-space-sm sm:grid-cols-2 lg:grid-cols-12">
              <div className="h-11 animate-pulse rounded-lg bg-surface-container-low lg:col-span-4" />
              <div className="h-11 animate-pulse rounded-lg bg-surface-container-low lg:col-span-2" />
              <div className="h-11 animate-pulse rounded-lg bg-surface-container-low lg:col-span-2" />
              <div className="h-11 animate-pulse rounded-lg bg-surface-container-low lg:col-span-2" />
              <div className="h-11 animate-pulse rounded-lg bg-surface-container-low lg:col-span-2" />
            </div>
          </div>
        </div>
      </section>

      {/* Results grid skeleton */}
      <section className="mx-auto w-full max-w-7xl px-6 py-space-lg lg:px-12">
        <div className="grid grid-cols-1 gap-space-lg md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-surface-container bg-surface-container-lowest shadow-sm"
            >
              <div className="h-48 animate-pulse bg-surface-container-low" />
              <div className="flex flex-col gap-2 p-space-md">
                <div className="h-4 w-24 animate-pulse rounded bg-surface-container" />
                <div className="h-5 w-5/6 animate-pulse rounded bg-surface-container" />
                <div className="h-4 w-3/4 animate-pulse rounded bg-surface-container" />
                <div className="h-8 w-full animate-pulse rounded bg-surface-container-low" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
