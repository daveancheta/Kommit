import { authClient } from "@/lib/auth-client";
import { sileo } from "sileo";
import { create } from "zustand";

interface User {
    id: string;
    name: string;
    email: string;
    image: string;
    birthdate: string;
    created_at: string;
    updated_at: string;
    email_verified: string;
}

interface AuthState {
    isSubmitting: boolean;
    auth: User | null;
    handleSignInValidation: (email: string, password: string) => Promise<void>;
    handleSignUpValidation: (name: string, date: string, email: string, password: string) => Promise<void>;
    handleSignOutValidation: () => Promise<void>;
    handleGetSession: () => Promise<void>;
    handleGithubSign: () => Promise<void>;
}

export const UseAuthStore = create<AuthState>((set) => ({
    isSubmitting: false,
    auth: null,

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
    }
}))