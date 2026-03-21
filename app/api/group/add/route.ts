import { auth } from "@/lib/auth";
import { supabase } from "@/lib/supbase/cient";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { member_id, group_id } = await req.json();
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
        const { data: isExistingMember } = await supabase
            .from('members')
            .select()
            .eq('user_id', member_id)
            .eq('group_id', group_id)

        if (isExistingMember && isExistingMember.length > 0) {
            return NextResponse.json({
                success: false,
                message: `Already in the team.`
            }, { status: 400 })
        }

        const { data, error } = await supabase
            .from('members')
            .insert({
                id: crypto.randomUUID(),
                user_id: member_id,
                group_id
            })
            .select(`*,
                user (*)
                `)
            .single()

        await supabase
            .from('chat')
            .insert({
                id: crypto.randomUUID(),
                user_id: 'Xki9FRjvcZZypkUXt8YLBvwariNAG3qNu',
                content: `${data?.user?.name} added by ${session.user.name}`,
                group_id,
            })

        return NextResponse.json({
            success: true,
            data
        }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
        }, { status: 400 })
    }
}