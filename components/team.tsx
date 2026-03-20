"use client"

import { UseGroupStore } from "@/app/state/use-group-store"
import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { supabase } from "@/lib/supbase/cient"
import { useInitials } from "@/hooks/use-initials"

function Teams() {
    const { team, handleGetGroups } = UseGroupStore()
    const getInitials = useInitials()

    useEffect(() => {
        handleGetGroups()
    }, [])

    useEffect(() => {
        const channel = supabase
            .channel('public:members')
            .on('postgres_changes', {
                event: "*",
                schema: "public",
                table: "members"
            },
                async (payload) => {
                    await handleGetGroups()
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [])

    return (
        <div className='flex flex-col gap-4'>
            {team.map((team) => (
                <div key={team?.id} className='flex flex-row items-center gap-2'>
                    <Avatar className="h-12 w-12 rounded-full">
                        {team.group.photo && team.group.photo.length > 0
                            ? <AvatarImage src={team.group.photo} alt={team.group.group_name} />
                            : <AvatarFallback className="rounded-full">{getInitials(team.group.group_name)}</AvatarFallback>
                        }
                    </Avatar>
                    <div className='flex-1 min-w-0'>
                        <div className='flex items-center justify-between gap-2'>
                            <h2 className='font-bold truncate'>{team.group.group_name}</h2>
                            <p className='text-xs text-muted-foreground font-bold shrink-0'>4:31</p>
                        </div>
                        <p className='text-muted-foreground text-sm truncate'>Dave: Hello</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Teams