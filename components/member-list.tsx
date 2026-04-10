"use client"

import { useEffect, useState } from "react"
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
import { UseTaskStore } from "@/app/state/use-task-store"
import { UseChatStore } from "@/app/state/use-chat-store"
import { Skeleton } from "./ui/skeleton"
import { UseAuthStore } from "@/app/state/use-auth-store"

export function MemberList({ members, isFetching }: { members: any[], isFetching: boolean }) {
    const [selectedMember, setSelectedMember] = useState<string | null>(null)
    const getInitials = useInitials()
    const { handleAddTaskValidation, isSubmitting } = UseTaskStore()
    const { selectedTeam } = UseChatStore()
    const [description, setDescription] = useState<string>("")
    const { handleGetSession, auth } = UseAuthStore()

    useEffect(() => {
        handleGetSession()
    }, [handleGetSession])

    const handleAddTask = (e: any) => {
        e.preventDefault()

        handleAddTaskValidation(selectedMember as string, selectedTeam as string, description)
    }
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <div className="flex items-center gap-1.5 cursor-pointer hover:text-foreground/80 transition-colors">
                        <Users className="h-3.5 w-3.5" />
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
                        {isFetching ? (
                            Array.from({ length: 3 }).map((_, i) => (
                                <div className="flex flex-col gap-2 rounded-lg border p-3" key={i}>
                                    <div className="flex items-center gap-3">
                                        <Skeleton className="rounded-full w-10 h-10 shrink-0" />
                                        <div className="flex flex-1 flex-col gap-1.5 py-1">
                                            <Skeleton className="h-4 w-32" />
                                            <Skeleton className="h-3 w-24" />
                                        </div>
                                        <Skeleton className="h-6 w-6 rounded-full shrink-0" />
                                    </div>
                                </div>
                            ))
                        ) : members.map((member) => (
                            <div key={member.id} className="flex flex-col gap-2 rounded-lg border p-3 transition-colors hover:bg-muted/50">
                                <div
                                    className="flex items-center gap-3 cursor-pointer"
                                >
                                    <Avatar className='rounded-full w-10 h-10'>
                                        {member.user.image
                                            ? <AvatarImage src={member.user.image} alt={member.user.name as string} />
                                            : <AvatarFallback className="rounded-full">{getInitials(member.user.name as string)}</AvatarFallback>
                                        }
                                    </Avatar>
                                    <div className="flex flex-1 flex-col">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium">{member.user.name}</span>
                                            {member.user.id === auth?.id && (
                                                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                                                    You
                                                </span>
                                            )}
                                        </div>
                                        <span className="text-xs text-muted-foreground">Backend Developer</span>
                                    </div>
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors" onClick={() => setSelectedMember(selectedMember === member.user.id ? null : member.user.id)}>
                                        <Plus className="h-3.5 w-3.5" />
                                    </div>
                                </div>

                                {selectedMember === member.user.id && (
                                    <form onSubmit={handleAddTask} className="mt-2 flex items-center gap-2 pt-2 border-t animate-in fade-in slide-in-from-top-2">
                                        <input
                                            type="text"
                                            placeholder={`Task for ${member.user.name.split(' ')[0]}...`}
                                            className="flex h-8 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            autoFocus
                                        />
                                        <button
                                            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-8 w-8 shrink-0"

                                            disabled={!description.trim() || isSubmitting}
                                        >
                                            <Send className="h-4 w-4" />
                                        </button>
                                    </form>
                                )}
                            </div>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
