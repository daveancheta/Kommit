import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { CheckSquare } from "lucide-react"

export function TaskList() {
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <div className="flex items-center gap-1.5 cursor-pointer">
                        <CheckSquare className="h-3.5 w-3.5" />
                        <span>12</span>
                    </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Team Tasks</DialogTitle>
                        <DialogDescription>
                            Current tasks assigned to this team.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-3 py-4">
                        <div className="flex flex-col gap-2 rounded-lg border p-4">
                            <div className="flex items-center justify-between">
                                <span className="font-semibold text-sm">Fix bug in this system</span>
                                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900 dark:text-blue-200">In Progress</span>
                            </div>
                            <div className="text-xs text-muted-foreground flex items-center gap-1.5 mt-1">
                                <span>Assigned to:</span>
                                <span className="font-medium text-foreground">John Doe</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 rounded-lg border p-4">
                            <div className="flex items-center justify-between">
                                <span className="font-semibold text-sm">Update landing page design</span>
                                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300">To Do</span>
                            </div>
                            <div className="text-xs text-muted-foreground flex items-center gap-1.5 mt-1">
                                <span>Assigned to:</span>
                                <span className="font-medium text-foreground">Jane Smith</span>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
