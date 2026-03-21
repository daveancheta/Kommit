import { UseChatStore } from '@/app/state/use-chat-store'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useInitials } from '@/hooks/use-initials'
import { Button } from './ui/button'
import { Bell, Files, Images, Link, Pen, Search, UserRoundPlus } from 'lucide-react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

function ConversationMenu() {
    const { selectedTeam, selectedTeamName, selectedTeamPhoto } = UseChatStore()
    const getInitials = useInitials()

    return (
        <div className='bg-neutral-200 dark:bg-neutral-900 p-4 w-100 h-[95vh] border rounded-sm overflow-y-auto'>
            <div className='flex justify-center items-center mt-5'>
                <div className='flex flex-col gap-1 items-center'>
                    <Avatar key={selectedTeam} className='rounded-full w-20 h-20'>
                        {selectedTeamPhoto
                            ? <AvatarImage src={selectedTeamPhoto} alt={selectedTeamName as string} />
                            : <AvatarFallback className="rounded-full">{getInitials(selectedTeamName as string)}</AvatarFallback>
                        }
                    </Avatar>
                    <div className='flex flex-col items-center'>
                        <h1 className='font-medium'>{selectedTeamName}</h1>
                        <p className='text-muted-foreground text-xs'>5 Members</p>
                    </div>
                </div>
            </div>

            <div className='flex justify-center mt-5 gap-2'>
                <Button variant='secondary' className='p-4 rounded-full'>
                    <Bell className='size-4' />
                </Button>
                <Button variant='secondary' className='p-4 rounded-full'>
                    <Search className='size-4' />
                </Button>
                <Button variant='secondary' className='p-4 rounded-full'>
                    <UserRoundPlus className='size-4' />
                </Button>
            </div>

            <div>
                <Accordion
                    type="single"
                    collapsible
                    defaultValue="shipping"
                    className="max-w-lg"
                >
                    <AccordionItem value="shipping">
                        <AccordionTrigger>Customize Team</AccordionTrigger>
                        <AccordionContent>
                            <Button variant='ghost' className='w-full flex justify-start'>
                                <Pen /> Change Team Name
                            </Button>
                        </AccordionContent>
                        <AccordionContent>
                            <Button variant='ghost' className='w-full flex justify-start'>
                                <Images /> Change Photo
                            </Button>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="returns">
                        <AccordionTrigger>Team Members</AccordionTrigger>
                        <AccordionContent>
                            Display Team here
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="support">
                        <AccordionTrigger>Media, Files, and Links</AccordionTrigger>
                        <AccordionContent>
                            <Button variant='ghost' className='w-full flex justify-start'>
                                <Images /> Media
                            </Button>
                        </AccordionContent>
                        <AccordionContent>
                            <Button variant='ghost' className='w-full flex justify-start'>
                                <Files /> Files
                            </Button>
                        </AccordionContent>
                        <AccordionContent>
                            <Button variant='ghost' className='w-full flex justify-start'>
                                <Link /> Links
                            </Button>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    )
}

export default ConversationMenu