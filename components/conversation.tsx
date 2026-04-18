"use client"

import React, { useEffect, useRef, useState } from 'react'
import { Field } from './ui/field'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupText, InputGroupTextarea } from './ui/input-group'
import { EllipsisVertical, Send } from 'lucide-react'
import { UseChatStore } from '@/app/state/use-chat-store'
import ConversationEmptyState from './conversation-empty-state'
import { supabase } from '@/lib/supbase/cient'
import { cn } from '@/lib/utils'
import { UseAuthStore } from '@/app/state/use-auth-store'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useInitials } from '@/hooks/use-initials'
import { Button } from './ui/button'
import { AnimatePresence, motion } from "motion/react"
import ConversationMenu from './conversation-menu'
import { CalendarDrawer } from './calendar-drawer'
import MessageSkeleton from './message-skeleton'

function Conversation() {
    const { selectedTeam, selectedTeamName, handleGetMessages, messages, handleSendMessageValidation, isSubmitting, selectedTeamPhoto, isLoading } = UseChatStore()
    const { handleGetSession, auth } = UseAuthStore()
    const getInitials = useInitials()
    const [content, setContent] = useState<string>("")
    const bottomRef = useRef<HTMLDivElement>(null)
    const [isActive, setIsActive] = useState<boolean>(false)
    const audioRef = useRef<HTMLAudioElement | null>(null)

    useEffect(() => {
        audioRef.current = new Audio("/sound/message-sound.mp3")
    }, [])

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" })
        }
    })

    const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        handleSendMessageValidation(content, selectedTeam as string)

        setContent("")
    }

    useEffect(() => {
        handleGetSession()
    }, [handleGetSession])

    useEffect(() => {
        handleGetMessages(selectedTeam as string, true)
    }, [selectedTeam])

    useEffect(() => {
        const channel = supabase
            .channel("public:chat")
            .on("postgres_changes", {
                event: '*',
                schema: 'public',
                table: 'chat'
            },
                async (payload: any) => {
                    await handleGetMessages(selectedTeam as string, false)
                    if (payload.new.user_id !== auth?.id) {
                        audioRef.current?.play()
                    }
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [selectedTeam])

    return (
        <div className="flex h-full w-full gap-4 overflow-hidden">
            <section className="flex h-full min-w-0 flex-1 flex-col overflow-hidden rounded-2xl border bg-background shadow-sm">
                {!selectedTeam
                    ? <ConversationEmptyState />
                    : <>
                        <header className="flex items-center justify-between gap-3 border-b px-4 py-3">
                            <div className="flex min-w-0 items-center gap-3">
                                <Avatar key={selectedTeam} className="h-12 w-12 rounded-full">
                                    {selectedTeamPhoto !== null
                                        ? <AvatarImage src={selectedTeamPhoto as string} alt={selectedTeam} />
                                        : <AvatarFallback className="rounded-full">{getInitials(selectedTeamName as string)}</AvatarFallback>
                                    }
                                </Avatar>
                                <div className="min-w-0">
                                    <h1 className="truncate text-base font-semibold tracking-tight">{selectedTeamName}</h1>
                                    <p className="truncate text-xs text-muted-foreground">Team chat</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <CalendarDrawer />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setIsActive(!isActive)}
                                    aria-label="Open conversation menu"
                                >
                                    <EllipsisVertical className="size-4" />
                                </Button>
                            </div>
                        </header>

                        <div className="scrollable-div flex-1 overflow-auto bg-background px-4 py-4">
                            {isLoading
                                ? <MessageSkeleton />
                                : messages.map((msg) => (
                                    <div key={msg.id}>
                                        {msg.user.id === 'wM4Zfdo3hRLttz3h4rWsQ5HceIgoGryL' &&
                                            <div className='flex justify-center'>
                                                <p className='text-sm text-muted-foreground'>
                                                    {msg.content}
                                                </p>
                                            </div>
                                        }
                                        {msg.user.id === auth?.id
                                            ? <div className={cn('flex justify-end', msg.user.id === 'wM4Zfdo3hRLttz3h4rWsQ5HceIgoGryL' && 'hidden')}>
                                                <div className='gap-1'>
                                                    <div className='flex flex-row gap-2 items-end'>
                                                        <div className='flex flex-col gap-1'>
                                                            <h1 className='text-xs text-muted-foreground text-end mr-1'>You</h1>
                                                            <span className='bg-foreground px-4 py-2.5 rounded-tl-2xl rounded-bl-2xl rounded-br-2xl rounded-tr-sm text-background w-fit max-w-sm wrap-break-word shadow-sm'>
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
                                            : <div className={cn('flex justify-start', msg.user.id === 'wM4Zfdo3hRLttz3h4rWsQ5HceIgoGryL' && 'hidden')}>
                                                <div className='flex flex-col gap-1'>
                                                    <div className='flex flex-row gap-2 items-end'>
                                                        <Avatar className='rounded-full w-8 h-8'>
                                                            {msg.user.image && msg.user.image.length > 0
                                                                ? <AvatarImage src={msg.user.image} alt={msg.user.name} />
                                                                : <AvatarFallback className="rounded-full">{getInitials(msg.user.name)}</AvatarFallback>
                                                            }
                                                        </Avatar>
                                                        <div className='flex flex-col gap-1'>
                                                            <h1 className='text-xs text-muted-foreground ml-1'>{msg.user.name.split(' ')[0]} {msg.user.name.split(' ')[1]}</h1>
                                                            <span className='bg-background px-4 py-2.5 rounded-tl-sm rounded-bl-2xl rounded-br-2xl rounded-tr-2xl text-foreground w-fit max-w-sm wrap-break-word border shadow-sm'>
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

                        <form onSubmit={handleSendMessage} className="border-t bg-background p-3">
                            <Field>
                                <InputGroup className="bg-background">
                                    <InputGroupTextarea
                                        id="block-end-textarea"
                                        placeholder="Write a message..."
                                        onChange={(e) => setContent(e.target.value)}
                                        value={content}
                                        className="min-h-[44px] resize-none w-full wrap-break-word whitespace-pre-wrap overflow-hidden"
                                        style={{ overflowWrap: "anywhere" }}
                                        maxLength={280}
                                    />
                                    <InputGroupAddon align="block-end">
                                        <InputGroupText>{content.length}/280</InputGroupText>
                                        <InputGroupButton type='submit' variant="default" size="sm" className="ml-auto" disabled={isSubmitting || content.trim().length === 0}>
                                            <Send className="size-4" />
                                        </InputGroupButton>
                                    </InputGroupAddon>
                                </InputGroup>
                            </Field>
                        </form>
                    </>
                }
            </section >
            <AnimatePresence>
                {isActive &&
                    <motion.div
                        className="hidden h-full shrink-0 md:block"
                        initial={{ x: 700 }}
                        animate={{ x: 0 }}
                        exit={{ x: 700 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}>
                        <ConversationMenu />
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    )
}

export default Conversation