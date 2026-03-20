import { auth } from "@/lib/auth";
import { supabase } from "@/lib/supbase/cient";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { use } from "react";

export async function POST(req: NextRequest) {
    const { content } = await req.json();
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
        const { error } = await supabase
            .from('chat')
            .insert({
                id: crypto.randomUUID(),
                user_id: session?.user?.id,
                content,
                group_id: crypto.randomUUID(),
            })

        return NextResponse.json({
            success: true,
            error
        }, { status: 200 })
    } catch (error) {
        console.log(error)

        return NextResponse.json({
            success: false
        }, { status: 400 })
    }
}

export async function PATCH(req: NextRequest) {
    const { content, id } = await req.json()

    try {
        const { data, error } = await supabase
            .from('chat')
            .update({ content })
            .eq('id', id)


        return NextResponse.json({
            success: true,
            message: data,
            error
        })
    } catch (error) {
        return NextResponse.json({
            success: false
        }, { status: 400 })
    }
}

export async function DELETE(req: NextRequest) {
    const { id } = await req.json()
    try {
        const response = await supabase
            .from('chat')
            .delete()
            .eq('id', id)

        return NextResponse.json({
            success: true,
            response
        })
    } catch (error) {
        return NextResponse.json({
            success: false
        }, { status: 400 })
    }
}