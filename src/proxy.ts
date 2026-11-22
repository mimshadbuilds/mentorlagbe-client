import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth";

export async function proxy(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: request.headers,
    });

    if (!session?.user) {
        const signIn = new URL("/sign-in", request.url);
        signIn.searchParams.set("redirectTo",
        `${request.nextUrl.pathname}${request.nextUrl.search}`
        );

        return NextResponse.redirect(signIn);
    }

    return NextResponse.next();
    }

    export const config = {
    matcher: [
        "/dashboard/:path*"
    ],
};
