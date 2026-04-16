import { create } from "zustand";

interface PostState {
    isSubmitting: boolean;
    handleCreatePostValidation: (content: string, image: File) => Promise<void>;
}

export const UsePostStore = create<PostState>((set) => ({
    isSubmitting: false,

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
    }
}))