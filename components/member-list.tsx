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

const STATIC_MEMBERS = [
    { id: 1, name: "John Doe", role: "Frontend Developer", avatar: "JD" },
    { id: 2, name: "Jane Smith", role: "Backend Developer", avatar: "JS" },
    { id: 3, name: "Alice Johnson", role: "UI/UX Designer", avatar: "AJ" },
    { id: 4, name: "Bob Brown", role: "Project Manager", avatar: "BB" },
]

export function MemberList() {
    const [selectedMember, setSelectedMember] = useState<number | null>(null)
    const [taskInput, setTaskInput] = useState("")

    const handleAssignTask = (memberId: number) => {
        // Here you would normally handle the submission (e.g., API call)
        console.log(`Assigned task "${taskInput}" to member ${memberId}`)
        setTaskInput("")
        setSelectedMember(null)
    }

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
                        {STATIC_MEMBERS.map((member) => (
                            <div key={member.id} className="flex flex-col gap-2 rounded-lg border p-3 transition-colors hover:bg-muted/50">
                                <div 
                                    className="flex items-center gap-3 cursor-pointer"
                                    onClick={() => setSelectedMember(selectedMember === member.id ? null : member.id)}
                                >
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                                        {member.avatar}
                                    </div>
                                    <div className="flex flex-1 flex-col">
                                        <span className="text-sm font-medium">{member.name}</span>
                                        <span className="text-xs text-muted-foreground">{member.role}</span>
                                    </div>
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                                        <Plus className="h-3.5 w-3.5" />
                                    </div>
                                </div>
                                
                                {selectedMember === member.id && (
                                    <div className="mt-2 flex items-center gap-2 pt-2 border-t animate-in fade-in slide-in-from-top-2">
                                        <input
                                            type="text"
                                            placeholder={`Task for ${member.name.split(' ')[0]}...`}
                                            className="flex h-8 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                            value={taskInput}
                                            onChange={(e) => setTaskInput(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' && taskInput.trim()) {
                                                    handleAssignTask(member.id)
                                                }
                                            }}
                                            autoFocus
                                        />
                                        <button 
                                            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-8 px-3"
                                            onClick={() => {
                                                if (taskInput.trim()) {
                                                    handleAssignTask(member.id)
                                                }
                                            }}
                                            disabled={!taskInput.trim()}
                                        >
                                            <Send className="h-3.5 w-3.5" />
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
