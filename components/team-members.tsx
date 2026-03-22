import React, { useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Ellipsis, UserX } from 'lucide-react'
import { UseChatStore } from '@/app/state/use-chat-store'
import { useInitials } from '@/hooks/use-initials'
import { UseGroupStore } from '@/app/state/use-group-store'
import { AccordionContent } from './ui/accordion'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { supabase } from '@/lib/supbase/cient'

function TeamMembers() {
    const { selectedTeam } = UseChatStore()
    const { handleGetTeamMembers, members, handleRemoveMemberValidation } = UseGroupStore()
    const getInitials = useInitials()

    useEffect(() => {
        handleGetTeamMembers(selectedTeam as string)
    }, [])

    useEffect(() => {
        const channel = supabase
            .channel("team:members")
            .on('postgres_changes', {
                event: "*",
                schema: "public",
                table: "members"
            },
                async (payload) => {
                    await handleGetTeamMembers(selectedTeam as string)
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [])

    return (
        <div className='flex flex-col gap-2 mb-2'>
            {members.map((members) =>
                <AccordionContent key={members.id}>
                    <div className='flex justify-between items-center'>
                        <div className='flex flex-row items-center gap-2'>
                            <Avatar key={selectedTeam} className='rounded-full w-10 h-10'>
                                {members.user.image
                                    ? <AvatarImage src={members.user.image} alt={members.user.name as string} />
                                    : <AvatarFallback className="rounded-full">{getInitials(members.user.name as string)}</AvatarFallback>
                                }
                            </Avatar>
                            <h1>{members.user.name}</h1>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant='ghost'>
                                    <Ellipsis />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuGroup>
                                    <DropdownMenuItem variant="destructive" onClick={() => handleRemoveMemberValidation(members.user.id, selectedTeam as string)}>
                                        <UserX />
                                        Kick
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </AccordionContent>
            )}
        </div>
    )
}

export default TeamMembers