import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins"

const mongoUri = process.env.MONGODB_URI

    if (!mongoUri) {
        throw new Error("MONGODB_URI is not configured.")
    }

const client = new MongoClient(mongoUri, {
    maxPoolSize: 10,
});

const clientPromise = client.connect();

const db = (await clientPromise).db('mentorlagbeDB')

export const auth = betterAuth({
    // trustedOrigins: ["https://mentorlagbe-client-*.vercel.app"],
    emailAndPassword: { 
        enabled: true,
        autoSignIn: false, 
    },
    socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },
    user: {
        additionalFields: {
            role: {
                type: ["student", "tutor", "admin"],
                input: true,
                defaultValue: 'student'
            },
            phone: {
                type: "string",
                input: true,
                defaultValue: ""
            },
            bio: {
                type: "string",
                input: true,
                defaultValue: ""
            }
        }
    },

    plugins: [
        jwt({ sessionCookieCache: true })
    ],
    session: {
        cookieCache: {
            enabled: true,
            strategy: 'jwt',
            maxAge: 7 * 24 * 60 * 60
        }
    },

    database: mongodbAdapter(db, {
        client,
    }),
});