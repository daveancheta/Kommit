import { auth } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";
import { supabaseAdmin } from "@/lib/supbase/server";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { content, image } = await req.json()
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        return NextResponse.json({
            success: false,
            message: "Unauthorized. Please sign in to continue."
        }, { status: 400 })
    }

    let image_url: string | null = null

    if (image) {
        const cloud_photo = await cloudinary.uploader.upload(image)
        image_url = cloud_photo.secure_url
    }

    try {
        await supabaseAdmin
            .from('post')
            .insert({
                id: crypto.randomUUID(),
                user_id: session.user.id,
                content,
                image: image_url
            })

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
            .from('post')
            .select(`*, 
                user(*)`)

        return NextResponse.json({
            success: true,
            data
        }, { status: 200 })
    } catch (error) {
        console.log(error)

        return NextResponse.json({
            success: false
        }, { status: 400 })
    }
}