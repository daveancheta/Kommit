"use client"
import { UseChatStore } from '@/app/state/use-chat-store'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useInitials } from '@/hooks/use-initials'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { Bell, Ellipsis, Files, Images, Link, Loader2, Pen, Search, UserRoundPlus, X } from 'lucide-react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { InputGroup, InputGroupAddon, InputGroupInput } from './ui/input-group'
import { UseUserStore } from '@/app/state/use-user-store'
import { useEffect, useRef, useState } from 'react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { UseGroupStore } from '@/app/state/use-group-store'
import { Input } from './ui/input'
import TeamMembers from './team-members'

function ConversationMenu() {
    const { selectedTeam, selectedTeamName, selectedTeamPhoto } = UseChatStore()
    const { user, handleGetUser } = UseUserStore()
    const { handleAddMemberValidation, isSubmitting, handlePhotoUpdateValidation, handleNameUpdateValidation, isValidating } = UseGroupStore()
    const getInitials = useInitials()
    const [username, setUsername] = useState<string | null>(null)
    const [id, setId] = useState<string | null>(null)
    const [image, setImage] = useState<string | null>(null)
    const [search, setSearch] = useState<string | null>(null)
    const [groupPhoto, setGroupPhoto] = useState<any>()
    const [preview, setPreview] = useState<any>()
    const uploadRef = useRef<HTMLInputElement>(null)
    const [groupName, setGroupName] = useState<string>()

    useEffect(() => {
        handleGetUser()
    }, [handleGetUser])

    const handleAddMember = (e: any) => {
        e.preventDefault()

        handleAddMemberValidation(id || "", selectedTeam as string)
    }

    const handlePhotoUpdate = (e: any) => {
        e.preventDefault()

        handlePhotoUpdateValidation(groupPhoto, selectedTeam as string)
    }

    const handleNameUpdate = (e: any) => {
        e.preventDefault()

        handleNameUpdateValidation(groupName as string, selectedTeam as string)
    }

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

                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant='secondary' className='p-4 rounded-full'>
                            <UserRoundPlus className='size-4' />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-xl">
                        <form onSubmit={handleAddMember} className='space-y-4'>
                            <DialogHeader>
                                <DialogTitle>Add Team Member</DialogTitle>
                            </DialogHeader>
                            <FieldGroup>
                                <Field>
                                    <Label htmlFor="name-1">Search</Label>
                                    <InputGroup>
                                        <InputGroupInput placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />
                                        <InputGroupAddon>
                                            <Search />
                                        </InputGroupAddon>
                                    </InputGroup>
                                </Field>
                            </FieldGroup>
                            <div>
                                {username &&
                                    <div>
                                        <h1 className='text-sm mb-4 text-muted-foreground'>Selected Member</h1>
                                        <div key={id} className='flex justify-between items-center p-2 px-4'>
                                            <div className='flex flex-row items-center gap-2'>
                                                <Avatar key={id} className='rounded-full w-15 h-15'>
                                                    {image && image.length > 0
                                                        ? <AvatarImage src={image} alt={username as string} />
                                                        : <AvatarFallback className="rounded-full">{getInitials(username as string)}</AvatarFallback>
                                                    }
                                                </Avatar>
                                                <div>
                                                    <h1>{username}</h1>
                                                </div>
                                            </div>
                                            <Button className='cursor-pointer rounded-full' variant='destructive' onClick={() => {
                                                setUsername(null)
                                                setId(null)
                                                setImage(null)
                                            }}><X /></Button>
                                        </div>
                                    </div>
                                }
                            </div>
                            <div>
                                <h1 className='text-lg font-bold mb-4'>Suggested</h1>
                                <div className='flex flex-col gap-2 items-start'>
                                    {user.slice(0, 5).map((user) =>
                                        <div key={user.id} className={cn('cursor-pointer w-full hover:bg-neutral-800 rounded-md p-2 px-4 duration-300 transition-all ease-in-out', !user.name.toLocaleLowerCase().includes(search?.toLocaleLowerCase() || "") && "hidden")} onClick={() => {
                                            setUsername(user.name)
                                            setId(user.id)
                                            setImage(user.image)
                                        }}>
                                            <div className='flex flex-row items-center gap-2'>
                                                <Avatar key={user.id} className='rounded-full w-15 h-15'>
                                                    {user.image && user.image.length > 0
                                                        ? <AvatarImage src={user.image} alt={user.name as string} />
                                                        : <AvatarFallback className="rounded-full">{getInitials(user.name as string)}</AvatarFallback>
                                                    }
                                                </Avatar>
                                                <div>
                                                    <h1>{user.name}</h1>
                                                    <p className='text-muted-foreground text-xs'>Joined {format(user.created_at, 'MMM dd, yyyy')}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button type="submit" disabled={!username || !id || isSubmitting}>{isSubmitting && <Loader2 className='animate-spin w-4 h-4' />}Add Member</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
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
                        <div className='mb-2'>
                            <AccordionContent>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant='ghost' className='w-full flex justify-start'>
                                            <Pen /> Change Team Name
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-sm">
                                        <form onSubmit={handleNameUpdate} className="space-y-4">
                                            <DialogHeader>
                                                <DialogTitle>Change Team Name</DialogTitle>
                                            </DialogHeader>
                                            <FieldGroup>
                                                <Field>
                                                    <Label htmlFor="name">Team Name</Label>
                                                    <Input type='text' id='name' onChange={(e) => setGroupName(e.target.value)}/>
                                                </Field>
                                            </FieldGroup>
                                            <DialogFooter>
                                                <DialogClose asChild>
                                                    <Button variant="outline" disabled={isValidating}>Cancel</Button>
                                                </DialogClose>
                                                <Button type="submit" disabled={isValidating}>{isValidating && <Loader2 className="animate-spin w-4 h-4" />} Change Name</Button>
                                            </DialogFooter>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            </AccordionContent>
                            <AccordionContent>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant='ghost' className='w-full flex justify-start'>
                                            <Images /> Change Photo
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-sm">
                                        <form onSubmit={handlePhotoUpdate} className="space-y-4">
                                            <DialogHeader>
                                                <DialogTitle>Create Photo</DialogTitle>
                                            </DialogHeader>
                                            <FieldGroup>
                                                <div className="flex justify-center flex-col items-center gap-2">
                                                    <Avatar className="h-40 w-40 rounded-full">
                                                        {groupPhoto
                                                            ? <AvatarImage src={preview} alt={selectedTeamName as string} />
                                                            : selectedTeamPhoto
                                                                ? <AvatarImage src={selectedTeamPhoto} alt={selectedTeamName as string} />
                                                                : <AvatarFallback className="rounded-full">{getInitials(selectedTeamName as string)}</AvatarFallback>
                                                        }
                                                    </Avatar>
                                                    <Button type="button" className="text-xs" onClick={() => uploadRef.current?.click()}>Upload</Button>
                                                </div>
                                                <Field className="hidden">
                                                    <Label htmlFor="photo">Group Photo</Label>
                                                    <input ref={uploadRef} type="file" id="photo" onChange={(e) => {
                                                        const selected = e.target.files?.[0]
                                                        if (selected) {
                                                            setGroupPhoto(selected)
                                                            setPreview(URL.createObjectURL(selected))
                                                        }
                                                    }} />
                                                </Field>
                                            </FieldGroup>
                                            <DialogFooter>
                                                <DialogClose asChild>
                                                    <Button variant="outline" disabled={isValidating}>Cancel</Button>
                                                </DialogClose>
                                                <Button type="submit" disabled={isValidating}>{isValidating && <Loader2 className="animate-spin w-4 h-4" />} change Photo</Button>
                                            </DialogFooter>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            </AccordionContent>
                        </div>
                    </AccordionItem>
                    <AccordionItem value="returns">
                        <AccordionTrigger>Team Members</AccordionTrigger>
                        <TeamMembers />
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