import { create } from "zustand";

interface User {
    id: string;
    name: string;
    birthdate: string;
    email: string;
    email_verified: string;
    image: string;
    created_at: string;
    updated_at: string;
}

interface Notification {
    id: string;
    user_id: string;
    message: string;
    is_read: boolean;
    created_at: string;
    updated_at: string;
}

interface UserState {
    user: User[];
    handleGetUser: () => Promise<void>;
    notification: Notification[];
    handleGetNotifcation: (showLoading: boolean) => Promise<void>;
    isLoading: boolean;
    handleUpdateNotificationValidation: () => Promise<void>;
    handleUpdateNotificationByIdValidation: (id: string) => Promise<void>;
}

export const UseUserStore = create<UserState>((set) => ({
    user: [],
    notification: [],
    isLoading: false,

    handleGetUser: async () => {
        try {
            const result = await fetch('/api/user')

            const res = await result.json()

            set({ user: res.data })
        } catch (error) {
            console.log(error)
        }
    },

    handleGetNotifcation: async (showLoading: boolean) => {
        if (showLoading) {
            set({ isLoading: true })
        }

        try {
            const result = await fetch("/api/notification")

            const res = await result.json()

            set({ notification: res.data })
        } catch (error) {
            console.log(error)
        } finally {
            set({ isLoading: false })
        }
    },

    handleUpdateNotificationValidation: async () => {
        try {
            await fetch("/api/notification", {
                method: "PATCH",
            })
        } catch (error) {
            console.log(error)
        }
    },

     handleUpdateNotificationByIdValidation: async (id: string) => {
        try {
            await fetch(`/api/notification/${id}`, {
                method: "PATCH",
            })
        } catch (error) {
            console.log(error)
        }
    }
}))