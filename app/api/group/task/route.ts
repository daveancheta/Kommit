import { auth } from "@/lib/auth";
import { supabase } from "@/lib/supbase/cient";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { user_id, group_id, description } = await req.json()

    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session ) {
        return NextResponse.json({
            success: false,
            message: "Unauthorized. Please sign in to continue."
        }, { status: 400 })
    }

    try {
        const { data, error } = await supabase
            .from('task')
            .insert({
                id: crypto.randomUUID(),
                user_id,
                group_id,
                description
            })

        await supabase
        .from('notification')
        .insert({
            id: crypto.randomUUID(),
            user_id,
            message: `${session.user.name.split(" ")[0]} assigned you a new task: "${description}"`,
        })

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