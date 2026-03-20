import { create } from "zustand";
import { UseAuthStore } from "./use-auth-store";

interface Messages {
    id: string;
    user_id: string;
    content: string,
    group_id: string;
    created_at: string;
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
        email_verified: string;
    }
}

interface ChatState {
    selectedTeam: string | null;
    selectedTeamName: string | null,
    messages: Messages[];
    isSubmitting: boolean;
    setSelectedTeam: (selectedTeam: string) => void;
    setSelectedTeamName: (selectedTeamName: string) => void;
    handleGetMessages: (id: string) => Promise<void>;
    handleSendMessageValidation: (content: string, id: string) => Promise<void>;
}

export const UseChatStore = create<ChatState>((set) => ({
    selectedTeam: null,
    selectedTeamName: null,
    messages: [],
    isSubmitting: false,

    setSelectedTeam: (selectedTeam: string) => set({ selectedTeam: selectedTeam }),
    setSelectedTeamName: (selectedTeamName: string) => set({ selectedTeamName: selectedTeamName }),

    handleGetMessages: async (id: string) => {
        try {
            const messages = await fetch(`/api/chat/${id}`)

            const res = await messages.json()

            set({ messages: res.message })
        } catch (error) {
            console.log(error)
        }
    },

    handleSendMessageValidation: async (content: string, id: string) => {
        set({ isSubmitting: true })
        const auth = UseAuthStore.getState().auth

        const optimisticMessage = {
            id: crypto.randomUUID(),
            user_id: auth?.id ?? "",
            content: content,
            group_id: id,
            created_at: new Date().toISOString(),
            group: { id: "", photo: "", created_at: "", created_by: "", group_name: "", updated_at: "" },
            user: {
                id: auth?.id ?? "",
                name: auth?.name ?? "",
                email: auth?.email ?? "",
                image: auth?.image ?? "",
                birthdate: "",
                created_at: "",
                updated_at: "",
                email_verified: "",
            }
        }

        set(state => ({ messages: [...state.messages, optimisticMessage] }))

        try {
            await fetch('/api/chat', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content, id })
            })
        } catch (error) {
            console.log(error)
        } finally {
            set({ isSubmitting: false })
        }
    }
}))