import { sileo } from "sileo";
import { create } from "zustand";

interface Team {
    id: string;
    user_id: string;
    group_id: string;
    created_at: string;
    string: string;
    group: {
        id: string;
        photo: string;
        created_at: string;
        created_by: string;
        group_name: string;
        updated_at: string;
        chat: {
            id: string;
            content: string;
            user_id: string;
            group_id: string;
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
                email_verified: string;
            };
        }[];
    }
}

interface Member {
    id: string;
    user_id: string;
    group_id: string;
    created_at: string;
    string: string;
    group: {
        id: string;
        photo: string;
        created_at: string;
        created_by: string;
        group_name: string;
        updated_at: string;
    },
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

interface Groupstate {
    isSubmitting: boolean;
    isValidating: boolean;
    team: Team[];
    members: Member[];
    handleCreateGroupValidation: (group: string, photo: File) => Promise<void>;
    handleGetGroups: () => Promise<void>;
    handleAddMemberValidation: (member_id: string, group_id: string) => Promise<void>;
    handlePhotoUpdateValidation: (photo: File, group_id: string) => Promise<void>;
    handleNameUpdateValidation: (name: string, group_id: string) => Promise<void>;
    handleGetTeamMembers: (id: string) => Promise<void>;
    handleRemoveMemberValidation: (user_id: string, group_id: string) => Promise<void>;
    handleLeaveGroupValidation: (group_id: string) => Promise<void>;
}

export const UseGroupStore = create<Groupstate>((set) => ({
    isSubmitting: false,
    isValidating: false,
    team: [],
    members: [],

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
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ group_name, photo: base64 })
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
    },

    handleAddMemberValidation: async (member_id: string, group_id: string) => {
        set({ isSubmitting: true })

        try {
            const result = await fetch('/api/group/add', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ member_id, group_id })
            })

            const res = await result.json()

            if (!res.success) {
                sileo.error({
                    title: res.message,
                });
            }
        } catch (error) {
            console.log(error)
        } finally {
            set({ isSubmitting: false })
        }
    },

    handlePhotoUpdateValidation: async (photo: File, group_id: string) => {
        set({ isValidating: true })

        try {
            const base64 = photo ? await new Promise<string>((resolve, reject) => {
                const reader = new FileReader()
                reader.onloadend = () => resolve(reader.result as string)
                reader.onerror = reject
                reader.readAsDataURL(photo)
            }) : null

            await fetch('/api/group/photo', {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ photo: base64, group_id })
            })


        } catch (error) {
            console.log(error)
        } finally {
            set({ isValidating: false })
        }
    },

    handleNameUpdateValidation: async (name: string, group_id: string) => {
        set({ isValidating: true })

        try {
            await fetch('/api/group/name', {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, group_id })
            })
        } catch (error) {
            console.log(error)
        } finally {
            set({ isValidating: false })
        }
    },

    handleGetTeamMembers: async (id: string) => {
        try {
            const result = await fetch(`/api/group/members/${id}`)

            const res = await result.json()

            set({ members: res.data })
        } catch (error) {
            console.log(error)
        }
    },

    handleRemoveMemberValidation: async (user_id: string, group_id: string) => {
        set({ isSubmitting: true })

        try {
            await fetch('/api/group/remove', {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_id, group_id })
            })

        } catch (error) {
            console.log(error)
        } finally {
            set({ isSubmitting: false })
        }
    },

    handleLeaveGroupValidation: async (group_id: string) => {
        set({ isSubmitting: true })

        try {
            await fetch('/api/group/leave', {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ group_id })
            })
            
        } catch (error) {
            console.log(error)
        } finally {
            set({ isSubmitting: false })
        }
    }
}))