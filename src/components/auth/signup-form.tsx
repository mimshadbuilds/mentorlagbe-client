"use client";

import Link from "next/link";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { signUp, signIn } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type UserRole = "student" | "tutor";

const SignUpForm = () => {
    const [role, setRole] = useState<UserRole>("student");
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter()

    const passwordChecks = [
        password.length >= 8,
        /[A-Z]/.test(password),
        /[0-9]/.test(password),
        /[^A-Za-z0-9]/.test(password),
    ];

    const strength = passwordChecks.filter(Boolean).length;

    const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

    try {
        const formData = new FormData(e.currentTarget);

        const name = String(formData.get("fullName") ?? "").trim();
        const email = String(formData.get("email") ?? "").trim();
        const password = String(formData.get("password") ?? "");

        const signupPayload = {
            name,
            email,
            password,
            role,
            callbackURL: "/sign-in",
        };

        const { data, error } = await signUp.email(
            signupPayload as Parameters<typeof signUp.email>[0]
        );

        if (error) {
            toast.error(error.message || "Sign up failed. Please try again.");
            return;
        }

        if (data) {
            toast.success(`Welcome, ${data.user?.name || "there"}! Your account was created.`);
        }
        router.push('/sign-in')
        router.refresh()
        } catch {
        toast.error("Something went wrong. Please try again.");
        } finally {
        setIsSubmitting(false);
        }
    };

    const handleGoogleSignUp = async () => {
        try {
        await signIn.social({
            provider: "google",
            callbackURL: "/",
        });
        } catch {
        toast.error("Google authentication failed. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-surface-container-low">
        <header className="border-b border-border bg-surface-container-lowest">
            <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
            <Link href="/tuitions" className="text-xs font-semibold text-secondary transition hover:text-primary-container">← Back to Tuitions</Link>
            <Link href="/" className="flex items-center gap-2">
                <Image src="/mentorlagbe-icon.png" alt="" width={28} height={28} className="size-7 object-contain" priority />
                <span className="font-display text-sm font-bold text-primary-container">MentorLagbe</span>
                <span className="hidden rounded-full bg-secondary-container px-2 py-0.5 text-[10px] font-semibold text-on-secondary-container sm:inline">Auth Portal</span>
            </Link>
            <span className="text-xs font-medium text-muted-foreground">Need Help?</span>
            </div>
        </header>

        <div className="mx-auto flex max-w-5xl flex-col px-4 py-8 sm:px-6 md:py-12 lg:flex-row">
        <aside className="hidden flex-col justify-between rounded-t-xl bg-primary-container p-8 text-on-primary-container lg:flex lg:w-[42%] lg:rounded-l-xl lg:rounded-tr-none">
            <div>
            <div className="mb-10 flex items-center gap-2">
                <Image src="/mentorlagbe-icon.png" alt="" width={40} height={40} className="size-10 rounded-lg bg-white p-1 object-contain" />
                <div><p className="font-display font-bold">MentorLagbe</p><p className="text-[10px] tracking-wider text-secondary-container">INSTITUTIONAL EDTECH</p></div>
            </div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-secondary-container">Direct Academic Matching</p>
            <h1 className="font-display text-3xl font-bold leading-tight">Bridge directly with vetted academic mentors.</h1>
            <p className="mt-4 text-sm leading-6 text-on-primary-container/70">No commission cuts on tuition fees, zero agent bureaucracy. Connect with top university scholars and certified educators across Bangladesh.</p>
            <div className="mt-8 space-y-3">
                {[
                ["♢", "Verified Scholars & Institutions", "Curated profiles from BUET, DU, DMC, IBA, and premier English-medium faculties."],
                ["▣", "100% Retained Honorarium", "Educators keep every single Taka earned. Absolutely zero platform commission fees."],
                ["▱", "Direct Guardian-Tutor Dialogue", "Direct voice and chat communication for customized syllabi and trial schedules."],
                ].map(([icon, title, description]) => (
                <div key={title} className="flex gap-3 rounded-lg bg-on-primary-container/5 p-3">
                    <span className="text-lg text-secondary-container">{icon}</span>
                    <div><p className="text-sm font-bold">{title}</p><p className="mt-1 text-xs leading-5 text-on-primary-container/65">{description}</p></div>
                </div>
                ))}
            </div>
            </div>
            <div className="flex items-end justify-between text-xs text-on-primary-container/70"><span>● ● ● <b className="text-secondary-container">+14k</b></span><span><b className="text-on-primary-container">14,800+ Active</b><br />Students & Verified Tutors</span></div>
        </aside>

        <section className="w-full rounded-xl bg-surface-container-lowest p-6 shadow-xl sm:p-10 lg:w-[58%] lg:rounded-l-none">
        <div className="mx-auto max-w-md">
        <div className="mb-5 flex items-start justify-between gap-4">
            <div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-primary-container">
            Create Your Account
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Select your primary objective to customize your platform experience.
            </p>
            </div>
            <span className="shrink-0 rounded-full bg-secondary-container px-3 py-1 text-[11px] font-semibold text-on-secondary-container">
            Instant Access
            </span>
        </div>

        <div className="mb-7 grid grid-cols-2 rounded-xl bg-primary-container/10 p-1">
            <button
            type="button"
            onClick={() => setRole("student")}
            className={`flex h-12 items-center justify-center gap-2 rounded-lg border p-3 text-sm transition ${
                role === "student"
                ? "border-transparent bg-surface-container-lowest font-bold text-primary-container shadow-sm ring-2 ring-secondary"
                : "border-transparent bg-transparent text-muted-foreground hover:text-primary-container"
            }`}
            >
            <div
                className="flex items-center justify-center text-secondary">
                <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                >
                <path d="M12 3 2.5 8 12 13l9.5-5L12 3Z" strokeLinejoin="round" />
                <path d="M6.5 10.2v5.2c3.2 2.5 7.8 2.5 11 0v-5.2M21.5 8v6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>

            <p>Student</p>
            </button>

            <button
            type="button"
            onClick={() => setRole("tutor")}
            className={`flex h-12 items-center justify-center gap-2 rounded-lg border p-3 text-sm transition ${
                role === "tutor"
                ? "border-transparent bg-surface-container-lowest font-bold text-primary-container shadow-sm ring-2 ring-secondary"
                : "border-transparent bg-transparent text-muted-foreground hover:text-primary-container"
            }`}
            >
            <div
                className="flex items-center justify-center text-secondary"
            >
                <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                >
                <path d="M3 5h18v12H3zM7 21h10M12 17v4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="m7 9 3 3 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>

            <p>Tutor</p>
            </button>
        </div>

        <div className="mb-4 flex items-center justify-between rounded-lg bg-primary-container/10 px-4 py-3 text-xs text-primary-container">
            <span><span className="mr-2 text-base text-secondary">✿</span>Default Plan: <strong>Free Tier ($0/month)</strong> — upgrade anytime</span>
            <span className="rounded-full bg-secondary-container px-2.5 py-0.5 font-semibold text-on-secondary-container">Free</span>
        </div>

        <button type="button"
            onClick={handleGoogleSignUp}
            className="flex h-12 w-full items-center justify-center gap-3 rounded-lg bg-primary-container/10 text-sm font-semibold text-primary-container transition hover:bg-primary-container/20">
            <svg viewBox="0 0 48 48" className="h-5 w-5">
                <path
                    fill="#EA4335"
                    d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.6 2.5 30.2 0 24 0 14.6 0 6.5 5.4 2.6 13.3l7.8 6C12.3 13.2 17.6 9.5 24 9.5Z"
                    transform="translate(0 4)"
                />
                <path
                    fill="#4285F4"
                    d="M46 24.5c0-1.5-.1-3-.4-4.5H24v9h12.4c-.6 3-2.4 5.5-5 7.2l7.7 6C43.7 37.8 46 31.8 46 24.5Z"
                />
                <path
                    fill="#FBBC05"
                    d="M10.4 28.8a14.5 14.5 0 0 1 0-9.6l-7.8-6a24 24 0 0 0 0 21.6l7.8-6Z"
                    transform="translate(4 0)"
                />
                <path
                    fill="#34A853"
                    d="M24 48c6.2 0 11.5-2 15.3-5.8l-7.7-6c-2.1 1.4-4.7 2.3-7.6 2.3-6.4 0-11.7-4.3-13.6-10.1l-7.8 6C3.5 42.4 12.2 48 24 48Z"
                    transform="translate(0 -2)"
                />
            </svg>
            Continue with Google
        </button>

        <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center">
            <span className="bg-surface-container-lowest px-3 text-xs font-medium uppercase tracking-wide text-primary-container">
                Or Register With Email
            </span>
            </div>
        </div>

        <form onSubmit={handleSignUp} className="space-y-4">
            <input type="hidden" name="role" value={role} />

            <div className="space-y-2">
            <label htmlFor="fullName" className="text-sm font-semibold text-primary-container">
                Full Name
            </label>

            <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="e.g. Tanvir Ahmed"
                autoComplete="name"
                required
                className="h-12 w-full rounded-lg border border-transparent bg-primary-container/10 px-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-secondary focus:ring-4 focus:ring-secondary/10"
            />
            </div>

            <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-semibold text-primary-container">
                Email Address
            </label>

            <input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                autoComplete="email"
                required
                className="h-12 w-full rounded-lg border border-transparent bg-primary-container/10 px-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-secondary focus:ring-4 focus:ring-secondary/10"
            />
            </div>

            <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-1">
                <label htmlFor="password" className="text-sm font-semibold text-primary-container">
                Password
                </label>

                <span className="text-xs text-muted-foreground">
                At least 8 characters required
                </span>
            </div>

            <div className="relative">
                <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                autoComplete="new-password"
                minLength={8}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 w-full rounded-lg border border-transparent bg-primary-container/10 px-4 pr-12 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-secondary focus:ring-4 focus:ring-secondary/10"
                />

                <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-muted-foreground hover:text-foreground"
                >
                {showPassword ? (
                    <EyeOff className="size-5" />
                ) : (
                    <Eye className="size-5" />
                )}
                </button>
            </div>

            {password.length > 0 && (
                <div className="space-y-1.5">
                <div className="flex gap-1">
                    {passwordChecks.map((check, index) => (
                    <div
                        key={index}
                        className={`h-1 flex-1 rounded-full ${
                        check ? "bg-secondary" : "bg-surface-container"
                        }`}
                    />
                    ))}
                </div>

                <p className="text-xs text-muted-foreground">
                    {strength <= 1
                    ? "Weak password"
                    : strength === 2
                        ? "Fair password"
                        : strength === 3
                        ? "Good password"
                        : "Strong password"}
                </p>
                </div>
            )}
            </div>

            {/* Terms */}
            <label className="flex items-start gap-2.5 text-xs leading-5 text-muted-foreground">
            <input
                type="checkbox"
                name="terms"
                required
                className="mt-1 h-4 w-4 shrink-0 accent-secondary"
            />

            <span>
                I agree to the{" "}
                <Link href="/terms" className="font-semibold text-secondary hover:underline">
                Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="font-semibold text-secondary hover:underline">
                Privacy Policy
                </Link>
                .
            </span>
            </label>

            <button
            type="submit"
            disabled={isSubmitting}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary-container px-4 text-sm font-semibold text-on-primary-container transition hover:bg-primary-container/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
            {isSubmitting ? "Creating account..." : "Create Free Account"}

            {!isSubmitting && (
                <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                >
                <path d="M5 12h14m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )}
            </button>
        </form>

        <p className="mt-7 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
            href="/sign-in"
            className="font-semibold text-secondary hover:underline"
            >
            Sign in
            </Link>
        </p>
        </div>
        </section>
        </div>
        </div>
    );
};

export default SignUpForm;