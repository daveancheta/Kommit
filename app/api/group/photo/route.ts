import cloudinary from "@/lib/cloudinary";
import { supabase } from "@/lib/supbase/cient";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
    const { photo, group_id } = await req.json()

    try {
        let photo_url: string | null = null

        if (photo) {
            const cloud_photo = await cloudinary.uploader.upload(photo)
            photo_url = cloud_photo.secure_url
        }

        const { error } = await supabase
            .from('group')
            .update({ photo: photo_url })
            .eq('id', group_id)

        return NextResponse.json({
            success: true,
            error
        }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
        }, { status: 400 })
    }
}