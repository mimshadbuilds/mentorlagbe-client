import { headers } from "next/headers"
import { isAPIError } from "better-auth/api"
import { auth } from "@/lib/auth"

const isUnauthorized = (error: unknown) =>
    isAPIError(error) && error.statusCode === 401

export const getUserSession = async () => {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        })

        return session?.user || null;
    } catch (error) {
        if (isUnauthorized(error)) return null
        throw error
    }
}

export const getUserToken = async () => {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        })

        return session?.session?.token || null;
    } catch (error) {
        if (isUnauthorized(error)) return null
        throw error
    }
}

export const getServerToken = async () => {
    try {
        const jwtToken = await auth.api.getToken({
            headers: await headers()
        })
        const token = jwtToken?.token;

        return token;
    } catch (error) {
        if (isUnauthorized(error)) return null
        throw error
    }
}