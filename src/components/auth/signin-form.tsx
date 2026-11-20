"use client";

import Link from "next/link";
import Image from "next/image";
import { FormEvent, useState } from "react";
import {
    ArrowRight,
    CheckCircle,
    Eye,
    EyeOff,
    LockKeyhole,
    Mail,
    ShieldCheck,
    } from "lucide-react";
    import { signIn } from "@/lib/auth-client";
    import { toast } from "sonner";

    const SignInForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
        const formData = new FormData(e.currentTarget);

        const email = String(formData.get("email") ?? "").trim();
        const password = String(formData.get("password") ?? "");

        const { data, error } = await signIn.email({
            email,
            password,
            callbackURL: "/",
        });

        if (error) {
            toast.error(error.message || "Sign in failed. Please try again.");
            return;
        }

        if (data) {
            toast.success(`Welcome back, ${data.user?.name || "there"}!`);
        }
        } catch {
        toast.error("Something went wrong. Please try again.");
        } finally {
        setIsSubmitting(false);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
        await signIn.social({
            provider: "google",
            callbackURL: "/",
        });
        } catch {
        toast.error("Google sign in failed. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-surface-container-low">
        <header className="border-b border-border bg-surface-container-lowest">
            <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
            <Link
                href="/tuitions"
                className="text-xs font-semibold text-secondary transition hover:text-primary-container">
                ← Back to Tuitions
            </Link>
            <Link href="/" className="flex items-center gap-2">
                <Image
                src="/mentorlagbe-icon.png"
                alt=""
                width={28}
                height={28}
                className="size-7 object-contain"
                />
                <span className="font-display text-sm font-bold text-primary-container">
                MentorLagbe
                </span>
                <span className="hidden rounded-full bg-secondary-container px-2 py-0.5 text-[10px] font-semibold text-on-secondary-container sm:inline">
                Auth Portal
                </span>
            </Link>
            <span className="text-xs font-medium text-muted-foreground">
                Need Help?
            </span>
            </div>
        </header>

        <div className="mx-auto flex max-w-5xl flex-col px-4 py-8 sm:px-6 md:py-12 lg:flex-row">
            <aside className="hidden flex-col justify-between rounded-t-xl bg-primary-container p-8 text-white lg:flex lg:w-[42%] lg:rounded-l-xl lg:rounded-tr-none">
            <div>
                <div className="mb-10 flex items-center gap-2">
                <Image
                    src="/mentorlagbe-icon.png"
                    alt=""
                    width={40}
                    height={40}
                    className="size-10 rounded-lg bg-white p-1 object-contain"
                />
                <div>
                    <p className="font-display font-bold">MentorLagbe</p>
                    <p className="text-[10px] tracking-wider text-secondary-container">
                    PREMIER EDTECH NETWORK
                    </p>
                </div>
                </div>
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-secondary-container">
                Portal Access
                </p>
                <h1 className="font-display text-3xl font-bold leading-tight">
                Welcome back to Bangladesh&apos;s premier academic tuition network
                </h1>
                <p className="mt-4 text-sm leading-6 text-blue-100/70">
                Structured governance, instant verified matches, and professional
                academic mentors tailored for peak curricula.
                </p>
                <div className="mt-8 space-y-5">
                {[
                    [
                    "✦",
                    "Direct Connections",
                    "Zero brokerage deductions between students and verified mentors. Direct, transparent terms.",
                    ],
                    [
                    "⌂",
                    "Institutional Vetting",
                    "Top-tier educators strictly verified from BUET, DU, DMC, IBA, and premier colleges.",
                    ],
                    [
                    "◈",
                    "BetterAuth Security",
                    "End-to-end credential integrity, biometric session tokens, and instant identity validation.",
                    ],
                ].map(([icon, title, description]) => (
                    <div key={title} className="flex gap-3">
                    <span className="mt-0.5 text-lg text-secondary-container">
                        {icon}
                    </span>
                    <div>
                        <p className="text-sm font-bold">{title}</p>
                        <p className="mt-1 text-xs leading-5 text-blue-100/65">
                        {description}
                        </p>
                    </div>
                    </div>
                ))}
                </div>
            </div>
            <div className="rounded-lg bg-white/10 p-4 text-xs italic text-blue-100/80">
                ★★★★★
                <br />
                “Found my HSC Higher Math mentor from BUET CSE within 24 hours.”
            </div>
            </aside>

            <section className="flex w-full rounded-xl bg-surface-container-lowest p-6 shadow-xl sm:p-10 lg:w-[58%] lg:rounded-l-none">
            <div className="mx-auto max-w-md">
                <div className="mb-7">
                <div className="flex items-start justify-between gap-4">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">
                    Portal Access
                    </p>
                    <span className="rounded-full bg-secondary-container px-3 py-1 text-[11px] font-semibold text-on-secondary-container">
                    ● Live Gateway
                    </span>
                </div>
                <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-primary-container">
                    Sign in to your account
                </h2>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Enter your credentials to access your academic dashboard and
                    schedule.
                </p>
                </div>

                <form onSubmit={handleSignIn} className="space-y-5">
                <div className="space-y-2">
                    <label
                    htmlFor="email"
                    className="text-sm font-semibold text-primary-container"
                    >
                    Email Address
                    </label>

                    <div className="relative">
                    <Mail className="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground" />
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="e.g. nafisa.rahman@gmail.com"
                        autoComplete="email"
                        required
                        className="h-14 w-full rounded-lg border border-border bg-surface-container-lowest py-2 pr-4 pl-14 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-secondary focus:ring-4 focus:ring-secondary/10"
                    />
                    </div>
                </div>

                <div className="space-y-2">
                    <div>
                    <label
                        htmlFor="password"
                        className="text-sm font-semibold text-primary-container"
                    >
                        Password
                    </label>
                    </div>

                    <div className="relative">
                    <LockKeyhole className="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground" />
                    <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        required
                        className="h-14 w-full rounded-lg border border-border bg-surface-container-lowest py-2 pr-14 pl-14 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-secondary focus:ring-4 focus:ring-secondary/10"
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={
                        showPassword ? "Hide password" : "Show password"
                        }
                        className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-muted-foreground transition hover:text-foreground"
                    >
                        {showPassword ? (
                        <EyeOff className="size-5" />
                        ) : (
                        <Eye className="size-5" />
                        )}
                    </button>
                    </div>
                </div>

                <div className="flex items-center justify-between gap-3">
                    <label className="flex items-center gap-2 text-sm text-muted-foreground">
                    <input type="checkbox" className="size-5 accent-secondary" />
                    Remember this device
                    </label>
                    <Link
                    href="/forgot-password"
                    className="text-xs font-semibold text-secondary transition hover:text-primary-container">
                    Forgot password?
                    </Link>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary-container px-4 text-sm font-semibold text-on-primary-container transition hover:bg-primary-container/90 disabled:cursor-not-allowed disabled:opacity-60">
                    {isSubmitting ? "Signing in..." : "Sign In to Dashboard"}

                    {!isSubmitting && <ArrowRight className="size-4" />}
                </button>
                </form>

                <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center">
                    <span className="bg-surface-container-lowest px-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Or sign in with
                    </span>
                </div>
                </div>

                <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="flex h-12 w-full items-center justify-center gap-3 rounded-lg bg-blue-50 text-sm font-semibold text-primary-container transition hover:bg-blue-100"
                >
                    <svg viewBox="0 0 48 48" className="h-5 w-5">
                    <path
                        fill="#EA4335"
                        d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.6 2.5 30.2 0 24 0 14.6 0 6.5 5.4 2.6 13.3l7.8 6C12.3 13.2 17.6 9.5 24 9.5Z"
                        transform="translate(0 4)"
                    />
                    <path
                        fill="#4285F4"
                        d="M46 24.5c0-1.5-.1-3-.4-4.5H24v9h12.4c-.6 3-2.4 5.5-5 7.2l7.7 6C43.7 37.8 46 31.8 46 24.5Z"
                        transform="translate(0 0)"
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
                <p className="mt-7 text-center text-sm text-muted-foreground">
                Don&apos;t have an account yet?{" "}
                <Link
                    href="/sign-up"
                    className="font-semibold text-secondary hover:underline"
                >
                    Register as Student
                </Link>
                <span className="mx-2 text-muted-foreground">or</span>
                <Link
                    href="/sign-up"
                    className="font-semibold text-secondary hover:underline"
                >
                    Register as Tutor
                </Link>
                </p>

                <div className="mt-24 flex flex-col justify-between gap-3 text-xs text-muted-foreground sm:flex-row">
                <span className="flex items-center gap-1.5">
                    <ShieldCheck className="size-4 text-secondary" /> ISO 27001
                    Certified System
                </span>
                <span className="flex items-center gap-1.5">
                    <CheckCircle className="size-4 text-secondary" /> NID &amp; Roll
                    Vetted
                </span>
                </div>
            </div>
            </section>
        </div>
        </div>
    );
};

export default SignInForm;
