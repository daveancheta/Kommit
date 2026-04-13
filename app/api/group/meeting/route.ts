import { auth } from "@/lib/auth";
import { supabase } from "@/lib/supbase/cient";
import { supabaseAdmin } from "@/lib/supbase/server";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { title, date, time, group_id } = await req.json()
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
            .from('meeting')
            .insert({
                id: crypto.randomUUID(),
                title,
                date,
                time,
                created_by: session.user.id,
                group_id
            })
            .select()
            .single()

        const { data: members, error: memberError } = await supabase
            .from("members")
            .select()
            .eq("group_id", data?.group_id)

        const notification = members?.map((mem) => ({
            id: crypto.randomUUID(),
            user_id: mem.user_id,
            message: `New meeting scheduled: ${data.title} `
        }))

        await supabase
            .from("notification")
            .insert(notification)

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