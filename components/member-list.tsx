"use client"

import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Users, Plus, Send } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { useInitials } from "@/hooks/use-initials"

export function MemberList({ members }: { members: any[] }) {
    const [selectedMember, setSelectedMember] = useState<number | null>(null)
    const [taskInput, setTaskInput] = useState("")
    const getInitials = useInitials()

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <div className="flex items-center gap-1.5 cursor-pointer hover:text-foreground/80 transition-colors">
                        <Users className="h-3.5 w-3.5" />
                        <span className="text-sm font-medium">4</span>
                    </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Team Members</DialogTitle>
                        <DialogDescription>
                            Select a member to assign them a new task.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-3 py-4 max-h-[60vh] overflow-y-auto pr-2">
                        {members.map((member) => (
                            <div key={member.id} className="flex flex-col gap-2 rounded-lg border p-3 transition-colors hover:bg-muted/50">
                                <div
                                    className="flex items-center gap-3 cursor-pointer"
                                    onClick={() => setSelectedMember(selectedMember === member.id ? null : member.id)}
                                >
                                    <Avatar className='rounded-full w-10 h-10'>
                                        {member.user.image
                                            ? <AvatarImage src={member.user.image} alt={member.user.name as string} />
                                            : <AvatarFallback className="rounded-full">{getInitials(member.user.name as string)}</AvatarFallback>
                                        }
                                    </Avatar>
                                    <div className="flex flex-1 flex-col">
                                        <span className="text-sm font-medium">{member.user.name}</span>
                                        <span className="text-xs text-muted-foreground">Backend Developer</span>
                                    </div>
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors" >
                                        <Plus className="h-3.5 w-3.5" />
                                    </div>
                                </div>

                                {selectedMember === member.id && (
                                    <div className="mt-2 flex items-center gap-2 pt-2 border-t animate-in fade-in slide-in-from-top-2">
                                        <input
                                            type="text"
                                            placeholder={`Task for ${member.user.name.split(' ')[0]}...`}
                                            className="flex h-8 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                            value={taskInput}
                                            onChange={(e) => setTaskInput(e.target.value)}
                                            
                                            autoFocus
                                        />
                                        <button
                                            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-8 w-8 shrink-0"
                                            
                                            disabled={!taskInput.trim()}
                                        >
                                            <Send className="h-4 w-4" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
