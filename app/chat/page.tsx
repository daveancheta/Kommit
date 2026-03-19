import Sidebar from '@/components/sidebar-provider'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupText, InputGroupTextarea } from '@/components/ui/input-group'
import { useInitials } from '@/hooks/use-initials'
import { Link2, Send } from 'lucide-react'
import React from 'react'


function page() {
    const getInitials = useInitials()
    const team = [
        {
            id: 1,
            name: "Team Dev 1",
            message: "Dave: Good morning",
            createdAt: "4:31",
            image: "https://scx2.b-cdn.net/gfx/news/hires/2019/2-nature.jpg"
        },
        {
            id: 2,
            name: "Team Dev 2",
            message: "Dave: Good morning",
            createdAt: "4:31",
            image: "https://images.discerningassets.com/image/upload/q_auto:best/c_limit,w_1000/v1703687947/vaddn4iaggw0uhc8ag5b.jpg"
        },
        {
            id: 3,
            name: "Team Dev 3",
            message: "Dave: Good morning",
            createdAt: "4:31",
            image: "https://images.newscientist.com/wp-content/uploads/2023/02/07104439/SEI_142739270.jpg"
        },
        {
            id: 4,
            name: "Team Dev 4",
            message: "Dave: Good morning",
            createdAt: "4:31",
            image: "https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/7d6a5525-dc47-58ab-bc9c-8521064fb70f/01a84265-e09c-5682-92ce-681c89a1afe2.jpg"
        },
        {
            id: 5,
            name: "Team Dev 5",
            message: "Dave: Good morning",
            createdAt: "4:31",
            image: "https://st.perplexity.ai/estatic/0b226c450798410ac541646c86ec31afd840e5beab817a5d84fa821e7db61981ec84c3b4a3f072a7a2e1899c9fb06c6e11a12934167c07458e82cf689efe5b7b49928e6077ec93158f11e2348cba156c490ac9fd8ec2c0722031ffe68c116fc0"
        },
        {
            id: 6,
            name: "Team Dev 6",
            message: "Dave: Good morning",
            createdAt: "4:31",
            image: "https://www.aaronreedphotography.com/images/xl/aspen-road-autumn-telluride-photography.jpg"
        },
        {
            id: 7,
            name: "Team Dev 7",
            message: "Dave: Good morning",
            createdAt: "4:31",
            image: "https://s3-eu-north-1.amazonaws.com/py3.visitsweden.com/original_images/20180730-gsta_reiland-sunrays_in_a_pine_forest-6901-2_CMSTemplate.jpg"
        },
    ]


    return (
        <Sidebar>
            <div className='flex flex-row gap-2'>
                <div className='bg-background p-4 w-130 h-[95vh] border rounded-sm overflow-y-auto'>
                    <header>
                        <h1 className='text-lg'>Chats</h1>
                    </header>
                    <hr className='mb-4' />
                    <div className='flex flex-col gap-4'>
                        {team.map((team) => (
                            <div key={team.id} className='flex flex-row items-center gap-2'>
                                <Avatar className="h-12 w-12 rounded-full">
                                    {team.image && team.image.length > 0
                                        ? <AvatarImage src={team.image} alt={team.name} />
                                        : <AvatarFallback className="rounded-full">{getInitials(team.name)}</AvatarFallback>
                                    }
                                </Avatar>
                                <div className='flex-1 min-w-0'>
                                    <div className='flex items-center justify-between gap-2'>
                                        <h2 className='font-bold truncate'>{team.name}</h2>
                                        <p className='text-xs text-muted-foreground font-bold shrink-0'>{team.createdAt}</p>
                                    </div>
                                    <p className='text-muted-foreground text-sm truncate'>{team.message}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='w-full h-[95vh] border rounded-sm overflow-y-auto z-10 bg-gray-200 flex flex-col justify-between'>
                    <div className='flex flex-row gap-4 items-center p-4'>
                        <img className='w-15 h-15 rounded-full' src="https://s3-eu-north-1.amazonaws.com/py3.visitsweden.com/original_images/20180730-gsta_reiland-sunrays_in_a_pine_forest-6901-2_CMSTemplate.jpg" alt="" />
                        <div>
                            <h1 className='font-bold text-lg'>Team Dev 1</h1>
                            <p className='text-muted-foreground text-sm'>5 Members</p>
                        </div>
                    </div>
                    <div className='border-b-black border'></div>
                    <div className='flex-1 p-8 flex flex-col gap-2'>
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
                    </Field>
                </div>
            </div>
        </Sidebar>
    )
}

export default page