import { auth } from "@/lib/auth";
import { supabase } from "@/lib/supbase/cient";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
    const { user_id, group_id } = await req.json()
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
        const { data, error } = await supabase
            .from('members')
            .update({
                status: 'removed'
            })
            .select(`*,
                user (*)`)
            .eq('user_id', user_id)
            .eq('group_id', group_id)
            .single()

        await supabase
            .from('chat')
            .insert({
                id: crypto.randomUUID(),
                user_id: 'Xki9FRjvcZZypkUXt8YLBvwariNAG3qNu',
                content: `${session.user.name} kicked ${data?.user?.name} from the team`,
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