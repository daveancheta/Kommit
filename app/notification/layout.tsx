import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notifications",
};

async function layout({ children }: { children: React.ReactNode }) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        redirect('/login')
    }

    return (
        <div>
            {children}
        </div>
    )
}

export default layout
