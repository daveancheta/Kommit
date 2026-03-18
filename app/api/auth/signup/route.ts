"use server";
import { auth } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { name, email, password } = await req.json();
    try {
        await auth.api.signUpEmail({
            body: {
                name,
                email,
                password
            }
        })

        return NextResponse.json({
            success: true
        }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false
        }, { status: 400 })
    }
}