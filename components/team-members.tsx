import React, { useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Ellipsis } from 'lucide-react'
import { UseChatStore } from '@/app/state/use-chat-store'
import { useInitials } from '@/hooks/use-initials'
import { UseGroupStore } from '@/app/state/use-group-store'
import { AccordionContent } from './ui/accordion'

function TeamMembers() {
    const { selectedTeam, selectedTeamName, selectedTeamPhoto } = UseChatStore()
    const { handleGetTeamMembers, members } = UseGroupStore()
    const getInitials = useInitials()

    useEffect(() => {
        handleGetTeamMembers(selectedTeam as string)
    }, [handleGetTeamMembers, selectedTeam])

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
                        <Button variant='ghost'>
                            <Ellipsis />
                        </Button>
                    </div>
                </AccordionContent>
            )}
        </div>
    )
}

export default TeamMembers