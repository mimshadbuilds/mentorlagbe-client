import type { Metadata } from "next";
import SignUpForm from "@/components/auth/signup-form";

export const metadata: Metadata = {
    title: "Create an Account | MentorLagbe",
    description:
        "Create a free MentorLagbe account to find a tutor or share your tutoring services.",
};

const SignUpPage = () => { 
    return <SignUpForm />
};

export default SignUpPage;