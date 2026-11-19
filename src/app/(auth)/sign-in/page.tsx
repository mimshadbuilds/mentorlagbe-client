import { signIn } from '@/lib/auth-client';
import React, { FormEvent } from 'react';
import { toast } from 'sonner';

const SignInPage = () => {
    const handleSignIn = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget);
        const email = String(formData.get("email") ?? "").trim();
        const password = String(formData.get("password") ?? "").trim();

        const { data, error } = await signIn.email({
            email: email,
            password: password,
            callbackURL: '/'
        });

        if (error) {
            toast.error(error.message || "Sign In failed! Try again later.");
            return;
        }
        if(data){
            toast.success(`Welcome Back, ${data.user?.name || "there"}!`);
        }
    }
    return (
        <div>
            
        </div>
    );
};

export default SignInPage;