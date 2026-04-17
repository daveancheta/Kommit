import { authClient } from "@/lib/auth-client";
import { sileo } from "sileo";
import { create } from "zustand";

interface User {
    id: string;
    name: string;
    email: string;
    image: string;
    bio: string;
    birthdate: string;
    created_at: string;
    updated_at: string;
    email_verified: string;
}

interface Task {
    id: string;
    user_id: string;
    group_id: string;
    description: string;
    status: string;
    created_at: string;
    updated_at: string;
    deadline: Date;
    group: {
        id: string;
        photo: string;
        created_at: Date;
        created_by: string;
        group_name: string;
    }
}

interface AuthState {
    isSubmitting: boolean;
    auth: User | null;
    task: Task[];
    taskCount: number;
    groupCount: number;
    handleSignInValidation: (email: string, password: string) => Promise<void>;
    handleSignUpValidation: (name: string, date: string, email: string, password: string) => Promise<void>;
    handleSignOutValidation: () => Promise<void>;
    handleGetSession: () => Promise<void>;
    handleGithubSign: () => Promise<void>;
    handleGetAuthProfile: () => Promise<void>;
    handleUpdateProfileValidation: (name: string, email: string, bio: string, profile: File) => Promise<void>;
}

export const UseAuthStore = create<AuthState>((set) => ({
    isSubmitting: false,
    auth: null,
    task: [],
    taskCount: 0,
    groupCount: 0,

    handleSignInValidation: async (email, password) => {
        set({ isSubmitting: true })

        try {
            const result = await fetch("/api/auth/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            })

            const res = await result.json()

            if (res.success) {
                window.location.reload()
            } else {
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

    handleSignUpValidation: async (name, date, email, password) => {
        set({ isSubmitting: true })

        try {
            const result = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Cotent-Type": "application/json" },
                body: JSON.stringify({ name, date, email, password })
            })

            const res = await result.json()

            if (res.success) {
                window.location.reload()
            } else {
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

    handleSignOutValidation: async () => {
        try {
            await fetch("/api/auth/signout", {
                method: "POST",
                credentials: "include",
            })

            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    },

    handleGetSession: async () => {
        try {
            const result = await fetch("/api/auth/session")

            const res = await result.json()

            set({ auth: res.session.user })
        } catch (error) {
            console.log(error)
        }
    },

    handleGithubSign: async () => {
        set({ isSubmitting: true })

        try {
            await authClient.signIn.social({
                provider: "github"
            })
        } catch (error) {
            console.log(error)
        } finally {
            set({ isSubmitting: false })
        }
    },

    handleGetAuthProfile: async () => {
        try {
            const result = await fetch('/api/group/task')

            const res = await result.json()


            set({ task: res.task })
            set({ taskCount: res.taskCount })
            set({ groupCount: res.groupCount })
        } catch (error) {
            console.log(error)
        }
    },

    handleUpdateProfileValidation: async (name: string, email: string, bio: string, profile: File) => {
        set({ isSubmitting: true })

        const base64 = profile ? await new Promise<string>((resolve, reject) => {
            const reader = new FileReader()
            reader.onloadend = () => resolve(reader.result as string)
            reader.onerror = reject
            reader.readAsDataURL(profile)
        }) : null

        try {
            await fetch("/api/auth", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, bio, profile: base64 })
            })
        } catch (error) {
            console.log(error)
        } finally {
            set({ isSubmitting: false })
        }
    }
}))