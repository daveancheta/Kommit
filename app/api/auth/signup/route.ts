"use server";
import { auth } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { name, date, email, password } = await req.json();
    try {
        await auth.api.signUpEmail({
            body: {
                name,
                birthdate: date || null,
                email,
                password
            }
        })

        return NextResponse.json({
            success: true
        }, { status: 200 })
    } catch (error: any) {
        console.log(error)

        const message =
            error?.message?.toLowerCase().includes("exists") ||
                error?.message?.toLowerCase().includes("another")
                ? "User already exists"
                : "Unable to sign up";

        return NextResponse.json({
            success: false,
            message
        }, { status: 400 })
    }
}