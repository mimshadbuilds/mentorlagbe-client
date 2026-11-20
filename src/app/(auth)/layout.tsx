import type { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main className="min-h-screen">
        {children}
        </main>
    );
};

export default AuthLayout;