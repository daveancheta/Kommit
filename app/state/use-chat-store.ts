import { create } from "zustand";

interface ChatState {
    selectedTeam: string | null;
    setSelectedTeam: (selectedTeam: string) => void;
    handleGetMessages: (id: string) => Promise<void>;

}
export const UseChatStore = create<ChatState>((set) => ({
    selectedTeam: null,

    setSelectedTeam: (selectedTeam: string) => set({ selectedTeam: selectedTeam }),

    handleGetMessages: async (id: string) => {
        try {
            const messages = await fetch(`/api/chat/${id}`)
        } catch (error) {
            console.log(error)
        }
    }
}))