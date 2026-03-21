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

interface UserState {
    user: User[];
    handleGetUser: () => Promise<void>;
}

export const UseUserStore = create<UserState>((set) => ({
    user: [],

    handleGetUser: async () => {
        try {
            const result = await fetch('/api/user')

            const res = await result.json()

            set({ user: res.data })
        } catch (error) {
            console.log(error)
        }
    }
}))