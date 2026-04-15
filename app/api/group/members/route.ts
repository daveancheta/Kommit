import { supabaseAdmin } from "@/lib/supbase/server"
import { NextRequest, NextResponse } from "next/server"

export async function PATCH(req: NextRequest) {
    const { user_id, group_id, role } = await req.json()

    try {
        await supabaseAdmin
            .from('members')
            .update({
                role: role
            })
            .eq('user_id', user_id)
            .eq('group_id', group_id)

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

export async function GET() {
    try {
        const { data } = await supabaseAdmin
            .from('members')
            .select()
            .eq('status', 'member')

        return NextResponse.json({
            success: true,
            data
        }, { status: 200 })
    } catch (error) {
        return NextResponse.json({
            success: false
        }, { status: 400 })
    }
}