import { create } from "zustand";

interface TaskState {
    handleAddTaskValidation: (user_id: string, group_id: string, description: string) => Promise<void>
}

export const UseTaskStore = create<TaskState>((set) => ({
    handleAddTaskValidation: async (user_id: string, group_id: string, description: string) => {
        try {
            await fetch('/api/group/task/add', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_id, group_id, description })
            })
        } catch (error) {
            console.log(error)
        }
    }
}))