import { Presentation, School } from "lucide-react";

import { cn } from "cn";

const tracks = [
    {
        variant: "student",
        icon: School,
        title: "For Students & Guardians",
        subtitle:
        "Guaranteed academic safety, verified toppers & trial batch access",
        steps: [
        {
            title: "Browse & Filter Curated Batches",
            description:
            "Search by board syllabus, exact topics, transparent monthly fee (৳), and live online or in-person location.",
        },
        {
            title: "Submit Application with Schedule",
            description:
            "Inspect university transcripts and trial passes. Submit an application with your preferred routine slots.",
        },
        {
            title: "Learn with Escrow Fee Protection",
            description:
            "Pay your monthly tuition fee safely. MentorLagbe holds it in escrow until your 2-day trial and scheduled classes commence.",
        },
        ],
    },
    {
        variant: "tutor",
        icon: Presentation,
        title: "For Tutors & Mentors",
        subtitle:
        "Focus on high-impact teaching with guaranteed on-time monthly payouts",
        steps: [
        {
            title: "Post Tuition Batch Listing",
            description:
            "Define subjects, class capacity, fixed monthly fee in ৳ BDT, and routine hours without any agency commission lock-in.",
        },
        {
            title: "Review & Admit Pre-Qualified Applicants",
            description:
            "Evaluate student applications, academic backgrounds, and confirm seats with one click via notification dashboard.",
        },
        {
            title: "Conduct Batches & Automated Bank Payouts",
            description:
            "Conduct interactive sessions and receive automatic, timely monthly fee settlements directly via bKash, Nagad, or Bank.",
        },
        ],
    },
];

export default function HowItWorks() {
    return (
        <section className="w-full bg-surface-container-low py-8">
            <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
                <div className="mx-auto mb-8 max-w-2xl text-center">
                <span className="inline-block rounded-full bg-secondary-container/60 px-4 py-1 text-[11px] leading-[14px] font-semibold tracking-wider text-secondary uppercase">
                    Institutional Workflow
                </span>
                <h2 className="font-display mt-1 mb-1 text-[2rem] leading-10 font-bold tracking-tight text-primary-container">
                    How MentorLagbe Works
                </h2>
                <p className="text-[15px] leading-6 text-on-surface-variant">
                    Designed with verified credentials, zero hourly billing, and
                    monthly escrow fee protection for students and instructors.
                </p>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {tracks.map((track) => {
                    const Icon = track.icon;
                    const isStudent = track.variant === "student";

                return (
                    <div key={track.title}
                        className="rounded-xl border border-surface-container/60 bg-surface-container-lowest p-6 shadow-sm">
                        <div className="mb-6 flex items-center gap-2 border-b border-surface-container pb-2">
                        <div
                            className={cn(
                            "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                            isStudent
                                ? "bg-secondary-container text-secondary"
                                : "bg-surface-container-high text-primary-container"
                            )}>
                            <Icon className="size-6" />
                        </div>
                        <div>
                            <h3 className="font-display text-xl font-bold text-primary-container">
                            {track.title}
                            </h3>
                            <p className="text-[13px] leading-5 text-on-surface-variant">
                            {track.subtitle}
                            </p>
                        </div>
                        </div>

                        <div className="relative space-y-4">
                        {track.steps.map((step, index) => (
                            <div key={step.title} className="flex items-start gap-4">
                            <div
                                className={cn(
                                "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold",
                                isStudent
                                    ? "bg-primary-container text-on-primary"
                                    : "bg-secondary text-on-secondary"
                                )}>
                                {index + 1}
                            </div>
                            <div>
                                <h4 className="font-display text-base font-semibold text-primary-container">
                                {step.title}
                                </h4>
                                <p className="mt-1 text-[13px] leading-5 text-on-surface-variant">
                                {step.description}
                                </p>
                            </div>
                            </div>
                        ))}
                        </div>
                    </div>
                    );
                })}
                </div>
            </div>
        </section>
    );
}
