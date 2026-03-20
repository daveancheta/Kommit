"use client"

import { UseGroupStore } from "@/app/state/use-group-store"
import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { supabase } from "@/lib/supbase/cient"
import { useInitials } from "@/hooks/use-initials"
import { UseChatStore } from "@/app/state/use-chat-store"
import { cn } from "@/lib/utils"

function Teams() {
    const { team, handleGetGroups } = UseGroupStore()
    const { selectedTeam, setSelectedTeam, setSelectedTeamName, setSelectedTeamPhoto } = UseChatStore()
    const getInitials = useInitials()

    useEffect(() => {
        handleGetGroups()
    }, [])

    useEffect(() => {
        const membersChannel = supabase
            .channel('team:members')
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

        const chatChannel = supabase
            .channel('team:chat')
            .on('postgres_changes', {
                event: '*',
                schema: "public",
                table: 'chat',
            },
                async (payload) => {
                    await handleGetGroups()
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(membersChannel)
            supabase.removeChannel(chatChannel)
        }
    }, [])

    return (
        <div className='flex flex-col gap-4'>
            {team.map((team) => (
                <div key={team.id} className={cn('flex flex-row items-center gap-2 p-2 px-4',
                    team.group.id === selectedTeam && "bg-neutral-800 rounded-xl"
                )} onClick={() => {
                    setSelectedTeam(team.group.id)
                    setSelectedTeamName(team.group.group_name)
                    setSelectedTeamPhoto(team.group.photo as any ?? null)
                }}>
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
                        <p className={cn('text-muted-foreground text-sm truncate',
                            !team.group.chat[team.group.chat.length - 1]?.user?.name && 'hidden'
                        )}>{team.group.chat[team.group.chat.length - 1]?.user?.name}: {team.group.chat[team.group.chat.length - 1]?.content}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Teams