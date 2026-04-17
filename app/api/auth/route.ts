import { auth } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";
import { supabase } from "@/lib/supbase/cient";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
    const { name, email, bio, profile } = await req.json()
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        return NextResponse.json({
            success: false,
            message: "Unauthorized. Please sign in to continue."
        }, { status: 400 })
    }
    let cloud_photo: any | null = null
    
    if (profile) {
        cloud_photo = await cloudinary.uploader.upload(profile)
    }

    try {
        await supabase
            .from('user')
            .update({
                name,
                email,
                bio,
                image: profile ? cloud_photo.secure_url : session.user.image
            })
            .eq('id', session.user.id)

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