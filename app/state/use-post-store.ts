import { create } from "zustand";

interface Post {
    id: string;
    user_id: string;
    content: string;
    image: string;
    created_at: Date;
    updated_at: Date;
    user: {
        id: string;
        name: string;
        email: string;
        image: string;
        birthdate: string;
        created_at: Date;
        updated_at: Date;
        email_verified: boolean;
    }
}
interface PostState {
    isSubmitting: boolean;
    isLoading: boolean;
    posts: Post[];
    handleCreatePostValidation: (content: string, image: File) => Promise<void>;
    handleGetAllPost: (isShowLoading: boolean) => Promise<void>;
}

export const UsePostStore = create<PostState>((set) => ({
    isSubmitting: false,
    isLoading: false,
    posts: [],

    handleCreatePostValidation: async (content: string, image: File) => {
        set({ isSubmitting: true })

        try {
            const base64 = image ? await new Promise<string>((resolve, reject) => {
                const reader = new FileReader()
                reader.onloadend = () => resolve(reader.result as string)
                reader.onerror = reject
                reader.readAsDataURL(image)
            }) : null

            await fetch("/api/post", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content, image: base64 })
            })

        } catch (error) {
            console.log(error)
        } finally {
            set({ isSubmitting: false })
        }
    },

    handleGetAllPost: async (isShowLoading: boolean) => {
        if (isShowLoading) {
            set({ isLoading: true })
        }

        try {
            const result = await fetch("/api/post")

            const res = await result.json()

            set({ posts: res.data })
        } catch (error) {
            console.log(error)
        } finally {
            set({ isLoading: false })
        }
    }
}))