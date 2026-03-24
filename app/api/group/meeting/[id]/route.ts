import { supabase } from "@/lib/supbase/cient";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { AccessToken } from "livekit-server-sdk";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import "dotenv/config"


export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    try {
        const { data, error } = await supabase
            .from('meeting')
            .select()
            .eq('group_id', id)

        return NextResponse.json({
            success: true,
            data,
            error
        }, { status: 200 })
    } catch (error) {
        return NextResponse.json({
            success: false
        }, { status: 400 })
    }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const API_KEY = process.env.LIVEKIT_API_KEY;
    const API_SECRET = process.env.LIVEKIT_API_KEY_SECRET;
    const { id } = await params
    const { date, time, created_by } = await req.json()
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
            .from('meeting')
            .select()
            .eq('group_id', id)
            .eq('date', date)
            .eq('time', time)
            .eq('created_by', created_by)
            .single()

        const at = new AccessToken(API_KEY, API_SECRET, { identity: session.user.name })

        at.addGrant({ roomJoin: true, room: data.id })

        const token = await at.toJwt()

        return NextResponse.json({
            success: true,
            token,
            error
        }, { status: 200 })
    } catch (error) {
        console.log(error)
        
        return NextResponse.json({
            success: false
        }, { status: 400 })
    }
}