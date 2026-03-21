"use client"

import React, { use, useEffect, useRef, useState } from 'react'
import { Field } from './ui/field'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupText, InputGroupTextarea } from './ui/input-group'
import { EllipsisVertical, Send, UserRoundPlus, Video } from 'lucide-react'
import { UseChatStore } from '@/app/state/use-chat-store'
import ConversationEmptyState from './conversation-empty-state'
import { supabase } from '@/lib/supbase/cient'
import { cn } from '@/lib/utils'
import { UseAuthStore } from '@/app/state/use-auth-store'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useInitials } from '@/hooks/use-initials'
import { Button } from './ui/button'
import { AnimatePresence, motion } from "motion/react"

function Conversation() {
    const { selectedTeam, selectedTeamName, handleGetMessages, messages, handleSendMessageValidation, isSubmitting, selectedTeamPhoto } = UseChatStore()
    const { handleGetSession, auth } = UseAuthStore()
    const getInitials = useInitials()
    const [content, setContent] = useState<string>("")
    const bottomRef = useRef<HTMLDivElement>(null)
    const [isActive, setIsActive] = useState<boolean>(false)

    console.log(selectedTeamPhoto)

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" })
        }
    })

    const handleSendMessage = (e: any) => {
        e.preventDefault()

        handleSendMessageValidation(content, selectedTeam as string)

        setContent("")
    }

    useEffect(() => {
        handleGetSession()
    }, [handleGetSession])

    useEffect(() => {
        handleGetMessages(selectedTeam as string)
    }, [selectedTeam])

    useEffect(() => {
        const channel = supabase
            .channel("public:chat")
            .on("postgres_changes", {
                event: '*',
                schema: 'public',
                table: 'chat'
            },
                async (payload) => {
                    await handleGetMessages(selectedTeam as string)
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [selectedTeam])

    return (
        <div className='w-full flex flex-row gap-2 overflow-hidden'>
            <div className='w-full h-[95vh] border rounded-sm overflow-y-auto z-10 bg-neutral-200 dark:bg-neutral-900 flex flex-col justify-between'>
                {!selectedTeam
                    ? <ConversationEmptyState />
                    : <>
                        <div className='flex justify-between items-center'>
                            <div className='flex flex-row gap-4 items-center p-4'>
                                <Avatar key={selectedTeam} className="h-12 w-12 rounded-full">
                                    {selectedTeamPhoto !== null
                                        ? <AvatarImage src={selectedTeamPhoto as string} alt={selectedTeam} />
                                        : <AvatarFallback className="rounded-full">{getInitials(selectedTeamName as string)}</AvatarFallback>
                                    }
                                </Avatar>
                                <div>
                                    <h1 className='font-bold text-lg'>{selectedTeamName}</h1>
                                    <p className='text-muted-foreground text-sm'>5 Members</p>
                                </div>
                            </div>
                            <div className='flex flex-row'>
                                <Button variant="ghost"><Video className='size-4' /></Button>
                                <Button className='mr-10' variant="ghost" onClick={() => setIsActive(!isActive)}><EllipsisVertical className='size-4' /></Button>
                            </div>
                        </div>
                        <div className='border-b-black border'></div>
                        <div className='flex-1 p-8 flex flex-col gap-2 overflow-auto scrollable-div'>
                            {messages.map((msg) => (
                                <div key={msg.id}>
                                    {msg.user.id === 'Xki9FRjvcZZypkUXt8YLBvwariNAG3qNu' &&
                                        <div className='flex justify-center'>
                                            <p>
                                                {msg.content}
                                            </p>
                                        </div>
                                    }

                                    {msg.user.id === auth?.id
                                        ? <div className={cn('flex justify-end', msg.user.id === 'Xki9FRjvcZZypkUXt8YLBvwariNAG3qNu' && 'hidden')}>
                                            <div className='gap-1'>
                                                <div className='flex flex-row gap-2 items-end'>
                                                    <div className='flex flex-col gap-1'>
                                                        <h1 className='text-xs text-muted-foreground text-end mr-1'>You</h1>
                                                        <span className='bg-black dark:bg-white px-4 py-2.5 rounded-tl-2xl rounded-bl-2xl rounded-br-2xl rounded-tr-sm text-white dark:text-black w-fit max-w-sm break-all'>
                                                            {msg.content}
                                                        </span>
                                                    </div>
                                                    <Avatar className='rounded-full w-8 h-8'>
                                                        {msg.user.image && msg.user.image.length > 0
                                                            ? <AvatarImage src={msg.user.image} alt={msg.user.name} />
                                                            : <AvatarFallback className="rounded-full">{getInitials(msg.user.name)}</AvatarFallback>
                                                        }
                                                    </Avatar>

                                                </div>
                                            </div>
                                        </div>
                                        : <div className={cn('flex justify-start', msg.user.id === 'Xki9FRjvcZZypkUXt8YLBvwariNAG3qNu' && 'hidden')}>
                                            <div className='flex flex-col gap-1'>
                                                <div className='flex flex-row gap-2 items-end'>
                                                    <Avatar className='rounded-full w-8 h-8'>
                                                        {msg.user.image && msg.user.image.length > 0
                                                            ? <AvatarImage src={msg.user.image} alt={msg.user.name} />
                                                            : <AvatarFallback className="rounded-full">{getInitials(msg.user.name)}</AvatarFallback>
                                                        }
                                                    </Avatar>
                                                    <div className='flex flex-col'>
                                                        <h1 className='text-xs text-muted-foreground ml-1'>{msg.user.name}</h1>
                                                        <span className='bg-white dark:bg-black px-4 py-2.5 rounded-tl-sm rounded-bl-2xl rounded-br-2xl rounded-tr-2xl text-black dark:text-white w-fit max-w-sm break-all'>
                                                            {msg.content}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>}
                                </div>
                            ))}
                            <div ref={bottomRef}></div>
                        </div>
                        <form onSubmit={handleSendMessage}>
                            <Field className='p-2'>
                                <InputGroup className='bg-white'>
                                    <InputGroupTextarea
                                        id="block-end-textarea"
                                        placeholder="Write a message..."
                                        onChange={(e) => setContent(e.target.value)}
                                        value={content}
                                        className='break-all'
                                    />
                                    <InputGroupAddon align="block-end">
                                        <InputGroupText>0/280</InputGroupText>
                                        <InputGroupButton type='submit' variant="default" size="sm" className="ml-auto" disabled={isSubmitting}>
                                            <Send />
                                        </InputGroupButton>
                                    </InputGroupAddon>
                                </InputGroup>
                            </Field>
                        </form>
                    </>
                }
            </div >
            <AnimatePresence>
                {isActive &&
                    <motion.div
                        initial={{ x: 700 }}
                        animate={{ x: 0 }}
                        exit={{ x: 700 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}>
                        <div className='bg-neutral-200 dark:bg-neutral-900 p-4 w-100 h-[95vh] border rounded-sm overflow-y-auto'></div>
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    )
}

export default Conversation