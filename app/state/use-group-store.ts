import { create } from "zustand";

interface Groupstate {
    isSubmitting: boolean;
    handleCreateGroupValidation: (group: string) => Promise<void>;
}

export const UseGroupStore = create<Groupstate>((set) => ({
    isSubmitting: false,

    handleCreateGroupValidation: async (group_name: string) => {
        set({ isSubmitting: true })

        try {
            await fetch("/api/group", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ group_name })
            })
        } catch (error) {
            console.log(error)
        }
    }
}))