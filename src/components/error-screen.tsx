"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  CloudOff,
  Copy,
  House,
  Mail,
  Phone,
  RefreshCw,
  ServerCrash,
  ShieldCheck,
  Terminal,
} from "lucide-react";

interface ErrorScreenProps {
  error: unknown;
  onRetry: () => void;
}

function readError(error: unknown) {
  if (error instanceof Error) {
    return {
      message: error.message || "An unexpected error occurred.",
      digest: (error as Error & { digest?: string }).digest ?? "",
    };
  }
  return { message: String(error ?? "An unexpected error occurred."), digest: "" };
}

/**
 * Design clone: mentorlagbe_global_error_500. Shared fallback used by both
 * app/error.tsx (route errors) and app/global-error.tsx (root layout errors).
 */
export default function ErrorScreen({ error, onRetry }: ErrorScreenProps) {
  const { message, digest } = readError(error);
  // Client-only render — suppressHydrationWarning covers the SSR timestamp delta.
  const [timestamp] = useState(() => new Date().toISOString());
  const [copied, setCopied] = useState(false);

  const errorCode = digest ? `ML-ERR-${digest}` : "ML-ERR-UNEXPECTED_SERVER";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        JSON.stringify({ error_code: errorCode, message, timestamp }, null, 2)
      );
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard unavailable — ignore quietly.
    }
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
      {/* System status banner pill */}
      <div className="mb-space-lg inline-flex max-w-full items-center gap-space-xs rounded-full bg-surface-container-high/60 px-space-md py-1.5 shadow-sm">
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-tertiary-fixed-dim opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-tertiary" />
        </span>
        <span className="truncate text-xs font-medium text-on-surface-variant">
          Current Network Status:{" "}
          <span className="font-semibold text-on-tertiary-fixed-variant">
            Degraded performance in indexing service
          </span>
        </span>
      </div>

      {/* Main error card */}
      <div className="relative w-full max-w-xl overflow-hidden rounded-xl bg-surface-container-lowest p-space-lg shadow-xl sm:p-space-xl">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-secondary via-surface-variant to-secondary"
        />

        <div className="flex flex-col items-center text-center">
          {/* Status icon badge */}
          <div className="relative mb-space-lg">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive/15 shadow-sm">
                <ServerCrash className="size-7 text-destructive" aria-hidden="true" />
              </div>
            </div>
            <div className="absolute -right-1 -bottom-1 flex size-7 items-center justify-center rounded-full bg-surface-container-lowest shadow-md">
              <CloudOff className="size-4 text-secondary" aria-hidden="true" />
            </div>
          </div>

          <span className="mb-space-xs text-xs font-semibold tracking-wider text-on-surface-variant uppercase">
            500 • System Disruption Detected
          </span>
          <h1 className="mb-space-sm text-2xl font-bold tracking-tight text-primary sm:text-4xl">
            Unexpected Academic Server Error
          </h1>
          <p className="mx-auto mb-space-xl max-w-md text-sm text-on-surface-variant sm:text-base">
            We&apos;re experiencing a temporary disruption while loading academic
            records. Our engineering team has been automatically alerted and is
            diagnosing the issue.
          </p>

          {/* Actions */}
          <div className="mb-space-lg flex w-full flex-col items-center justify-center gap-space-sm sm:flex-row">
            <button
              type="button"
              onClick={onRetry}
              className="flex w-full items-center justify-center gap-space-xs rounded-lg bg-secondary px-space-lg py-2.5 text-sm font-semibold text-on-secondary shadow-sm transition-all hover:bg-[#156057] active:scale-[0.98] sm:w-auto">
              <RefreshCw className="size-[18px]" aria-hidden="true" />
              Reload Page
            </button>
            <Link
              href="/"
              className="flex w-full items-center justify-center gap-space-xs rounded-lg bg-surface-container-low px-space-lg py-2.5 text-sm font-semibold text-primary transition-all hover:bg-surface-container sm:w-auto">
              <House className="size-[18px]" aria-hidden="true" />
              Return to Homepage
            </Link>
          </div>

          {/* Technical diagnostics — native <details>, no JS toggle */}
          <details className="group mb-space-lg w-full rounded-lg bg-surface-container-low p-space-md text-left">
            <summary className="flex cursor-pointer list-none items-center justify-between text-xs font-semibold text-on-surface-variant transition-colors hover:text-on-surface [&::-webkit-details-marker]:hidden">
              <span className="flex items-center gap-space-xs">
                <Terminal className="size-[18px] text-outline" aria-hidden="true" />
                <span className="text-sm font-semibold text-primary">
                  Technical Diagnostic Information
                </span>
              </span>
              <ChevronDown
                className="size-[18px] transition-transform duration-200 group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <div className="mt-space-md flex flex-col gap-1.5 border-t border-surface-container pt-space-sm font-mono text-xs leading-5 text-on-surface-variant">
              <div className="flex flex-wrap items-center justify-between gap-space-xs">
                <span className="text-outline">Error Code:</span>
                <span className="rounded bg-destructive/10 px-1.5 py-0.5 font-semibold text-destructive">
                  {errorCode}
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-space-xs">
                <span className="shrink-0 text-outline">Message:</span>
                <span className="break-all text-right text-on-surface">{message}</span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-space-xs">
                <span className="text-outline">Timestamp:</span>
                <span className="text-on-surface" suppressHydrationWarning>
                  {timestamp}
                </span>
              </div>
              <div className="mt-space-md flex justify-end">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1 rounded bg-surface-container-lowest px-2.5 py-1 text-xs font-medium text-primary shadow-sm transition-colors hover:bg-surface-container">
                  <Copy className="size-3.5" aria-hidden="true" />
                  {copied ? "Payload Copied!" : "Copy Error Payload"}
                </button>
              </div>
            </div>
          </details>

          {/* Support block */}
          <div className="flex w-full flex-col items-center justify-between gap-space-sm border-t border-surface-container pt-space-md text-center sm:flex-row sm:text-left">
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-primary">
                Need urgent tuition or demo class assistance?
              </span>
              <span className="text-sm text-on-surface-variant">
                Our Academic Operations Concierge is on standby.
              </span>
            </div>
            <div className="flex shrink-0 items-center gap-space-md">
              <a
                href="tel:16443"
                className="inline-flex items-center gap-1 text-xs font-semibold text-secondary hover:underline">
                <Phone className="size-4" aria-hidden="true" />
                16443
              </a>
              <span className="text-outline-variant">•</span>
              <a
                href="mailto:support@mentorlagbe.com"
                className="inline-flex items-center gap-1 text-xs font-semibold text-secondary hover:underline">
                <Mail className="size-4" aria-hidden="true" />
                Email Desk
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Security footnote */}
      <div className="mt-space-lg flex items-center justify-center gap-space-sm text-center">
        <ShieldCheck className="size-4 shrink-0 text-secondary" aria-hidden="true" />
        <span className="text-sm text-on-surface-variant">
          Academic data integrity intact • Auto-synced backup secured
        </span>
      </div>
    </div>
  );
}
