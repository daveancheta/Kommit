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
        const cloud_photo = await cloudinary.uploader.upload(photo)
        const { data, error } = await supabase
        .from('group')
        .insert({
            id: crypto.randomUUID(),
            group_name,
            photo: cloud_photo.secure_url,
            created_by: session.user.id,
        })

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