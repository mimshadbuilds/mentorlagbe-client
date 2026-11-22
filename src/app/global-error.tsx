"use client";

import "./globals.css";
import ErrorScreen from "@/components/error-screen";

/**
 * Replaces the root layout when the layout itself fails — must render its own
 * <html>/<body> and global styles (Next 16 docs: error.md → Global Error).
 */
export default function GlobalError({
    error,
    retry,
}: {
    error: unknown;
    retry: () => void;
}) {
    return (
        <html lang="en">
            <body className="flex min-h-full flex-col bg-background text-foreground">
                <ErrorScreen error={error} onRetry={retry} />
            </body>
        </html>
    );
}
