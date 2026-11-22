"use client";

import { useEffect } from "react";
import ErrorScreen from "@/components/error-screen";

/**
 * Root error boundary — catches unexpected runtime errors anywhere below the
 * root layout and shows the global_error_500 design.
 */
export default function RootError({
    error,
    retry,
}: {
    error: unknown;
    retry: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return <ErrorScreen error={error} onRetry={retry} />;
}
