import cloudinary from "@/lib/cloudinary";
import { supabaseAdmin } from "@/lib/supbase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { content, image } = await req.json()

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