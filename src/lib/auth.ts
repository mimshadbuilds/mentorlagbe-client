import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins"

const mongoUri = process.env.MONGODB_URI
if (!mongoUri) {
    throw new Error("MONGODB_URI is not configured.")
}

type MongoGlobal = typeof globalThis & {
    mentorlagbeMongoClient?: MongoClient
    mentorlagbeMongoDiagnosticsAttached?: boolean
}

const globalForMongo = globalThis as MongoGlobal
const client = globalForMongo.mentorlagbeMongoClient ?? new MongoClient(mongoUri)
globalForMongo.mentorlagbeMongoClient = client

if (!globalForMongo.mentorlagbeMongoDiagnosticsAttached) {
    const runtimeContext = {
        pid: process.pid,
        region: process.env.VERCEL_REGION ?? "local",
        environment: process.env.VERCEL_ENV ?? process.env.NODE_ENV ?? "unknown",
    }

    client.on("close", () => {
        console.error("[MongoDB diagnostics] MongoClient close event", {
            ...runtimeContext,
            occurredAt: new Date().toISOString(),
        })
    })

    client.on("topologyClosed", (event) => {
        console.error("[MongoDB diagnostics] MongoDB topologyClosed event", {
            ...runtimeContext,
            topologyId: event.topologyId,
            occurredAt: new Date().toISOString(),
        })
    })

    globalForMongo.mentorlagbeMongoDiagnosticsAttached = true
}

const db = client.db('mentorlagbeDB')

export const auth = betterAuth({
    emailAndPassword: { 
        enabled: true, 
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