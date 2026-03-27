import { supabaseAdmin } from "@/lib/supbase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    try {
        const { data, error } = await supabaseAdmin
            .from('members')
            .select(`*, 
                group (*), 
                user (*)`)
            .eq('group_id', id)
            .neq('status', 'removed')
            .neq('status', 'leaved')
            .order('created_at', { ascending: true })

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