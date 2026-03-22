import { supabase } from "@/lib/supbase/cient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    try {
        const { data, error } = await supabase
            .from('members')
            .select(`*, 
                group (*), 
                user (*)`)
            .eq('group_id', id)
            .neq('status', 'removed')

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