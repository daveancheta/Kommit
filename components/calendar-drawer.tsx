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
import { useRef, useState } from "react"
import { UseMeetingStore } from "@/app/state/use-meeting-store"
import { UseChatStore } from "@/app/state/use-chat-store"

export function CalendarDrawer() {
    const data = [
        {
            id: 1,
            name: "SDLC Metting - one",
            date: "2026-03-23",
            time: "10:00 AM",
            duration: "1 hour",
            status: "confirmed"
        },
        {
            id: 2,
            name: "Cloud Plan Meeting - two",
            date: "2026-03-23",
            time: "10:00 AM",
            duration: "1 hour",
            status: "pending"
        },
        {
            id: 3,
            name: "SDLC Metting - three",
            date: "2026-03-23",
            time: "10:00 AM",
            duration: "1 hour",
            status: "confirmed"
        },
        {
            id: 4,
            name: "Cloud Plan Meeting - four",
            date: "2026-03-23",
            time: "10:00 AM",
            duration: "1 hour",
            status: "pending"
        },
        {
            id: 5,
            name: "SDLC Metting - five",
            date: "2026-03-23",
            time: "10:00 AM",
            duration: "1 hour",
            status: "confirmed"
        },
        {
            id: 6,
            name: "Cloud Plan Meeting - six",
            date: "2026-03-23",
            time: "10:00 AM",
            duration: "1 hour",
            status: "pending"
        },
        {
            id: 7,
            name: "SDLC Metting - five",
            date: "2026-03-23",
            time: "10:00 AM",
            duration: "1 hour",
            status: "confirmed"
        },
        {
            id: 8,
            name: "Cloud Plan Meeting - six",
            date: "2026-03-23",
            time: "10:00 AM",
            duration: "1 hour",
            status: "pending"
        }
    ]
    const scrollRef = useRef<HTMLDivElement>(null)
    const { isSubmitting, handleCreateMeetingValidation } = UseMeetingStore()
    const { selectedTeam } = UseChatStore()
    const [title, setTitle] = useState<string>("")
    const [date, setDate] = useState<string>("")
    const [time, setTime] = useState<string>("")

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
                            {data.map((item) => (
                                <div
                                    key={item.id}
                                    className="snap-start flex flex-col gap-2 rounded-xl border bg-background shadow-xs dark:bg-input/30 dark:border-input p-4 w-full text-left"
                                >
                                    <div className="flex justify-between items-start gap-2">
                                        <h3 className="font-semibold text-sm leading-none">{item.name.trim()}</h3>
                                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full capitalize ${item.status === 'confirmed'
                                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                            : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                            }`}>
                                            {item.status}
                                        </span>
                                    </div>
                                    <div className="flex flex-col text-xs text-muted-foreground mt-1 gap-2">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="size-3.5" />
                                            <span>{item.date} • {item.time}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="size-3.5" />
                                            Duration: {item.duration}
                                        </div>
                                    </div>
                                    <Button variant='outline'>Join</Button>
                                </div>
                            ))
                            }
                        </div>
                        <div className="flex flex-row justify-center gap-2">
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
