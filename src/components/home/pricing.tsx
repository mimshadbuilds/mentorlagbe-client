import { ArrowRight, CircleCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { cn } from "cn";
import { Button, buttonVariants } from "@/components/ui/button";

const starterFeatures = [
    "Up to 2 tuition posts (Tutor)",
    "Up to 5 tuition bookmarks (Student)",
    "Direct tuition applications",
    "Basic profile & search filters",
];

const proFeatures = [
    "Unlimited tuition posts & bookmarks",
    "Golden PRO verification badge",
    "Priority listing in search & category filters",
    "Priority applicant notifications & reviews",
];

const PricingCards = () => {
    return (
        <section className="w-full bg-surface-container-low py-15">
            <div className="mx-auto max-w-5xl px-4 md:px-6 lg:px-8">
                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <span className="mb-2 block text-[11px] leading-[14px] font-bold tracking-wider text-secondary uppercase">
                        Transparent Plans
                    </span>
                    <h2 className="font-display mb-3 text-3xl font-extrabold tracking-tight text-primary-container sm:text-4xl">
                        Simple, Fair Academic Pricing
                    </h2>
                    <p className="mx-auto max-w-xl text-[15px] leading-relaxed text-on-surface-variant">
                        Get started free or unlock priority batch enrollment and advanced
                        tutor dashboards.
                    </p>
                </div>

                <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
                <div className="flex flex-col justify-between rounded-2xl border border-surface-container bg-surface-container-lowest p-8 shadow-sm transition-all hover:shadow-md">
                    <div>
                    <div className="mb-3 flex items-center justify-between gap-2">
                        <h3 className="font-display text-xl font-bold text-primary-container">
                        Starter Plan
                        </h3>
                        <span className="rounded-md bg-surface-container-low px-2.5 py-1 text-[11px] leading-[14px] font-semibold text-on-surface-variant">
                        Free Forever
                        </span>
                    </div>
                    <p className="mb-6 text-[13px] leading-5 text-on-surface-variant">
                        Perfect for students and tutors looking to test the platform.
                    </p>
                    <div className="mb-8 flex items-baseline gap-1">
                        <span className="font-display text-4xl font-extrabold text-primary-container">
                        $0
                        </span>
                        <span className="text-[13px] leading-5 font-medium text-on-surface-variant">
                        /month
                        </span>
                    </div>
                    <ul className="mb-8 space-y-4">
                        {starterFeatures.map((feature) => (
                        <li
                            key={feature}
                            className="flex items-center gap-3 text-[13px] leading-5 text-on-surface-variant">
                            <CircleCheck className="size-5 shrink-0 text-secondary" />
                            <span>{feature}</span>
                        </li>
                        ))}
                    </ul>
                    </div>
                    <Button
                    type="button"
                    variant="outline"
                    className="w-full rounded-xl border-outline-variant bg-surface-container-lowest py-3 text-xs font-bold text-primary-container shadow-sm hover:bg-surface-container-low dark:border-outline-variant dark:bg-surface-container-lowest dark:hover:bg-surface-container-low"    >
                    Get Started Free
                    </Button>
                </div>

                <div className="relative flex flex-col justify-between rounded-2xl border-2 border-secondary bg-surface-container-lowest p-8 shadow-lg transition-all hover:shadow-xl">
                    <span className="absolute -top-3.5 right-6 inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-[11px] leading-[14px] font-bold tracking-wider text-on-secondary uppercase shadow-sm">
                    <Sparkles className="size-3.5" />
                    Recommended
                    </span>

                <div>
                    <div className="mb-3 flex items-center justify-between gap-2 pt-1">
                        <h3 className="font-display text-xl font-bold text-primary-container">
                        MentorLagbe PRO
                        </h3>
                        <span className="rounded-full border border-tertiary-fixed-dim/40 bg-tertiary-fixed/40 px-2.5 py-0.5 text-[11px] leading-[14px] font-bold text-on-tertiary-fixed-variant">
                        PRO Badge
                        </span>
                    </div>
                    <p className="mb-6 text-[13px] leading-5 text-on-surface-variant">
                        Unlimited reach, verified credential badges, and priority
                        matching.
                    </p>

                    <div className="mb-8 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <div className="flex items-baseline gap-1">
                            <span className="font-display text-4xl font-extrabold text-secondary">
                                $15
                            </span>
                            <span className="text-[11px] leading-[14px] font-medium text-on-surface-variant">
                                one-time for Tutors
                            </span>
                        </div>
                        <span className="text-[11px] leading-[14px] text-on-surface-variant">
                        or
                        </span>
                        <div className="flex items-baseline gap-1">
                            <span className="font-display text-2xl font-extrabold text-primary-container">
                                $10
                            </span>
                            <span className="text-[11px] leading-[14px] font-medium text-on-surface-variant">
                                one-time for Students
                            </span>
                        </div>
                    </div>

                    <ul className="mb-8 space-y-4">
                        {proFeatures.map((feature, index) => (
                        <li
                            key={feature}
                            className={cn(
                            "flex items-center gap-3 text-[13px] leading-5",
                            index === 0
                                ? "font-semibold text-primary-container"
                                : "text-on-surface-variant"
                            )}>
                            <CircleCheck className="size-5 shrink-0 text-secondary" />
                            <span>{feature}</span>
                        </li>
                        ))}
                    </ul>
                    </div>

                    <Link href="/pricing"
                        className={buttonVariants({
                            variant: "secondary",
                            className:
                                "w-full gap-2 rounded-xl py-3 text-xs font-bold shadow-md hover:bg-secondary/90",
                        })}>
                        Upgrade to Pro
                        <ArrowRight className="size-[18px]" />
                    </Link>
                </div>
                </div>
            </div>
        </section>
    );
};

export default PricingCards;
