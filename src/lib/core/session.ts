import { headers } from "next/headers"
import { auth } from "@/lib/auth"

export const getUserSession = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    return session?.user || null;
}

export const getUserToken = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    return session?.session?.token || null;
}

export const getServerToken = async () => {
        const jwtToken = await auth.api.getToken({
        headers: await headers()
    })
    const token = jwtToken?.token;

    return token;
}