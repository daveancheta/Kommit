import { create } from "zustand";

interface Task {
    id: string;
    user_id: string;
    group_id: string;
    description: string;
    status: string;
    created_at: string;
    updated_at: string;
    user: {
        id: string;
        name: string;
        email: string;
        image: string;
        birthdate: string;
        created_at: string;
        updated_at: string;
        email_verified: boolean;
    }
}

interface TaskState {
    isSubmitting: boolean;
    tasks: Task[];
    handleAddTaskValidation: (user_id: string, group_id: string, description: string) => Promise<void>;
    handleGetTasks: (group_id: string) => Promise<void>;
}

export const UseTaskStore = create<TaskState>((set) => ({
    isSubmitting: false,
    tasks: [],

    handleAddTaskValidation: async (user_id: string, group_id: string, description: string) => {
        set({ isSubmitting: true })
        try {
            await fetch('/api/group/task', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id, group_id, description })
            })
        } catch (error) {
            console.log(error)
        } finally {
            set({ isSubmitting: false })
        }
    },

    handleGetTasks: async (group_id: string) => {
        try {
            const result = await fetch(`/api/group/task/${group_id}`)

            const res = await result.json()

            set({ tasks: res.data })
        } catch (error) {
            console.log(error)
        }
    }
}))