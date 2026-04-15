import { auth } from "@/lib/auth"
import { supabaseAdmin } from "@/lib/supbase/server"
import { headers } from "next/headers"
import { NextResponse } from "next/server"

export async function GET() {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        return NextResponse.json({
            success: false,
            message: "Unauthorized. Please sign in to continue."
        }, { status: 400 })
    }

    try {
        const { data, error } = await supabaseAdmin
            .from('notification')
            .select()
            .eq("user_id", session.user.id)
            .order('created_at', { ascending: false })

        return NextResponse.json({
            success: true,
            data,
            error
        }, { status: 200 })
    } catch (error) {
        console.log(error)

        return NextResponse.json({
            success: false,
        }, { status: 400 })
    }
}

export async function PATCH() {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        return NextResponse.json({
            success: false,
            message: "Unauthorized. Please sign in to continue."
        }, { status: 400 })
    }

    try {
        await supabaseAdmin
            .from('notification')
            .update({
                is_read: true
            })
            .eq('user_id', session.user.id)

        return NextResponse.json({
            success: true
        }, { status: 200 })
    } catch (error) {
        console.log(error)

        return NextResponse.json({
            success: false,
        }, { status: 400 })
    }
}