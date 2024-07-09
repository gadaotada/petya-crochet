'use server'
import { verify, hash } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { generateId } from "lucia";

import { db } from "@/database/conn";
import { lucia } from "./main";
import { errorLog } from "@/services/logger/error-logging";
import { userTable } from "@/database/schema";
import { eq } from "drizzle-orm";

export const userLoggin = async(profile: string, password:string): Promise<boolean | null> => {
    try {

        if (typeof profile !== "string" || profile.length < 3 ||profile.length > 31) {
            return false;
        }

        if (typeof password !== "string" || password.length < 6 || password.length > 255) {
            return false;
        }

        const existingUser = await db.select().from(userTable).where(eq(userTable.profile, profile));

        if (!existingUser || !existingUser[0]) {
            return false;
        }

        const validPassword = await verify(existingUser[0].password, password, {
            memoryCost: 19456,
            timeCost: 2,
            outputLen: 32,
            parallelism: 1
        });

        if (!validPassword) {
            return false;
        }

        const session = await lucia.createSession(existingUser[0].id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

        return true
    } catch (err) {
        await errorLog('Critical', 'Loggin', '@/services/auth/functions.ts', err as Error)
        return null
    }
}