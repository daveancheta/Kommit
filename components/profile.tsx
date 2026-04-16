'use client'

import { Puzzle } from 'lucide-react'
import React, { useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useInitials } from '@/hooks/use-initials'
import { UseAuthStore } from '@/app/state/use-auth-store'
import { UseGroupStore } from '@/app/state/use-group-store'
import Link from 'next/link'

function Profile() {
    const { handleGetSession, auth } = UseAuthStore()
    const { task, handleGetAuthProfile } = UseAuthStore()
    const { team, handleGetGroups } = UseGroupStore()
    const getInitials = useInitials()

    useEffect(() => {
        handleGetGroups(true)
    }, [handleGetGroups])


    useEffect(() => {
        handleGetAuthProfile()
    }, [handleGetAuthProfile])

    useEffect(() => {
        handleGetSession()
    }, [handleGetSession])

    return (
        <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
            <div className="h-16 bg-linear-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 relative">
                <Avatar className="w-16 h-16 absolute -bottom-8 left-1/2 -translate-x-1/2 border-4 border-white dark:border-zinc-950">
                    {auth?.image && auth.image.length > 0
                        ? <AvatarImage src={auth?.image} />
                        : <AvatarFallback>{getInitials(auth?.name)}</AvatarFallback>
                    }
                </Avatar>
            </div>
            <div className="pt-10 pb-4 px-4 text-center">
                <h2 className="text-base font-semibold hover:underline cursor-pointer">{auth?.name}</h2>
                {auth?.bio &&
                    <p className="text-sm font-medium text-zinc-200 mt-2.5">
                        {auth?.bio}
                    </p>
                }
            </div>

            <div className="border-t border-zinc-100 dark:border-zinc-800/50 py-3">
                <div className="px-4 py-1 flex justify-between hover:bg-zinc-50 dark:hover:bg-zinc-900 cursor-pointer text-xs font-semibold text-zinc-500">
                    <span>Task</span>
                    <span className="text-blue-600 dark:text-blue-400">{task.length}</span>
                </div>
                <div className="px-4 py-1 flex justify-between items-center hover:bg-zinc-50 dark:hover:bg-zinc-900 cursor-pointer text-xs font-semibold text-zinc-500">
                    <div className="flex items-center gap-1">
                        <span>Team</span>
                    </div>
                    <span className="text-blue-600 dark:text-blue-400">{team.length}</span>
                </div>
            </div>

            <div className="border-t border-zinc-100 dark:border-zinc-800/50 p-3 hover:bg-zinc-50 dark:hover:bg-zinc-900 cursor-pointer text-xs">
                <Link href="/team" className="flex items-center gap-2 font-medium">
                    <Puzzle className="w-4 h-4 text-zinc-500" />
                    <span>My Teams</span>
                </Link>
            </div>
        </div>
    )
}

export default Profile