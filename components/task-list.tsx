import { UseChatStore } from "@/app/state/use-chat-store"
import { UseTaskStore } from "@/app/state/use-task-store"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { CheckSquare } from "lucide-react"
import { useEffect } from "react"

export function TaskList() {
    const { handleGetTasks, tasks } = UseTaskStore()
    const { selectedTeam } = UseChatStore()

    useEffect(() => {
        handleGetTasks(selectedTeam as string)
    }, [selectedTeam, handleGetTasks])

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <div className="flex items-center gap-1.5 cursor-pointer">
                        <CheckSquare className="h-3.5 w-3.5" />
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
                        {tasks.map((task) =>
                            <div className="flex flex-col gap-2 rounded-lg border p-4" key={task.id}>
                                <div className="flex items-center justify-between">
                                    <span className="font-semibold text-sm">{task.description}</span>
                                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${
                                        task.status?.toUpperCase() === 'PENDING' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-100 dark:text-yellow-700' :
                                        task.status?.toUpperCase() === 'IN-PROGRESS' || task.status?.toUpperCase() === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-700 dark:bg-blue-100 dark:text-blue-700' :
                                        task.status?.toUpperCase() === 'DONE' ? 'bg-green-100 text-green-700 dark:bg-green-100 dark:text-green-700' :
                                        'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200'
                                    }`}>{task.status}</span>
                                </div>
                                <div className="text-xs text-muted-foreground flex items-center gap-1.5 mt-1">
                                    <span>Assigned to:</span>
                                    <span className="font-medium text-foreground">{task.user.name}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
