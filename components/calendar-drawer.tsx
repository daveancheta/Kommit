"use client"

import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Calendar, ChevronLeft, ChevronRight, Clock, Loader2, Loader2Icon, Minus, Plus } from "lucide-react"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useRef, useState } from "react"
import { UseMeetingStore } from "@/app/state/use-meeting-store"
import { UseChatStore } from "@/app/state/use-chat-store"
import MeetingEmptystate from "./meeting-empty-state"
import { format } from "date-fns"
import JoinMeeting from "./join-meeting"

export function CalendarDrawer() {
    const scrollRef = useRef<HTMLDivElement>(null)
    const { isSubmitting, handleCreateMeetingValidation, meeting, handleGetMeeting } = UseMeetingStore()
    const { selectedTeam } = UseChatStore()
    const [title, setTitle] = useState<string>("")
    const [date, setDate] = useState<string>("")
    const [time, setTime] = useState<string>("")

    useEffect(() => {
        handleGetMeeting(selectedTeam as string)
    }, [handleGetMeeting, selectedTeam])

    const scrollToRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 300, behavior: "smooth" })
        }
    }

    const scrollToLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -300, behavior: "smooth" })
        }
    }

    const handleCreateMeeting = (e: any) => {
        e.preventDefault()

        handleCreateMeetingValidation(title, date, time, selectedTeam as string)
    }

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant="ghost"><Calendar className='size-4' /></Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="">
                    <DrawerHeader>
                        <DrawerTitle className="font-bold">Meeting Schedule</DrawerTitle>
                    </DrawerHeader>
                    <div className="p-4 pb-0">
                        <div ref={scrollRef} className="grid grid-flow-col auto-cols-[calc((100%-2.25rem)/4)] gap-3 w-full overflow-x-auto pb-4 snap-x scrollable-div">
                            {
                                meeting.length > 0
                                    ? meeting.map((meeting) => (
                                        <div
                                            key={meeting.id}
                                            className="snap-start flex flex-col gap-2 rounded-xl border bg-background shadow-xs dark:bg-input/30 dark:border-input p-4 w-full text-left"
                                        >
                                            <div className="flex justify-between items-start gap-2">
                                                <h3 className="font-semibold text-sm leading-none">{meeting.title.trim()}</h3>
                                            </div>
                                            <div className="flex flex-col text-xs text-muted-foreground mt-1 gap-2">
                                                <div className="flex items-center gap-1.5">
                                                    <Calendar className="size-3.5" />
                                                    <span>{format(new Date(meeting.date), 'MMMM dd, yyyy')}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <Clock className="size-3.5" />
                                                    Time: {format(new Date(`${meeting.date}T${meeting.time}`), 'hh:mm aa')}
                                                </div>
                                            </div>
                                            <JoinMeeting date={meeting.date} time={meeting.time} created_by={meeting.created_by} />
                                        </div>
                                    ))
                                    : <MeetingEmptystate />
                            }
                        </div>
                        <div className="flex flex-row justify-center gap-2" hidden={meeting.length === 0}>
                            <Button onClick={scrollToLeft} variant='outline'><ChevronLeft /></Button>
                            <Button onClick={scrollToRight} variant='outline'><ChevronRight /></Button>
                        </div>
                    </div>
                    <DrawerFooter className="flex justify-center items-center w-full">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="w-full max-w-sm ">Set a Meeting</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-sm">
                                <form onSubmit={handleCreateMeeting} className="space-y-4">
                                    <DialogHeader>
                                        <DialogTitle>Set a Meeting</DialogTitle>
                                        <DialogDescription>
                                            Fill in the details below to schedule a meeting with your team
                                        </DialogDescription>
                                    </DialogHeader>
                                    <FieldGroup>
                                        <Field>
                                            <Label htmlFor="title">Title</Label>
                                            <Input id="title" type="text" onChange={(e) => setTitle(e.target.value)} />
                                        </Field>
                                        <Field>
                                            <Label htmlFor="date">Date</Label>
                                            <Input id="date" type="date" onChange={(e) => setDate(e.target.value)} />
                                        </Field>
                                        <Field>
                                            <Label htmlFor="time">Time</Label>
                                            <Input id="time" type="time" onChange={(e) => setTime(e.target.value)} />
                                        </Field>
                                    </FieldGroup>
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button variant="outline" disabled={isSubmitting}>Cancel</Button>
                                        </DialogClose>
                                        <Button type="submit" disabled={isSubmitting}>{isSubmitting && <Loader2 className="animate-spin w-4 h-4" />}Create Meeting</Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
