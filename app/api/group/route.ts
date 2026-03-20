import { auth } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";
import { supabase } from "@/lib/supbase/cient";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { group_name, photo } = await req.json()
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

        let photo_url: string | null = null

        if (photo) {
            const cloud_photo = await cloudinary.uploader.upload(photo)
            photo_url = cloud_photo.secure_url
        }

        const { data, error } = await supabase
            .from('group')
            .insert({
                id: crypto.randomUUID(),
                group_name,
                photo: photo_url,
                created_by: session.user.id,
            })
            .select()

        await supabase
            .from('members')
            .insert({
                id: crypto.randomUUID(),
                user_id: session.user.id,
                group_id: data?.[0]?.id,
            })

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
            .from('members')
            .select(`*,
                group (*)
                `)
            .eq('user_id', session.user.id)

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