"use server";
import { auth } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { email, password } = await req.json();
    try {
        await auth.api.signInEmail({
            body: {
                email,
                password
            }
        })

        return NextResponse.json({
            success: true,
        }, { status: 200 })
    } catch (error: any) {
        console.log(error)

        const message =
            error?.message?.toLowerCase().includes("invalid") ||
                error?.message?.toLowerCase().includes("credentials")
                ? "Invalid email or password."
                : "Unable to sign in";

        return NextResponse.json({
            success: false,
            message
        }, { status: 400 })
    }
}