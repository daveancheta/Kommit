"use server"
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        })

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