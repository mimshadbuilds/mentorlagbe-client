import type { LucideIcon } from "lucide-react";
import { cn } from "cn";

export interface StatCardPill {
  icon?: LucideIcon;
  text: string;
  className?: string;
}

/**
 * Reusable dashboard stat card (docx lines 99/102/107) — cloned from the
 * student overview design's 4-column bento. The plan card overrides the
 * default middle section via `children`.
 */
export default function StatCard({
  label,
  value,
  footnote,
  footnoteClassName,
  pill,
  icon: Icon,
  iconChipClassName,
  valueClassName,
  progress,
  progressClassName,
  className,
  children,
}: {
  label: string;
  value?: string;
  footnote?: string;
  footnoteClassName?: string;
  pill?: StatCardPill;
  icon?: LucideIcon;
  iconChipClassName?: string;
  valueClassName?: string;
  /** 0–100 bar width, omit for no progress bar. */
  progress?: number;
  progressClassName?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative flex flex-col justify-between overflow-hidden rounded-xl bg-surface-container-lowest p-space-lg shadow-sm transition-shadow hover:shadow-md",
        className
      )}
    >
      {/* Label + badge / icon chip */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold tracking-wider text-outline uppercase">
          {label}
        </span>
        {pill ? (
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold",
              pill.className
            )}
          >
            {pill.icon && <pill.icon className="size-3.5" aria-hidden="true" />}
            {pill.text}
          </span>
        ) : (
          Icon && (
            <span
              className={cn(
                "flex size-8 shrink-0 items-center justify-center rounded-lg",
                iconChipClassName
              )}
            >
              <Icon className="size-5" aria-hidden="true" />
            </span>
          )
        )}
      </div>

      {children ?? (
        <>
          {/* Value + footnote */}
          <div className="mt-4 flex items-baseline justify-between gap-2">
            <span
              className={cn(
                "text-3xl font-bold tracking-tight text-primary",
                valueClassName
              )}
            >
              {value}
            </span>
            {footnote && (
              <span className={cn("text-xs", footnoteClassName)}>{footnote}</span>
            )}
          </div>
          {/* Progress bar */}
          {progress !== undefined && (
            <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-surface-container">
              <div
                className={cn("h-full rounded-full bg-primary", progressClassName)}
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
