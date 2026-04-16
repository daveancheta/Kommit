import { auth } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supbase/server";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
    const { group_id, id } = await req.json()
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
            .from('members')
            .update({
                status: 'leaved'
            })
            .select(`*,
                user (*)`)
            .eq('id', id)
            .single()

        await supabaseAdmin
            .from('chat')
            .insert({
                id: crypto.randomUUID(),
                user_id: 'wM4Zfdo3hRLttz3h4rWsQ5HceIgoGryL',
                content: `${session.user.name} left the team`,
                group_id,
            })

        return NextResponse.json({
            success: true,
            data,
            error
        }, { status: 200 })
    } catch (error) {
        console.log(error)

        return NextResponse.json({
            success: false
        }, { status: 400 })
    }
}