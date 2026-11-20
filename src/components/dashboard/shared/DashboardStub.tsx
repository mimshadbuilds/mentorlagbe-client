import { Construction } from "lucide-react";

export default function DashboardStub({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="font-manrope text-2xl font-bold tracking-tight text-primary-container sm:text-3xl">
          {title}
        </h1>
        <p className="mt-1 text-sm text-on-surface-variant">{description}</p>
      </div>
      <div className="flex min-h-[320px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-outline-variant bg-surface-container-lowest p-8 text-center">
        <Construction className="size-8 text-outline" aria-hidden="true" />
        <p className="text-sm font-medium text-on-surface">Coming in the next phase</p>
        <p className="max-w-md text-xs text-on-surface-variant">{description}</p>
      </div>
    </div>
  );
}
