import { signUp } from '@/lib/auth-client';
import React, { FormEvent } from 'react';
import { toast } from 'sonner';

const SignUpPage = () => {
    const handleSubmit = async(e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const name = String(formData.get("fullName") ?? "").trim();
        const email = String(formData.get("email") ?? "").trim();
        const password = String(formData.get("password") ?? "").trim();
        const image = String(formData.get("image") ?? "").trim();

        const { data, error} = await signUp.email({
            name: name,
            email: email,
            password: password,
            image: image || undefined,
            callbackURL: '/'
        })

        if (error) {
            toast.error(error.message || "Sign In failed! Try again later.");
            return;
        }

        if(data){
            toast.success(`Welcome, ${data.user?.name || "there"}! Your account was created.`);
        }
    }

    const handleGoogleSignIn = () => {
        console.log("Google authentication clicked");
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
            
            </form>
        </div>
    );
};

export default SignUpPage;