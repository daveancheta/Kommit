"use server"
import { db } from "@/index";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { user } from "@/db/schema"

export async function GET() {
    try {
        const res = await auth.api.getSession({
            headers: await headers(),
        })

        const id = res?.user?.id

        if (!id) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized, please login."
            }, { status: 400 });
        }

        const session = await db.query.user.findFirst({
            where: (eq(user.id, id)),
        });

        return NextResponse.json({
            success: true,
            session
        }, { status: 200 })
    } catch (error) {
        return NextResponse.json({
            success: false
        }, { status: 400 })
    }
}