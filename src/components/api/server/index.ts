import { ITuition } from "@/app/types";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const createTuitions = async({tuitions}:{tuitions : ITuition}) => {
    const res = await fetch(`${baseURL}/tuitions`, {
        method: 'POST',
        cache:"no-store",

        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(tuitions)
    })
    return res.json()
}