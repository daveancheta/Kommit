import { create } from "zustand";

interface Meetingstate {
    isSubmitting: boolean;
    handleCreateMeetingValidation: (title: string, date: string, time: string, group_id: string) => Promise<void>;
}

export const UseMeetingStore = create<Meetingstate>((set) => ({
    isSubmitting: false,

    handleCreateMeetingValidation: async (title: string, date: string, time: string, group_id: string) => {
        set({ isSubmitting: true })
        try {
            await fetch("/api/group/meeting", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    date,
                    time,
                    group_id
                })
            })
        } catch (error) {
            console.log(error)
        } finally {
            set({ isSubmitting: false })
        }
    }
}))