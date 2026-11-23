import { Fragment } from "react";
import { ArrowDown, ArrowRight, BadgeCheck, FilePen, Search, Send } from "lucide-react";

const steps = [
    {
        number: "01",
        icon: FilePen,
        role: "For Tutors",
        title: "Post a Tuition Batch",
        description:
            "Set the subject, class level, online or in-person mode, schedule, and monthly fee in ৳ BDT. Your listing goes live after admin approval.",
    },
    {
        number: "02",
        icon: Search,
        role: "For Students",
        title: "Browse & Filter Tuitions",
        description:
            "Search by title or subject, narrow by class level and mode, then open a listing to review the tutor, fee, and full schedule.",
    },
    {
        number: "03",
        icon: Send,
        role: "For Students",
        title: "Apply With Your Schedule",
        description:
            "Send a direct application with your phone, preferred routine, and a short learning note. Each tuition gets one application per student.",
    },
    {
        number: "04",
        icon: BadgeCheck,
        role: "For Both",
        title: "Get Matched & Start Learning",
        description:
            "The tutor reviews applicants and accepts a seat. You coordinate the routine and begin sessions — Pro members get priority discovery.",
    },
];

export default function HowItWorks() {
    return (
        <section className="w-full bg-surface-container-low py-12 md:py-16">
            <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
                <div className="mx-auto mb-10 max-w-2xl text-center">
                    <span className="inline-block rounded-full bg-secondary-container/60 px-4 py-1 text-[11px] leading-[14px] font-semibold tracking-wider text-secondary uppercase">
                        Structured Enrollment Process
                    </span>
                    <h2 className="font-display mt-2 text-[2rem] leading-10 font-bold tracking-tight text-primary-container">
                        How MentorLagbe Works
                    </h2>
                    <p className="mt-1 text-[15px] leading-6 text-on-surface-variant">
                        One clear path from a tutor&apos;s first batch posting to a
                        student&apos;s first class.
                    </p>
                </div>

                <div className="flex flex-col gap-2 lg:flex-row lg:items-stretch lg:gap-0">
                    {steps.map((step, index) => {
                        const Icon = step.icon;

                        return (
                            <Fragment key={step.number}>
                                <div className="flex flex-1 flex-col rounded-xl border border-surface-container/60 bg-surface-container-lowest p-6 shadow-sm">
                                    <div className="flex items-start justify-between">
                                        <span className="flex size-12 items-center justify-center rounded-lg bg-surface-container text-primary-container">
                                            <Icon className="size-6" aria-hidden="true" />
                                        </span>
                                        <span className="font-display text-2xl font-bold text-secondary">
                                            {step.number}
                                        </span>
                                    </div>
                                    <span className="mt-5 w-fit rounded-full bg-secondary-container/60 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-secondary uppercase">
                                        {step.role}
                                    </span>
                                    <h3 className="font-display mt-2 text-lg font-bold text-primary-container">
                                        {step.title}
                                    </h3>
                                    <p className="mt-2 text-[13px] leading-5 text-on-surface-variant">
                                        {step.description}
                                    </p>
                                </div>
                                {index < steps.length - 1 && (
                                    <div
                                        className="flex shrink-0 items-center justify-center py-1 lg:px-3"
                                        aria-hidden="true">
                                        <ArrowDown className="size-5 text-secondary lg:hidden" />
                                        <ArrowRight className="hidden size-5 text-secondary lg:block" />
                                    </div>
                                )}
                            </Fragment>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
