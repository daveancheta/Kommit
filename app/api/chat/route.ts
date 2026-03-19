import { auth } from "@/lib/auth";
import { supabase } from "@/lib/supbase/cient";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { content } = await req.json();
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        return NextResponse.json({
            success: false,
            message: "Unauthorized. Please sign in to continue."
        })
    }

    try {
        const { error } = await supabase
            .from('chat')
            .insert({
                id: crypto.randomUUID(),
                user_id: session?.user?.id,
                content,
                room_id: crypto.randomUUID(),
            })

        return NextResponse.json({
            success: true,
            error
        }, { status: 200 })
    } catch (error) {
        console.log(error)

        return NextResponse.json({
            success: false
        }, { status: 400 })
    }
}