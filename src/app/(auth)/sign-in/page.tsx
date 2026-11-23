import type { Metadata } from "next";
import SignInForm from "@/components/auth/signin-form";

export const metadata: Metadata = {
    title: "Sign In | MentorLagbe",
    description:
        "Sign in to your MentorLagbe account to manage your tuition search, applications, or tutoring opportunities.",
};

const SignInPage = () => {
    return <SignInForm />
};

export default SignInPage;