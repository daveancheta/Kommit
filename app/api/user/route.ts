import { auth } from "@/lib/auth";
import { supabase } from "@/lib/supbase/cient";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
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
            .from('user')
            .select()
            .not('id', 'in', `("${session.user.id}","wM4Zfdo3hRLttz3h4rWsQ5HceIgoGryL")`)

        return NextResponse.json({
            success: true,
            data,
            error
        }, { status: 200 })
    } catch (error) {
        return NextResponse.json({
            success: false,
        }, { status: 400 })
    }
}