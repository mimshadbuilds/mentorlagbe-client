import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  ChevronRight,
  Compass,
  CreditCard,
  Headset,
  House,
  LayoutDashboard,
  School,
  Search,
} from "lucide-react";

export const metadata: Metadata = {
    title: "Page Not Found | MentorLagbe",
    description: "The page you are looking for does not exist.",
};

const quickLinks = [
    {
        href: "/tuitions",
        icon: BadgeCheck,
        iconClassName: "text-secondary",
        title: "Browse Active Tuitions",
        description: "Explore verified educator circulars & verified postings",
    },
    {
        href: "/sign-in",
        icon: LayoutDashboard,
        iconClassName: "text-primary",
        title: "Tutor & Student Login",
        description: "Sign in directly to access your tuition dashboard",
    },
    {
        href: "/pricing",
        icon: CreditCard,
        iconClassName: "text-on-tertiary-fixed-variant",
        title: "Pricing & Subscriptions",
        description: "View Pro member benefits, matching guarantees & plans",
    },
];

/**
 * Design clone: mentorlagbe_404_not_found. Root not-found page — catches both
 * unmatched URLs and notFound() throws (e.g. unknown tuition id).
 */
export default function NotFound() {
    return (
        <div className="flex flex-1 flex-col items-center justify-center px-4 py-12 sm:py-16">
            <div className="relative w-full max-w-xl">
                {/* Decorative ambient glows */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-12 -left-12 h-48 w-48 rounded-full bg-secondary-container/40 blur-3xl"
                />
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-8 -bottom-8 h-56 w-56 rounded-full bg-primary-container/10 blur-3xl"
                />

                <div className="relative flex w-full flex-col items-center rounded-xl bg-surface-container-lowest p-space-lg text-center shadow-xl shadow-primary/5 sm:p-space-xl">
                    {/* Badge: layered halo + compass + "Not Found" pill */}
                    <div className="relative mb-space-md flex items-center justify-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-surface-container-low shadow-inner">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-container text-on-primary shadow-sm">
                                <Compass className="size-7" aria-hidden="true" />
                            </div>
                        </div>
                        <div className="absolute -right-2 -bottom-1 flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 shadow-sm">
                            <School className="size-[13px] text-on-secondary" aria-hidden="true" />
                            <span className="text-[10px] font-semibold tracking-wide text-on-secondary uppercase">
                                Not Found
                            </span>
                        </div>
                    </div>

                    {/* 404 typographic cue */}
                    <div className="mb-space-xs inline-flex items-center gap-2">
                        <span className="text-5xl leading-none font-bold tracking-tight text-primary sm:text-6xl">
                            404
                        </span>
                        <span className="text-2xl leading-none font-semibold text-secondary sm:text-3xl">
                            / Error
                        </span>
                    </div>

                    <h1 className="mb-space-xs text-2xl font-bold tracking-tight text-primary sm:text-3xl">
                        The tuition circular cannot be found
                    </h1>
                    <p className="mx-auto mb-space-lg max-w-md text-sm text-on-surface-variant sm:text-base">
                        The link you followed may have expired, been deactivated by the
                        tutor, or the URL address was typed incorrectly.
                    </p>

                    {/* Recovery search — plain GET so it works without client JS */}
                    <form action="/tuitions" method="get" className="mb-space-lg w-full">
                        <div className="flex flex-col gap-space-xs rounded-lg bg-surface-container-low p-1.5 shadow-sm sm:flex-row sm:items-stretch">
                            <div className="flex flex-1 items-center gap-2 px-3">
                                <Search className="size-5 shrink-0 text-outline" aria-hidden="true" />
                                <input
                                    type="text"
                                    name="q"
                                    aria-label="Search tuitions"
                                    placeholder="Search tuitions (e.g. Higher Math, Physics, O-Levels)..."
                                    className="w-full bg-transparent py-2 text-sm text-on-surface placeholder:text-outline focus:outline-none"
                                />
                            </div>
                            <button
                                type="submit"
                                className="flex items-center justify-center gap-1.5 rounded-lg bg-secondary px-space-md py-2.5 text-sm font-semibold text-on-secondary shadow-sm transition-all hover:bg-[#156057] active:scale-[0.98]">
                                <span>Search</span>
                                <ArrowRight className="size-4" aria-hidden="true" />
                            </button>
                        </div>
                    </form>

                    {/* Quick links matrix */}
                    <div className="mb-space-lg w-full text-left">
                        <div className="mb-space-sm flex items-center justify-between">
                            <span className="text-xs font-bold tracking-wider text-on-surface-variant uppercase">
                                Recommended Resources
                            </span>
                            <span className="text-xs font-medium text-secondary">
                                Quick Recovery
                            </span>
                        </div>
                        <div className="flex flex-col gap-2">
                            {quickLinks.map((link) => {
                                const Icon = link.icon;
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="group flex items-center justify-between rounded-lg bg-surface-container-low p-3 transition-all hover:bg-surface-container">
                                        <div className="flex items-center gap-3">
                                            <span
                                                className={`flex size-8 shrink-0 items-center justify-center rounded-full bg-surface-container-lowest shadow-sm ${link.iconClassName}`}>
                                                <Icon className="size-[18px]" aria-hidden="true" />
                                            </span>
                                            <span className="flex min-w-0 flex-col">
                                                <span className="text-sm font-semibold text-primary transition-colors group-hover:text-secondary">
                                                    {link.title}
                                                </span>
                                                <span className="text-sm text-on-surface-variant">
                                                    {link.description}
                                                </span>
                                            </span>
                                        </div>
                                        <ChevronRight
                                            className="size-5 shrink-0 text-outline-variant transition-all group-hover:translate-x-0.5 group-hover:text-primary"
                                            aria-hidden="true"
                                        />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="mb-space-lg flex w-full flex-col gap-space-sm sm:flex-row">
                        <Link
                            href="/"
                            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-space-md py-3 text-sm font-semibold text-on-primary shadow-md transition-all hover:opacity-90 active:scale-[0.98]">
                            <House className="size-[18px]" aria-hidden="true" />
                            <span>Back to Homepage</span>
                        </Link>
                        <Link
                            href="/tuitions"
                            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-surface-container-low px-space-md py-3 text-sm font-semibold text-primary transition-all hover:bg-surface-container active:scale-[0.98]">
                            <BookOpen className="size-[18px]" aria-hidden="true" />
                            <span>Browse Tuitions</span>
                        </Link>
                    </div>

                    {/* Help strip */}
                    <div className="flex w-full flex-col items-center justify-between gap-2 rounded-lg bg-surface-container-low/60 p-space-sm text-left sm:flex-row">
                        <div className="flex items-center gap-2">
                            <Headset className="size-5 shrink-0 text-secondary" aria-hidden="true" />
                            <span className="text-sm text-on-surface-variant">
                                Need help finding a mentor? Contact{" "}
                                <a
                                    href="mailto:support@mentorlagbe.com"
                                    className="font-semibold text-secondary hover:underline">
                                    support@mentorlagbe.com
                                </a>{" "}
                                or call <span className="font-bold text-primary">16443</span>.
                            </span>
                        </div>
                        <span className="text-xs font-semibold tracking-wider whitespace-nowrap text-outline uppercase">
                            24/7 Academic Desk
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
