import { create } from "zustand";

interface Meeting {
    id: string,
    title: string,
    date: string,
    time: string,
    created_by: string,
    group_id: string,
    created_at: string,
    updated_at: string,
}

interface Meetingstate {
    isSubmitting: boolean;
    meeting: Meeting[];
    handleCreateMeetingValidation: (title: string, date: string, time: string, group_id: string) => Promise<void>;
    handleGetMeeting: (group_id: string) => Promise<void>;
}

export const UseMeetingStore = create<Meetingstate>((set) => ({
    isSubmitting: false,
    meeting: [],

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
    },

    handleGetMeeting: async (group_id: string) => {
        try {
            const result = await fetch(`/api/group/meeting/${group_id}`)

            const res = await result.json()

            set({ meeting: res.data })
        } catch (error) {
            console.log(error)
        }
    }
}))