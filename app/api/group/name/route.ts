import { supabase } from "@/lib/supbase/cient";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
    const { name, group_id } = await req.json()
    try {
        await supabase
            .from('group')
            .update({ group_name: name })
            .eq('id', group_id)

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