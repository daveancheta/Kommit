import { sileo } from "sileo";
import { create } from "zustand";

interface AuthState {
    isSubmitting: boolean;
    handleSignInValidation: (email: string, password: string) => Promise<void>;
    handleSignUpValidation: (name: string, date: string, email: string, password: string) => Promise<void>;
}

export const UseAuthStore = create<AuthState>((set) => ({
    isSubmitting: false,

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
            }
        } catch (error) {
            console.log(error)
        } finally {
            set({ isSubmitting: false })
        }
    }
}))