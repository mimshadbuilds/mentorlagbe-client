import Link from "next/link";
import { ArrowRight } from "lucide-react";
import TuitionsCard, { type ITuition } from "../layout/TuitionsCard";


const featuredTuitions: ITuition[] = [
    {
        title: "Organic & Physical Chemistry Comprehensive Board Syllabus",
        subject: "Chemistry",
        classLevel: "HSC 11-12",
        mode: "Online",
        monthlyFee: 4200,
        tutorName: "Dr. Farzana Kabir",
        bannerImage: "/tuitions/tuition-1.jpg",
    },
    {
        title: "Pure Mathematics P1-P3 & Mechanics Problem Solving Studio",
        subject: "Mathematics",
        classLevel: "A-Levels",
        mode: "Offline",
        location: "Dhanmondi, Dhaka",
        monthlyFee: 6500,
        tutorName: "Nusrat Jahan",
        bannerImage: "/tuitions/tuition-2.jpg",
    },
    {
        title: "SSC Physics & Chemistry Board CQ Mastery Group",
        subject: "General Science",
        classLevel: "Class 9-10 (SSC)",
        mode: "Offline",
        location: "Uttara, Dhaka",
        monthlyFee: 4000,
        tutorName: "Mahmudul Hasan",
        bannerImage: "/tuitions/tuition-3.jpg",
    },
    {
        title: "Academic English Writing & Reading Comprehension",
        subject: "English",
        classLevel: "IELTS & O-Level",
        mode: "Online",
        monthlyFee: 5500,
        tutorName: "Sarah Rahman",
        bannerImage: "/tuitions/tuition-4.jpg",
    },
    {
        title: "C Programming & HSC ICT Algorithmic Fundamentals",
        subject: "Computer Science",
        classLevel: "HSC ICT / Univ",
        mode: "Online",
        monthlyFee: 3500,
        tutorName: "Arif Hossain",
        bannerImage: "/tuitions/tuition-5.jpg",
    },
    {
        title: "HSC Physics 1st & 2nd Paper Concept & Mathematical Drill",
        subject: "Physics",
        classLevel: "HSC 11-12",
        mode: "Offline",
        location: "Mirpur, Dhaka",
        monthlyFee: 4500,
        tutorName: "Engr. Tanvir Ahmed",
        bannerImage: "/tuitions/tuition-6.jpg",
    },
];

export default function FeaturedTuitions() {
    return (
        <section className="bg-surface-container-lowest py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
                <span className="text-[11px] leading-[14px] font-bold tracking-wider text-secondary uppercase">
                Verified Enrollments
                </span>
                <h2 className="font-display mt-1 text-3xl font-bold text-primary-container">
                Featured Tuitions
                </h2>
                <p className="mt-1 text-[13px] leading-5 text-on-surface-variant">
                Active subject batches and 1-on-1 tutoring sessions open for
                direct application.
                </p>
            </div>
            <Link href="/tuitions"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary transition-colors hover:text-primary-container">
                Explore all listings
                <ArrowRight className="size-[18px]" />
            </Link>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredTuitions.map((tuition) => (
                <TuitionsCard key={tuition.title} tuition={tuition} />
            ))}
            </div>
        </div>
        </section>
    );
}
