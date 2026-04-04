import { supabase } from "@/lib/supbase/cient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { user_id, group_id, description } = await req.json()

    try {
        const { data, error } = await supabase
            .from('task')
            .insert({
                id: crypto.randomUUID(),
                user_id,
                group_id,
                description
            })

        console.log(error)
        
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