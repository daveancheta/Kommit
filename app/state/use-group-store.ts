import { create } from "zustand";

interface Groupstate {
    isSubmitting: boolean;
    team: any[];
    handleCreateGroupValidation: (group: string, photo: File) => Promise<void>;
    handleGetGroups: () => Promise<void>;
}

export const UseGroupStore = create<Groupstate>((set) => ({
    isSubmitting: false,
    team: [],

    handleCreateGroupValidation: async (group_name: string, photo: File) => {
        set({ isSubmitting: true })

        try {
            if (photo) {
                const reader = new FileReader()

                reader.onloadend = async () => {
                    const base64 = reader.result as string

                    await fetch("/api/group", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ group_name, photo: base64 })
                    })
                }

                reader.readAsDataURL(photo)
            }

            if (!photo) {
                await fetch("/api/group", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ group_name, photo: "" })
                })
            }

        } catch (error) {
            console.log(error)
        } finally {
            set({ isSubmitting: false })
        }
    },

    handleGetGroups: async () => {
        try {
            const result = await fetch("/api/group")

            const res = await result.json()

            set({ team: res.data })
        } catch (error) {
            console.log(error)
        }
    }
}))