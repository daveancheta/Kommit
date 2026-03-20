import { create } from "zustand";

interface Member {
    id: string,
    user_id: string,
    group_id: string,
    created_at: string,
    string: string,
    group: {
        id: string,
        photo: string,
        created_at: string,
        created_by: string,
        group_name: string,
        updated_at: string
    }
}

interface Groupstate {
    isSubmitting: boolean;
    team: Member[];
    handleCreateGroupValidation: (group: string, photo: File) => Promise<void>;
    handleGetGroups: () => Promise<void>;
}

export const UseGroupStore = create<Groupstate>((set) => ({
    isSubmitting: false,
    team: [],

    handleCreateGroupValidation: async (group_name: string, photo: File) => {
        set({ isSubmitting: true })

        try {
            const base64 = photo ? await new Promise<string>((resolve, reject) => {
                const reader = new FileReader()
                reader.onloadend = () => resolve(reader.result as string)
                reader.onerror = reject
                reader.readAsDataURL(photo)
            }) : null

            await fetch("/api/group", {
                method: "POST",
                headers:  { "Content-Type": "application/json" },
                body: JSON.stringify({ group_name, photo: base64})
            })
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