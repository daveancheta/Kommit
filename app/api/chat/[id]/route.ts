import { supabase } from "@/lib/supbase/cient"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    try {
        const { data, error } = await supabase
            .from("chat")
            .select(`*,
            group (*),
            user (*)`)
            .eq("group_id", id)

        return NextResponse.json({
            success: true,
            message: data
        }, { status: 200 })
    } catch (error) {
        return NextResponse.json({
            success: false,
        }, { status: 400 })
    }
}