import { create } from "zustand";

interface TaskState {
    isSubmitting: boolean;
    handleAddTaskValidation: (user_id: string, group_id: string, description: string) => Promise<void>;
}

export const UseTaskStore = create<TaskState>((set) => ({
    isSubmitting: false,
    
    handleAddTaskValidation: async (user_id: string, group_id: string, description: string) => {
        set({ isSubmitting: true })
        try {
            await fetch('/api/group/task', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_id, group_id, description })
            })
        } catch (error) {
            console.log(error)
        } finally {
            set({ isSubmitting: false })
        }
    }
}))