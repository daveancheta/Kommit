"use client"

import React from 'react'
import { Field } from './ui/field'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupText, InputGroupTextarea } from './ui/input-group'
import { Send } from 'lucide-react'
import { UseChatStore } from '@/app/state/use-chat-store'
import CoversationEmptyState from './conversation-empty-state'
import ConversationEmptyState from './conversation-empty-state'

function Conversation() {
    const { selectedTeam } = UseChatStore()

    return (
        <div className='w-full h-[95vh] border rounded-sm overflow-y-auto z-10 bg-neutral-200 dark:bg-neutral-900 flex flex-col justify-between'>
            {!selectedTeam
                ? <ConversationEmptyState />
                : <>
                    <div className='flex flex-row gap-4 items-center p-4'>
                        <img className='w-15 h-15 rounded-full' src="https://s3-eu-north-1.amazonaws.com/py3.visitsweden.com/original_images/20180730-gsta_reiland-sunrays_in_a_pine_forest-6901-2_CMSTemplate.jpg" alt="" />
                        <div>
                            <h1 className='font-bold text-lg'>Team Dev 1</h1>
                            <p className='text-muted-foreground text-sm'>5 Members</p>
                        </div>
                    </div>
                    <div className='border-b-black border'></div>
                    <div className='flex-1 p-8 flex flex-col gap-2 overflow-y-auto'>
                        <div className='flex justify-start'>
                            <div className='flex flex-col gap-1'>
                                <div className='flex flex-row gap-2 items-end'>
                                    <img className='w-8 h-8 rounded-full' src="https://avatars.githubusercontent.com/u/153621050?v=4" alt="" />

                                    <div className='flex flex-col'>
                                        <h1 className='text-xs text-muted-foreground ml-1'>Dave</h1>
                                        <span className='bg-white dark:bg-black px-4 py-2.5 rounded-tl-sm rounded-bl-2xl rounded-br-2xl rounded-tr-2xl text-black dark:text-white'>
                                            Hello, How are you?
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-end'>
                            <div className='flex flex-col gap-1'>
                                <div className='flex flex-row gap-2 items-end'>
                                    <div className='flex flex-col'>
                                        <h1 className='text-xs text-muted-foreground text-end mr-1'>You</h1>
                                        <span className='bg-black dark:bg-white px-4 py-2.5 rounded-tl-2xl rounded-bl-2xl rounded-br-2xl rounded-tr-sm text-white dark:text-black'>
                                            Hello, How are you?
                                        </span>
                                    </div>
                                    <img className='w-8 h-8 rounded-full' src="https://avatars.githubusercontent.com/u/153621050?v=4" alt="" />

                                </div>
                            </div>
                        </div>
                    </div>
                    <Field className='p-2'>
                        <InputGroup className='bg-white'>
                            <InputGroupTextarea
                                id="block-end-textarea"
                                placeholder="Write a message..."
                            />
                            <InputGroupAddon align="block-end">
                                <InputGroupText>0/280</InputGroupText>
                                <InputGroupButton variant="default" size="sm" className="ml-auto">
                                    <Send />
                                </InputGroupButton>
                            </InputGroupAddon>
                        </InputGroup>
                    </Field></>
            }
        </div>
    )
}

export default Conversation