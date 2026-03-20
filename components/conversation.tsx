import React from 'react'

function Coversation({ id }: { id?: string }) {
    return (
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
    )
}

export default Coversation