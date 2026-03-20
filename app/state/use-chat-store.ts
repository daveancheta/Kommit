import { create } from "zustand";

interface Messages {
    id: string;
    user_id: string;
    content: string,
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
        email_verified: string;
    }
}

interface ChatState {
    selectedTeam: string | null;
    selectedTeamName: string | null,
    messages: Messages[];
    setSelectedTeam: (selectedTeam: string) => void;
    setSelectedTeamName: (selectedTeamName: string) => void;
    handleGetMessages: (id: string) => Promise<void>;

}

export const UseChatStore = create<ChatState>((set) => ({
    selectedTeam: null,
    selectedTeamName: null,
    messages: [],

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
    }
}))